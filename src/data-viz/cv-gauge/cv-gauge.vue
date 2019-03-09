<!--
  Carbon Style Gauge

  Attributes:
    amount: 'x' part of the visualized x/y relationship
    total: 'y' part of the visualized x/y relationship
    suffix: suffix that will be appended to the amount text and total text in the center of this gauge (optional)
    header: text that will appear on top of this gauge (optional)

  Usage:
    <cv-gauge :amount="10" :total="100" suffix="GB" header="Example Gauge">
    </cv-gauge>

-->

<template>
  <div class="cv-gauge">
    <h1 class="bx--graph-header">{{ header }}</h1>
    <div class="cv-gauge__container">
      <svg></svg>
      <div class="cv-gauge__text">
        <p class="cv-gauge__amount"></p>
        <p class="cv-gauge__total"></p>
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from '../../mixins/theme-mixin';
import * as d3 from 'd3';

const tau = 2 * Math.PI;
const radius = 80;
const padding = 30;
const boxSize = (radius + padding) * 2;
const arc = d3
  .arc()
  .innerRadius(radius)
  .outerRadius(radius - 10)
  .startAngle(0);

export default {
  name: 'CvGauge',
  mixins: [themeMixin],
  props: {
    total: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    suffix: {
      type: String,
      default: '',
    },
    header: {
      type: String,
      default: '',
    },
  },
  data: function() {
    return {
      g: null,
      amountText: null,
      totalText: null,
    };
  },
  watch: {
    amount: function(newVal) {
      this.updateForegroundArc(newVal / this.total);
      this.setAmountText(`${newVal}${this.suffix}`);
    },
    total: function(newVal) {
      this.updateForegroundArc(this.amount / newVal);
      this.setTotalText(`/${newVal}${this.suffix}`);
    },
    suffix: function(newVal) {
      this.setAmountText(`${this.amount}${newVal}`);
      this.setTotalText(`/${this.total}${newVal}`);
    },
  },
  methods: {
    // Animation function
    arcTween(newAngle) {
      return function(d) {
        const interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      };
    },
    setTotalText(val) {
      this.totalText
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .delay(1700)
        .style('opacity', 1)
        .text(val);
    },
    setAmountText(val) {
      this.amountText
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .delay(1500)
        .style('opacity', 1)
        .text(val);
    },
    setForegroundArc(quotient) {
      this.g
        .append('path')
        .datum({ endAngle: 0 })
        .style('fill', '#00a68f')
        .transition()
        .duration(1000)
        .delay(1000)
        .attrTween('d', this.arcTween(quotient * tau));
    },
    setBackgroundArc() {
      this.g
        .append('path')
        .datum({ endAngle: tau })
        .style('fill', '#dfe3e6')
        .attr('d', arc);
    },
    updateForegroundArc(quotient) {
      this.g.selectAll('path:last-of-type').remove();
      this.setForegroundArc(quotient);
    },
    visualizeGauge() {
      this.setBackgroundArc();
      this.setForegroundArc(this.amount / this.total);
      this.setAmountText(`${this.amount}${this.suffix}`);
      this.setTotalText(`/${this.total}${this.suffix}`);
    },
  },
  mounted() {
    console.warn(
      `${
        this.$vnode.componentOptions.Ctor.extendOptions.name
      } - Under review. This component isn't quite ready. Hopefully no features will get broken but this cannot be guarenteed.`
    );

    const svg = d3
      .select('svg')
      .attr('width', boxSize)
      .attr('height', boxSize);
    this.g = svg
      .append('g')
      .attr('transform', `translate(${boxSize / 2}, ${boxSize / 2})`);

    this.amountText = d3.select('.cv-gauge__amount');
    this.totalText = d3.select('.cv-gauge__total');
    this.visualizeGauge();
  },
};
</script>

<style lang="scss">
.bx--graph-header {
  font-size: 24px;
  font-weight: 300;
}

.cv-gauge__container {
  position: relative;
  width: 220px;
}

.cv-gauge__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: right;
}

.cv-gauge__amount {
  opacity: 0;
  font-size: 30px;
  font-weight: 300;
}

.cv-gauge__total {
  opacity: 0;
  font-size: 14px;
}

.cv-gauge__amount,
.cv-gauge__total {
  margin: 0;
}
</style>
