/**
 * Indicates the access scope of a daylightful event
 *
 * - `PRIVATE` for creator only
 * - `SHARED` for public access
 * - `ASSIGNED` for assigned users
 * - `GROUP` for group access
 *
 * @export
 * @enum {string}
 */
export enum DaAccessScope {
  PRIVATE="PRIVATE",
  PUBLIC="PUBLIC",
  ASSIGNED="ASSIGNED",
  GROUP="GROUP",
}
