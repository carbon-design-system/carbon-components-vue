import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvModal } from '../../packages/core/src';

const labelText = [undefined, 'Label of modal'];
const titleText = [undefined, 'Title of modal'];
const content = [
  undefined,
  '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
  {
    label: 'Content with active element',
    value: `<div class="bx--form-item"><label for="text-input-3h9mddk235a" class="bx--label">Text Input label</label><input id="text-input-3h9mddk235a" type="text" class="bx--text-input" placeholder="Optional placeholder text" data-modal-primary-focus></div>`,
  },
];
const otherButton = [undefined, 'Other'];
const secondaryButton = [undefined, 'Secondary'];
const primaryButton = [undefined, 'Primary'];

const slotsInfo = [
  { slot: 'label', options: labelText, defaultIndex: 1 },
  { slot: 'title', options: titleText, defaultIndex: 1 },
  { slot: 'content', options: content, defaultIndex: 1 },
  { slot: 'other-button', options: otherButton },
  { slot: 'secondary-button', options: secondaryButton },
  { slot: 'primary-button', options: primaryButton },
];
const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvModal',
  component: CvModal,
  argTypes: {
    ...slotHelp.argTypes,
    ...deprecatedArgTypes(CvModal),
    ...removeArgTypes(['actionModalShown', 'actionModalHidden', 'actionModalAfterHidden']),
  },
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

const actionModalShown = action('modal-shown');
const actionModalHidden = action('modal-hidden');
const actionModalAfterHidden = action('after-modal-hidden');

const extractedProps = {
  actionModalShown: null,
  'modal-shown': null,
  actionModalHidden: null,
  'modal-hidden': null,
  actionModalAfterHidden: null,
  'after-modal-hidden': null,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvModal,
  },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-modal v-bind="{...$props, ...extractedProps}" @modal-shown="actionModalShown"
@modal-hidden="actionModalHidden" @after-modal-hidden="actionModalAfterHidden" ref="target">
  ${slotHelp.html}
  </cv-modal>
  <demo-methods :functions="[{name: 'show', info: 'Calls show only' }, {name: 'show', afterFunc: 'hide', info: 'Calls show and then hide after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvModal = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvModal.args = {
  actionModalShown,
  actionModalHidden,
  actionModalAfterHidden,
};

_CvModal.parameters = {
  docs: {
    source: betterSource(Template, _CvModal),
  },
};
