import { RxCollectionCreator, RxPlugin } from "rxdb";
import { RxDatabaseBase } from "rxdb/dist/types/rx-database";
import { v4 as uuidv4 } from "uuid";

const fields = {
  index: "id",
};

/**
 * While a user is creating a
 */
export const TimestampedIndexWithUserIdRxPlugin: RxPlugin = {
  name: "timestamped-index-with-uid",
  rxdb: true, // this must be true so rxdb knows that this is a rxdb-plugin and not a pouchdb-plugin
  /**
   * every value in this object can manipulate the prototype of the keynames class
   * You can manipulate every prototype in this list:
   * @link https://github.com/pubkey/rxdb/blob/master/src/plugin.ts#L22
   */
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
              const uuidString = uuidv4();
              if (!plainData[fields.index])
                plainData[fields.index] = uuidString;

              return plainData;
            }, false);
          }

          return addCollectionsResult;
        },
      });
      // const prevCollection = proto.collection;
      // Object.assign(proto, {
      //   async collection(args: RxCollectionCreator) {
      //     const collection = await prevCollection.call(this, args);
      //     return collection;
      //   },
      // });
    },
  },
};
