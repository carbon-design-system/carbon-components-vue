<template>
  <main class="versions">
    <div class="versions__hero">
      <img class="versions__background-image" src="../../../../docs/AtCarbonVue2.svg" alt="@carbon/vue" />
      <h1 class="versions__heading">
        <span class="nowrap">Versions of</span>
        <span class="nowrap"> <span class="highlight">Carbon</span> Design system </span>
        <span class="nowrap">
          in
          <span class="highlight">Vue.js</span>
        </span>
      </h1>
    </div>

    <div class="versions__info">
      <div class="bx--row">
        <div class="bx--no-gutter-md--left bx--col-md-4 bx--col-lg-4">
          <a class="versions__card" href="https://carbon-components-vue-3.netlify.app/">
            <div class="bx--aspect-ratio bx--aspect-ratio--2x1">
              <div class="bx--aspect-ratio--object">
                <div class="versions__card-content">
                  <h4>Vue 3 (next)</h4>
                  <h5>built using Carbon Components v10</h5>
                  <div class="versions__card-icon">
                    <svg
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      aria-label="Open resource"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      role="img"
                    >
                      <path fill="white" d="M11.8 2.8l-1 1 5.4 5.5H1v1.4h15.2l-5.4 5.5 1 1L19 10z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="bx--no-gutter-md--left bx--col-md-4 bx--col-lg-4">
          <a class="versions__card" href="/?path=/story/welcome--default">
            <div class="bx--aspect-ratio bx--aspect-ratio--2x1">
              <div class="bx--aspect-ratio--object">
                <div class="versions__card-content">
                  <h4>V2 (this version)</h4>
                  <h5>built using Carbon Components v10</h5>
                  <div class="versions__card-icon">
                    <svg
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      aria-label="Open resource"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      role="img"
                    >
                      <path fill="white" d="M11.8 2.8l-1 1 5.4 5.5H1v1.4h15.2l-5.4 5.5 1 1L19 10z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="bx--no-gutter-md--left bx--col-md-4 bx--col-lg-4">
          <a
            class="versions__card"
            href="https://carbon-design-system.github.io/carbon-components-vue/?path=/story/welcome--default"
          >
            <div class="bx--aspect-ratio bx--aspect-ratio--2x1">
              <div class="bx--aspect-ratio--object">
                <div class="versions__card-content">
                  <h4>V1 (previous version)</h4>
                  <h5>built using Carbon Components v9</h5>
                  <div class="versions__card-icon">
                    <svg
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      aria-label="Open resource"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      role="img"
                    >
                      <path fill="white" d="M11.8 2.8l-1 1 5.4 5.5H1v1.4h15.2l-5.4 5.5 1 1L19 10z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
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
  min-height: 100vh;
  background-color: #000;
  color: #fff;
}

.versions__hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16" xml:space="preserve"><rect x="0" y="0" fill="rgba(255, 255, 255, .35)" width="1" height="1"/></svg>');
  background-size: 16px;

  .highlight {
    font-weight: 600;
  }

  .nowrap {
    white-space: nowrap;
  }
}

.versions__background-image {
  height: 300px;
  max-width: 60vw;
  padding: 30px 0;
}

.versions__heading {
  font-size: 3.375rem;
  font-weight: 300;
  letter-spacing: 1px;
  padding: 0 20px 20px;
}

.versions__info {
  padding: 1rem;
}

.versions__card {
  display: block;
  margin: 20px 0;
  background-color: #262626;
  color: white;
  transition: background-color 70ms;

  &:hover {
    background-color: #393939;
  }

  .versions__card-content {
    padding: 1rem 25% 1rem 1rem;
  }

  .versions__card-icon {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 1em;
    right: 1em;
  }
}
</style>
