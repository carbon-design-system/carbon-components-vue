<template>
  <tr>
    <td v-if="hasBatchActions">
      <cv-checkbox
        :form-item="false"
        :value="value"
        v-model="dataChecked"
        @change="onChange"
        ref="rowChecked"
      />
    </td>
    <slot />
  </tr>
</template>

<script>
export default {
  name: 'CvDataTableRow',
  props: {
    checked: Array,
    value: { type: String, requried: true },
  },
  watch: {
    checked() {
      this.dataChecked = this.checked;
    },
  },
  model: {
    event: 'change',
    prop: 'checked',
  },
  data() {
    return {
      dataChecked: this.checked,
    };
  },
  computed: {
    hasBatchActions() {
      return this.$parent.hasBatchActions;
    },
    isChecked() {
      return this.dataChecked;
    },
  },
  methods: {
    onChange() {
      this.$emit('change', this.dataChecked);
    },
  },
};
</script>
