import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { DaAccessScope } from "../../enums/da-acces-scope.enum";
import { DaBaseModel } from "./da-base.model";

/**
 * Mobx Model: Daylightful Event
 */
export const DaEventModel = types.compose(
  DaBaseModel,
  types.model({
    prid: types.integer,
    sid: types.integer,
    scope: types.enumeration(Object.values(DaAccessScope))
  })
).views(self => ({
}));

/**
 * Mobx Instance: Daylightful Event
 */
export interface DaEvent extends Instance<typeof DaEventModel> { }

/**
 * Mobx Snapshots: Daylightful Event
 */
export interface DaEventSnapshotOut extends SnapshotOut<typeof DaEventModel> { }
export interface DaEventSnapshotIn extends SnapshotIn<typeof DaEventModel> { }
