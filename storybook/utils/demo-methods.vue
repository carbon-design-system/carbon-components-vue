<template>
  <div class="demo-methods">
    <div>Calls component methods demonstration (not part of component)</div>
    <br />
    <div>
      <span v-for="f in functions" :key="f.name">
        <p v-if="f.info">{{ f.info }}</p>
        <timer-button
          v-if="f.afterFunc"
          :duration="f.afterTime"
          @timer-start="() => handleStart(f.name)"
          @timer-end="() => handleEnd(f.afterFunc)"
          :label="f.name"
          :activeLabelPrefix="f.afterFunc"
        />
        <button v-else @click="() => handleStart(f.name)">{{ f.name }}</button>
      </span>
    </div>
  </div>
</template>

<script>
import TimerButton from './timer-button.vue';

export default {
  name: 'demo-methods',
  components: { TimerButton },
  props: {
    /**
     * Array of the form [{ name: <name of method>, info: <optional description> func: <function to call>,
     *  afterTime: <seconds after which to call afterFunc (default see timer button)>,
     * afterFunc: <method to call after X seconds}]
     */
    functions: [],
    targetRef: [],
  },
  computed: {
    target() {
      return this.targetRef[0][this.targetRef[1]];
    },
  },
  methods: {
    handleStart(fName) {
      this.target[fName]();
    },
    handleEnd(fName) {
      this.target[fName]();
    },
  },
};
</script>

<style lang="scss">
@import '~carbon-components/scss/globals/scss/vars';

.demo-methods {
  margin-top: $spacing-09;
  padding: $spacing-05;
  border: 1px solid $text-01;
}
</style>
