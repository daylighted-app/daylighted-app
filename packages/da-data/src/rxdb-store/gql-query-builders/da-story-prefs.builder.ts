import { DaStoryPrefsRxDoc } from "../schemas/da-story-prefs.schema";
import { RxGraphQLReplicationQueryBuilderFactory } from "./get-query-builders.util";

export const getQueryBuilderDaStoryPrefs: RxGraphQLReplicationQueryBuilderFactory = (
  userId: string,
  direction: "push" | "pull",
) => (doc: DaStoryPrefsRxDoc) => {
  return null;
};
