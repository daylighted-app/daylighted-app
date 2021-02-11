import { replicationStatesCouchDB } from "./replication-couch";
import { replicationStatesGraphQL } from "./replication-gql";
import { RxStoreCollectionName } from "./store";

export async function cancelRxStoreReplication(
  type: "couch" | "gql",
  repStateKey?: RxStoreCollectionName | RxStoreCollectionName[],
): Promise<void> {
  const repStateMap =
    type === "couch" ? replicationStatesCouchDB : replicationStatesGraphQL;

  // cancel replications for passed-in names
  // if names passed in is null, cancel all existing reps
  const repKeys = !!repStateKey
    ? <RxStoreCollectionName[]>[].concat(repStateKey)
    : repStateMap.keys();

  for (const repKey of repKeys) {
    const repState = repStateMap.get(repKey);
    if (!repState) return;

    await repStateMap.get(repKey).cancel();
    // delete entry
    repStateMap.delete(repKey);
  }
}

// forward public exports
// private exports omitted:
// - replicationStatesCouchDB
// - replicationStatesGraphQL
export {
  RxReplicationConfigCouchDB,
  setupCouchReplication,
} from "./replication-couch";
export {
  RxReplicationConfigGraphQL,
  setupGqlReplication,
} from "./replication-gql";
export * from "./constants";
