import {
  flow,
  getEnv,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree";
import { SECURE_STATE_ROOT_KEY } from "../kv-store";
import { MobxEnvironment } from "./setup-root-state";

export const SecureStateModel = types
  .model("SecureStateModel", {})
  .actions((self) => ({
    init: flow(function* () {
      const { navStateStore } = getEnv<MobxEnvironment>(self);
      // <- note the star, this is a generator function!
      // self.state = "pending";
      try {
        // ... yield can be used in async/await style
        self = yield navStateStore.load(SECURE_STATE_ROOT_KEY);
      } catch (error) {
        // ... including try/catch error handling
        console.error("Failed to fetch projects", error);
        // self.state = "error";
      }
    }),
  }));

/**
 * The SecureState instance.
 */
export interface SecureState extends Instance<typeof SecureStateModel> {}

/**
 * The data of a SecureState.
 */
export interface SecureStateSnapshotOut
  extends SnapshotOut<typeof SecureStateModel> {}
export interface SecureStateSnapshotIn
  extends SnapshotIn<typeof SecureStateModel> {}
