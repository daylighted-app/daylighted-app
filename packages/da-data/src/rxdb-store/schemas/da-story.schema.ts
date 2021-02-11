import merge from "lodash/merge";
import { RxAttachment, RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { DaItemFigure } from "../../interfaces/da-item-figure";
import { DaAccessScope } from "../../enums/da-acces-scope.enum";
import {
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaBaseSchemaDaBaseRxDocTypeWithUserId,
  DaTypeOmitBase,
} from "./da-base.schema";

/**
 * typeof RxDB Document: daylightful story
 *
 * @export
 * @class DaStoryRxDocType
 * @extends {DaBaseRxDocTypeDaBaseRxDocTypeWithUserId}
 */
export class DaStoryRxDocType extends DaBaseRxDocTypeDaBaseRxDocTypeWithUserId {
  prefId: string;
  eventPrefId: string;
  name: string;
  figure: DaItemFigure;
  scope: DaAccessScope;
}

type SchemaType = RxJsonSchema<DaStoryRxDocType>;
type PartialSchemaType = RxJsonSchema<DaTypeOmitBase<DaStoryRxDocType>>;
export const DaStoryRxSchema: SchemaType = merge(
  DaBaseSchemaDaBaseRxDocTypeWithUserId,
  <PartialSchemaType>{
    title: "da story schema",
    description: "a daylightful story, a collection of daylight events",
    version: 0,
    properties: {
      prefId: {
        type: "string",
      },
      eventPrefId: {
        type: "string",
      },
      name: {
        type: "string",
      },
      figure: {
        type: "object",
      },
      scope: {
        type: "string",
        default: DaAccessScope.PRIVATE,
        enum: Object.values(DaAccessScope),
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
 * @interface DaStoryRxDocMethods
 */
export interface DaStoryRxDocMethods {
  getId: () => Promise<string>;
}

/**
 * Static Methods, collection-wise
 *
 * @export
 * @interface DaStoryRxCollectionMethods
 */
export interface DaStoryRxCollectionMethods {
  count: () => Promise<number>;
}

export type DaStoryRxDoc = RxDocument<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaStoryRxDocMethods
>;
export type DaStoryRxAttachment = RxAttachment<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaStoryRxDocMethods
>;
export type DaStoryRxCollection = RxCollection<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaStoryRxCollectionMethods
>;
