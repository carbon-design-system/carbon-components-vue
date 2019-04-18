<template>
  <div :style="{ width: width }">
    <p
      class="bx--skeleton__text"
      :class="{ 'bx--skeleton__heading': heading }"
      :style="{ width: line.width }"
      :key="index"
      v-for="(line, index) in lines"
    ></p>
  </div>
</template>

<script>
export default {
  name: 'CvSkeletonText',
  props: {
    width: { type: String, default: '100%' },
    heading: { type: Boolean, default: false },
    lineCount: { type: Number, default: 3 },
    paragraph: { type: Boolean, default: false },
  },
  methods: {
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    calcWidth: function() {
      let width = this.width;
      if (this.paragraph) {
        const { num, unit } = this.widthObj;
        if (unit === '%') {
          const randomWidth = this.getRandomInt(0, 75) + 'px';
          width = `calc(${width} - ${randomWidth})`;
        } else if (unit === 'px') {
          width = this.getRandomInt(num - 75, num) + 'px';
        }
      }
      return width;
    },
  },
  computed: {
    widthObj: function() {
      const widthObj = { num: parseInt(this.width, 10) };
      if (this.width.includes('px')) {
        widthObj.unit = 'px';
      }
      if (this.width.includes('%')) {
        widthObj.unit = '%';
      }
      return widthObj;
    },
    lines: function() {
      return Array.from(
        {
          length: this.paragraph ? this.lineCount : 1,
        },
        () => ({
          width: this.calcWidth(),
        })
      );
    },
  },
};
</script>
