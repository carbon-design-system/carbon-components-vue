<template>
  <header class="cv-header bx--header" role="banner" data-header>
    <slot />
    <div v-if="$slots['header-global']" class="bx--header__global">
      <slot name="header-global" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'CvHeader',
  mounted() {
    console.warn(
      `${
        this.$vnode.componentOptions.Ctor.extendOptions.name
      } - Under review. This component isn't quite ready. Hopefully no features will get broken but this cannot be guarenteed.`
    );
  },
};
</script>
