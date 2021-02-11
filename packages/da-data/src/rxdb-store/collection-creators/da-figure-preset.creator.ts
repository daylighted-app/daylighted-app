import { RxCollectionCreatorBase } from "rxdb/dist/types/types";
import { DaFigurePresetRxSchema } from "../schemas/da-figure-preset.schema";
import baseCreator from "./base.creator";

export default <RxCollectionCreatorBase>{
  ...baseCreator,
  schema: DaFigurePresetRxSchema,
};
