import merge from "lodash/merge";
import { RxAttachment, RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { DaEventPreferencesScope } from "../../enums/da-event-prefs-scope.enum";
import {
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaBaseSchemaDaBaseRxDocTypeWithUserId,
  DaTypeOmitBase,
} from "./da-base.schema";

/**
 * typeof RxDB Document: daylight event preferences
 *
 * @export
 * @class DaEventPrefsRxDocType
 * @extends {DaBaseRxDocTypeDaBaseRxDocTypeWithUserId}
 */
export class DaEventPrefsRxDocType extends DaBaseRxDocTypeDaBaseRxDocTypeWithUserId {
  scoreProgress: number;
  scoreComment: number;
  scoreInterval: number;
  progressTotal: number;
  scope: DaEventPreferencesScope;
}

type SchemaType = RxJsonSchema<DaEventPrefsRxDocType>;
type PartialSchemaType = RxJsonSchema<DaTypeOmitBase<DaEventPrefsRxDocType>>;
export const DaEventPrefsRxSchema: SchemaType = merge(DaBaseSchemaDaBaseRxDocTypeWithUserId, <
  PartialSchemaType
>{
  title: "da event schema",
  description: "preferences on a daylight event",
  version: 0,
  properties: {
    scoreProgress: {
      type: "number",
      default: null,
    },
    scoreComment: {
      type: "number",
      default: null,
    },
    scoreInterval: {
      type: "number",
      default: null,
    },
    progressTotal: {
      type: "number",
      default: 100,
    },
    scope: {
      type: "string",
      default: DaEventPreferencesScope.EVENT,
      enum: Object.values(DaEventPreferencesScope),
    },
  },
});

// types
// =======================================

/**
 * ORM Methods, document-wise
 *
 * @export
 * @interface DaEventPrefsRxDocMethods
 */
export interface DaEventPrefsRxDocMethods {
  getId: () => Promise<string>;
}

/**
 * Static Methods, collection-wise
 *
 * @export
 * @interface DaEventPrefsRxCollectionMethods
 */
export interface DaEventPrefsRxCollectionMethods {
  count: () => Promise<number>;
}

export type DaEventPrefsRxDoc = RxDocument<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaEventPrefsRxDocMethods
>;
export type DaEventPrefsRxAttachment = RxAttachment<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaEventPrefsRxDocMethods
>;
export type DaEventPrefsRxCollection = RxCollection<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaEventPrefsRxCollectionMethods
>;
