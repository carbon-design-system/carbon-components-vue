<template>
  <div
    data-tile="expandable"
    :class="[
      `cv-tile-expandable ${carbonPrefix}--tile--expandable`,
      { [`${carbonPrefix}--tile--is-expanded`]: internalExpanded },
    ]"
    ref="target"
    tabindex="0"
    :style="styleObject"
    @click="toggle"
    @keydown.enter.prevent="toggle"
    @keydown.space.prevent
    @keyup.space.prevent="toggle"
  >
    <button type="button" :class="`${carbonPrefix}--tile__chevron`">
      <ChevronDown16 />
    </button>
    <div :class="`${carbonPrefix}--tile-content`">
      <span data-tile-atf :class="`${carbonPrefix}--tile-content__above-the-fold`" ref="aboveFold">
        <slot>
          <!-- Above the fold content here -->
        </slot>
      </span>
      <span
        :class="`${carbonPrefix}--tile-content__below-the-fold`"
        ref="belowFold"
        v-show="internalExpanded || initialized"
      >
        <slot name="below">
          <!-- Rest of the content here -->
        </slot>
      </span>
    </div>
  </div>
</template>

<script>
import ChevronDown16 from '@carbon/icons-vue/es/chevron--down/16';
import { carbonPrefixMixin, methodsMixin } from '../../mixins';

export default {
  name: 'CvTileExpandable',
  mixins: [carbonPrefixMixin, methodsMixin({ target: ['blur', 'focus'] })],
  props: {
    expanded: Boolean,
  },
  components: { ChevronDown16 },
  data() {
    return {
      styleObject: {
        maxHeight: 'initial',
      },
      initialized: false,
      internalExpanded: this.expanded,
    };
  },
  watch: {
    expanded(val) {
      if (val !== this.internalExpanded) {
        this.toggle(val);
      }
    },
  },
  methods: {
    toggle(force) {
      let currentHeight = this.$el.getBoundingClientRect().height;
      if (!this.initialized) {
        this.styleObject.maxHeight = `${currentHeight}px`;
        this.initialized = true;
      }

      this.$nextTick(() => {
        const forceType = typeof force;
        this.internalExpanded = forceType === 'boolean' ? force : !this.internalExpanded;

        const belowFoldHeight = this.$refs.belowFold.getBoundingClientRect().height;

        if (this.internalExpanded) {
          currentHeight += belowFoldHeight;
        } else {
          currentHeight -= belowFoldHeight;
        }
        this.styleObject.maxHeight = `${currentHeight}px`;
      });
    },
  },
};
</script>
