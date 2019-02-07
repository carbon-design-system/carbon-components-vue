# CvDataTable

A Vue implementation of a Carbon Components DataTable.

http://www.carbondesignsystem.com/components/DataTable/code

## Usage

```html
<cv-data-table zebra :row-size="compact" :tableData="twoDimensionalArray">
</cv-data-table>
```

**NOTE** Sorting and filtering are the responsibility of the component user. This component raises events to facilitate this.

## Attributes

headings - Number of columns is expeccted to match heading count.
data - Two dimensional array

auto-width - table will size use auto sizing
borderless - table will have no border
options: 'compact', 'small', 'standarad', '' or 'tall'
sortable: can be sorted
row-size - optional - default: 'standard'
zebra - optional - default: false ; boolean is the table striped

## Events

sort({ index, order: 'ascending' or 'descending' or 'none' or ''})

As per note sort and filter behviours are delegated to the component user.

### Additional

N/A
