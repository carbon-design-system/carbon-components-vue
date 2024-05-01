set -e
set -x
yarn add-components-exports
yarn build
#yarn build-web-types
yarn pack
rm carbon-vue-*.tgz || true
version=$(jq -r .version package.json)
hash=$(md5 package.tgz|cut -b 28-32)
mv package.tgz carbon-vue-${version}-${hash}.tgz
git checkout src/index.js
