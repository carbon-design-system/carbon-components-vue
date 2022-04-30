import {
  CvBreadcrumb,
  CvBreadcrumbItem,
  CvBreadcrumbSkeleton,
  CvBreadcrumbSkeletonItem,
} from '.';

import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

export default {
  title: `${sbCompPrefix}/CvBreadcrumb`,
  component: CvBreadcrumb,
  argTypes: {
    ariaLabel: {
      control: { type: 'text' },
      defaultValue: CvBreadcrumb.props.ariaLabel.default,
      table: {
        defaultValue: { summary: `"${CvBreadcrumb.props.ariaLabel.default}"` },
      },
    },
    noTrailingSlash: {
      control: { type: 'boolean' },
    },
  },
};

const template = `<cv-breadcrumb v-bind="args">
  <cv-breadcrumb-item>Breadcrumb 1</cv-breadcrumb-item>
  <cv-breadcrumb-item>Breadcrumb 2</cv-breadcrumb-item>
  <cv-breadcrumb-item>Breadcrumb 3</cv-breadcrumb-item>
</cv-breadcrumb>`;
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvBreadcrumb, CvBreadcrumbItem },
  setup() {
    return { args };
  },
  template,
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

const skeletonTemplate = `<cv-breadcrumb-skeleton v-bind="args">
  <cv-breadcrumb-skeleton-item />
  <cv-breadcrumb-skeleton-item />
  <cv-breadcrumb-skeleton-item />
</cv-breadcrumb-skeleton>`;
const SkeletonTemplate = args => ({
  props: ['noTrailingSlash'],
  components: { CvBreadcrumbSkeleton, CvBreadcrumbSkeletonItem },
  setup() {
    return { args };
  },
  template: skeletonTemplate,
});

export const Skeleton = SkeletonTemplate.bind({});
Skeleton.args = {};
Skeleton.argTypes = {
  ariaLabel: { table: { disable: true } },
};
Skeleton.parameters = storyParametersObject(
  Skeleton.parameters,
  template,
  Skeleton.args
);
