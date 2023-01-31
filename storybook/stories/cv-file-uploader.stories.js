import Vue from 'vue';
import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvFileUploader } from '../../packages/core/src/';
import { AddFilled16 } from '@carbon/icons-vue';

const dropTarget = [undefined, '<AddFilled16 /><strong>File Drop</strong><AddFilled16 />'];

Vue.component('drop-target-content', {
  components: { AddFilled16 },
  template: `<div style="width: 100%; display: flex; justify-content: space-between;"><AddFilled16 /><strong>File Drop</strong><AddFilled16 /></div>`,
});

const slotsInfo = [{ slot: 'drop-target', options: dropTarget, containsComponent: true }];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvFileUploader',
  component: CvFileUploader,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...slotHelp.argTypes,
    ...deprecatedArgTypes(CvFileUploader),
    ...removeArgTypes(['actionChange', 'modelEvent', 'v-model', 'drop-target', 'input', 'change']),
  },
};

const actionChange = action('change');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvFileUploader, AddFilled16 },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-file-uploader v-bind="{...$props, ...extractedProps}" @change="actionChange" ref="target">
    ${slotHelp.html}
  </cv-file-uploader>
  <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvFileUploader = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvFileUploader.args = {
  actionChange,
  kind: '',
  label: 'Choose files to upload',
  helperText: 'Select the files you want to upload',
  dropTargetLabel: '',
  accept: '.jpg,.png',
  clearOnReselect: false,
  initialStateUploading: false,
  multiple: false,
  removable: false,
  removeAriaLabel: 'Custom remove aria label',
};

_CvFileUploader.parameters = {
  docs: {
    source: betterSource(Template, _CvFileUploader),
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvFileUploader, AddFilled16 },
  data() {
    return {
      extractedProps,
      storyFiles: [],
    };
  },
  methods: {
    onChange(changedFiles) {
      // this.actionChange(changedFiles);
      this.storyFiles = changedFiles;
    },
    setState(index, state) {
      this.$refs.fileUploader.setState(index, state);
      // alternative
      // this.storyFiles[index].state = state;
    },
    remove(index) {
      this.$refs.fileUploader.remove(index);
      // alternative
      // this.storyFiles.splice(index, 1);
    },
    clear() {
      this.$refs.fileUploader.clear();
      // alternative
      // this.storyFiles = [];
    },
    toggleInvalidState(index) {
      this.$refs.fileUploader.setInvalidMessage(
        index,
        this.storyFiles[index].invalidMessage ? '' : 'Something went wrong.'
      );
    },
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
    <cv-file-uploader v-bind="{...$props, ...extractedProps}" @change="actionChange" v-model="storyFiles" ref="fileUploader">
      ${slotHelp.html}
    </cv-file-uploader>
    <demo-container>
      <p>Standard HTML components use for v-model demo</p>
      <li v-for="(item, index) in storyFiles" :key="index" style="list-style: initial;">
        <span>{{item.file.name}}: {{item.file.size}}</span>
        <button type="button" @click="setState(index, '')">No state</button>
        <button type="button" @click="setState(index, 'uploading')">uploading</button>
        <button type="button" @click="setState(index, 'complete')">complete</button>
        <button type="button" @click="toggleInvalidState(index)">toggle invalid</button>
        <button type="button" @click="remove(index)">remove</button>
      </li>
      <button type="button" @click="clear">Clear</button>
    </demo-container>
  </div>`,
});

export const CvFileUploaderWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvFileUploaderWithVModel.args = {
  actionChange,
  kind: '',
  label: 'Choose files to upload',
  helperText: 'Select the files you want to upload',
  dropTargetLabel: '',
  accept: '.jpg,.png',
  clearOnReselect: false,
  initialStateUploading: false,
  multiple: false,
  removable: false,
  removeAriaLabel: 'Custom remove aria label',
};
