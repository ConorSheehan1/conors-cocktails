## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production
$ yarn build
```

### Testing

```bash
$ yarn test:unit
# TODO: setup e2e tests, run all tests together
```

### Linting

```bash
# check for linting errors
$ yarn lint

# autofix linting errors
$ yarn lintfix
```

### Versioning

```bash
# set version prefix
yarn config set version-tag-prefix "v"

# set version explicitly
yarn version --new-version <version>

# bump minor version
yarn version --minor
```

### Security

```bash
# find issues in dependencies
yarn audit

# update dependencies
yarn upgrade
```

### Adding a cockail
add the following files
1. src/cocktails/$name.md
2. src/.vuepress/public/images/$name

### Adding ingredients
1. add jpg to src/.vuepress/ingredients/name
2. add entry into src/ingredients/README.md
    1. ensure there are 2 spaces after image and links
    2. ensure ingredient is added to frontmatter at top