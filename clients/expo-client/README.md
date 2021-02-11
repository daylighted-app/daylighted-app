## Issues related to the Metro bundler

**Symlinking**
There have been this symlinking [issue](https://github.com/facebook/metro/issues/1) for metro bundler. Luckily we have [expo-yarn-workspaces](https://github.com/expo/expo/tree/master/packages/expo-yarn-workspaces) that fixes [it](https://github.com/expo/expo/pull/11456).

In case when there are changes in symliked package(s), add `--clear` option while starting the project to avoid using cached stuff.

**Ignoring optional dependencies**
To ignore some optional dependencies (like a node packge) in react-native environment, see [optional dependency support](https://github.com/facebook/metro/pull/511).

But the above method won't work, maybe because in my case (rxdb adapter and it's plugins) the optional deps are from a symlinked packages, gonna skip this by avoiding platform denpendant packages, let the invoker decide what to use.

## SQLite impl

Use expo managed `expo-sqlite` instead of `react-native-sqlite-2` which needs custom install. They expose identical APIs

## Secure values are stored in secure store

## MISC

[unable to resolve peerDependencies in a symlinked package](https://github.com/facebook/metro/issues/7), skipped.
