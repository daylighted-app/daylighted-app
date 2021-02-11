import { setupMobxRootState } from "@daylighted-app/data/dist/mst"
import { createMobxEnvironment } from "./environment"

export async function setupRootState() {
  const mobxEnv = await createMobxEnvironment()
  return await setupMobxRootState({
    env: mobxEnv,
    onError: (e) => {
      __DEV__ && console.tron.error(e.message, null)
    },
    onSuccess: (...args) => {
      mobxEnv.reactotron.setRootStore(...args)
    },
  })
}
