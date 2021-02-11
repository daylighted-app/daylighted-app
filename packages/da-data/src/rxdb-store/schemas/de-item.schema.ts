import merge from "lodash/merge";
import { RxAttachment, RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { DaItemFigure } from "../../interfaces/da-item-figure";
import { DeItemType } from "../../enums/de-item-type.enum";
import {
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaBaseSchemaDaBaseRxDocTypeWithUserId,
  DaTypeOmitBase,
} from "./da-base.schema";

/**
 * typeof RxDB Document: daylightful event item
 *
 * @export
 * @class DeItemRxDocType
 * @extends {DaBaseRxDocTypeDaBaseRxDocTypeWithUserId}
 */
export class DeItemRxDocType extends DaBaseRxDocTypeDaBaseRxDocTypeWithUserId {
  type: DeItemType;
  eventId: string;
  score: number;
  figure: DaItemFigure;
  comment: string;
  progress: number;
  interval: number;
  intervalStart: number;
}

type SchemaType = RxJsonSchema<DeItemRxDocType>;
type PartialSchemaType = RxJsonSchema<DaTypeOmitBase<DeItemRxDocType>>;
export const DeItemRxSchema: SchemaType = merge(
  DaBaseSchemaDaBaseRxDocTypeWithUserId,
  <PartialSchemaType>{
    title: "de item schema",
    description: "an item of a daylightful event",
    version: 0,
    properties: {
      type: {
        enum: Object.values(DeItemType),
        type: "string",
      },
      eventId: {
        type: "string",
      },
      score: {
        type: "number",
      },
      figure: {
        type: "object",
      },
      comment: {
        type: "string",
      },
      progress: {
        type: "number",
      },
      interval: {
        type: "number",
      },
      intervalStart: {
        type: "number",
      },
    },
  },
);

// types
// =======================================

/**
 * ORM Methods, document-wise
 *
 * @export
 * @interface DeItemRxDocMethods
 */
export interface DeItemRxDocMethods {
  getId: () => Promise<string>;
}

/**
 * Static Methods, collection-wise
 *
 * @export
 * @interface DeItemRxCollectionMethods
 */
export interface DeItemRxCollectionMethods {
  count: () => Promise<number>;
}

export type DeItemRxDoc = RxDocument<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DeItemRxDocMethods
>;
export type DeItemRxAttachment = RxAttachment<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DeItemRxDocMethods
>;
export type DeItemRxCollection = RxCollection<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DeItemRxCollectionMethods
>;
