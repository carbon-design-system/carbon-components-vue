<template>
  <tr>
    <td v-if="hasBatchActions">
      <cv-checkbox
        :form-item="false"
        :value="`${key}`"
        v-model="rowChecks"
        @change="onRowCheckChange"
        ref="checkbox"
      />
    </td>
    <td
      v-for="(cell, colIndex) in data"
      :key="`cell:${colIndex}:${key}`"
      :style="dataStyle(colIndex)"
    >
      {{ cell }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CvDataTableRow',
  props: {
    key: { type: String, required: true },
    data: Array,
  },
  computed: {
    hasBatchActions() {
      return this.$parent.hasBatchActions;
    },
    isChecked() {
      return this.$refs.isChecked.isChecked;
    },
  },
};
</script>
