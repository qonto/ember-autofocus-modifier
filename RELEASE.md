# Release Process

Releases are mostly automated using
[release-it](https://github.com/release-it/release-it/) and
[conventional-changelog](https://github.com/release-it/conventional-changelog).

## Release

The release process is straightforward:

```sh
pnpm install
```

- Second, ensure that you have obtained a
  [GitHub personal access token][generate-token] with the `repo` scope (no
  other permissions are needed). Make sure the token is available as the
  `GITHUB_AUTH` environment variable.

  For instance:

  ```bash
  export GITHUB_AUTH=abc123def456
  ```

[generate-token]: https://github.com/settings/tokens/new?scopes=repo&description=GITHUB_AUTH+env+variable

- And last (but not least 😁) do your release.

```sh
pnpm run release
```

[release-it](https://github.com/release-it/release-it/) manages the actual
release process. It will prompt you to to choose the version number after which
you will have the chance to hand tweak the changelog to be used (for the
`CHANGELOG.md` and GitHub release), then `release-it` continues on to tagging,
pushing the tag and commits, etc.
