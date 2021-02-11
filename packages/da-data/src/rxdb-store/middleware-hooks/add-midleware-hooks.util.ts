import daEventHooks from "./da-event.hooks";

// https://rxdb.info/middleware.html
/**
 * add middleware hooks per rxdb collection
 *
 * @export
 */
export function addRxdbMiddlewareHooks() {
  console.log("adding collection middleware hooks...");

  daEventHooks();

  console.log("finished adding collection middleware hooks.");
}
