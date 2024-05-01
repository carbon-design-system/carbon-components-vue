/**
 * This script aims to add named exports to index.js file,
 * which will persist Vue2 solution to import selected components from the @carbon/vue package
 * instead of installing all components
 */

const fs = require('fs');
const path = require('path');

const NEW_LINE_ENTITY = '\n';
const COMPONENTS_PATH = path.join(__dirname, './src/components/');
const FILE_ENCODING = 'utf8';
const INDEX_FILE_PATH = path.join(__dirname, './src/index.js');

/**
 * regex from index.js extended by: not starting from underscore
 * It matches file names that:
 *  - do not start from underscore
 *  - do not contain '.stories.vue', '.test.vue', '.spec.vue' in it
 *  - ends with .vue extension
 */
const VUE_COMPONENT_FILENAME_REGEX =
  /^[^_](?!.*(?:\/_|\.stories\.vue|\.test\.vue|\.spec\.vue)).*\.vue$/;

const NON_CHECK_PATHS = /(?:\/|\\)__test__/;
const FORBIDDEN_COMPONENT_NAME_CHARACTERS_REGEX = /[_-]/g;
let componentsExports = [];

function addNamedComponentExports(dir) {
  readFilesFromPath(dir);

  const indexFileContent = fs.readFileSync(INDEX_FILE_PATH, FILE_ENCODING);
  const exportsContent = componentsExports.join(NEW_LINE_ENTITY);
  const fileContentToSave = indexFileContent + exportsContent + NEW_LINE_ENTITY;

  if (exportsWereAddedToIndex(indexFileContent, exportsContent)) return;

  fs.writeFileSync(INDEX_FILE_PATH, fileContentToSave, FILE_ENCODING);
}

function exportsWereAddedToIndex(indexFileContent, exportsContent) {
  return indexFileContent.includes(exportsContent);
}

function readFilesFromPath(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach(itemName => {
    const itemPath = path.join(dirPath, itemName);
    const itemPathMetaData = fs.statSync(itemPath);
    const isDirectory = itemPathMetaData.isDirectory();

    // exclude NON_CHECK_PATHS paths to not to lookup for .vue files inside of them
    if (NON_CHECK_PATHS.test(itemPath)) return;
    if (isDirectory) {
      readFilesFromPath(itemPath);
      return;
    }

    if (!isVueComponentFile(itemName)) return;

    const { componentExportChunk, exportPathChunk } =
      getFileExportStatement(itemPath);

    if (
      !componentExportChunk ||
      !exportPathChunk ||
      isComponentExported(componentsExports, componentExportChunk)
    ) {
      return;
    }

    componentsExports.push(`${componentExportChunk} ${exportPathChunk}`);
  });
}

function isVueComponentFile(fileName) {
  return VUE_COMPONENT_FILENAME_REGEX.test(fileName);
}

function getFileExportStatement(filePath) {
  const fileName = getFileNameWithoutExtension(filePath);
  const fileNameFormatted = formatComponentNameForExport(fileName);
  const filePathRelativeToIndex = convertToImportPathRelativeToIndex(filePath);
  if (!filePathRelativeToIndex || !fileNameFormatted) return '';
  const componentExportChunk = `export { default as ${fileNameFormatted} }`;
  const exportPathChunk = `from '${filePathRelativeToIndex}';`;
  return {
    componentExportChunk,
    exportPathChunk,
  };
}

function getFileNameWithoutExtension(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

function formatComponentNameForExport(fileName) {
  // remove problematic component names characters
  // example 1: CvToggle-Skeleton becomes CvToggleSkeleton
  // example 2: _CvAccordionItemSkeleton becomes CvAccordionItemSkeleton
  return fileName.replace(FORBIDDEN_COMPONENT_NAME_CHARACTERS_REGEX, '');
}

function convertToImportPathRelativeToIndex(systemPath) {
  const indexDir = path.dirname(INDEX_FILE_PATH);
  const importPath = './' + path.relative(indexDir, systemPath);
  return normalizePathPerSystem(importPath);
}

function normalizePathPerSystem(string) {
  // ensure it will always return expected separators in path e.g. './components/CvAccordion/CvAccordion.vue'
  return typeof string === 'string' && path.sep === '\\'
    ? string.replace(/\\/g, '/')
    : string;
}
function isComponentExported(componentsExports, componentExportChunk) {
  return componentsExports.find(el => el.startsWith(componentExportChunk));
}

addNamedComponentExports(COMPONENTS_PATH);
