import { CvCodeSnippet } from '../../packages/core/src/';
import { deprecatedArgTypes, removeArgTypes } from '../utils/storybook-helper';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvCodeSnippet',
  component: CvCodeSnippet,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...deprecatedArgTypes(CvCodeSnippet),
    // ...removeArgTypes(['kind']),
    default: {
      description: 'This component hosts children as content in the default slot.',
    },
  },
};

// these props are explicitly used by the component under test
const extractedProps = { kind: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvCodeSnippet },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template:
    '<cv-code-snippet v-bind="{...$props, ...extractedProps}" :kind="$props.kind">printf("A short bit of code.");</cv-code-snippet>',
});

export const CvCodeSnippetInline = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvCodeSnippetInline.args = {
  kind: 'inline',
};

export const CvCodeSnippetOneLine = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvCodeSnippetOneLine.args = {
  kind: 'oneline',
};

const TemplateMultiline = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvCodeSnippet },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-code-snippet v-bind="{...$props, ...extractedProps}" :kind="$props.kind">
@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);

  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
    padding-left: padding(xs);
  }
}

$z-indexes: (
  modal : 9000,
  overlay : 8000,
  dropdown : 7000,
  header : 6000,
  footer : 5000,
  hidden : - 1,
  overflowHidden: - 1,
  floating: 10000
);
  </cv-code-snippet>`,
});

export const CvCodeSnippetMultiLine = TemplateMultiline.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvCodeSnippetMultiLine.args = {
  kind: 'multiline',
};
