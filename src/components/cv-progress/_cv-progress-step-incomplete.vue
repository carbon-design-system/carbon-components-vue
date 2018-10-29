<template functional>
  <svg>
    <circle cx="12" cy="12" r="12"></circle>
    <circle v-if="props.isCurrent" cx="12" cy="12" r="6"></circle>
  </svg>
</template>

<script>
export default {
  name: 'CvProgressStepIncomplete',
  props: {
    isCurrent: Boolean,
  },
};
</script>
