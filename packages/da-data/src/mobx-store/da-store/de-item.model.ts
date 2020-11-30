import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { DeItemType } from "../../enums/de-item-type.enum";
import { DaBaseModel } from "./da-base.model";

/**
 * Mobx Model: Daylightful Event Item
 * 
 * It's a multi-talent model, some keys won't operate based on item type.
 * 
 * **Normal keys**
 * - `type`: item type
 * - `eid`: the event id this item belongs to
 * - `score`: the score
 * - `figure`: the score
 * **properties item types**
 * - `COMMENT`: comment
 * - `PROGRESS` for a progress
 * - `ITERVAL` for recording time intervals
 * - `ITERVAL_COUNT_UP` for recording time intervals
 * - `INTERVAL_COUNT_DOWN` for setting targets and count down 
 * 
 */
export const DeItemModel = types.compose(
  DaBaseModel,
  types.model({
    type: types.enumeration(Object.values(DeItemType)),
    eid: types.integer,
    score: types.number,
    figure: types.array(types.string),
    comment: types.string,
    progress: types.number,
    interval: types.number,
    intervalStart: types.number,
  })
).views(self => ({
}));

/**
 * Mobx Instance: Daylightful Event Item
 */
export interface DaEvent extends Instance<typeof DeItemModel> { }

/**
 * Mobx Snapshots: Daylightful Event Item
 */
export interface DaEventSnapshotOut extends SnapshotOut<typeof DeItemModel> { }
export interface DaEventSnapshotIn extends SnapshotIn<typeof DeItemModel> { }
