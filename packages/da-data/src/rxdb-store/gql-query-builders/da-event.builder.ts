import { GQL_PUSH_BATCH_SIZE_DEFAULT } from "../constants";
import { DaEventRxDoc } from "../schemas/schemas";
import { RxGraphQLReplicationQueryBuilderFactory } from "./get-query-builders.util";

// The helper functions for RxDBReplicationGraphQLPlugin
// - pullQueryBuilderFromRxSchema
// - pushQueryBuilderFromRxSchema
// does not apply to the hasura approach
// https://github.com/pubkey/rxdb/tree/master/examples/graphql
// ===========================================================================
// const gqlInput: GraphQLSchemaFromRxSchemaInputSingleCollection = {
//   schema: DaEventRxSchema,
//   deletedFlag: "deleted",
//   feedKeys: ["id", "updatedAt"]
//   // ...
// };
// const pullBuilder = pullQueryBuilderFromRxSchema(
//   RxStoreCollectionName.DA_EVENT,
//   gqlInput,
//   5,
// );
// const pushBuilder = pushQueryBuilderFromRxSchema(
//   RxStoreCollectionName.DA_EVENT,
//   gqlInput,
// );

export const getQueryBuilderDaEvent: RxGraphQLReplicationQueryBuilderFactory = (
  userId: string,
  direction: "push" | "pull",
) => {
  // pull builder
  // ===========================================================================
  const pullBuilder = (doc: DaEventRxDoc) => {
    // @ts-ignore
    doc = doc || {
      id: "",
      updatedAt: new Date(0).toUTCString(),
    };

    const query = `{
      da_event(
          where: {
              _or: [
                  {updatedAt: {_gt: "${doc.updatedAt}"}},
                  {
                      updatedAt: {_eq: "${doc.updatedAt}"},
                      id: {_gt: "${doc.id}"}
                  }
              ],
              userId: {_eq: "${userId}"} 
          },
          limit: ${GQL_PUSH_BATCH_SIZE_DEFAULT},
          order_by: [{updatedAt: asc}, {id: asc}]
      ): [da_event!]
    }`;
    return {
      query,
      variables: {},
    };
  };

  // push builder
  // ===========================================================================
  const pushBuilder = (doc: DaEventRxDoc) => {
    const query = `
      mutation push_da_event_one($event: [da_event_insert_input!]!) {
        insert_da_event_one(
            objects: $event,
            on_conflict: {
                constraint: da_event_pkey,
                update_columns: [prefId, storyId, updatedAt, deleted]
            }){
            returning {
              id
            }
          }
      }
    `;
    const variables = {
      event: doc,
    };

    return {
      query,
      variables,
    };
  };

  // conditional returning values
  // ===========================================================================
  switch (direction) {
    case "pull":
      return pullBuilder;
    case "push":
      return pushBuilder;
    default:
      return null;
  }
};
