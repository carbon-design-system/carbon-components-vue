/* eslint no-console: 0 */

const PackageJson = require('@npmcli/package-json');

const devPostinstall = 'dev_setup';
const packPostinstall = 'prod_setup';

async function prepack() {
  const pkgJson = await PackageJson.load('./');
  pkgJson.content['packrat'][devPostinstall] =
    pkgJson.content.scripts['postinstall'];
  pkgJson.content.scripts['postinstall'] =
    pkgJson.content['packrat'][packPostinstall];
  await pkgJson.save();
  console.log('postinstall:', pkgJson.content.scripts['postinstall']);
  console.log(pkgJson.content['packrat']);
}
async function postpack() {
  const pkgJson = await PackageJson.load('./');
  pkgJson.content.scripts['postinstall'] =
    pkgJson.content['packrat'][devPostinstall];
  delete pkgJson.content['packrat'][devPostinstall];
  await pkgJson.save();
  console.log('postinstall:', pkgJson.content.scripts['postinstall']);
  console.log(pkgJson.content['packrat']);
}

if (process.argv.length !== 3) {
  console.error(
    'The pinst package not working for us anymore. We need two different postinstall hooks.'
  );
  console.error(
    '1. postinstall that runs git pre-commit hooks - this is dev only'
  );
  console.error('2. postinstall that runs production hooks like ibmtelemetry');
  console.error('This script toggles between the 2');
  console.error('usage: node packrat.js');
  console.error('Options');
  console.error('\t--enable   Enable pack (production) postinstall hook');
  console.error(`\t\trename postinstall to ${devPostinstall}`);
  console.error(`\t\trename ${packPostinstall} to postinstall`);
  console.error('\t--disable  Disable pack (production) postinstall hook');
  console.error(`\t\trename postinstall to ${packPostinstall}`);
  console.error(`\t\trename ${devPostinstall} to postinstall`);
  process.exit(1);
}

if (process.argv[2] === '--disable') {
  prepack().then(() => console.log('updated package.json'));
} else if (process.argv[2] === '--enable') {
  postpack().then(() => console.log('updated package.json'));
} else console.error('unknown argument', process.argv[2]);
