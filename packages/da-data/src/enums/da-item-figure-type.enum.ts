/**
 * The type of an daylight item image figure
 * 
 * - `LINK` for external link, or an object linkg
 * - `BINARY` for bin data
 * - `BASE64` for base64 string
 * - `EMOJI` for emoji key
 *
 * @export
 * @enum {number}
 */
export enum DaItemFigureType {
  LINK="LINK",
  BINARY="BINARY",
  BASE64="BASE64",
  EMOJI="EMOJI"
}