import { RxJsonSchema } from "rxdb";

/**
 * typeof RxDB Document: shared base type
 *
 * @export
 * @class DaBaseRxDocType
 */
export class DaBaseRxDocType {
  id: string;
  updatedAt: string;
  createdAt: string;
  deleted: boolean;
}

type SchemaType = RxJsonSchema<DaBaseRxDocType>;
export const DaBaseSchema: SchemaType = {
  title: "da shared schema", // should be overrided
  description: "shared schema for daylight objects", // should be overrided
  version: 0, // must be overrided
  type: "object", // can be overrided
  keyCompression: true, // can be overrided
  properties: {
    id: {
      type: "string",
      uniqueItems: true,
    },
    createdAt: {
      format: "date-time",
      type: "string",
      // default: Date.now()
    },
    updatedAt: {
      format: "date-time",
      type: "string",
      // default: Date.now()
    },
    deleted: {
      type: "boolean",
      default: false,
    },
  },
  indexes: ["id"],
  attachments: {
    encrypted: true,
  },
};

// With UserId
// ===========================================================================

/**
 * typeof RxDB Document: shared base type, with user id
 *
 * @export
 * @class DaBaseRxDocType
 */
export class DaBaseRxDocTypeDaBaseRxDocTypeWithUserId {
  id: string;
  userId: number;
  updatedAt: string;
  createdAt: string;
  deleted: boolean;
}

type SchemaTypeDaBaseRxDocTypeWithUserId = RxJsonSchema<DaBaseRxDocTypeDaBaseRxDocTypeWithUserId>;
export const DaBaseSchemaDaBaseRxDocTypeWithUserId: SchemaTypeDaBaseRxDocTypeWithUserId = {
  title: "da shared schema", // should be overrided
  description: "shared schema for daylight objects", // should be overrided
  version: 0, // must be overrided
  type: "object", // can be overrided
  keyCompression: true, // can be overrided
  properties: {
    id: {
      type: "string",
      uniqueItems: true,
    },
    userId: {
      type: "number",
    },
    createdAt: {
      format: "date-time",
      type: "string",
    },
    updatedAt: {
      format: "date-time",
      type: "string",
    },
    deleted: {
      type: "boolean",
      default: false,
    },
  },
  indexes: ["id"],
  required: ["userId"],
  attachments: {
    encrypted: true,
  },
};

/**
 * util
 */
export type DaTypeOmitBase<T> = Omit<
  T,
  "id" | "userId" | "updatedAt" | "createdAt" | "deleted"
>;
