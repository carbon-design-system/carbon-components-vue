<template>
  <div class="cv-bar-graph" :class="{ 'cv-bar-graph--empty': noData }">
    <svg class="cv-bar-graph__svg" ref="svg">
      <g class="cv-bar-graph__root" ref="root">
        <g class="cv-bar-graph__x-axis" ref="xAxis">
          <text class="cv-bar-graph__x-axis-label" ref="xAxisLabel"></text>
        </g>
        <g class="cv-bar-graph__y-axis" ref="yAxis">
          <text class="cv-bar-graph__y-axis-label" ref="yAxisLabel"></text>
        </g>
      </g>
    </svg>
    <div class="cv-bar-graph__key" v-if="keyLabels" ref="key">
      <span class="cv-bar-graph__key-title">Key</span>
      <div
        class="cv-bar-graph__key-entry"
        v-for="(keyLabel, i) in keyLabels"
        :key="keyLabel"
      >
        <div
          class="cv-bar-graph__key-entry-swatch"
          :style="{ background: colors(i) }"
        ></div>
        {{ keyLabel }}
      </div>
    </div>
    <div class="cv-bar-graph__empty-content" ref="emptyContent">
      <div class="cv-bar-graph__empty-content-inner">
        <slot name="emptyContent">{{ emptyText }}</slot>
      </div>
    </div>
    <div class="cv-bar-graph__tooltip" ref="tooltip"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import 'd3-transition';

const axisOffset = 16;
const numYAxisTicksHint = 4;

