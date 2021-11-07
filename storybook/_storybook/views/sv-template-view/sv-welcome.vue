<template>
  <main class="welcome">
    <div class="welcome__hero">
      <img class="welcome__background-image" src="../../../../docs/AtCarbonVue2.svg" alt="@carbon/vue" />
      <h1 class="welcome__heading">
        <span class="nowrap"> <span class="highlight">Carbon</span> Design system </span>
        <span class="nowrap">
          in
          <span class="highlight">Vue.js</span>
        </span>
      </h1>
    </div>
    <div class="welcome__info">
      <div class="bx--row">
        <div class="bx--no-gutter-md--left bx--col-md-4 bx--col-lg-4">
          <a class="welcome__card" href="https://github.com/carbon-design-system/carbon-components-vue">
            <div class="bx--aspect-ratio bx--aspect-ratio--2x1">
              <div class="bx--aspect-ratio--object">
                <div class="welcome__card-content">
                  <h5>Go to</h5>
                  <h4>the source repository</h4>
                  <div class="welcome__card-image">
                    <svg
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      class="MdxIcon-module--mdx-icon--3p_4x MdxIcon-module--icon-inverse--q6_WJ"
                    >
                      <path
                        fill="white"
                        fill-rule="evenodd"
                        d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45 3 3 0 0 0 4.08 1.16 2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76 5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7 5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2z"
                      ></path>
                    </svg>
                  </div>

                  <div class="welcome__card-icon">
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
          <a class="welcome__card" href="/?path=/story/versions--default">
            <div class="bx--aspect-ratio bx--aspect-ratio--2x1">
              <div class="bx--aspect-ratio--object">
                <div class="welcome__card-content">
                  <h4>Versions</h4>
                  <div class="welcome__card-icon">
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
          <a class="welcome__card" href="https://carbon-components-vue-3.netlify.app/">
            <div class="bx--aspect-ratio bx--aspect-ratio--2x1">
              <div class="bx--aspect-ratio--object">
                <div class="welcome__card-content">
                  <h5>Take a look at our</h5>
                  <h4>Vue 3 version</h4>
                  <div class="welcome__card-image">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.32 170.02">
                      <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z" />
                      <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z" />
                    </svg>
                  </div>

                  <div class="welcome__card-icon">
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
    <footer class="welcome__footer bx--grid">
      <div class="bx--row">
        <div class="bx--col-md-2 bx--col-lg-2">
          <ul>
            <li class="welcome__footer-list-item">
              <a href="https://www.carbondesignsystem.com/how-to-contribute/overview" aria-label="Contribute"
                >Contribute</a
              >
            </li>
            <li class="welcome__footer-list-item">
              <a href="https://www.ibm.com/privacy" aria-label="Privacy">Privacy</a>
            </li>
            <li class="welcome__footer-list-item">
              <a href="https://www.ibm.com/legal" aria-label="Terms of use">Terms of use</a>
            </li>
            <li class="welcome__footer-list-item">
              <a href="https://www.ibm.com/" aria-label="IBM.com">IBM.com</a>
            </li>
          </ul>
        </div>
        <div class="bx--col-md-2 bx--col-lg-2">
          <ul>
            <li class="welcome__footer-list-item">
              <a href="https://medium.com/carbondesign" aria-label="Medium">Medium</a>
            </li>
            <li class="welcome__footer-list-item">
              <a href="https://twitter.com/_carbondesign" aria-label="Twitter">Twitter</a>
            </li>
            <li class="welcome__footer-list-item">
              <a href="https://www.netlify.com/" aria-label="Netlify">Netlify</a>
            </li>
          </ul>
        </div>
        <div class="welcome__footer-info bx--offset-lg-2 bx--col-sm-3 bx--col-md-4 bx--col-lg-4">
          <p>
            Have questions? Email us or open
            <br />an issue on
            <a
              target="blank"
              href="https://github.com/carbon-design-system/carbon-components-vue/issues/new/choose"
              style="text-decoration: underline;"
              >GitHub.</a
            >
          </p>
          <ul v-if="hasPackageInfo">
            <li>{{ packageName }} latest version: {{ packageLatest }}</li>
            <li v-for="(version, tag) of packageOtherTags" :key="tag">
              {{ packageName }} {{ tag }} version: {{ version }}
            </li>
          </ul>
          <p>
            <span v-if="hasPackageInfo">Last updated {{ packageUpdated }} <br /></span>Copyright © 2019 IBM
          </p>
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col-lg-3">
          <svg class="welcome__footer-logo" width="81" height="32" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="evenodd">
              <path
                d="M0 32h15.689v-2.038H0zM0 27.721h15.689v-2.038H0zM4.483 23.442h6.724v-2.037H4.483zM4.483 19.164h6.724v-2.038H4.483zM4.483 14.885h6.724v-2.037H4.483zM4.482 10.606h6.724V8.568H4.482zM0 6.327h15.689V4.29H0zM0 2.049h15.689V.011H0zM17.93 29.963V32h16.504a8.521 8.521 0 0 0 5.54-2.037H17.93zM17.93 25.683v2.038h23.914a8.535 8.535 0 0 0 .85-2.038H17.93zM22.412 23.442h6.724v-2.037h-6.724zM40.124 17.126H22.412v2.038H41.77a8.62 8.62 0 0 0-1.645-2.038M22.413 12.848v2.036h17.786a8.612 8.612 0 0 0 1.644-2.037h-19.43zM42.693 6.327a8.447 8.447 0 0 0-.85-2.037H17.93v2.037h24.763zM39.974 2.049a8.521 8.521 0 0 0-5.54-2.037H17.93v2.037h22.044zM22.412 10.606h6.724V8.568h-6.724zM35.453 10.606h7.29a8.603 8.603 0 0 0 .248-2.038h-7.538v2.038zM35.453 21.405v2.037h7.538c0-.703-.09-1.384-.248-2.037h-7.29zM57.457 0H44.825v2.038h13.34zM44.826 32h11.21v-2.038h-11.21zM44.826 27.72h11.21v-2.038h-11.21zM49.309 23.439h6.727v-2.038h-6.727zM49.309 19.159h6.727v-2.038h-6.727zM69.488 32h11.21v-2.038h-11.21zM69.488 27.72h11.21v-2.038h-11.21zM69.488 23.439h6.726v-2.038h-6.726zM69.487 19.159h6.726v-2.038h-6.726zM69.488 14.879h6.726V12.84H63.606l-.707 2.038h5.903l.686-1.94zM61.916 12.84H49.31v2.039h6.726v-1.94l.686 1.94h5.903zM76.213 8.56H65.091l-.707 2.038h11.83zM68.06 0l-.706 2.038h13.344V0zM62.757 32l.72-2.038h-1.432zM61.254 27.72h3.015l.72-2.038h-4.455zM59.743 23.44h6.037l.72-2.039h-7.476zM58.232 19.159h9.06l.719-2.038h-10.5zM49.309 10.598h11.83l-.707-2.038H49.309zM65.868 6.318h14.83V4.28H66.576zM58.947 4.28H44.826v2.038h14.828z"
              />
            </g>
          </svg>
        </div>
      </div>
    </footer>
  </main>
