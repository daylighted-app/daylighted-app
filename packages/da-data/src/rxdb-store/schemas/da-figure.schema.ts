import merge from "lodash/merge";
import { RxAttachment, RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { DaItemFigureType } from "../../enums/da-item-figure-type.enum";
import {
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaBaseSchemaDaBaseRxDocTypeWithUserId,
  DaTypeOmitBase,
} from "./da-base.schema";

/**
 * typeof RxDB Document: custom image figure (user uploaded)
 *
 * @export
 * @class DaFigureRxDocType
 * @extends {DaBaseRxDocTypeDaBaseRxDocTypeWithUserId}
 */
export class DaFigureRxDocType extends DaBaseRxDocTypeDaBaseRxDocTypeWithUserId {
  type: DaItemFigureType;
  value: string;
}

type SchemaType = RxJsonSchema<DaFigureRxDocType>;
type PartialSchemaType = RxJsonSchema<DaTypeOmitBase<DaFigureRxDocType>>;
export const daFigureRxSchema: SchemaType = merge(DaBaseSchemaDaBaseRxDocTypeWithUserId, <
  PartialSchemaType
>{
  title: "da figure schema",
  description: "a user uploaded image figure",
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
 * @interface daFigureRxDocMethods
 */
export interface daFigureRxDocMethods {
  getId: () => Promise<string>;
}

/**
 * Static Methods, collection-wise
 *
 * @export
 * @interface daFigureRxCollectionMethods
 */
export interface daFigureRxCollectionMethods {
  count: () => Promise<number>;
}

export type daFigureRxDoc = RxDocument<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  daFigureRxDocMethods
>;
export type daFigureRxAttachment = RxAttachment<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  daFigureRxDocMethods
>;
export type daFigureRxCollection = RxCollection<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  daFigureRxCollectionMethods
>;
