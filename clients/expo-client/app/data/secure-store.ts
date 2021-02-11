import { KeyValueStoreImpl } from "@daylighted-app/data/dist/kv-store"
import * as SecureStore from "expo-secure-store"

export const secureStorageProxy = new KeyValueStoreImpl(SecureStore, {
  getItem: "getItemAsync",
  setItem: "setItemAsync",
  deleteItem: "deleteItemAsync",
})
