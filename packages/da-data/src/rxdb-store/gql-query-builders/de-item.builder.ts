import { DeItemRxDoc } from "../schemas/schemas";
import { RxGraphQLReplicationQueryBuilderFactory } from "./get-query-builders.util";

export const getQueryBuilderDeItem: RxGraphQLReplicationQueryBuilderFactory = (
  userId: string,
  direction: "push" | "pull",
) => (doc: DeItemRxDoc) => {
  return null;
};
