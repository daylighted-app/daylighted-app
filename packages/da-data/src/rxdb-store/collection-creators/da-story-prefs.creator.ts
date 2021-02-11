import { RxCollectionCreatorBase } from "rxdb/dist/types/types";
import { DaStoryPrefsRxSchema } from "../schemas/da-story-prefs.schema";
import baseCreator from "./base.creator";

export default <RxCollectionCreatorBase>{
  ...baseCreator,
  schema: DaStoryPrefsRxSchema,
};
