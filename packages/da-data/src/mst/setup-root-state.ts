import { KeyValueStoreImpl } from "../kv-store";
import { RxdbStoreInitOptions } from "../rxdb-store/store";
import {
  MobxRootStateModel,
  MobxRootStateSnapshotIn,
} from "./root-state.model";

export interface MobxEnvironment {
  setup: () => void;
  reactotron: any;
  api: any;
  navStateStore: KeyValueStoreImpl;
  secureStateStore: KeyValueStoreImpl;
  rxdbOpts: RxdbStoreInitOptions;
}

export interface MobxRootStateOptions {
  env: MobxEnvironment;
  onError: (e: any) => any;
  onSuccess: (...args) => any;
}
/**
 * Setup the root state.
 */
export async function setupMobxRootState({
  env,
  ...restOpts
}: MobxRootStateOptions) {
  const defaultInitRootStoreData: MobxRootStateSnapshotIn = {
    secureState: null,
    navState: null,
  };

  const rootStore = MobxRootStateModel.create(defaultInitRootStoreData, env);

  try {
    // await rootStore.navState.init();
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty store
    // instead of crashing.
    restOpts.onError(e);
  }

  restOpts.onSuccess(rootStore);

  return rootStore;
}
