import { DaStoryRxDoc } from "../schemas/schemas";
import { RxGraphQLReplicationQueryBuilderFactory } from "./get-query-builders.util";

export const getQueryBuilderDaStory: RxGraphQLReplicationQueryBuilderFactory = (
  userId: string,
  direction: "push" | "pull",
) => (doc: DaStoryRxDoc) => {
  return null;
};
