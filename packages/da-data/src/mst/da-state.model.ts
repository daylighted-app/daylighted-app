import {
  flow,
  getEnv,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree";
import { initRxdbStore } from "src/rxdb-store";
import { DaEventPrefsModel } from "./da-models/da-event-prefs.model";
import { DaEventModel } from "./da-models/da-event.model";
import { DaFigurePresetModel } from "./da-models/da-figure-preset.model";
import { DaFigureModel } from "./da-models/da-figure.model";
import { DaStoryPrefsModel } from "./da-models/da-story-prefs.model";
import { DaStoryModel } from "./da-models/da-story.model";
import { DeItemModel } from "./da-models/de-item.model";
import { MobxEnvironment } from "./setup-root-state";

/**
 * Mobx Model: Daylight State Domain
 */
export const DaStateModel = types
  .model("DaState")
  .props({
    isLoading: true,
    globalPrefs: types.model({
      story: types.maybe(types.reference(DaStoryPrefsModel)),
      event: types.maybe(types.reference(DaEventPrefsModel)),
    }),
    stories: types.map(DaStoryModel),
    events: types.map(DaEventModel),
    eventItems: types.map(DeItemModel),
    figures: types.map(DaFigureModel),
    presetFigures: types.map(DaFigurePresetModel),
  })
  .views((self) => ({
    // getRepetitionCount(delightId) {
    //   let count = 0;
    //   for (const v of self.daylights.values()) v.inherits.get(delightId) && count++;
    //   return count;
    // }
  }))
  .actions((self) => ({
    init: flow(function* (userId: string) {
      const { rxdbOpts } = getEnv<MobxEnvironment>(self);
      // self.state = "pending";
      try {
        // ... yield can be used in async/await style
        yield initRxdbStore(rxdbOpts);
      } catch (error) {
        // ... including try/catch error handling
        console.error("Failed to init", error);
        // self.state = "error";
      }
    }),
    // return {
    //   addDaylight(da) {
    //     self.daylights.put(da);
    //   },
    //   addDelight(de) {
    //     self.delights.put(de);
    //   },
    // };
  }));

/**
 * Mobx Model: Daylight State
 */
export interface DaState extends Instance<typeof DaStateModel> {}

/**
 * Mobx Snapshot: Daylight State
 */
export interface DaStateSnapshotOut extends SnapshotOut<typeof DaStateModel> {}
export interface DaStateSnapshotIn extends SnapshotIn<typeof DaStateModel> {}
