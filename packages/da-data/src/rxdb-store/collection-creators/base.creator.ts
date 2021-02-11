import { RxCollectionCreatorBase } from "rxdb/dist/types/types";
import { DaBaseSchema } from "../schemas/da-base.schema";

export default <RxCollectionCreatorBase>{
  schema: DaBaseSchema, // must override this
  autoMigrate: true,
  // pouchSettings?: PouchSettings;
  // migrationStrategies?: KeyFunctionMap;
  // statics?: KeyFunctionMap;
  // methods?: KeyFunctionMap;
  // attachments?: KeyFunctionMap;
  // options?: any;
  // cacheReplacementPolicy?: RxCacheReplacementPolicy;
};
