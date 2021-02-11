import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { DaItemFigureType } from "../../enums/da-item-figure-type.enum";
import { DaBaseModelWithUserId } from "./da-base.model";

/**
 * Mobx Model: User uploaded image figure
 */
export const DaFigureModel = types
  .compose(
    DaBaseModelWithUserId,
    types.model({
      type: types.enumeration(Object.values(DaItemFigureType)),
      value: types.string,
    }),
  )
  .views((self) => ({}));

/**
 * Mobx Instance: User uploaded image figure
 */
export interface DaFigure extends Instance<typeof DaFigureModel> {}

/**
 * Mobx Snapshots: User uploaded image figure
 */
export interface DaFigureSnapshotOut
  extends SnapshotOut<typeof DaFigureModel> {}
export interface DaFigureSnapshotIn extends SnapshotIn<typeof DaFigureModel> {}
