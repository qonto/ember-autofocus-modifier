module.exports = {
  plugins: {
    "@release-it/conventional-changelog": {
      preset: {
        name: "angular",
      },
      infile: "CHANGELOG.md",
    },
    "@release-it-plugins/workspaces": true,
  },
  git: {
    tagName: "v${version}",
    commitMessage: "chore: release v${version}",
  },
  github: {
    release: true,
  },
  npm: false,
  hooks: {
    "after:bump": "pnpm i --frozen-lockfile=false",
  },
};
