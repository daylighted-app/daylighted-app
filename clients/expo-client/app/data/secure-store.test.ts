import * as SecureStore from "expo-secure-store"
import { secureStorageProxy } from "./secure-store"

const { load, loadString, save, saveString, remove } = secureStorageProxy

// expo
jest.mock("react-native", () => ({
  SecureStore: {
    getItemAsync: jest.fn(),
    setItemAsync: jest.fn(),
    removeItem: jest.fn(),
    deleteItemAsync: jest.fn(),
  },
}))

// fixtures
const VALUE_OBJECT = { x: 1 }
const VALUE_STRING = JSON.stringify(VALUE_OBJECT)

beforeEach(() =>
  (SecureStore.getItemAsync as jest.Mock).mockReturnValue(Promise.resolve(VALUE_STRING)),
)
afterEach(() => jest.clearAllMocks())

test("load", async () => {
  const value = await load("something")
  expect(value).toEqual(JSON.parse(VALUE_STRING))
})

test("loadString", async () => {
  const value = await loadString("something")
  expect(value).toEqual(VALUE_STRING)
})

test("save", async () => {
  await save("something", VALUE_OBJECT)
  expect(SecureStore.setItemAsync).toHaveBeenCalledWith("something", VALUE_STRING)
})

test("saveString", async () => {
  await saveString("something", VALUE_STRING)
  expect(SecureStore.setItemAsync).toHaveBeenCalledWith("something", VALUE_STRING)
})

test("remove", async () => {
  await remove("something")
  expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith("something")
})
