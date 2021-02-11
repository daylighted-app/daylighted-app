import merge from "lodash/merge";
import { RxAttachment, RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { DaStoryPreferencesScope } from "../../enums/da-story-prefs-scope.enum";
import {
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaBaseSchemaDaBaseRxDocTypeWithUserId,
  DaTypeOmitBase,
} from "./da-base.schema";

/**
 * typeof RxDB Document: daylightful story preferences
 *
 * @export
 * @class DaStoryPrefsRxDocType
 * @extends {DaBaseRxDocTypeDaBaseRxDocTypeWithUserId}
 */
export class DaStoryPrefsRxDocType extends DaBaseRxDocTypeDaBaseRxDocTypeWithUserId {
  scope: DaStoryPreferencesScope;
}

type SchemaType = RxJsonSchema<DaStoryPrefsRxDocType>;
type PartialSchemaType = RxJsonSchema<DaTypeOmitBase<DaStoryPrefsRxDocType>>;
export const DaStoryPrefsRxSchema: SchemaType = merge(DaBaseSchemaDaBaseRxDocTypeWithUserId, <
  PartialSchemaType
>{
  title: "da story preferences schema",
  description: "preferences of a daylightful story",
  version: 0,
  properties: {
    scope: {
      type: "string",
      default: DaStoryPreferencesScope.STORY,
      enum: Object.values(DaStoryPreferencesScope),
    },
  },
});

// types
// =======================================

/**
 * ORM Methods, document-wise
 *
 * @export
 * @interface DaStoryPrefsRxDocMethods
 */
export interface DaStoryPrefsRxDocMethods {
  getId: () => Promise<string>;
}

/**
 * Static Methods, collection-wise
 *
 * @export
 * @interface DaStoryPrefsRxCollectionMethods
 */
export interface DaStoryPrefsRxCollectionMethods {
  count: () => Promise<number>;
}

export type DaStoryPrefsRxDoc = RxDocument<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaStoryPrefsRxDocMethods
>;
export type DaStoryPrefsRxAttachment = RxAttachment<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaStoryPrefsRxDocMethods
>;
export type DaStoryPrefsRxCollection = RxCollection<
  DaBaseRxDocTypeDaBaseRxDocTypeWithUserId,
  DaStoryPrefsRxCollectionMethods
>;
