<template>
  <main class="versions">
    <img class="versions__background-image" src="../../../..//docs/AtCarbonVue2.svg" alt="@carbon/vue" />
    <div class="versions__info">
      <h1 class="versions__heading">
        Versions of
        <span class="highlight">Carbon</span> Design system in
        <span class="highlight">VueJs</span>
      </h1>
      <p class="versions__text">V2: (this version) built using Carbon Components V10.</p>
      <a
        class="versions__text"
        href="https://carbon-design-system.github.io/carbon-components-vue/?path=/story/welcome--default"
        >V1: (previous version) built using Carbon Components 9.</a
      >
    </div>

    <div class="versions__dots" />
  </main>
</template>

<script>
export default {
  name: 'SvVersions',
};
</script>

<script>
export default {
  name: 'SvVersions',
};
</script>

<style lang="scss" scoped>
.versions {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  transition: background-size 0.6s ease;
  background-color: #000;
}

.versions__background-image {
  height: 300px;
}

.versions__info {
  display: flex;
  z-index: 999;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 38%;
  color: #fff;
  text-transform: uppercase;

  .versions__heading {
    font-size: 3.375rem;
    font-weight: 300;
    letter-spacing: 1px;
  }

  .versions__text {
    color: #fff;
    font-size: 2.275rem;
    font-weight: 300;
    letter-spacing: 1px;
  }

  .highlight {
    font-weight: 600;
  }
}
</style>