export default {
  name: 'CvBarGraph',
  props: {
    data: { type: Array, required: true },
    keyLabels: Array,
    emptyText: String,
    width: { type: Number, default: 800 },
    height: { type: Number, default: 300 },
    margins: {
      type: Object,
      default: () => {
        return { top: 30, right: 20, bottom: 70, left: 65 };
      },
    },
    barColors: {
      type: Array,
      default: () => ['#00a78f', '#3b1a40', '#473793', '#3c6df0', '#56d2bb'],
    },
    yAxisFormat: String,
    xAxisTimeFormat: String,
    xAxisLabel: String,
    yAxisLabel: String,
    xAxisLabelOffset: { type: Number, default: 50 },
    yAxisLabelOffset: { type: Number, default: 50 },
    yAxisGridLines: { type: Boolean, default: true },
  },
  data() {
    return {
      xScale: d3.scaleBand(),
      xSubScale: d3.scaleBand(),
      yScale: d3.scaleLinear(),
    };
  },
  computed: {
    colors() {
      return d3.scaleOrdinal().range(this.barColors);
    },
    groupedData() {
      let data = this.data;

      if (data.length > 0 && !Array.isArray(data[0].y)) {
        data = data.map(value => ({ x: value.x, y: [value.y] }));
      }

      return data;
    },
    noData() {
      return this.groupedData.length === 0;
    },
    plotArea() {
      return {
        x: this.margins.left,
        y: this.margins.top,
        width: this.width - (this.margins.left + this.margins.right),
        height: this.height - (this.margins.bottom + this.margins.top),
      };
    },
    xAxisGenerator() {
      return d3
        .axisBottom()
        .scale(this.xScale)
        .tickSize(0)
        .tickFormat(
          this.xAxisTimeFormat ? d3.timeFormat(this.xAxisTimeFormat) : null
        );
    },
    yAxisGenerator() {
      return d3
        .axisLeft()
        .scale(this.yScale)
        .ticks(numYAxisTicksHint)
        .tickSize(-this.plotArea.width)
        .tickFormat(this.yAxisFormat ? d3.format(this.yAxisFormat) : null);
    },
    yScaleMax() {
      const max = d3.max(this.groupedData, d => d3.max(d.y));
      return max > 0 ? max : 0;
    },
    yScaleMin() {
      const min = d3.min(this.groupedData, d => d3.min(d.y));
      return min < 0 ? min : 0;
    },
  },
  methods: {
    barHeight(y) {
      let barHeight = 0;
      if (typeof y === 'number' && !isNaN(y) && isFinite(y)) {
        if (y >= 0) {
          barHeight = this.yScale(0) - this.yScale(y);
        } else {
          barHeight = this.yScale(y) - this.yScale(0);
        }
      }
      return barHeight;
    },
    barYPos(y) {
      let barYPos = this.yScale(0);
      if (typeof y === 'number' && !isNaN(y) && isFinite(y)) {
        if (y >= 0) {
          barYPos = this.yScale(y);
        }
      }
      return barYPos;
    },
    updateGraph() {
      const svg = d3.select(this.$refs.svg);
      const root = d3.select(this.$refs.root);
      const xAxis = d3.select(this.$refs.xAxis);
      const yAxis = d3.select(this.$refs.yAxis);
      const xAxisLabel = d3.select(this.$refs.xAxisLabel);
      const yAxisLabel = d3.select(this.$refs.yAxisLabel);
      const key = d3.select(this.$refs.key);
      const emptyContent = d3.select(this.$refs.emptyContent);
      const tooltip = d3.select(this.$refs.tooltip);

      // Determine how many groups/sets of data are to be plotted.
      const numDataGroups = this.noData > 0 ? 0 : this.groupedData[0].y.length;

      // Set up the scales to take account of the plot area size, data ranges
      // and inter group and bar paddings.
      this.xScale
        .rangeRound([0, this.plotArea.width])
        .domain(this.groupedData.map(d => d.x))
        .paddingOuter(numDataGroups > 1 ? 0 : 0.5)
        .paddingInner(numDataGroups > 1 ? 0.3 : 0.5);

      this.xSubScale
        .rangeRound([0, this.xScale.bandwidth()])
        .domain(d3.range(numDataGroups))
        .padding(numDataGroups > 1 ? 0.05 : 0);

      this.yScale
        .range([this.plotArea.height, 0])
        .domain([this.yScaleMin, this.yScaleMax])
        .nice();

      // Set the SVG dimensions and offset the drawing root (top left of the
      //  plot area) to take the top and left margins into account.
      svg.attr('width', this.width).attr('height', this.height);

      root.attr(
        'transform',
        `translate(${this.margins.left}, ${this.margins.top})`
      );

      // (Re)draw the axes.
      const xAxisYPos =
        this.yScaleMin >= 0 ? this.plotArea.height : this.plotArea.height + 5;
      xAxis
        .attr('transform', `translate(0, ${xAxisYPos})`)
        .transition()
        .duration(500)
        .call(this.xAxisGenerator)
        .selectAll('.tick text')
        .attr('y', axisOffset);

      yAxis
        .transition()
        .duration(500)
        .call(this.yAxisGenerator)
        .selectAll('.tick text')
        .attr('x', -axisOffset);

      // Make the y-axis gridline for zero solid, rather than dashed.
      const yScaleZeroTickIndex = this.yScale
        .ticks(numYAxisTicksHint)
        .indexOf(0);
      yAxis
        .selectAll('.tick line')
        .attr('visibility', this.yAxisGridLines ? 'visible' : 'hidden')
        .filter((d, i) => i === yScaleZeroTickIndex)
        .attr('visibility', 'visible')
        .attr('stroke-dasharray', 'none');

      // Set up the axis labels.
      xAxisLabel
        .text(this.xAxisLabel)
        .attr(
          'transform',
          `translate(${this.plotArea.width / 2}, ${this.xAxisLabelOffset})`
        );

      yAxisLabel
        .text(this.yAxisLabel)
        .attr(
          'transform',
          `translate(${-this.yAxisLabelOffset}, ${this.plotArea.height /
            2}) rotate(-90)`
        );

      // (Re)draw the bar groups.
      let barGroups = root
        .selectAll('g.cv-bar-graph__bar-group')
        .data(this.groupedData, d => d.x);

      barGroups.exit().remove();

      barGroups = barGroups
        .enter()
        .append('g')
        .attr('class', 'cv-bar-graph__bar-group')
        .attr('transform', d => `translate(${this.xScale(d.x)}, 0)`)
        .merge(barGroups)
        .attr('data-group', d => d.x);

      barGroups
        .transition()
        .duration(500)
        .attr('transform', d => `translate(${this.xScale(d.x)}, 0)`);

      // (Re)draw the bars within the bar groups.
      let bars = barGroups
        .selectAll('rect')
        .data(d => d.y.map((y, i) => ({ x: i, y: y })));

      bars.exit().remove();

      bars = bars
        .enter()
        .append('rect')
        .attr('class', 'cv-bar-graph__bar')
        .attr('fill', d => this.colors(d.x))
        .attr('y', this.yScale(0))
        .attr('height', 0)
        .attr('x', d => this.xSubScale(d.x))
        .attr('width', this.xSubScale.bandwidth())
        .merge(bars)
        .on('mouseover', (d, index, nodes) => {
          d3.select(nodes[index]).attr('fill', d =>
            d3.color(this.colors(d.x)).darker()
          );
          const format = this.yAxisFormat
            ? this.yAxisGenerator.tickFormat()
            : this.yScale.tickFormat();
          const xPos =
            this.margins.left +
            this.xScale(nodes[index].parentNode.getAttribute('data-group')) +
            this.xSubScale(d.x) +
            this.xSubScale.bandwidth() / 2;
          const yPos = this.barYPos(d.y) + this.margins.top - 15;
          tooltip.text(format(d.y));
          tooltip.attr('style', `display:block;top:${yPos}px;left:${xPos}px`);
        })
        .on('mouseout', (d, index, nodes) => {
          d3.select(nodes[index]).attr('fill', d => this.colors(d.x));
          tooltip.attr('style', `display:none`);
        });

      bars
        .transition()
        .duration(500)
        .attr('fill', d => this.colors(d.x))
        .attr('x', d => this.xSubScale(d.x))
        .attr('width', this.xSubScale.bandwidth())
        .attr('height', d => this.barHeight(d.y))
        .attr('y', d => this.barYPos(d.y));

      // Set the position and height of the key (which may or may not be
      // visible).
      key.attr(
        'style',
        `top:${this.margins.top}px; width:${this.margins.right -
          20}px; height:${this.plotArea.height}px;`
      );

      // Set the visibility of the empty content overlay and make
      // it cover the plot area.
      const emptyContentStyle =
        (this.noData ? '' : 'display:none;') +
        'top:' +
        this.margins.top +
        'px; right:' +
        this.margins.right +
        'px; bottom:' +
        this.margins.bottom +
        'px; left:' +
        this.margins.left +
        'px';
      emptyContent.attr('style', emptyContentStyle);
    },
  },

  mounted() {
    console.warn(
      `${
        this.$vnode.componentOptions.Ctor.extendOptions.name
      } - Under review. This component isn't quite ready. Hopefully no features will get broken but this cannot be guarenteed.`
    );
    this.updateGraph();
  },

  watch: {
    data() {
      this.updateGraph();
    },
    width() {
      this.updateGraph();
    },
    height() {
      this.updateGraph();
    },
    margins() {
      this.updateGraph();
    },
    barColors() {
      this.updateGraph();
    },
    xAxisTimeFormat() {
      this.updateGraph();
    },
    yAxisFormat() {
      this.updateGraph();
    },
    xAxisLabel() {
      this.updateGraph();
    },
    yAxisLabel() {
      this.updateGraph();
    },
    xAxisLabelOffset() {
      this.updateGraph();
    },
    yAxisLabelOffset() {
      this.updateGraph();
    },
    yAxisGridLines() {
      this.updateGraph();
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/carbon-helpers';

$color-text: #5a6872;

.cv-bar-graph {
  display: inline-block;
  position: relative;
  vertical-align: top;
}

.cv-bar-graph__svg {
  vertical-align: top;
}

.cv-bar-graph--empty .cv-bar-graph__svg {
  opacity: 0.3;
}

.cv-bar-graph__root {
  font-family: 'ibm-plex-sans';
}

.cv-bar-graph__x-axis,
.cv-bar-graph__y-axis {
  font-family: 'ibm-plex-sans';

  /* stylelint-disable-next-line selector-max-type */
  .tick line {
    stroke: $color-text;
  }

  /* stylelint-disable-next-line selector-max-type */
  .tick text {
    fill: $color-text;
    font-size: 10px;
    font-weight: 400;
  }
}

.cv-bar-graph__y-axis {
  stroke-dasharray: 4;

  /* stylelint-disable-next-line selector-max-type */
  path {
    display: none;
  }
}

.cv-bar-graph__x-axis-label,
.cv-bar-graph__y-axis-label {
  fill: $color-text;
  font-size: 10px;
  font-weight: 700;
  text-anchor: middle;
  dominant-baseline: middle;
}

.cv-bar-graph__empty-content {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}

.cv-bar-graph__key {
  display: flex;
  position: absolute;
  right: 0;
  flex-direction: column;
  padding: 0 10px;
  border-left: 1px solid $color-text;
  color: $color-text;
}

.cv-bar-graph--empty .cv-bar-graph__key {
  opacity: 0.3;
}

.cv-bar-graph__key-title {
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 600;
}

.cv-bar-graph__key-entry {
  margin: 5px 0;
  font-size: 10px;
}

.cv-bar-graph__key-entry-swatch {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 4px;
  vertical-align: middle;
}

.cv-bar-graph__tooltip {
  display: none;
  position: absolute;
  padding: 0.25rem 0.5rem;
  transform: translate(-50%, -100%);
  border: 1px solid $color__gray-1;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  font-weight: 700;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 0;
    transform: translateX(-50%);
    border-top: 5px solid #fff;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }
}
</style>
