import isString from "lodash/isString";
import merge from "lodash/merge";
import { RxReplicationState, SyncOptions } from "rxdb";
import { defaultRepConfCouchDB as baseConfDefault } from "./constants";
import { cancelRxStoreReplication } from "./replication";
import { getRxdbCollection, RxStoreCollectionName } from "./store";

export interface RxReplicationConfigCouchDB
  extends Omit<SyncOptions, "remote"> {
  collectionName: RxStoreCollectionName;
  couchName?: string;
  couchBaseURL?: string;
}

export const replicationStatesCouchDB: Map<
  RxStoreCollectionName,
  RxReplicationState
> = new Map();

/**
 * perform replication with a remote CouchDB
 *
 * before this, must call useReplicator("couch") once,, and have "pouchdb-adapter-http" installed
 *
 * @export
 */
export async function setupCouchReplication(
  baseConfRequired: Omit<
    RxReplicationConfigCouchDB,
    "couchName" | "collectionName"
  >,
  extraConfs?: RxReplicationConfigCouchDB[],
): Promise<RxStoreCollectionName[]> {
  return new Promise(async (resolve, reject) => {
    // if extraConfs is not assigned, use all collections
    const confs = extraConfs
      ? extraConfs
      : Object.values(RxStoreCollectionName);
    const totalRepCount = confs.length;
    const completedCollections: RxStoreCollectionName[] = [];

    for (const v of confs) {
      const conf = isString(v)
        ? <RxReplicationConfigCouchDB>{ collectionName: v }
        : v;
      const { collectionName, couchBaseURL, couchName, ...restConf } = merge(
        baseConfDefault,
        baseConfRequired,
        conf,
      );

      console.info("setting up replication...", collectionName);
      // cancel and delete existiing repState
      await cancelRxStoreReplication("couch", collectionName);
      // create and cache repState
      // ==================================================================
      const replicationState = getRxdbCollection(collectionName).sync({
        remote: `${couchBaseURL}/${couchName}`,
        ...restConf,
      });
      replicationStatesCouchDB.set(collectionName, replicationState);

      // register subscriptions on current replicationState
      replicationState.active$.subscribe((active) => {
        if (active) console.info(collectionName, "replication established!");
      });
      replicationState.docs$.subscribe((doc) => {
        console.info(collectionName, "doc is being replicated:", doc.id);
      });
      replicationState.change$.subscribe(() => {
        console.info(collectionName, "change happened");
      });

      replicationState.denied$.subscribe((docData) => {
        return reject(
          `${collectionName} replication premission denied: ${docData.id}`,
        );
      });
      replicationState.error$.subscribe((err) => {
        return reject(`${collectionName} replication error: ${err}`);
      });
      replicationState.complete$.subscribe((complete) => {
        const isCollectionCompleted =
          complete !== false && restConf.options.live === false;
        if (isCollectionCompleted) {
          completedCollections.push(collectionName);
          console.info("one time replication completed", collectionName);
          console.info("collections completed", ...completedCollections);
        }
        // determine if all passed-in collecions are completed
        const isAllRepsCompleted =
          completedCollections.length === totalRepCount;
        if (isAllRepsCompleted) resolve(completedCollections);
      });
    }
  });
}
