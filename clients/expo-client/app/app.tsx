import { MobxRootState, MobxRootStateProvider } from "@daylighted-app/data/dist/mst"
import { NavigationContainerRef } from "@react-navigation/native"
import React, { useEffect, useRef, useState } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import "./i18n"
import {
  canExit, RootNavigator,
  setRootNavigation, useBackButtonHandler,
  useNavigationPersistence
} from "./navigation"
import { asyncStorageProxy } from "./data/async-store"
import { setupRootState } from "./data/setup-root-state"
import { initFonts } from "./theme/fonts" // expo
import "./utils/base64-polyfill.js"
import "./utils/ignore-warnings"

enableScreens()

function App() {
  // navigation
  const navigationRef = useRef<NavigationContainerRef>()
  const [rootState, setRootState] = useState<MobxRootState>(undefined)

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    asyncStorageProxy,
    "NAVIGATION_PERSISTENCE_KEY",
  )

  // Kick off initial async loading actions, like loading fonts and MobxRootState
  useEffect(() => {
    ; (async () => {
      // SplashScreen.preventAutoHideAsync()
      await initFonts()
      await setupRootState().then(setRootState)
      // SplashScreen.hideAsync()
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootState) return null

  // otherwise, we're ready to render the app
  return (
    <ToggleStorybook>
      <MobxRootStateProvider value={rootState}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <RootNavigator
            ref={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </SafeAreaProvider>
      </MobxRootStateProvider>
    </ToggleStorybook>
  )
}

export default App
