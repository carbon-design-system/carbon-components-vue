<template>
  <main class="versions">
    <div class="versions__background"></div>
    <div class="versions__info">
      <h1 class="versions__heading">
        Versions of
        <span class="highlight">Carbon</span> Design system in
        <span class="highlight">VueJs</span>
      </h1>
      <p class="versions__text">V2: (this version) built using Carbon Components V10.</p>
      <a class="versions__text" href="http://v1.vue.carbondesignsystem.com"
        >V1: (previous version) built using Carbon Components 9.</a
      >
    </div>
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
  background: linear-gradient(90deg, #2e3f8f, #3057d5, #3057d5, #3c6df0, #3057d5, #3057d5, #2e3f8f);
}

.versions__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../../../docs/AtCarbonVue.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.versions__background-image {
  width: auto;
  height: 100%;
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
