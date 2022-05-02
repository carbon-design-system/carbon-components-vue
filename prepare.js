// Install husky githooks
// https://github.com/typicode/husky
const isCi = process.env.CI !== undefined;
if (!isCi) {
  require('husky').install();
}
