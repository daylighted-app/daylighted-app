import { RxCollectionCreatorBase } from "rxdb/dist/types/types";
import { daFigureRxSchema } from "../schemas/da-figure.schema";
import baseCreator from "./base.creator";

export default <RxCollectionCreatorBase>{
  ...baseCreator,
  schema: daFigureRxSchema,
};
