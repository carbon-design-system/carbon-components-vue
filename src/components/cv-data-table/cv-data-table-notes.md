# CvDataTable

A Vue implementation of a Carbon Components DataTable.

http://www.carbondesignsystem.com/components/DataTable/code

## Usage

```html
<cv-data-table zebra :row-size="compact" :tableData="twoDimensionalArray">
</cv-data-table>
```

## Attributes

tableData - two dimensional array including headings of table data. Number of columns is expeccted to match heading count.
row-size - optional - default: 'standard'
options: 'compact', 'small', 'standarad', '' or 'tall'
zebra - optional - default: false ; boolean is the table striped

### Additional

N/A
