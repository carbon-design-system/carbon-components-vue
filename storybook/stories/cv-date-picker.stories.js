import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvDatePicker } from '../../packages/core/src/';

const invalidMessage = [undefined, 'Invalid message takes precedence over use of "invalidMessage" prop.'];

const slotsInfo = [{ slot: 'invalid-message', options: invalidMessage }];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvDatePicker',
  component: CvDatePicker,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...slotHelp.argTypes,
    ...deprecatedArgTypes(CvDatePicker),
    ...removeArgTypes(['actionChange', 'modelEvent', 'v-model']),
    dateEndLabel: { description: 'Only required for kind range' },
  },
}; // will have dif wrapped round it in story template

const actionChange = action('change');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvDatePicker },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-date-picker v-bind="{...$props, ...extractedProps}" @change="actionChange">
    ${slotHelp.html}
  </cv-date-picker>
</div>`,
});

export const _CvDatePicker = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvDatePicker.args = {
  actionChange,
  id: 'an ID',
  dateLabel: 'Date label',
  pattern: '\\d{12}/\\d{12}/\\d{4}',
  placeholder: 'mm/dd/yyyy',
};

_CvDatePicker.parameters = {
  docs: {
    source: betterSource(Template, _CvDatePicker),
  },
};

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvDatePicker },
  data() {
    return { value: '', range: { startDate: '', endDate: '' }, extractedProps: extractedPropsWithVModel };
  },
  computed: {
    ...slotHelp.computed,
  },
  methods: {
    addDay(which) {
      let splitDate = this.value[which].split('/');
      let newValue = { ...this.value };
      splitDate[1] = 1 + parseInt(splitDate[1]);
      if (splitDate[1] < 10) {
        splitDate[1] = '0' + splitDate[1];
      }
      newValue[which] = splitDate.join('/');
      this.value = newValue;
    },
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-date-picker v-bind="{...$props, ...extractedProps}"
    v-model="value">
    ${slotHelp.html}
  </cv-date-picker>
  <demo-container>
    <label>A standard HTML input control
      <input v-if="$props.kind !== 'range'" type="text" v-model="value"></input>
    </label>
    <br><br>
    <span>Current value: {{ JSON.stringify(value) }}</span>
  </demo-container>
</div>`,
});

export const CvDatePickerWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvDatePickerWithVModel.args = {
  actionChange,
  id: 'an ID',
  light: false,
  dateLabel: 'Date label',
  pattern: '\\d{12}/\\d{12}/\\d{4}',
  placeholder: 'mm/dd/yyyy',
};
CvDatePickerWithVModel.parameters = { controls: { include: ['kind'] } };
