import CvLoading from '.';

import { ref, computed } from 'vue';
import { action } from '@storybook/addon-actions';
import { sbCompPrefix, storyParametersObject } from '@/global/storybook-utils';

export default {
  title: `${sbCompPrefix}/CvLoading`,
  component: CvLoading,
  argTypes: {
    'loading-end': {
      control: { type: 'none' },
      description:
        'Raised after the exit animation has concluded, when loading or end are used to deactivate the loader. This is to allow parents to discard the component if needed.',
    },
    active: {
      control: { type: 'none' },
    },
  },
};

const template = `<div>
<div style="width: 7rem; height: 7rem">
<cv-loading @loading-end="onLoadingEnd" v-bind="args" :active="isActive" />
</div>
<button @click="makeActive" :disabled="isActive" style="margin-top: 2rem;">{{buttonLabel}}</button>
</div>`;
let isActive = ref(false);
let countDown = ref(0);
const buttonLabel = computed(() => {
  if (isActive.value) {
    return `Active: ${countDown.value}s`;
  } else {
    return 'Make active';
  }
});
function runCountDown() {
  setTimeout(() => {
    countDown.value--;
    if (countDown.value <= 0) {
      isActive.value = false;
    } else {
      runCountDown();
    }
  }, 1000);
}
function makeActive() {
  isActive.value = true;
  countDown.value = 5;
  runCountDown();
}

const Template = args => ({
  components: { CvLoading },
  setup: () => ({
    args,
    onLoadingEnd: action('loading-end'),
    isActive,
    makeActive,
    countDown,
    buttonLabel,
  }),
  template,
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