</template>

<script>
import packageInfoRaw from '../../../../package-info';
const packageInfo = Object.values(packageInfoRaw).reduce((acc, line) => (line.type === 'inspect' ? line : acc), 0);

export default {
  name: 'SvWelcome',
  computed: {
    hasPackageInfo() {
      return !!packageInfo;
    },
    packageName() {
      return packageInfo.data.name;
    },
    packageLatest() {
      return packageInfo.data['dist-tags'].latest;
    },
    packageOtherTags() {
      const { latest, ...others } = packageInfo.data['dist-tags'];
      return others;
    },
    packageUpdated() {
      return new Date(packageInfo.data.time.modified).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.welcome {
  min-height: 100vh;
  background-color: #000;
  color: #fff;
}

.welcome__hero {
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

.welcome__background-image {
  height: 300px;
  max-width: 60vw;
  padding: 30px 0;
}

.welcome__heading {
  font-size: 3.375rem;
  font-weight: 300;
  letter-spacing: 1px;
  padding: 0 20px 20px;
}

.welcome__info {
  padding: 1rem;
}

.welcome__card {
  display: block;
  margin: 20px 0;
  background-color: #262626;
  color: white;
  transition: background-color 70ms;

  &:hover {
    background-color: #393939;
  }

  .welcome__card-content {
    padding: 1rem 25% 1rem 1rem;
  }

  .welcome__card-icon {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 1rem;
    right: 1rem;
  }

  .welcome__card-image {
    position: absolute;
    width: 32px;
    height: 32px;
    bottom: 1rem;
    left: 1rem;
  }
}

.welcome__footer {
  .welcome__footer-list-item {
    padding: 1px 0;
    a {
      color: #f4f4f4;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.125rem;
      letter-spacing: 0.16px;

      &:not(:hover) {
        text-decoration: none;
      }
    }
  }

  .welcome__footer-info p,
  .welcome__footer-info ul {
    color: #f4f4f4;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.125rem;
    text-decoration: none;
    letter-spacing: 0.16px;
    padding-bottom: 1rem;

    a {
      color: #f4f4f4;
    }
  }

  .welcome__footer-logo {
    fill: #f4f4f4;
    margin: 2rem 0;
  }
}
</style>
