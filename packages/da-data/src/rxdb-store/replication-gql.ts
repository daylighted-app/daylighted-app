// https://hasura.io/blog/building-an-offline-first-web-app-with-rxdb-hasura/

import isString from "lodash/isString";
import merge from "lodash/merge";
import { SyncOptionsGraphQL } from "rxdb";
import { RxGraphQLReplicationState } from "rxdb/dist/types/plugins/replication-graphql";
import {
  defaultRepConfGraphQL as baseConfDefault,
  GQL_PUSH_BATCH_SIZE_DEFAULT,
} from "./constants";
import {
  getPullQueryBuilder,
  getPushQueryBuilder,
} from "./gql-query-builders/get-query-builders.util";
import { cancelRxStoreReplication } from "./replication";
import { getRxdbCollection, RxStoreCollectionName } from "./store";

/**
 * custom replication config
 *
 * @export
 * @interface RxReplicationConfigGraphQL
 * @extends {SyncOptionsGraphQL}
 */
export interface RxReplicationConfigGraphQL extends SyncOptionsGraphQL {
  collectionName: RxStoreCollectionName;
  authInfo: { userId: string; idToken: string };
}

export const replicationStatesGraphQL: Map<
  RxStoreCollectionName,
  RxGraphQLReplicationState
> = new Map();

/**
 * perform replication with a remote GraphQL server
 *
 * before this, must call useReplicator("gql") once
 *
 * @export
 */
export async function setupGqlReplication(
  baseConfRequired: Omit<RxReplicationConfigGraphQL, "collectionName">,
  extraConfs?: RxReplicationConfigGraphQL[],
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
        ? <RxReplicationConfigGraphQL>{ collectionName: v }
        : v;
      const { collectionName, authInfo, ...restConf } = merge(
        baseConfDefault,
        baseConfRequired,
        conf,
      );

      console.info("setting up replication...", collectionName);
      await cancelRxStoreReplication("gql", collectionName);

      // create and cache repState
      // ==================================================================
      const replicationState = getRxdbCollection(collectionName).syncGraphQL({
        headers: { Authorization: `Bearer ${authInfo.idToken}` },
        pull: {
          queryBuilder: getPullQueryBuilder(authInfo.userId, collectionName),
        },
        push: {
          batchSize: GQL_PUSH_BATCH_SIZE_DEFAULT,
          queryBuilder: getPushQueryBuilder(authInfo.userId, collectionName),
        },
        ...restConf,
      });
      replicationStatesGraphQL.set(collectionName, replicationState);

      // register subscriptions on current replicationState
      replicationState.active$.subscribe((active) => {
        if (active) console.info(collectionName, "replication established!");
      });
      replicationState.error$.subscribe((err) => {
        return reject(`${collectionName} replication error: ${err}`);
      });
    }
  });
}
