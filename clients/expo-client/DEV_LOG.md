lottie-react-native
https://github.com/wix/react-native-calendars
https://github.com/react-native-svg/react-native-svg
https://blog.logrocket.com/redux-vs-mobx/

# Issues and resolutions

## rxdb installation failure with yarn2
https://github.com/pubkey/rxdb/issues/2098
fix
add resolution key in the project root manifest file
```json
{
  "resolutions": {
    "es3ify": "0.2.2"
  }
}
```

## should i ignore strange folders created by yarn v2
https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored
