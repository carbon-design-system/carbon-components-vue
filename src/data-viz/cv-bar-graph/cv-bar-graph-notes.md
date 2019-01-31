# cv-bar-graph

A Vue implementation of a Carbon Components bar graph data visualization component.

https://www.carbondesignsystem.com/data-visualization/bar-graph/code

## Usage

```html
<cv-bar-graph
  :width="800"
  :height="300"
  :margins="{'top': 30, 'right': 120, 'bottom': 70, 'left': 65}"
  :x-axis-time-format="%b"
  :y-axis-format="~s"
  :x-axis-label="X-axis Label"
  :y-axis-label="Y-axis Label"
  :bar-colors="['#00a78f', '#3b1a40', '#473793', '#3c6df0', '#56d2bb']"
  :x-axis-label-offset="50"
  :y-axis-label-offset="50"
  :y-axis-grid-lines="false"
  :key-labels="['Data set #1', 'Data set #2', 'Data set #3', 'Data set #4', 'Data set #5']"
  :empty-text="There is no data"
  :data="[
    {
      x: new Date('2018-11-01T00:00:00.000Z'),
      y: [10, 20, 30, 15, 50]
    },
    {
      x: new Date('2018-12-01T00:00:00.000Z'),
      y: [40, 30, 70, 11, 110]
    },
    {
      x: new Date('2019-01-01T00:00:00.000Z'),
      y: [20, 0, -110, null, 20]
    },
    {
      x: new Date('2019-02-01T00:00:00.000Z'),
      y: [60, 55.3, 50, 30, 90]
    }
  ]"
>
  <template slot="emptyContent"
    ><span style="color:red"
      >There is currently no data for the selected parameters</span
    ></template
  >
</cv-bar-graph>
```

## Attributes

- width: Overall width of the chart (including y-axis and key) in pixels. Optional (default 800).
- height: Overall height of the chart (including x-axis) in pixels. Optional (default 300).
- margins: An object containing the margins, in pixels, between the overall component and the plot area that contains
  the bars. These margins contain the x and y axes and their labels and any key. Optional (default `{top: 30, right: 20, bottom: 70, left: 65}`)
- x-axis-time-format: If the x-axis categories are time-based this can be a d3
  time format for controlling how the values are displayed, otherwise omitted.
  Details of the supported formats can be found here
  [https://github.com/d3/d3-time-format](https://github.com/d3/d3-time-format)
  Optional (default none).
- y-axis-format: A d3 number format for controlling how y-axis values are displayed.
  Details of the supported formats can be found here
  [https://github.com/d3/d3-format](https://github.com/d3/d3-format)
  Optional (default none).
- x-axis-label: A text string that is the x-axis label. Optional (default none).
- y-axis-label: A text string that is the y-axis label. Optional (default none).
- bar-colors: An array of CSS fill color strings for the bars, one color per data set. Optional (default `['#00a78f', '#3b1a40', '#473793', '#3c6df0', '#56d2bb']`)
- x-axis-label-offset: The offset, in pixels, of the x-axis label from the x-axis. Optional (default 50).
- y-axis-label-offset: The offset, in pixels, of the y-axis label from the y-axis. Optional (default 50).
- y-axis-grid-lines: Whether or not to display grid lines on the graph for the y-axis. Optional (default true).
- key-labels: An array of label strings to be used in the optional key that describes the data sets. Optional (default none).
- empty-text: A text message to be displayed when there is no data. This is overridden by the emptyContent slot if one is provided. Optional (default none).
- data: An array of objects containing the data to be plotted. Each object contains an 'x'
  property that is the value for the bar category on the x-axis and a 'y' value that is either a number or an array of numbers that determine the height of the bar(s).
  The data in the array is plotted left-to-right on the chart as a single bar or set of bars for each object in the data array. Required.
  Examples: `[{x:'Apples', y:10}, {x:'Oranges', y:20}]` or  
  `[{x: new Date('2018-11-01T00:00:00.000Z'), y: [10, 20, 30, 15, 50]}, {x: new Date('2018-12-01T00:00:00.000Z'), y: [40, -30, 70.4, 11, 110]}]`

### Additional

- emptyContent slot: Alllows the option of having richer markup content displayed when there is no data instead of just text.
  Overrides the empty-text attribute. Example:
  ```
  <template slot="emptyContent"><span style="color:red">There is currently no data for the selected parameters</span></template>
  ```
