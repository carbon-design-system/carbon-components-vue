import { computed } from 'vue';
import {
  CvBreadcrumb,
  CvBreadcrumbItem,
  CvBreadcrumbSkeleton,
  CvBreadcrumbSkeletonItem,
} from '.';
import { storyParametersObject } from '../../global/storybook-utils';

export default {
  title: 'Component/CvBreadcrumb',
  component: CvBreadcrumb,
  argTypes: {
    ariaLabel: {
      control: { type: 'text' },
      table: {
        defaultValue: { summary: `"${CvBreadcrumb.props.ariaLabel.default}"` },
      },
    },
    noTrailingSlash: {
      control: { type: 'boolean' },
    },
  },
  args: {
    ariaLabel: CvBreadcrumb.props.ariaLabel.default,
    noTrailingSlash: false,
  },
};

const Template = (args, storyTemplate) => ({
  components: { CvBreadcrumb, CvBreadcrumbItem },
  setup() {
    return {
      ariaLabel: computed(() => args.ariaLabel),
      noTrailingSlash: computed(() => args.noTrailingSlash),
    };
  },
  template: storyTemplate,
});

const templateDefault = `
<cv-breadcrumb :aria-label="ariaLabel" :no-trailing-slash="noTrailingSlash">
  <cv-breadcrumb-item>Breadcrumb 1</cv-breadcrumb-item>
  <cv-breadcrumb-item>Breadcrumb 2</cv-breadcrumb-item>
  <cv-breadcrumb-item>Breadcrumb 3</cv-breadcrumb-item>
</cv-breadcrumb>
`;

export const Default = args => Template(args, templateDefault);
Default.args = {};
Default.parameters = storyParametersObject(null, templateDefault, {
  ariaLabel: '',
  noTrailingSlash: false,
});

// ======= Skeleton
const SkeletonTemplate = (args, storyTemplate) => ({
  components: { CvBreadcrumbSkeleton, CvBreadcrumbSkeletonItem },
  setup() {
    return {
      ariaLabel: computed(() => args.ariaLabel),
      noTrailingSlash: computed(() => args.noTrailingSlash),
    };
  },
  template: storyTemplate,
});

const skeletonTemplate = `
<cv-breadcrumb-skeleton :no-trailing-slash="noTrailingSlash">
  <cv-breadcrumb-skeleton-item />
  <cv-breadcrumb-skeleton-item />
  <cv-breadcrumb-skeleton-item />
</cv-breadcrumb-skeleton>
`;

export const Skeleton = args => SkeletonTemplate(args, skeletonTemplate);
Skeleton.args = {};
Skeleton.parameters = storyParametersObject(null, skeletonTemplate, {
  ariaLabel: '',
  noTrailingSlash: false,
});
