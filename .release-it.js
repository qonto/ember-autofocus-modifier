module.exports = {
  git: {
    tagName: 'v${version}',
    changelog: 'lerna-changelog',
  },
  hooks: {
    'after:bump': 'lerna-changelog >> CHANGELOG.md',
  },
  npm: {
    publish: true,
    publishPath: '.',
  },
  github: {
    release: true,
    releaseName: 'Release ${version}',
    tokenRef: 'GITHUB_AUTH',
  },
};
