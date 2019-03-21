# CV Pie Chart

A Vue implementation of a Carbon Pie Chart Component. Pie charts show individual values that make up a whole data set so users can compare the values to each other and see how each value compares to the whole. A common way to express the part-to-whole relationship is to use percentages, with the whole equaling 100% and each of its parts equaling smaller percentages corresponding to its value relative to the whole. Expressing exact values is useful as long as the total is also shown.

https://www.carbondesignsystem.com/data-visualization/pie-chart/code

## Usage

```html
<cv-pie-chart
  :dataArray="[['Gryffindor', 23],['Slytherin', 12],['Ravenclaw', 19],['Hufflepuff', 15],['Teachers', 5]]"
  :colors="['#3b1a40', '#473793', '#3c6df0', '#00a68f', '#56D2BB']"
  header="Example Pie Chart"
>
</cv-pie-chart>
```

## Attributes

### cv-gauge

- dataArray - array of arrays in the following form [['label1', value1], ['label2', value2], ..., ['labelN', valueN]]
- colors - array of colors that are used for pie chart parts
- header - text that will appear on top of this pie chart (optional)
