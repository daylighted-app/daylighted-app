import { RxCollectionCreatorBase } from "rxdb/dist/types/types";
import { DaEventPrefsRxSchema } from "../schemas/schemas";
import baseCreator from "./base.creator";

export default <RxCollectionCreatorBase>{
  ...baseCreator,
  schema: DaEventPrefsRxSchema,
};
