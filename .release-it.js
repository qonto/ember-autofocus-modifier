
module.exports = {
  git: {
    tagName: 'v${version}',
    changelog: 'yarn lerna-changelog',
  },
  hooks: {
    'after:bump': 'yarn lerna-changelog',
  },
  npm: {
    publish: true,
    publishPath: '.',
  },
  github: {
    release: true,
    releaseName: 'Release ${version}',
    tokenRef: 'GITHUB_TOKEN',
  },
};
