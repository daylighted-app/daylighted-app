import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"

export const initFonts = async () => {
  // Refer to ./assets/fonts/custom-fonts.md for instructions.
  // ...
  // Welcome back! Just uncomment this and replace/append with your font file names!
  // ⬇
  // await Font.loadAsync({
  //   Montserrat: require("./Montserrat-Regular.ttf"),
  //   "Montserrat-Regular": require("./Montserrat-Regular.ttf"),
  // })
  // Load fonts
  await Font.loadAsync({
    ...Ionicons.font,
    "space-mono": require("./SpaceMono-Regular.ttf"),
  })
}
