// Install husky githooks
// https://github.com/typicode/husky
const isCi = process.env.CI !== undefined;
if (!isCi) {
  try {
    require('husky').install();
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
  }
}
