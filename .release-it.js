module.exports = {
  plugins: {
    "@release-it-plugins/lerna-changelog": {
      infile: "CHANGELOG.md",
      launchEditor: false,
    },
    "@release-it-plugins/workspaces": true,
  },
  git: {
    tagName: "v${version}",
  },
  github: {
    release: true,
    tokenRef: "GITHUB_AUTH",
  },
  npm: false,
};
