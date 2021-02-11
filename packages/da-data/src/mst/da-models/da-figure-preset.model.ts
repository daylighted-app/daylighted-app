import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { DaItemFigureType } from "../../enums/da-item-figure-type.enum";
import { DaBaseModel } from "./da-base.model";

/**
 * Mobx Model: App preset image figure
 */
export const DaFigurePresetModel = types
  .compose(
    DaBaseModel,
    types.model({
      type: types.enumeration(Object.values(DaItemFigureType)),
      value: types.string,
    }),
  )
  .views((self) => ({}));

/**
 * Mobx Instance: App preset image figure
 */
export interface DaFigure extends Instance<typeof DaFigurePresetModel> {}

/**
 * Mobx Snapshots: App preset image figure
 */
export interface DaFigureSnapshotOut
  extends SnapshotOut<typeof DaFigurePresetModel> {}
export interface DaFigureSnapshotIn
  extends SnapshotIn<typeof DaFigurePresetModel> {}
