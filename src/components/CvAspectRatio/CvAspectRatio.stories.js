import { h } from 'vue';
import { storyParametersObject } from '../../global/storybook-utils';

import { CvAspectRatio, CvAspectRatioConsts } from '.';

import './CvAspectRatio.stories.scss';

export default {
  title: 'Component/CvAspectRatio',
  component: CvAspectRatio,
  decorators: [
    story => h('div', { class: 'aspect-ratio-story' }, story().render()),
  ],
  argTypes: {
    ratio: {
      control: { type: 'select' },
      options: CvAspectRatioConsts.aspectRatios,
      defaultValue: CvAspectRatioConsts.aspectRatios[0],
      table: {
        defaultValue: { summary: `"${CvAspectRatioConsts.aspectRatios[0]}"` },
      },
    },
    width: {
      control: { type: 'range', min: 200, max: 500 },
      description: 'Width of container around `CvAspectRatio`',
    },
  },
};

const template = `<div class="width-container" :style="{ width: args.width + 'px' }">Container width: {{ args.width }}px
  <cv-aspect-ratio v-bind="args">
    Content<br />
    Width-based only!
  </cv-aspect-ratio>
</div>
`;
const Template = args => {
  return {
    components: { CvAspectRatio },
    setup: () => ({ args }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = {
  width: 200,
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
