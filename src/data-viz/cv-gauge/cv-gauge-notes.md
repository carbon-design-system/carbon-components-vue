# CV Gauge

A Vue implementation of a Carbon Components Gauge. Gauge graphs show the part-to-whole relationship of one value compared to its total.

https://www.carbondesignsystem.com/data-visualization/gauge/code

## Usage

```html
<cv-gauge :amount="10" :total="100" suffix="GB" header="Example Gauge"> </cv-gauge>
```

## Attributes

### cv-gauge

- amount - 'x' part of the visualized x/y relationship
- total - 'y' part of the visualized x/y relationship
- suffix - suffix that will be appended to the amount text and total text in the center of this gauge (optional)
- header - text that will appear on top of this gauge (optional)
