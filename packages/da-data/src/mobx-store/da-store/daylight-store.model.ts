import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { DaEventPrefsModel } from "./da-event-prefs.model";

/**
 * Mobx Model: Daylight Store Domain
 */
export const DaylightStoreModel = types
  .model("DaylightStore")
  .props({
    user: types.string,
    globalPrefs: types.model({
      // collection: types.reference(DaCollectionPrefsModel),
      story: types.reference(DaEventPrefsModel),
      event: types.reference(DaEventPrefsModel),
    })
    // items: types.
    // records: {}
  })
  .views(self => ({
    // getRepetitionCount(delightId) {
    //   let count = 0;
    //   for (const v of self.daylights.values()) v.inherits.get(delightId) && count++;
    //   return count;
    // }
  }))
  .actions((self) => {
    // return {
    //   addDaylight(da) {
    //     self.daylights.put(da);
    //   },
    //   addDelight(de) {
    //     self.delights.put(de);
    //   },
    // };
    return {};
  });

/**
 * Mobx Model: Daylight Store
 */
export interface DaylightStore extends Instance<typeof DaylightStoreModel> { }

/**
 * Mobx Snapshot: Daylight Store
 */
export interface DaylightStoreSnapshotOut extends SnapshotOut<typeof DaylightStoreModel> { }
export interface DaylightStoreSnapshotIn extends SnapshotIn<typeof DaylightStoreModel> { }
