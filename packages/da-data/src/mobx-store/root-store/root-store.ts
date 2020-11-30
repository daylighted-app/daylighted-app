import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { DaylightStoreModel } from "../daylight-store/daylight-store.model";

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model("RootStore", {
    // should write my own root store
    da: DaylightStoreModel,
  })
  .actions(self => {
    // Don't forget that async operations HAVE
    // to use `flow( ... )`.
    const fetchData = flow(function* fetchData() {
      // yield {}
    });

    return {
      fetchData,
      afterCreate() {
        // Notice that we call the function directly
        // instead of using `self.fetchData()`. This is
        // because Typescript doesn't know yet about `fetchData()`
        // being part of `self` in this context.
        fetchData();
      },
    };
  });

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshotOut extends SnapshotOut<typeof RootStoreModel> {}
export interface RootStoreSnapshotIn extends SnapshotIn<typeof RootStoreModel> {}
