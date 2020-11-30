import * as Localization from "expo-localization"
import i18n from "i18n-js"

const en = require("./en")
const es = require("./es")
const zh = require("./zh")
const ja = require("./ja")

i18n.fallbacks = true
i18n.translations = { en, es, zh, ja }

i18n.locale = Localization.locale || "en"
