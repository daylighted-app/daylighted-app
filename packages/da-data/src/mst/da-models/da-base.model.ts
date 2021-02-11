import { types } from "mobx-state-tree";

/**
 * shared props and views for all da-models
 */
export const DaBaseModel = types.model("DaBase", {
  id: types.identifier,
  updatedAt: types.Date,
  createdAt: types.Date,
  deleted: types.boolean,
});

/**
 * shared props and views for all da-models
 */
export const DaBaseModelWithUserId = types.model("DaBase", {
  id: types.identifier,
  userId: types.integer,
  updatedAt: types.Date,
  createdAt: types.Date,
  deleted: types.boolean,
});
