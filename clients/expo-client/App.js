// It is possible to have React Native load our main module first, but we'd have to
// change that in both AppDelegate.m and MainApplication.java.  This would have the
// side effect of breaking other tooling like mobile-center and react-native-rename.
//
// It's easier just to leave it here.
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
import { AppRegistry } from "react-native"
import { expo as appMetadata } from "./app.json"
import App from "./app/app"

AppRegistry.registerComponent(appMetadata.name, () => App)
export default App
