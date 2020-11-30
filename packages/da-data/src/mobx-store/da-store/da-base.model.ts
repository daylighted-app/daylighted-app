import { types } from "mobx-state-tree";

/**
 * shared props and views for all da-models
 */
export const DaBaseModel = types.model("DaBase", {
  id: types.integer,
  uid: types.integer,
  updatedAt: types.Date,
  createdAt: types.Date,
  _deleted: types.boolean
});
