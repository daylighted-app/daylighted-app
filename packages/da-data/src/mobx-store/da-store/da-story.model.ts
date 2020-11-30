import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { DaAccessScope } from "../../enums/da-acces-scope.enum";
import { DaBaseModel } from "./da-base.model";

/**
 * Mobx Model: Daylightful Story
 */
export const DaStoryModel = types.compose(
  DaBaseModel,
  types.model({
    name: types.string,
    figure: types.array(types.string),
    scope: types.enumeration(Object.values(DaAccessScope))
  })
);

/**
 * Mobx Instance: Daylightful Story
 */
export interface DaStory extends Instance<typeof DaStoryModel> { }

/**
 * Mobx Snapshots: Daylightful Story
 */
export interface DaStorySnapshotOut extends SnapshotOut<typeof DaStoryModel> { }
export interface DaStorySnapshotIn extends SnapshotIn<typeof DaStoryModel> { }
