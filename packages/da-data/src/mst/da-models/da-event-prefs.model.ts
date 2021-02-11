import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { DaEventPreferencesScope } from "../../enums/da-event-prefs-scope.enum";
import { DaBaseModelWithUserId } from "./da-base.model";

/**
 * Mobx Model: Daylightful Event Preferences
 */
export const DaEventPrefsModel = types.compose(
  DaBaseModelWithUserId,
  types.model({
    scoreProgress: types.number,
    scoreComment: types.number,
    scoreInterval: types.number,
    progressTotal: types.integer,
    scope: types.enumeration(Object.values(DaEventPreferencesScope))
  })
);

/**
 * Mobx Instance: Daylightful Event Preferences
 */
export interface DaEvent extends Instance<typeof DaEventPrefsModel> { }

/**
 * Mobx Snapshots: Daylightful Event Preferences
 */
export interface DaEventSnapshotOut extends SnapshotOut<typeof DaEventPrefsModel> { }
export interface DaEventSnapshotIn extends SnapshotIn<typeof DaEventPrefsModel> { }
