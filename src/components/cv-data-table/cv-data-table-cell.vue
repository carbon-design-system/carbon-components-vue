<template>
  <td :style="cellStyle">
    <slot />
  </td>
</template>

<script>
export default {
  name: 'CvDataTableCell',
  props: {
    cellStyle: {},
  },
};
</script>
