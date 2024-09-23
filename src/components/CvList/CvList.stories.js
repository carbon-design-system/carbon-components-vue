import { CvList, CvListItem } from '.';

import { storyParametersObject } from '../../global/storybook-utils';

export default {
  title: 'Component/CvList',
  component: CvList,
  argTypes: {
    ordered: {
      control: { type: 'boolean' },
    },
    nested: {
      control: { type: 'boolean' },
    },
  },
};

const template = `<cv-list v-bind="args">
  <cv-list-item>List item 1</cv-list-item>
  <cv-list-item>List item 2</cv-list-item>
  <cv-list-item>List item 3</cv-list-item>
</cv-list>`;
const Template = args => ({
  components: { CvList, CvListItem },
  setup: () => ({ args }),
  template,
});

export const Unordered = Template.bind({});
Unordered.args = {};
Unordered.parameters = storyParametersObject(
  Unordered.parameters,
  template,
  Unordered.args
);

export const Ordered = Template.bind({});
Ordered.args = {
  ordered: true,
};
Ordered.parameters = storyParametersObject(
  Ordered.parameters,
  template,
  Ordered.args
);

const nestedTemplate = `<cv-list v-bind="args">
  <cv-list-item>
    List with no internal order
    <cv-list nested>
      <cv-list-item>Nested item 1</cv-list-item>
      <cv-list-item>Nested item 2</cv-list-item>
      <cv-list-item>Nested item 3</cv-list-item>
    </cv-list>
  </cv-list-item>
  <cv-list-item>
    List with ordered = false
    <cv-list nested :ordered="false">
      <cv-list-item>Nested item 1</cv-list-item>
      <cv-list-item>Nested item 2</cv-list-item>
      <cv-list-item>Nested item 3</cv-list-item>
    </cv-list>
  </cv-list-item>
  <cv-list-item>
    List with opposite ordering
    <cv-list nested :ordered="!args.ordered">
      <cv-list-item>Nested item 1</cv-list-item>
      <cv-list-item>Nested item 2</cv-list-item>
      <cv-list-item>Nested item 3</cv-list-item>
    </cv-list>
  </cv-list-item>
</cv-list>`;
const NestedTemplate = args => ({
  components: { CvList, CvListItem },
  setup: () => ({ args }),
  template: nestedTemplate,
});

export const Nested = NestedTemplate.bind({});
Nested.args = {};
Nested.parameters = storyParametersObject(
  Nested.parameters,
  nestedTemplate,
  Nested.args
);
