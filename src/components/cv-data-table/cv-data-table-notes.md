# CvDataTable

A Vue implementation of a Carbon Components DataTable.

http://www.carbondesignsystem.com/components/DataTable/code

## Usage

### minimal

```html
<cv-data-table :columns="columns" :data="filteredData" ref="table"
  ><cv-data-table></cv-data-table
></cv-data-table>
```

See Attributes, Slots and Events to see how to add additional features to the table.

**NOTE** Sorting, filtering and pagination are the responsibility of the component user. This component raises events to facilitate this.

**NOTE 2** The search bar appears only if the search event is listened for.

## Attributes

- columns: An array containing a list of columns
  - Columns can be string labels or objects
  - If objects they must contain a 'label' and can optionally contain
    - a headingStyle object to be applied to the column headings.
    - a dataStyle object to be applied to the data in the column.
- data: Two dimensional array of strings.

- auto-width: table will size use auto sizing
- borderless: table will have no border
- options: 'compact', 'small', 'standarad', '' or 'tall'
- pagination: default: false, can be set to true or an object containing camel case props for a CvPagination component
- sortable: can be sorted
- row-size: optional - default: '',
  - 'compact', 'small', '', 'tall'
- zebra: optional - default: false ; boolean is the table striped

## Slots

- batch-actions: Ghost style buttons shown when rows are selected. An array of selected row indexes is returend from the computed property CvDataTable.selectedRows.
- actions

## Events

- pagination: re-raises CvPageination change event.
- search: supplies the string being search for. NOTE: Only shown if search is listened for.
- sort({ index, order: 'ascending' or 'descending' or 'none' or ''})

As per note sort and filter behviours are delegated to the component user.

### Additional

N/A
