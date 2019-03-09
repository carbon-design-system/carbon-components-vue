<!--
  Carbon Style Pie Chart

  Attributes:
    dataArray: array of arrays in the following form [['label1', value1], ['label2', value2], ..., ['labelN', valueN]]
    colors: array of colors that are used for pie chart parts
    header: text that will appear on top of this pie chart (optional)

  Usage:
    <cv-pie-chart
      :dataArray="[['Gryffindor', 23],['Slytherin', 12],['Ravenclaw', 19],['Hufflepuff', 15],['Teachers', 5]]"
      :colors="['#3b1a40', '#473793', '#3c6df0', '#00a68f', '#56D2BB']"
      header="Example Pie Chart">
    </cv-pie-chart>

-->

<template>
  <div class="cv-pie-chart">
    <h2 class="bx--graph-header">{{ header }}</h2>
    <div class="cv-pie-chart__container">
      <svg :width="width" :height="height">
        <g></g>
      </svg>
      <div class="cv-pie-chart__tooltip">
        <p class="cv-pie-chart__amount"></p>
        <p class="cv-pie-chart__item"></p>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

const radius = 96;

const pie = d3
  .pie()
  .sort(null)
  .value(d => d[1]);

const path = d3
  .arc()
  .outerRadius(radius - 10)
  .innerRadius(radius - 40);

const pathTwo = d3
  .arc()
  .outerRadius(radius)
  .innerRadius(radius - 40);

export default {
  name: 'CvPieChart',
  props: {
    dataArray: {
      type: Array,
      default: () => [
        ['Gryffindor', 23],
        ['Slytherin', 12],
        ['Ravenclaw', 19],
        ['Hufflepuff', 15],
        ['Teachers', 5],
      ],
    },
    colors: {
      type: Array,
      default: () => ['#3b1a40', '#473793', '#3c6df0', '#00a68f', '#56D2BB'],
    },
    header: {
      type: String,
      default: '',
    },
  },
  data: function() {
    return {
      g: null,
      scaledColors: null,
      width: radius * 2, // TODO
      height: radius * 2, // TODO
    };
  },
  watch: {
    dataArray(newVal) {
      this.dataArray = newVal;
      this.$nextTick(() => {
        this.visualizePieChart();
      });
    },
    colors(newVal) {
      this.colors = newVal;
      this.scaledColors = d3.scaleOrdinal(newVal);
      this.$nextTick(() => {
        this.visualizePieChart();
      });
    },
  },
  methods: {
    visualizePieChart() {
      this.g.selectAll('*').remove();

      const arc = this.g
        .selectAll('.arc')
        .data(pie(this.dataArray))
        .enter()
        .append('g')
        .attr('class', 'arc');

      arc
        .append('path')
        .attr('d', path)
        .attr('fill', (d, i) => this.scaledColors(i))
        .attr('stroke-width', 2)
        .attr('stroke', '#FFFFFF')
        .on('mouseover', function(d) {
          d3.select(this)
            .transition()
            .style('cursor', 'pointer')
            .attr('d', pathTwo);

          d3.select('.cv-pie-chart__tooltip').style('display', 'inherit');

          const amount = d3.select('.cv-pie-chart__amount');
          const item = d3.select('.cv-pie-chart__item');

          amount.text(`${d.data[1]}`);

          item.text(`${d.data[0]}`);
        })
        .on('mouseout', function() {
          d3.select('.cv-pie-chart__tooltip').style('display', 'none');

          d3.select(this)
            .transition()
            .attr('d', path);
        });
    },
  },
  mounted() {
    console.warn(
      `${
        this.$vnode.componentOptions.Ctor.extendOptions.name
      } - Under review. This component isn't quite ready. Hopefully no features will get broken but this cannot be guarenteed.`
    );

    this.g = d3
      .select('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    this.scaledColors = d3.scaleOrdinal(this.colors);
    this.visualizePieChart();
  },
};
</script>

<style lang="scss">
.bx--graph-header {
  font-size: 24px;
  font-weight: 300;
}

.cv-pie-chart__container {
  display: inline-block;
  position: relative;
}

.cv-pie-chart__tooltip {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  transform: translate(-50%, -50%);
  pointer-events: none;

  /* stylelint-disable-next-line selector-max-type */
  p {
    text-align: center;
  }

  .cv-pie-chart__amount {
    font-size: 29px;
    font-weight: 300;
    line-height: 1;
  }

  .cv-pie-chart__item {
    color: #5a6872;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
