<template>
  <main
    class="sv-template-view"
    :class="[
      {
        'sv-template-view--margin': svMargin,
        'sv-template-view--alt-back': svAltBack,
      },
    ]"
  >
    <section class="sv-template-view__component" :style="style">
      <slot name="component"></slot>
      <br />
    </section>
    <section class="sv-template-view__other">
      <h2 class="sv-tempate-view__label">Sample interaction</h2>
      <slot name="other"></slot>
    </section>
    <section class="sv-template-view__code">
      <h2 class="sv-tempate-view__label">Sample code</h2>
      <pre v-highlightjs="svSource">
        <code class="html"></code>
      </pre>
      <h2 class="sv-tempate-view__label">Sample props</h2>
      <pre v-highlightjs="propsJSON">
        <code class="json"></code>
      </pre>
      <button
        @click="sourceToClipboard"
        title="Copy to clipboard"
        class="sv-template-view__copy"
        ref="copyButton"
      >
        <svg width="18" height="24" viewBox="0 0 18 24" fill-rule="evenodd">
          <path
            d="M13 5V0H0v19h5v5h13V5h-5zM2 17V2h9v3H5v12H2zm14 5H7V7h9v15z"
          ></path>
          <path d="M9 9h5v2H9zM9 12h5v2H9zM9 15h3v2H9z"></path>
        </svg>
      </button>
      <textarea
        class="sv-template-view__clippy"
        aria-hidden="true"
        ref="clippy"
      ></textarea>
    </section>
  </main>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'SvTemplateView',
  props: {
    svMargin: { type: Boolean, default: true },
    svSource: String,
    svAltBack: Boolean,
    svPosition: String, // flex position
  },
  data() {
    return {
      propsJSON: '',
    };
  },
  computed: {
    style() {
      return {
        alignItems:
          this.svPosition && this.svPosition.length
            ? this.svPosition
            : 'flex-start',
      };
    },
  },
  mounted() {
    this.propsJSON = JSON.stringify(
      this.$vnode.context.$options.propsData,
      null,
      2
    );
  },
  updated() {
    this.propsJSON = JSON.stringify(
      this.$vnode.context.$options.propsData,
      null,
      2
    );
  },
  methods: {
    sourceToClipboard() {
      this.$refs.copyButton.classList.remove('sv-template-view__copy--copied');
      this.$refs.clippy.value = this.svSource;
      this.$refs.clippy.select();
      document.execCommand('copy');
      Vue.nextTick(
        this.$refs.copyButton.classList.add('sv-template-view__copy--copied')
      );
    },
    method(methodName) {
      const result = this.$slots.component[0].componentInstance[methodName];
      if (!result) {
        // console.dir(this.$slots.component[0].componentInstance);
        return () => {
          console.warn(
            `sv-template-view: Method ${methodName} does not exist.`
          );
        };
      }
      return result;
    },
  },
};
</script>

<style lang="scss">
@import '~carbon-components/scss/globals/scss/styles.scss';
@import '~highlight.js/styles/default.css';

$back-color: #f5f7fa;
$alt-back-color: #fff;
$border: 1px solid #dfe3e6;

.sv-template-view__component {
  display: flex;
  flex-direction: column;
  border: $border;
  background-color: $back-color;
  .sv-template-view--margin & {
    position: relative; // needed to keep modal components on top
    z-index: 999; // needed to keep modal components on top
    margin: 40px;
    padding: 20px;
  }

  .sv-center {
  }
  .sv-template-view--alt-back & {
    background-color: $alt-back-color;
  }
  > .bx--form-item {
    // only for
    margin-bottom: 1.5rem;
  }
}

.sv-template-view__other {
  margin: 5px 40px;
}

.sv-template-view__code {
  position: relative;
  .sv-template-view--margin & {
    margin: 40px;
  }
  .html {
    padding: 40px;
  }
  .hljs {
    border: $border;
    background-color: $alt-back-color;
  }
}
@keyframes copied {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.sv-template-view__copy {
  position: absolute;
  top: 38px;
  left: 0;
  &.sv-template-view__copy--copied::after {
    content: 'Copied!';
    display: block;
    position: absolute;
    top: 8px;
    left: 40px;
    animation: copied 1s linear;
    opacity: 0;
  }
}
.sv-template-view__clippy {
  position: absolute;
  opacity: 0;
}

.sv-tempate-view__label {
  font-size: 18px;
  margin-bottom: 1em;
}

.sv-template-view__code {
  .sv-tempate-view__label {
    margin: 0;
  }
}
</style>
