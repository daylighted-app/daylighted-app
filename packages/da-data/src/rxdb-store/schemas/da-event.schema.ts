import merge from "lodash/merge";
import { RxAttachment, RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { DaAccessScope } from "../../enums/da-acces-scope.enum";
import {
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaBaseSchemaDaBaseRxDocTypeWithUserId,
  DaTypeOmitBase,
} from "./da-base.schema";

// types
// ==============================================================================

/**
 * typeof RxDB Document: daylight event
 *
 * @export
 * @class DaEventRxDocType
 * @extends {DaBaseRxDocTypeDaBaseRxDocTypeWithUserId}
 */
export class DaEventRxDocType extends DaBaseRxDocTypeDaBaseRxDocTypeWithUserId {
  prefId: string;
  storyId: string;
  scope: DaAccessScope;
}

/**
 * ORM Methods, document-wise
 *
 * @export
 * @interface DaEventRxDocMethods
 */
export interface DaEventRxDocMethods {
  getId: () => Promise<string>;
}

/**
 * Static Methods, collection-wise
 *
 * @export
 * @interface DaEventRxCollectionMethods
 */
export interface DaEventRxCollectionMethods {
  count: () => Promise<number>;
}

export type DaEventRxDoc = RxDocument<DaEventRxDocType, DaEventRxDocMethods>;
export type DaEventRxAttachment = RxAttachment<
  DaEventRxDocType,
  DaEventRxDocMethods
>;
export type DaEventRxCollection = RxCollection<
  DaEventRxDocType,
  DaEventRxCollectionMethods
>;

// schema
// ==============================================================================
type SchemaType = RxJsonSchema<DaEventRxDocType>;
type PartialSchemaType = RxJsonSchema<DaTypeOmitBase<DaEventRxDocType>>;
export const DaEventRxSchema: SchemaType = merge(
  DaBaseSchemaDaBaseRxDocTypeWithUserId,
  <PartialSchemaType>{
    title: "da event schema",
    description: "a daylight event",
    version: 0,
    properties: {
      prefId: {
        type: "string",
        default: null,
      },
      storyId: {
        type: "string",
        default: null,
      },
      scope: {
        type: "string",
        default: null,
      },
    },
  },
);
