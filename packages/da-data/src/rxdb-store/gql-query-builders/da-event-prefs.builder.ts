import { GQL_PUSH_BATCH_SIZE_DEFAULT } from "../constants";
import { DaEventPrefsRxDoc } from "../schemas/schemas";
import { RxGraphQLReplicationQueryBuilderFactory } from "./get-query-builders.util";

export const getQueryBuilderDaEventPrefs: RxGraphQLReplicationQueryBuilderFactory = (
  userId: string,
  direction: "push" | "pull",
) => {
  // pull builder
  // ===========================================================================
  const pullBuilder = (doc: DaEventPrefsRxDoc) => {
    // @ts-ignore
    doc = doc || {
      id: "",
      updatedAt: new Date(0).toUTCString(),
    };

    const query = `{
      todos(
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
      ) {
          id
          userId
          createdAt
          updatedAt
          deleted
          prefId
          storyId
          scope
      }
    }`;
    return {
      query,
      variables: {},
    };
  };

  // push builder
  // ===========================================================================
  const pushBuilder = (doc: DaEventPrefsRxDoc) => {
    const query = `
    mutation InsertTodo($todo: [todos_insert_input!]!) {
        insert_todos(
            objects: $todo,
            on_conflict: {
                constraint: todos_pkey,
                update_columns: [prefId, storyId, updatedAt, deleted]
            }){
            returning {
              id
            }
          }
      }
    `;
    const variables = {
      todo: doc,
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
