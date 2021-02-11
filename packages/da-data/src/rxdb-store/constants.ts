import { RxDatabaseCreator } from "rxdb";
import { RxReplicationConfigCouchDB } from "./replication-couch";
import { RxReplicationConfigGraphQL } from "./replication-gql";

// rxdb creator
// =====================================================================
export const defaultRxdbCreator: Omit<RxDatabaseCreator, "name" | "adapter"> = {
  multiInstance: false,
  ignoreDuplicate: false,

  // Since version 9.0.0 RxDB is using the EventReduce algorithm instead of the QueryChangeDetection.
  // queryChangeDetection: false,
  // https://github.com/pubkey/event-reduce
  // EventReduce only works with queries that have a predictable sort-order for any given documents. (you can make any query predicable by adding the primary key as last sort parameter)
  // https://github.com/pubkey/rxdb/blob/master/docs-src/query-change-detection.md
  eventReduce: true,
};

// rxdb replication
// =====================================================================
// couch
export const defaultRepConfCouchDB: Omit<
  RxReplicationConfigCouchDB,
  "couchName" | "collectionName" | "couchBaseURL"
> = {
  waitForLeadership: true,
  direction: { pull: true, push: true },
  options: { live: true, retry: true },
};

// gql
export const defaultRepConfGraphQL: Omit<
  RxReplicationConfigGraphQL,
  "url" | "collectionName" | "authInfo"
> = {
  waitForLeadership: true,
  deletedFlag: "deleted",
  live: true,
  syncRevisions: false,
  liveInterval: 1000 * 60 * 5, // 5 minutes
};

export const GQL_PUSH_BATCH_SIZE_DEFAULT = 10;
