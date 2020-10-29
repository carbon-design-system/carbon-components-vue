# CvGrid

A Vue utility component for the Carbon Grid

https://www.carbondesignsystem.com/guidelines/2x-grid/overview

## Usage

```html
<cv-grid>
  <cv-row>
    <cv-column>
      I am inside a grid
    </cv-column>
  </cv-row>
</cv-grid>
```

## Attributes

### cv-grid

- fullWidth: whether to render the grid full width or not
- kind: 'wide' (default), 'narrow' or 'condensed'. Defines which [grid mode](https://www.carbondesignsystem.com/guidelines/2x-grid/implementation/#grid-modes) is used.

### cv-row

- kind: 'wide' (default), 'narrow' or 'condensed'. Defines which [mode](https://www.carbondesignsystem.com/guidelines/2x-grid/implementation/#grid-modes) the row uses.

### cv-column

- sm, md, lg, xlg, max:
  - pass `true` to use auto-column for the respective breakpoint
  - pass a number to specify how many columns it should span at the respective breakpoint
  - pass an object `{ span: number, offset: number }` to define both how many columns it should span and by how many it should be offset at the respective breakpoint
