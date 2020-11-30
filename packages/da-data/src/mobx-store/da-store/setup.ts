import { onSnapshot } from "mobx-state-tree"
import * as storage from "../../utils/storage"
import { Environment } from "../environment"
import { DaylightStore, DaylightStoreModel } from "./daylight-store.model"

/**
 * The key we'll be saving our state as within async storage.
 */
const DAYLIGHT_STORE = "daylight store"

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupDaylightStore() {
  let store: DaylightStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  try {
    // load data from storage
    data = (await storage.load(DAYLIGHT_STORE)) || {}
    store = DaylightStoreModel.create(data, env)
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    store = DaylightStoreModel.create({}, env)

    // but please inform us what happened
    __DEV__ && console.tron.error(e.message, null)
  }

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setDaylightStore(store, data)
  }

  // track changes & save to storage
  onSnapshot(store, (snapshot) => storage.save(DAYLIGHT_STORE, snapshot))

  return store
}
