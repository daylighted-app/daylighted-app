import { getRxdbStore, RxStoreCollectionName } from "../store";
import daEventPrefsCreator from "./da-event-prefs.creator";
import daEventCreator from "./da-event.creator";
import daFigureAppCreator from "./da-figure-preset.creator";
import daFigureCreator from "./da-figure.creator";
import daStoryPrefsCreator from "./da-story-prefs.creator";
import daStoryCreator from "./da-story.creator";
import deItemCreator from "./de-item.creator";

/**
 * init rxdb collections
 *
 * @export
 */
export async function addRxdbCollections() {
  const store = getRxdbStore();

  console.log(`initilizing collections...`);
  await store.addCollections({
    [RxStoreCollectionName.DA_EVENT]: daEventCreator,
    [RxStoreCollectionName.DA_EVENT_PREFS]: daEventPrefsCreator,
    [RxStoreCollectionName.DA_STORY]: daStoryCreator,
    [RxStoreCollectionName.DA_STORY_PREFS]: daStoryPrefsCreator,
    [RxStoreCollectionName.DE_ITEM]: deItemCreator,
    [RxStoreCollectionName.DA_FIGURE]: daFigureCreator,
    [RxStoreCollectionName.DA_FIGURE_APP]: daFigureAppCreator,
  });
  console.log(`finished initilizing collections.`);
}
