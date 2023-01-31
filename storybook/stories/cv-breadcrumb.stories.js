import { /* deprecatedArgTypes, */ removeArgTypes } from '../utils/storybook-helper';

import { CvBreadcrumb, CvBreadcrumbItem, CvLink } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvBreadcrumb',
  component: CvBreadcrumb,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // ...deprecatedArgTypes(CvBreadcrumb),
    ...removeArgTypes(['default']),
  },
};

// these props are explicitly used by the component under test
const extractedProps = {};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvBreadcrumb, CvBreadcrumbItem, CvLink },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-breadcrumb v-bind="{...$props, ...extractedProps}" >
    <cv-breadcrumb-item>
      <cv-link href="#somewhere">Some text</cv-link>
    </cv-breadcrumb-item>
    <cv-breadcrumb-item>
      <cv-link href="parent">parent-link</cv-link>
    </cv-breadcrumb-item>
    <cv-breadcrumb-item>
      <cv-link href="#" aria-current="page">here</cv-link>
    </cv-breadcrumb-item>
    <cv-breadcrumb-item>
      <input type="text" class="bx--text-input bx--text-input--light" value="name of thing"></input>
    </cv-breadcrumb-item>
</cv-breadcrumb>`,
});

export const _CvBreadcrumb = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvBreadcrumb.args = {
  ariaLabel: 'Breadcrumb aria label',
};
