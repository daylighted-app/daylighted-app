import { createContext, useContext } from "react";
import { MobxRootState } from "./root-state.model";

/**
 * Create a context we can use to
 * - Provide access to our stores from our root component
 * - Consume stores in our screens (or other components, though it's
 *   preferable to just connect screens)
 */
const MobxRootStateContext = createContext<MobxRootState>({} as MobxRootState);

/**
 * The provider our root component will use to expose the root store
 */
export const MobxRootStateProvider = MobxRootStateContext.Provider;

/**
 * A hook that screens can use to gain access to our stores, with
 * `const { someStore, someOtherStore } = useMobxStates()`,
 * or less likely: `const rootStore = useMobxStates()`
 */
export const useMobxStates = () => useContext(MobxRootStateContext);
