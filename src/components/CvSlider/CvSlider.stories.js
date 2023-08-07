import { ref } from 'vue';
import { action } from '@storybook/addon-actions';
import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { sbSliderPrefix } from './sbSliderPrefix';
import { CvSlider } from '.';

export default {
  title: `${sbCompPrefix}/${sbSliderPrefix}/CvSlider`,
  component: CvSlider,
  argTypes: {
    disabled: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'attributes',
      },
    },
    value: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    label: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description: 'Slider top label',
    },
    light: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    min: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description: 'Slider input min value',
    },
    max: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description: 'Slider input max value',
    },
    minLabel: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description: 'Label for min side of slider, otherwise min value used',
    },
    maxLabel: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description: 'Label for max side of slider, otherwise max value used',
    },
    step: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description: 'Slider input step value',
    },
    stepMultiplier: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description: 'multiplier > 1',
    },
  },

  // events
  change: {
    type: 'event',
    table: {
      type: { summary: 'event' },
      category: 'events',
    },
    control: { type: null },
  },
  'update:modelValue': {
    type: 'event',
    table: {
      type: { summary: 'event' },
      category: 'events',
    },
    control: { type: null },
  },
};

const template = `<cv-slider v-bind="args" @change="onChange"/>`;
const Template = args => {
  return {
    components: { CvSlider },
    setup: () => ({
      args,
      onChange: action('change'),
    }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

const vModelTemplate = `
  <cv-slider v-bind="args" v-model="modelValue" />

  <div style="margin-top:1rem; background-color: #888888; padding:1rem">
    <div style="font-size: 150%">
      Sample interaction
    </div>

    <input v-model="modelValue" type="string" />
    <div>
      Entered value:
      <span style="font-weight: bold;">{{modelValue}}</span>
    </div>
  </div>
`;

const VModelTemplate = args => {
  return {
    components: { CvSlider },
    setup: () => ({
      args,
      onChange: action('change'),
      modelValue: ref('15'),
    }),
    template: vModelTemplate,
  };
};

export const vModel = VModelTemplate.bind({});
vModel.args = {};
vModel.parameters = storyParametersObject(
  vModel.parameters,
  vModelTemplate,
  vModel.args
);
