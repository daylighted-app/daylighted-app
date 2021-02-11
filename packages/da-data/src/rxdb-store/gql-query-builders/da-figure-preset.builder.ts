import { GQL_PUSH_BATCH_SIZE_DEFAULT } from "../constants";
import { DaFigurePresetRxDoc } from "../schemas/schemas";
import { RxGraphQLReplicationQueryBuilderFactory } from "./get-query-builders.util";

export const getQueryBuilderDaFigurePreset: RxGraphQLReplicationQueryBuilderFactory = (
  userId: string,
  direction: "push" | "pull",
) => {
  // pull builder
  // ===========================================================================
  const pullBuilder = (doc: DaFigurePresetRxDoc) => {
    if (!doc) {
      // @ts-ignore
      doc = {
        id: "",
        updatedAt: new Date(0).toUTCString(),
      };
    }

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
          text
          isCompleted
          deleted
          createdAt
          updatedAt
          userId
      }
    }`;
    return {
      query,
      variables: {},
    };
  };

  // conditional returning values
  // this collection is pull only
  // ===========================================================================
  switch (direction) {
    case "pull":
      return pullBuilder;
    case "push":
      return null;
    default:
      return null;
  }
};
