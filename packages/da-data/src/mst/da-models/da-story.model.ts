import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { DaAccessScope } from "../../enums/da-acces-scope.enum";
import { DaBaseModelWithUserId } from "./da-base.model";

/**
 * Mobx Model: Daylightful Story
 */
export const DaStoryModel = types
  .compose(
    DaBaseModelWithUserId,
    types.model({
      prefId: types.string,
      eventPrefId: types.string,
      name: types.string,
      // figure: types.map(DaItemFigure),
      scope: types.enumeration(Object.values(DaAccessScope)),
    }),
  )
  .views((self) => ({
    getFigures(self) {},
  }));

/**
 * Mobx Instance: Daylightful Story
 */
export interface DaStory extends Instance<typeof DaStoryModel> {}

/**
 * Mobx Snapshots: Daylightful Story
 */
export interface DaStorySnapshotOut extends SnapshotOut<typeof DaStoryModel> {}
export interface DaStorySnapshotIn extends SnapshotIn<typeof DaStoryModel> {}
