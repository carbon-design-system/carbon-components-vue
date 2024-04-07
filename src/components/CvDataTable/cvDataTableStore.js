//TODO: Remove this store and replace with provide/inject
import { reactive, unref } from 'vue';
let loggerEnabled = false;
try {
  loggerEnabled = localStorage
    ?.getItem('debug')
    ?.split(' ')
    .includes('cv:data-table-store');
} catch (e) {
  // ignore
}
// eslint-disable-next-line no-console
const logger = loggerEnabled ? console.debug : () => {};

/**
 * @typedef {string|ComputedRef<string>|Ref<string>} CvTableDataString
 */

/**
 * Row Data
 * @typedef {Object} CvRowData
 * @property {CvTableDataString} id - row id
 * @property {string} value? - used to determine which rows are selected
 * @property {boolean} expandable - True if the row can be expended via a click
 * @property {boolean} isExpanded - True if the row is currently expanded
 * @property {boolean} isChecked - True is the row is currently selected via the checkbox in the row
 */

/**
 * Row update data
 * @typedef {Object} CvRowDataChecked
 * @property {CvTableDataString} id - heading id
 * @property {boolean} isChecked - True is the row is currently selected via the checkbox in the row
 */

/**
 * Row update data
 * @typedef {Object} CvRowDataExpanded
 * @property {CvTableDataString} id - heading id
 * @property {boolean} isExpanded - True if the row is currently expanded
 */

/**
 * Row update data
 * @typedef {Object} CvRowDataExpandable
 * @property {CvTableDataString} id - heading id
 * @property {boolean} expandable - True if the row can be expended via a click
 */

/**
 * @typedef {CvRowData|CvRowDataChecked|CvRowDataExpanded|CvRowDataExpandable} CvRowDataUpdate
 */

/**
 * Heading data
 * @typedef {Object} CvHeadingData
 * @property {CvTableDataString} id - heading id
 * @property {string} name? - name of the heading which can be used by sort
 * @property {CvTableDataString} order - sort order for this heading
 * @property {boolean} sortable - Is the heading sortable?
 */

/**
 * Heading update data
 * @typedef {Object} CvHeadingDataSortable
 * @property {CvTableDataString} id - heading id
 * @property {boolean} sortable - Is the heading sortable?
 */

/**
 * Heading update data
 * @typedef {Object} CvHeadingDataOrder
 * @property {CvTableDataString} id - heading id
 * @property {CvTableDataString} order - sort order for this heading
 */

/**
 * @typedef {CvHeadingData|CvHeadingDataSortable|CvHeadingDataOrder} CvHeadingDataUpdate
 */

/**
 * Table data
 * @typedef {Object} CvTableData
 * @property {Array<CvRowData>} rows - table row data
 * @property {Array<CvHeadingData>} headings - table heading data
 * @property {boolean} hasExpandable - At least some rows are expandable
 */

