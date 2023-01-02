import { reactive, unref } from 'vue';
import createDebug from 'debug';
const logger = createDebug('cv:data-table-store');
export default reactive({
  state: { global: { rows: [], headings: [] } },
  addParent(parentId) {
    const parent = unref(parentId);
    this.state[parent] = { rows: [], headings: [], hasBatchActions: false };
    logger(`added parent:${parent}`);
  },
  removeParent(parentId) {
    const parent = unref(parentId);
    delete this.state[parent];
    logger(`added parent:${parent}`);
  },
  getParent(parentId) {
    const parent = unref(parentId);
    if (!this.state[parent]) this.addParent(parent);
    return this.state[parent];
  },
  hasBatchActions(parentId) {
    const parent = unref(parentId);
    const hasBatchActions = this.state[parent]?.hasBatchActions;
    logger(`get hasBatchActions:${parent} result:${hasBatchActions}`);
    return hasBatchActions;
  },
  setBatchActions(parentId, val) {
    const parent = unref(parentId);
    logger(`update batch actions:${parent} payload:${val}`);
    if (!this.state[parent]) this.addParent(parent);
    this.state[parent].hasBatchActions = val;
  },
  findHeading(parentId, headingId) {
    const parent = unref(parentId);
    const id = unref(headingId);

    if (!this.state[parent]) return undefined;
    return this.state[parent].headings.find(heading => heading.id === id);
  },
  headings(parentId) {
    const parent = unref(parentId);
    return this.state[parent]?.headings || [];
  },
  rows(parentId) {
    const parent = unref(parentId);
    return this.state[parent]?.rows || [];
  },
  someSortableHeadings(parentId) {
    const parent = unref(parentId);
    const headings = this.state[parent]?.headings;
    const some = headings?.some(column => column.sortable);
    logger(`get someSortableHeadings:${parent} result:${some}`);
    return some;
  },
  updateHeading(parentId, update) {
    const parent = unref(parentId);

    if (!this.state[parent]) return;
    const headings = this.state[parent].headings;
    const index = headings.findIndex(heading => heading.id === update.id);
    if (index === -1) {
      headings.push(update);
      logger(`update heading:${parent} payload:${JSON.stringify(update)}`);
    } else {
      const current = headings[index];
      const changes = { ...current, ...update };
      const changed =
        current.name !== changes.name ||
        current.order !== changes.order ||
        current.sortable !== changes.sortable;
      if (changed) {
        headings.splice(index, 1, changes);
        logger(`update heading:${parent} payload:${JSON.stringify(update)}`);
        logger(
          `update heading:${parent} result:${JSON.stringify(headings[index])}`
        );
      }
    }
  },
  removeHeading(parentId, headingId) {
    const parent = unref(parentId);
    const id = unref(headingId);
    logger(`remove heading:${parent} payload:${id}`);
    if (!this.state[parent]) return undefined;
    const headings = this.state[parent].headings;
    const index = headings.findIndex(heading => heading.id === id);
    if (index > -1) headings.splice(index, 1);
    else logger(`remove heading:${parent} payload:${id} - heading not found`);
  },
  findRow(parentId, rowId) {
    const parent = unref(parentId);
    const id = unref(rowId);
    if (!this.state[parent]) return undefined;
    return this.state[parent].rows.find(row => row.id === id);
  },
  someExpandingRows(parentId) {
    const parent = unref(parentId);
    const rows = this.state[parent]?.rows;
    const some = rows?.some(item => item.expandable);
    logger(`get someExpandingRows:${parent} result:${some}`);
    return some;
  },
  allExpandedRows(parentId) {
    const parent = unref(parentId);
    const rows = this.state[parent]?.rows;
    const every = rows?.every(item => item.isExpanded);
    logger(`get allExpandedRows:${parent} result:${every}`);
    return every;
  },
  updateRow(parentId, update) {
    const parent = unref(parentId);

    if (!this.state[parent]) return;
    const rows = this.state[parent].rows;
    const index = rows.findIndex(row => row.id === update.id);
    if (index === -1) {
      rows.push(update);
      logger(`update row:${parent} payload:${JSON.stringify(update)}`);
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
        logger(`update row:${parent} payload:${JSON.stringify(update)}`);
        logger(`update row:${parent} result:${JSON.stringify(rows[index])}`);
      }
    }
  },
  removeRow(parentId, rowId) {
    const parent = unref(parentId);
    const id = unref(rowId);
    logger(`remove row:${parent} payload:${id}`);
    if (!this.state[parent]) return undefined;
    const rows = this.state[parent].rows;
    const index = rows.findIndex(row => row.id === id);
    if (index > -1) rows.splice(index, 1);
    else logger(`remove row:${parent} payload:${id} - row not found`);
  },
});
