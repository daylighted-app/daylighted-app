import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { DaStoryPreferencesScope } from "../../enums/da-story-prefs-scope.enum";
import { DaBaseModelWithUserId } from "./da-base.model";

/**
 * Mobx Model: Daylightful Story Preferences
 */
export const DaStoryPrefsModel = types.compose(
  DaBaseModelWithUserId,
  types.model({
    scope: types.enumeration(Object.values(DaStoryPreferencesScope))
  })
);

/**
 * Mobx Instance: Daylightful Story Preferences
 */
export interface DaStoryPrefs extends Instance<typeof DaStoryPrefsModel> { }

/**
 * Mobx Snapshots: Daylightful Story Preferences
 */
export interface DaStoryPrefsSnapshotOut extends SnapshotOut<typeof DaStoryPrefsModel> { }
export interface DaStoryPrefsSnapshotIn extends SnapshotIn<typeof DaStoryPrefsModel> { }
