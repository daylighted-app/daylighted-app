import { RxGraphQLReplicationQueryBuilder } from "rxdb";
import { RxStoreCollectionName } from "../store";
import { getQueryBuilderDaEventPrefs } from "./da-event-prefs.builder";
import { getQueryBuilderDaEvent } from "./da-event.builder";
import { getQueryBuilderDaFigurePreset } from "./da-figure-preset.builder";
import { getQueryBuilderDaFigure } from "./da-figure.builder";
import { getQueryBuilderDaStoryPrefs } from "./da-story-prefs.builder";
import { getQueryBuilderDaStory } from "./da-story.builder";
import { getQueryBuilderDeItem } from "./de-item.builder";

const factoryDict = {
  [RxStoreCollectionName.DA_EVENT]: getQueryBuilderDaEvent,
  [RxStoreCollectionName.DA_EVENT_PREFS]: getQueryBuilderDaEventPrefs,
  [RxStoreCollectionName.DA_STORY]: getQueryBuilderDaStory,
  [RxStoreCollectionName.DA_STORY_PREFS]: getQueryBuilderDaStoryPrefs,
  [RxStoreCollectionName.DE_ITEM]: getQueryBuilderDeItem,
  [RxStoreCollectionName.DA_FIGURE]: getQueryBuilderDaFigure,
  [RxStoreCollectionName.DA_FIGURE_APP]: getQueryBuilderDaFigurePreset,
};

/**
 * type of per-collection GraphQL reqplication query builder factory
 */
export type RxGraphQLReplicationQueryBuilderFactory = (
  userId: string,
  direction: "push" | "pull",
) => RxGraphQLReplicationQueryBuilder;

/**
 * universal pull query builder factory
 *
 * @export
 * @param {string} userId
 * @param {RxStoreCollectionName} collectionName
 * @returns {RxGraphQLReplicationQueryBuilder}
 */
export function getPullQueryBuilder(
  userId: string,
  collectionName: RxStoreCollectionName,
): RxGraphQLReplicationQueryBuilder {
  return factoryDict[collectionName](userId, "pull");
}

/**
 * universal push query builder factory
 *
 * @export
 * @param {string} userId
 * @param {RxStoreCollectionName} collectionName
 * @returns {RxGraphQLReplicationQueryBuilder}
 */
export function getPushQueryBuilder(
  userId: string,
  collectionName: RxStoreCollectionName,
): RxGraphQLReplicationQueryBuilder {
  return factoryDict[collectionName](userId, "push");
}
