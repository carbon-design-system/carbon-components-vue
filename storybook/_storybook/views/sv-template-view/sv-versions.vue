<template>
  <main class="versions">
    <div class="versions__background">
      <img src="../../../../docs/AtCarbonVue.png" class="versions__background-image" />
      <!-- <sv-versions-background class="versions__background-image"/> -->
    </div>
    <div class="versions__info">
      <h1 class="versions__heading">
        Versions of
        <span class="highlight">Carbon</span> Design system in
        <span class="highlight">VueJs</span>
      </h1>
      <a class="versions__text" href="http://v1.vue.carbondesignsystem.com"
        >This version, V1, built using Carbon Components V9</a
      >
      <a class="versions__text" href="http://vue.carbondesignsystem.com">Current version</a>
    </div>
  </main>
</template>

<script>
import SvVersionsBackground from './sv-versions-background';

export default {
  name: 'SvVersions',
  components: { SvVersionsBackground },
};
</script>

<style lang="scss" scoped>
$feature-flags: (
  components-x: false,
  ui-shell: false,
);
$css--plex: true;
@import 'sv-view';

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
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.versions__background-image {
  width: auto;
  height: 100%;
}

.versions__info {
  z-index: 999;
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
