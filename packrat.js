const PackageJson = require('@npmcli/package-json');

async function prepack() {
  const pkgJson = await PackageJson.load('./');
  pkgJson.content.scripts['dev_postinstall'] =
    pkgJson.content.scripts['postinstall'];
  pkgJson.content.scripts['postinstall'] =
    pkgJson.content.scripts['pack_postinstall'];
  pkgJson.content.scripts['pack_postinstall'] = 'echo removed by packrat.js';
  await pkgJson.save();
  // eslint-disable-next-line no-console
  console.log('scripts:', {
    postinstall: pkgJson.content.scripts['postinstall'],
    dev_postinstall: pkgJson.content.scripts['dev_postinstall'],
  });
}
async function postpack() {
  const pkgJson = await PackageJson.load('./');
  pkgJson.content.scripts['pack_postinstall'] =
    pkgJson.content.scripts['postinstall'];
  pkgJson.content.scripts['postinstall'] =
    pkgJson.content.scripts['dev_postinstall'];
  delete pkgJson.content.scripts['dev_postinstall'];
  await pkgJson.save();
  // eslint-disable-next-line no-console
  console.log('scripts:', {
    postinstall: pkgJson.content.scripts['postinstall'],
    pack_postinstall: pkgJson.content.scripts['pack_postinstall'],
  });
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
  console.error('\t\trename postinstall to dev_postinstall');
  console.error('\t\trename pack_postinstall to postinstall');
  console.error('\t--disable  Disable pack (production) postinstall hook');
  console.error('\t\trename postinstall to pack_postinstall');
  console.error('\t\trename dev_postinstall to postinstall');
  process.exit(1);
}

if (process.argv[2] === '--disable') {
  // eslint-disable-next-line no-console
  prepack().then(() => console.log('updated package.json'));
} else if (process.argv[2] === '--enable') {
  // eslint-disable-next-line no-console
  postpack().then(() => console.log('updated package.json'));
} else console.error('unknown argument', process.argv[2]);
