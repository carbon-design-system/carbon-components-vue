# cv-pagination

A Vue implementation of a Carbon Components pagination

http://www.carbondesignsystem.com/components/pagination/code

## Usage

```html
<cv-pagination
  backwards-text="Previous page"
  forwards-text="Next page"
  page-number-label="Page number"
  page-sizes-label="Items per page"
  :number-of-items="103"
  :page-sizes="[10, { value: 20, selected: true }, 30, 40, 50]"
  @change="onChange"
></cv-pagination>
```

Minimal
<cv-pagination>

## Attributes

- backwards-button-disabled: manually disable the backwards/previous button
- forwards-button-disabled: manually disable the foarwards/next button
- backwards-text: Aria label on page down arrow. Optional defaults to "Previous page"
- forwards-text: Aria label on page up arrow. Optional defaults to "Next page"
- page-number-label: Hidden label for page number select. Defaults to "Page number"
- page-sizes-label: label for page size select. Defaults to "Items per page:"
- number-of-items: Number of items accross all pages, defaults to Infinity
- actual-items-on-page: Number of items actually displayed which will trim the range value in the case where less rows than page-size are shown.
- page-sizes: Array of page size values.
  Defaults to [10, 20, 30, 40, 50]
  - By default the first page size is selected. This can be augmented by passing an object instead of a number e.g.
    [10, { value: 20, selected: true }, 30, 40, 50]

## Events

Change - Contains value - { start, length }

## Scoped slots

- range-text(scope.start, scope.end, scope.items): by default shows `${scope.start}-${scope.end} of ${scope.items}` or `${scope.start}-${scrop.end}` if items are infinite.
- of-n-pages(scope.pages, scope.items): by default shows `of ${scope.pages} pages` if items not infinite.
