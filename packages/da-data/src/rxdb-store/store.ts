import {
  addRxPlugin,
  createRxDatabase,
  RxCollection,
  RxDatabase,
  RxDatabaseCreator,
  RxPlugin,
} from "rxdb";
import { addRxdbCollections } from "./collection-creators/add-collections.util";
import { defaultRxdbCreator } from "./constants";
import { addRxdbMiddlewareHooks } from "./middleware-hooks/add-midleware-hooks.util";
import { DaStoryPrefsRxCollection } from "./schemas/da-story-prefs.schema";
import {
  DaEventPrefsRxCollection,
  DaEventRxCollection,
  DaFigurePresetRxCollection,
  daFigureRxCollection,
  DaStoryRxCollection,
  DeItemRxCollection,
} from "./schemas/schemas";

export enum RxStoreCollectionName {
  DA_EVENT = "da_events",
  DA_EVENT_PREFS = "da_event_prefs",
  DA_STORY = "da_story",
  DA_STORY_PREFS = "da_story_prefs",
  DE_ITEM = "da_item",
  DA_FIGURE = "da_figure",
  DA_FIGURE_APP = "da_figure_preset",
}

/**
 * no export
 *
 * @enum {number}
 */
enum RxStoreSchemaName {
  DA_EVENT = "daEvents",
  DA_EVENT_PREFS = "daEventPrefs",
  DA_STORY = "daStory",
  DA_STORY_PREFS = "daStoryPrefs",
  DE_ITEM = "deItem",
  DA_FIGURE = "daFigure",
  DA_FIGURE_APP = "daFigureApp",
}

export interface RxStoreCollections {
  [RxStoreSchemaName.DA_EVENT]: DaEventRxCollection;
  [RxStoreSchemaName.DA_EVENT_PREFS]: DaEventPrefsRxCollection;
  [RxStoreSchemaName.DA_STORY]: DaStoryRxCollection;
  [RxStoreSchemaName.DA_STORY_PREFS]: DaStoryPrefsRxCollection;
  [RxStoreSchemaName.DE_ITEM]: DeItemRxCollection;
  [RxStoreSchemaName.DA_FIGURE]: daFigureRxCollection;
  [RxStoreSchemaName.DA_FIGURE_APP]: DaFigurePresetRxCollection;
}

export type RxStore = RxDatabase<RxStoreCollections>;

/**
 * Must provide plugins for corresponding adapter(s) or replicators.
 *
 * For db adapters,
 *
 * - "leveldown" (requier("leveldown")) for Node.js: "pouchdb-adapter-leveldb"
 * - "indexeddb" for browsers: "pouchdb-adapter-indexeddb"
 * - "react-native-sqlite": "pouchdb-adapter-react-native-sqlite", "pouchdb-adapter-http".
 *
 * Refer to details at https://rxdb.info/adapters.html
 *
 * For replicators,
 *
 * - "couch": "pouchdb-adapter-http"
 * - "gql": null
 *
 * Can pass in multiple replicators if you want
 *
 * @export
 * @interface RxdbStoreInitOptions
 */
export interface RxdbStoreInitOptions {
  dbCreator: RxDatabaseCreator;
  replicators?: ("couch" | "gql")[];
  presetPlugins?: ("uuid" | "timestamped-uid" | "timestamp")[];
  customPlugins?: RxPlugin[];
}

let store: RxStore = null;

/**
 * Init rxdb data store
 *
 * @export
 * @param {RxdbStoreInitOptions} opts
 * @returns {Promise<void>}
 */
export async function initRxdbStore(opts: RxdbStoreInitOptions): Promise<void> {
  if (!!store) return;

  // setup preset plugins
  // ==================================================================
  for (const name of opts.presetPlugins || []) {
    const pluginDict: Record<string, RxPlugin[]> = {
      uuid: [require("./plugins/auto-uuid-index.plugin")],
      "timestamped-uid": [require("./plugins/auto-uuid-index.plugin")],
      timestamp: [require("./plugins/timestamp.plugin")],
    };
    for (const plugin of pluginDict[name]) addRxPlugin(plugin);
  }

  // load plugins for adapters
  // ==================================================================
  // try {
  //   switch (opts.adapter) {
  //     case "indexeddb":
  //       addRxPlugin(require("pouchdb-adapter-indexeddb"));
  //       adapter = "indexeddb";
  //       break;
  //     case "leveldown":
  //       addRxPlugin(require("pouchdb-adapter-leveldb"));
  //       adapter = require("leveldown");
  //       break;
  //     case "react-native-sqlite":
  //       const SQLiteAdapterFactory = require("pouchdb-adapter-react-native-sqlite");
  //       addRxPlugin(SQLiteAdapterFactory(opts.sqlite));
  //       addRxPlugin(require("pouchdb-adapter-http"));
  //       adapter = "react-native-sqlite";
  //       break;
  //     default:
  //       break;
  //   }
  // } catch (error) {
  // }

  // load custom plugins, not only for adapters
  // The above implementation is to ignore erroes thrown by requiring these optional deps, see [this](https://github.com/facebook/metro/pull/511) for why
  // But it won't work for react native, will simply use passed-in values instead,
  // let the invoker decide which pacakge to install
  for (const plugin of opts.customPlugins || []) addRxPlugin(plugin);

  for (const replicator of opts.replicators || []) {
    switch (replicator) {
      case "couch":
        // its fine to duplicate cuz addRxPlugin will omit
        // RxDBReplicationPouchDBWithCouch
        addRxPlugin(require("pouchdb-adapter-http"));
        break;
      case "gql":
        // RxDBReplicationGraphQLPlugin
        addRxPlugin(require("rxdb/plugins/replication-graphql"));
        break;
      default:
        break;
    }
  }

  // setup store
  // ==================================================================
  const dbCreator = <RxDatabaseCreator>{
    defaultRxdbCreator,
    ...opts.dbCreator,
  };

  store = await createRxDatabase<RxStoreCollections>(dbCreator);

  // add collections and hooks
  // ==================================================================
  await addRxdbCollections();
  addRxdbMiddlewareHooks();
}

export function getRxdbStore() {
  return store;
}

export function getRxdbCollection<T extends RxCollection>(
  name: RxStoreCollectionName,
): T {
  return store?.[name];
}
