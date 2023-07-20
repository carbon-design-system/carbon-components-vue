import { Canvas, Meta, Story } from '@storybook/addon-docs';
import CvInlineLoading from './CvInlineLoading.vue';
import { sbCompPrefix } from '../../global/storybook-utils';

<Meta title={`${sbCompPrefix}/CvInlineLoading`} component={CvInlineLoading} />

export const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: {
    CvInlineLoading,
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return {
      description: args.description,
      errorText: args.errorText,
      endingText: args.endingText,
      loadingText: args.loadingText,
      loadedText: args.loadedText,
      state: args.state,
    };
  },
  template: args.template,
});
const defaultTemplate = `
  <cv-inline-loading
  :description="description"
  :ending-text="endingText"
  :error-text="errorText"
  :loading-text="loadingText"
  :loaded-text="loadedText"
  :state="state" />
`;

# CvInlineLoading

Migration notes:

- The `active` property is still available but does not actually work. Please use the `state` property instead.
- The state has two new values to make it easier to transition form `loading` to either `loaded` or `error`.
  Setting `state` to "ending:loaded" or "ending:error" will first set the `ending` state and then, when
  the ending animation completes, the `loaded` or `error` state.
- The states can be imported like `import { STATES } from "@/components/CvInlineLoading";` and used
  as:
  - `STATES.LOADING`
  - `STATES.ENDING`
  - `STATES.LOADED`
  - `STATES.ERROR`
  - `STATES.ENDING_LOADED`
  - `STATES.ENDING_ERROR`

<Canvas>
  <Story
    name="Default"
    parameters={{
      controls: {
        exclude: ['template'],
      },
      docs: { source: { code: defaultTemplate } },
    }}
    args={{
      template: defaultTemplate,
      endingText: 'Jumping to warp 9',
      description: 'Warp engine status',
      errorText: 'Warp drive is damaged',
      loadingText: 'Warp drive coming online...',
      loadedText: 'Warp drive engaged',
      state: 'loading',
    }}
    argTypes={{
      state: {
        control: 'select',
        default: 'loading',
        options: [
          'loading',
          'ending',
          'loaded',
          'error',
          'ending:loaded',
          'ending:error',
        ],
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>
