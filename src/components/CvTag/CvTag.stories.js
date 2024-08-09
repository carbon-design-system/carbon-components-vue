import CvTag from './CvTag.vue';
import { tagKinds } from './consts.js';
import { action } from '@storybook/addon-actions';
import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import {
  DataDefinition20,
  Bee20,
  Carbon20,
  Watson20,
  IbmCloud20,
  EdtLoop20,
  IbmSecurity20,
} from '@carbon/icons-vue';

const icons = {
  DataDefinition20,
  Bee20,
  Carbon20,
  Watson20,
  IbmCloud20,
  EdtLoop20,
  IbmSecurity20,
  undefined,
};

export default {
  title: `${sbCompPrefix}/CvTag`,
  component: CvTag,
  argTypes: {
    kind: { control: 'select', options: tagKinds },
    renderIcon: { control: { type: 'select', options: Object.keys(icons) } },
  },
};

const template = `<cv-tag @remove="onRemove" v-bind="args" />`;
const Template = (argsIn, { argTypes }) => {
  let args = { ...argsIn, renderIcon: icons[argsIn.renderIcon] };
  return {
    props: Object.keys(argTypes),
    components: { CvTag },
    template,
    setup() {
      return {
        args,
        onRemove: action('remove'),
      };
    },
  };
};

export const Default = Template.bind({});
Default.args = {
  label: 'Hugo Award winner',
  filter: false,
};
Default.parameters = {
  controls: {
    exclude: ['remove'],
  },
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

export const Filter = Template.bind({});
Filter.args = {
  label: 'Filter House',
  filter: true,
  kind: 'high-contrast',
};
Filter.parameters = {
  controls: {
    exclude: ['remove'],
  },
};
Filter.parameters = storyParametersObject(
  Filter.parameters,
  template,
  Filter.args
);

export const Skeleton = Template.bind({});
Skeleton.args = {
  skeleton: true,
  label: '',
};
Skeleton.parameters = {
  controls: {
    include: ['small'],
  },
};
Skeleton.parameters = storyParametersObject(
  Skeleton.parameters,
  template,
  Skeleton.args
);

export const TagIcon = Template.bind({});
TagIcon.args = {
  renderIcon: 'DataDefinition20',
  label: 'Steampunk',
};
TagIcon.parameters = {
  controls: {
    include: ['renderIcon'],
  },
};
TagIcon.parameters = storyParametersObject(
  TagIcon.parameters,
  template,
  TagIcon.args
);
