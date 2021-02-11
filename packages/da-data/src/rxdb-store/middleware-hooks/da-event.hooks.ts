import { DaEventRxCollection } from "../schemas/schemas";
import { getRxdbCollection, RxStoreCollectionName } from "../store";

/**
 * example add hook action for da-event collection
 *
 * @export
 */
export default function () {
  const collectionName = RxStoreCollectionName.DA_EVENT;
  console.info(`adding collection middleware hooks..., ${collectionName}`);

  const collection = getRxdbCollection<DaEventRxCollection>(
    RxStoreCollectionName.DA_EVENT,
  );

  // example
  // collection.preInsert(async (rawDoc: WorkspaceTreeNodeDocType) => {
  //   if (rawDoc.type === WorkspaceTreeNodeType.FOLDER) return;
  //   try {
  //     const workspaceDoc = await workspacesCollection.insert({});
  //     rawDoc.workspace = workspaceDoc.id;
  //   } catch (error) {
  //     if (error.name === "conflict") {
  //       // eg: uuid duplication (very rare but possible)
  //       // resolve uuid duplication
  //       throw error;
  //     }
  //   }
  // }, false);

  // // remove workspace after workspace tree node
  // collection.preRemove(
  //   async (plainData, doc: WorkspaceTreeNodeDocument) => {
  //     console.log("在preremove");
  //     if (doc.type !== "tree") {
  //       workspacesCollection
  //         .find({
  //           selector: {
  //             id: doc.workspace,
  //           },
  //         })
  //         .remove();
  //     } else if (doc.type === "tree") {
  //       await removeChildre(doc);
  //       async function removeChildre(
  //         node: WorkspaceTreeNodeDocument,
  //       ): Promise<void> {
  //         treeNodesCollection
  //           .find({
  //             selector: {
  //               parent: node.id,
  //             },
  //           })
  //           .$.forEach((doc: WorkspaceTreeNodeDocument[]) => {
  //             doc.forEach(async (ele) => {
  //               if (ele.type == "tree") {
  //                 await removeChildre(ele);
  //               }
  //               ele.remove();
  //             });
  //           });
  //         return;
  //       }
  //     }
  //   },
  //   false,
  // );

  console.info(`finished collection middleware hooks..., ${collectionName}`);
}
