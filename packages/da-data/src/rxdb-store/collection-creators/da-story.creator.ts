import { RxCollectionCreatorBase } from "rxdb/dist/types/types";
import { DaStoryRxSchema } from "../schemas/schemas";
import baseCreator from "./base.creator";

export default <RxCollectionCreatorBase>{
  ...baseCreator,
  schema: DaStoryRxSchema,
};
