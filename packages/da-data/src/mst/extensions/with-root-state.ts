import { getRoot, IStateTreeNode } from "mobx-state-tree";
import { MobxRootStateModel } from "../root-state.model";

/**
 * Adds a rootStore property to the node for a convenient
 * and strongly typed way for stores to access other stores.
 */
export const withMobxRootState = (self: IStateTreeNode) => ({
  views: {
    /**
     * The root store.
     */
    get rootStore() {
      return getRoot<typeof MobxRootStateModel>(self);
    },
  },
});
