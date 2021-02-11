import { RxCollectionCreatorBase } from "rxdb/dist/types/types";
import { DeItemRxSchema } from "../schemas/schemas";
import baseCreator from "./base.creator";

export default <RxCollectionCreatorBase>{
  ...baseCreator,
  schema: DeItemRxSchema,
};
