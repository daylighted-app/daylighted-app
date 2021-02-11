import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { NavStateModel } from "./nav-state.model";
import { SecureStateModel } from "./secure-state.model";

/**
 * The MobxRootStateModel model.
 */
export const MobxRootStateModel = types.model("MobxRootStateModel", {
  // should write my own root store
  // da: types.maybe(DaStateModel),
  navState: types.maybeNull(NavStateModel),
  secureState: types.maybeNull(SecureStateModel),
});
// .actions((self) => {
//   // Don't forget that async operations HAVE
//   // to use `flow( ... )`.
//   const fetchData = flow(function* fetchData() {
//     // yield {}
//   });

//   return {
//     fetchData,
//     afterCreate() {
//       // Notice that we call the function directly
//       // instead of using `self.fetchData()`. This is
//       // because Typescript doesn't know yet about `fetchData()`
//       // being part of `self` in this context.
//       fetchData();
//     },
//   };
// });

/**
 * The MobxRootState instance.
 */
export interface MobxRootState extends Instance<typeof MobxRootStateModel> {}

/**
 * The data of a MobxRootState.
 */
export interface MobxRootStateSnapshotOut
  extends SnapshotOut<typeof MobxRootStateModel> {}
export interface MobxRootStateSnapshotIn
  extends SnapshotIn<typeof MobxRootStateModel> {}