export default reactive({
  state: { global: { rows: [], headings: [] } },
  /**
   * Add a new table using the table's id
   * @param {CvTableDataString} tableId
   */
  addTable(tableId) {
    const table = unref(tableId);
    this.state[table] = {
      rows: [],
      headings: [],
      hasExpandable: false,
    };
    logger(`added table:${table}`);
  },
  /**
   * Remove a table using the table's id
   * @param {CvTableDataString} tableId
   */
  removeTable(tableId) {
    const table = unref(tableId);
    delete this.state[table];
    logger(`added table:${table}`);
  },
  /**
   * Get data for a table
   * @param {CvTableDataString} tableId
   * @returns {CvTableData}
   */
  getTable(tableId) {
    const table = unref(tableId);
    if (!this.state[table]) this.addTable(table);
    return this.state[table];
  },
  /**
   * Find a heading by table + heading id
   * @param {CvTableDataString} tableId
   * @param {CvTableDataString} headingId
   * @returns {CvHeadingData|undefined}
   */
  findHeading(tableId, headingId) {
    const table = unref(tableId);
    const id = unref(headingId);

    const headings = this.headings(table);
    return headings.find(heading => heading.id === id);
  },
  /**
   * Get all headings for a table
   * @param {CvTableDataString} tableId
   * @returns {Array<CvHeadingData>}
   */
  headings(tableId) {
    const table = unref(tableId);
    return this.state[table]?.headings || [];
  },
  /**
   * Get all rows for a table
   * @param {CvTableDataString} tableId
   * @returns {Array<CvRowData>}
   */
  rows(tableId) {
    const table = unref(tableId);
    return this.state[table]?.rows || [];
  },
  /**
   * Are any header sortable
   * @param {CvTableDataString} tableId
   * @returns {boolean}
   */
  someSortableHeadings(tableId) {
    const table = unref(tableId);
    const headings = this.state[table]?.headings;
    const some = headings?.some(column => column.sortable);
    logger(`get someSortableHeadings:${table} result:${some}`);
    return some;
  },
  /**
   * Update a heading
   * @param {CvTableDataString} tableId
   * @param {CvHeadingDataUpdate} update
   */
  updateHeading(tableId, update) {
    const table = unref(tableId);

    if (!this.state[table]) return;
    const headings = this.state[table].headings;
    const index = headings.findIndex(heading => heading.id === update.id);
    if (index === -1) {
      headings.push(update);
      logger(`update heading:${table} payload:${JSON.stringify(update)}`);
    } else {
      const current = headings[index];
      const changes = { ...current, ...update };
      const changed =
        current.name !== changes.name ||
        current.order !== changes.order ||
        current.sortable !== changes.sortable;
      if (changed) {
        headings.splice(index, 1, changes);
        logger(`update heading:${table} payload:${JSON.stringify(update)}`);
        logger(
          `update heading:${table} result:${JSON.stringify(headings[index])}`
        );
      }
    }
  },
  /**
   * Remove a heading data object from the table
   * @param {CvTableDataString} tableId
   * @param {CvTableDataString} headingId
   */
  removeHeading(tableId, headingId) {
    const table = unref(tableId);
    const id = unref(headingId);
    logger(`remove heading:${table} payload:${id}`);
    if (!this.state[table]) return;
    const headings = this.state[table].headings;
    const index = headings.findIndex(heading => heading.id === id);
    if (index > -1) headings.splice(index, 1);
    else logger(`remove heading:${table} payload:${id} - heading not found`);
  },
  /**
   * Find a row for using the table & row ids
   * @param {CvTableDataString} tableId
   * @param {CvTableDataString} rowId
   * @returns {CvRowData|undefined}
   */
  findRow(tableId, rowId) {
    const table = unref(tableId);
    const id = unref(rowId);
    if (!this.state[table]) return undefined;
    return this.state[table].rows.find(row => row.id === id);
  },
  /**
   * Is the given row expanded
   * @param {CvTableDataString} tableId
   * @param {CvTableDataString} rowId
   * @returns {boolean}
   */
  isRowExpanded(tableId, rowId) {
    const row = this.findRow(tableId, rowId);
    return row?.isExpanded;
  },
  /**
   * Set if any rows are expandable
   * @param {CvTableDataString} tableId
   */
  setSomeExpandingRows(tableId) {
    const table = unref(tableId);
    if (!this.state[table]) return;
    const rows = this.state[table].rows;
    const some = rows?.some(item => item.expandable);
    logger(`set someExpandingRows:${table} result:${some}`);
    this.state[table].hasExpandable = some;
  },
  /**
   * Are any rows expandable in the given table
   * @param {CvTableDataString} tableId
   * @returns {boolean}
   */
  someExpandingRows(tableId) {
    const table = unref(tableId);
    if (!table) return false;
    const some = this.state[table]?.hasExpandable;
    logger(`get someExpandingRows:${table} result:${some}`);
    return some;
  },
  /**
   * Are all the table rows expanded
   * @param {CvTableDataString} tableId
   * @returns {boolean}
   */
  allExpandedRows(tableId) {
    const table = unref(tableId);
    if (!table) return false;
    const rows = this.state[table].rows;
    const every = rows?.every(item => item.isExpanded);
    logger(`get allExpandedRows:${table} result:${every}`);
    return every;
  },
  /**
   * Add or update a row in the table
   * @param {CvTableDataString} tableId
   * @param {CvRowDataUpdate} update
   */
  updateRow(tableId, update) {
    const table = unref(tableId);

    if (!this.state[table]) return;
    const rows = this.state[table].rows;
    const index = rows.findIndex(row => row.id === update.id);
    if (index === -1) {
      rows.push(update);
      logger(`update row:${table} payload:${JSON.stringify(update)}`);
    } else {
      const current = rows[index];
      const changes = { ...current, ...update };
      const changed =
        current.value !== changes.value ||
        current.expandable !== changes.expandable ||
        current.isExpanded !== changes.isExpanded ||
        current.isChecked !== changes.isChecked;
      if (changed) {
        rows.splice(index, 1, changes);
        logger(`update row:${table} payload:${JSON.stringify(update)}`);
        logger(`update row:${table} result:${JSON.stringify(rows[index])}`);
      }
    }
  },
  /**
   * Remove a row from the table
   * @param {CvTableDataString} tableId
   * @param {CvTableDataString} rowId
   */
  removeRow(tableId, rowId) {
    const table = unref(tableId);
    const id = unref(rowId);
    logger(`remove row:${table} payload:${id}`);
    if (!this.state[table]) return;
    const rows = this.state[table].rows;
    const index = rows.findIndex(row => row.id === id);
    if (index > -1) rows.splice(index, 1);
    else logger(`remove row:${table} payload:${id} - row not found`);
  },
});
