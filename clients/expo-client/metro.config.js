
const { createMetroConfiguration } = require('expo-yarn-workspaces')

/**
 * This config exists to help symlinking other packages in the monorepo to this rn project,
 * see details in ./README.md
 */
const metroConfYarnWokspaces = createMetroConfiguration(__dirname)

// this won't work
// const { mergeConfig } = require("metro-config")
// module.exports = mergeConfig(
//   metroConfYarnWokspaces,
// )

// they won't work
// metroConfYarnWokspaces.resolver.allowOptionalDependencies = true
// metroConfYarnWokspaces.transformer.allowOptionalDependencies = true

module.exports = {
  ...metroConfYarnWokspaces
}
