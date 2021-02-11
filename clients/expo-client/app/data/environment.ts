import { KeyValueStoreImpl } from "@daylighted-app/data/dist/kv-store"
import { MobxEnvironment } from "@daylighted-app/data/dist/mst"
import { RxdbStoreInitOptions } from "@daylighted-app/data/dist/rxdb-store/store"
// use expo managed `expo-sqlite` instead of `react-native-sqlite-2` which require the project to be ejected.
// they expose identical APIs
import * as SQLite from "expo-sqlite"
import PouchDBAdapterHttp from "pouchdb-adapter-http"
import SQLiteAdapterFactory from "pouchdb-adapter-react-native-sqlite"
import { Api } from "../services/api"
import { asyncStorageProxy } from "./async-store"
import { secureStorageProxy } from "./secure-store"

let ReactotronDev
if (__DEV__) {
  const { Reactotron } = require("../services/reactotron")
  ReactotronDev = Reactotron
}

const RXDB_STORE_NAME = "rx-store"

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment implements MobxEnvironment {
  constructor() {
    // create each service
    if (__DEV__) {
      // dev-only services
      this.reactotron = new ReactotronDev()
    }
    this.api = new Api()
    this.navStateStore = asyncStorageProxy
    this.secureStateStore = secureStorageProxy
    this.rxdbOpts = {
      dbCreator: {
        name: RXDB_STORE_NAME,
        adapter: "react-native-sqlite",
      },
      presetPlugins: ["timestamped-uid"],
      customPlugins: [SQLiteAdapterFactory(SQLite), PouchDBAdapterHttp],
      replicators: ["gql"],
    }
  }

  async setup() {
    // allow each service to setup
    if (__DEV__) {
      await this.reactotron.setup()
    }
    await this.api.setup()
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron: typeof ReactotronDev

  api: Api
  navStateStore: KeyValueStoreImpl
  secureStateStore: KeyValueStoreImpl
  rxdbOpts: RxdbStoreInitOptions
}

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createMobxEnvironment(): Promise<MobxEnvironment> {
  const env = new Environment()
  await env.setup()
  return env
}
