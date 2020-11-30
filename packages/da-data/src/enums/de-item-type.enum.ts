/**
 * Indicates the type of an event item
 *
 * - `COMMENT` for a comment
 * - `PROGRESS` for a progress
 * - `ITERVAL` for recording time intervals
 * - `ITERVAL_COUNT_UP` for recording time intervals
 * - `INTERVAL_COUNT_DOWN` for setting targets and count down
 *
 * @export
 * @enum {string}
 */
export enum DeItemType {
  COMMENT="COMMENT",
  PROGRESS="PROGRESS",
  INTERVAL="INTERVAL",
  INTERVAL_COUNT_DOWN="INTERVAL_COUNT_DOWN",
  INTERVAL_COUNT_UP="INTERVAL_COUNT_UP",
}