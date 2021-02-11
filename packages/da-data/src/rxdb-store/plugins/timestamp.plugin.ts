import { RxCollectionCreator, RxPlugin } from "rxdb";
import { RxDatabaseBase } from "rxdb/dist/types/rx-database";

const fields = {
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

export const TimestampRxPlugin: RxPlugin = {
  name: "timestamp",
  rxdb: true, // this must be true so rxdb knows that this is a rxdb-plugin and not a pouchdb-plugin
  prototypes: {
    RxDatabase(proto: RxDatabaseBase) {
      const prevAddCollections = proto.addCollections;
      Object.assign(proto, {
        async addCollections(args: Record<string, RxCollectionCreator>) {
          const addCollectionsResult = await prevAddCollections.call(
            this,
            args,
          );

          for (const name of Object.keys(addCollectionsResult)) {
            const collection = addCollectionsResult[name];

            // Register hooks
            collection.preInsert((plainData: any) => {
              const now = new Date().getTime().toString();
              if (!plainData[fields.createdAt])
                plainData[fields.createdAt] = now;
              if (!plainData[fields.updatedAt])
                plainData[fields.updatedAt] = now;

              return plainData;
            }, false);

            collection.preSave((plainData: any) => {
              const now = new Date().getTime().toString();
              plainData[fields.updatedAt] = now;
              return plainData;
            }, false);
          }

          return addCollectionsResult;
        },
      });
    },
  },
};
