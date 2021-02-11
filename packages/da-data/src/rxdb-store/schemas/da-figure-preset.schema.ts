import merge from "lodash/merge";
import { RxAttachment, RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { DaItemFigureType } from "../../enums/da-item-figure-type.enum";
import {
  DaBaseRxDocType,
  DaBaseSchema,
  DaTypeOmitBase,
} from "./da-base.schema";

/**
 * typeof RxDB Document: apps's preset image figure
 *
 * @export
 * @class DaFigurePresetRxDocType
 * @extends {DaBaseRxDocType}
 */
export class DaFigurePresetRxDocType extends DaBaseRxDocType {
  type: DaItemFigureType;
  value: string;
}

type SchemaType = RxJsonSchema<DaFigurePresetRxDocType>;
type PartialSchemaType = RxJsonSchema<DaTypeOmitBase<DaFigurePresetRxDocType>>;
export const DaFigurePresetRxSchema: SchemaType = merge(DaBaseSchema, <
  PartialSchemaType
>{
  title: "da figure schema",
  description: "an app preset image figure",
  version: 0,
  properties: {
    type: {
      type: "string",
      default: DaItemFigureType.BASE64,
      enum: Object.values(DaItemFigureType),
    },
    value: {
      type: "string",
      default: null,
    },
  },
});

// types
// =======================================

/**
 * ORM Methods, document-wise
 *
 * @export
 * @interface DaFigurePresetRxDocMethods
 */
export interface DaFigurePresetRxDocMethods {
  getId: () => Promise<string>;
}

/**
 * Static Methods, collection-wise
 *
 * @export
 * @interface DaFigurePresetRxCollectionMethods
 */
export interface DaFigurePresetRxCollectionMethods {
  count: () => Promise<number>;
}

export type DaFigurePresetRxDoc = RxDocument<
  DaBaseRxDocType,
  DaFigurePresetRxDocMethods
>;
export type DaFigurePresetRxAttachment = RxAttachment<
  DaBaseRxDocType,
  DaFigurePresetRxDocMethods
>;
export type DaFigurePresetRxCollection = RxCollection<
  DaBaseRxDocType,
  DaFigurePresetRxCollectionMethods
>;
