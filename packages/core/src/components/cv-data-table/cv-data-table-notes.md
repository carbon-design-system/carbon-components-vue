# CvDataTable

A Vue implementation of a Carbon Components DataTable.

https://www.carbondesignsystem.com/components/data-table/code

## Usage

- Sorting, filtering and pagination are the responsibility of the component user. This component raises events to facilitate this.

- The search bar appears only if the search event is listened for.

### minimal

```html
<cv-data-table :columns="columns" :data="filteredData"></cv-data-table>
```

See Attributes, Slots and Events to see how to add additional features to the table.

### Slotting headings - WARNING EXPERIMENTAL

Headings can be slotted as per the 'Slotted headings' exmaple.

NOTE: When slotted headings are used only plain text content is styled by default.

### Slotting data

Instead of supply data as two dimensional array the user can supply slotted content using the CvDataTableRow and CvDataTableCell components.

The CvDataTableCell component can also take slotted content which allowing the freedom to create an editable table.

Like sorting and filtering it is the users responsibility to deal with edited data. The data table component does not listen to slotted cell components.

```html
<cv-data-table :columns="columns">
  <template slot="data">
    <cv-data-table-row
      v-for="(row, rowIndex) in [`ibm`, `beta`, `local`, `custom`, `private`]"
      :key="`${rowIndex}`"
      :value="`${rowIndex}`"
    >
      <cv-data-table-cell>
        <input type="text" :value="row" style="border: none; background: none; width: 100%;" />
      </cv-data-table-cell>
      <cv-data-table-cell>
        <input type="number" :value="rowIndex * rowIndex" style="border: none; background: none; width: 100%;" />
      </cv-data-table-cell>
      <cv-data-table-cell>
        <input type="password" value="ASecret" style="border: none; background: none; width: 100%;" />
      </cv-data-table-cell>
      <cv-data-table-cell>
        <a href="http://vue.carbondesignsystem.com">Here</a>
      </cv-data-table-cell>
      <cv-data-table-cell>
        <cv-tag :kind="row" label="I am a tag" />
      </cv-data-table-cell>
      <cv-data-table-cell>
        <cv-button type="button" v-html="`Clicky ${row}`" style="width: 100%;"> </cv-button>
      </cv-data-table-cell>

      <template slot="expandedContent"
        >A variety of content types can live here. Be sure to follow Carbon design guidelines for spacing and
        alignment.</template
      >
    </cv-data-table-row>
  </template>
</cv-data-table>
```

## Attributes

- columns: An array containing a list of columns
  - Columns can be string labels or objects
  - If objects
    - MUST contain a label if headings are not slotted
    - Optionally a headingStyle object to be applied to the column headings if not slotted.
    - Optionally a dataStyle object to be applied to the data in the column.
    - Optionally a sortable property - if any column sets this to true then only columns with sortable set to true are sortable. NOTE: table sortable property not required.
- data: Two dimensional array of strings.
- rows-selected: An array containing the selected row values. Supports v-model via the row-select-changes event.

- actionBarAriaLabel: { type: String, default: 'Table Action Bar' },
- auto-width: (optional) table will size use auto sizing
- batchCancelLabel: (optional) { type: String, default: 'Cancel' },
- borderless: (optional) table will have no border
- collapseAllAriaLabel: { type: String, default: 'Collapse all rows' },
- expandAllAriaLabel: { type: String, default: 'Expand all rows' },
- overflow-menu(optional) : An array of overflow menu labels. On click CvDataTable will raise an 'overflow-menu-click' event passing an object containing menuIndex, menuLabel and rowValue
- overflow-menu props: As part of the array pass an object containing props for the overflowMenu. E.g. { label: 'Overflow menu', tipAlignment: 'end', tipPosition: 'top' },
- pagination: (optional) default: false, can be set to true or an object containing camel case props for a CvPagination component
- rowSize: (optional) default: '',
  - 'compact', 'small', '', 'tall'
- searchLabel: (optional) { type: String, default: 'Search' },
- searchPlaceholder: (optional) { type: String, default: 'Search' },
- searchClearLabel: (optional) { type: String, default: 'Clear search' },
- initialSearchValue: (optional) default: '' ; Set text in search bar on table generation
- selectAllAriaLabel: { type: String, default: 'Select all rows' },
- sortable: (optional) can be sorted
- staticWidth: (optional) if true, will use a width of 'auto' instead of 100%
- stickyHeader: (optional) default: false ; Table does not stretch to width of container.
- zebra: (optional) default: false ; boolean is the table striped

## Scoped slots

- rows-selected(scope.count): by default shows `${scope.count} items selected`
- pagination scoped slots are passed through to the pagination component these are 'of-n-pages' and 'range-text'. See pagination component for more details.

**Overflow menu** To provide customized overflow menus e.g. state dependant, specify explicitly using the slotted data/HTML table form. The CvDataTable will not raise an event.

## Slots

- batch-actions: Ghost style buttons shown when rows are selected. An array of selected row indexes is returend from the computed property CvDataTable.selectedRows.
- actions
- data: overrides passing data as a property, expects CvDataTableRow and CvDataTableCell. CvDataTableCell expects slotted content.
- expandedContent: (part of cv-data-table-row) additional content displayed when row is expanded

## Events

- row-expanded: Supplies row component of expanded row, where if value is set it can be accessed to get the index of the row
- pagination: re-raises CvPageination change event.
- row-select-change: Supplies { value: rowValue, selected: rowSelected }. Raised on row select/deselect
- row-select-changes: Supplies array of selected row values.
- search: supplies the string being search for. NOTE: Only shown if search is listened for.
- sort({ index, order: 'ascending' or 'descending' or 'none' or ''})

As per note sort and filter behviours are delegated to the component user.

## Rows

### Attributes

aria-label-for-batch-checkbox: Aria label for batch checkbox. default Select row N for batch action.
aria-label-expand-row: Aria label for expanding row expansion button. default: 'Expand current row'
aria-label-collapse-row: Aria label for expanding row collapse button. default: 'Collapse current row'
expanded: initial state of the expanded row

### Computed

isExpanded: has a setter and getter and can be used interact with each row.

Rows are not automatically deselected after when a batch action is executed. The selected row checks can be cleared either by calling the method deselect which will deselect all or by use of v-model with the rows-selected property.

When batch actions are supplied rows require a value and aria-label for the checkboxes added. Where a simple data array is provided they are created automatically. If using slotted content then the user must supply a value. They can also supply the property "aria-label-for-batch-checkbox" which defaults to `Select row ${value} for batch action`.
