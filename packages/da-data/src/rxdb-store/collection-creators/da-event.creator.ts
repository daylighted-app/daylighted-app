import { RxCollectionCreatorBase } from "rxdb/dist/types/types";
import { DaEventRxSchema } from "../schemas/da-event.schema";
import baseCreator from "./base.creator";

export default <RxCollectionCreatorBase>{
  ...baseCreator,
  schema: DaEventRxSchema,
  // migrationStrategies: {
  //   1: function (oldDoc) {
  //     delete oldDoc.createdAt;
  //     delete oldDoc.updatedAt;
  //     return oldDoc;
  //   },
  // },
};
