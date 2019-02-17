<template>
  <td :style="cellStyle">
    <slot />
  </td>
</template>

<script>
export default {
  name: 'CvDataTableRow',
  props: {
    cellStyle: {},
  },
};
</script>
