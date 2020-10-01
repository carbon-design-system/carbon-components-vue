import { storiesOf } from '@storybook/vue';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';
import TimerButton from '../_storybook/components/timer-button';

import CvFileUploaderNotesMD from '../../packages/core/src/components/cv-file-uploader/cv-file-uploader-notes.md';
import { CvFileUploader, CvFileUploaderSkeleton } from '../../packages/core/src/';
import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

const storiesDefault = storiesOf('Components/CvFileUploader', module);
// const storiesExperimental = storiesOf('Experimental/CvFileUploader', module);

let preKnobs = {
  kind: {
    group: 'attr',
    type: select,
    config: [
      'kind',
      {
        default: '',
        button: 'button',
        dragDrop: 'drag-drop',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'kind',
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Choose files to upload'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  helperText: {
    group: 'attr',
    type: text,
    config: ['helper text', 'Select the files you want to upload'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'helperText',
  },
  dropTargetLabel: {
    group: 'attr',
    type: text,
    config: ['drop target label', ''], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'drop-target-label',
  },
  dropTargetSlot: {
    group: 'slots',
    slot: 'drop-target',
    value: '<AddFilled16 /><strong>File Drop</strong><AddFilled16 />',
  },
  accept: {
    group: 'attr',
    type: text,
    config: ['accept', '.jpg,.png'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'accept',
  },
  clearOnReselect: {
    group: 'attr',
    type: boolean,
    config: ['Clear on reselect', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'clear-on-reselect',
  },
  initialStateUploading: {
    group: 'attr',
    type: boolean,
    config: ['Initial state uploading', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'initial-state-uploading',
  },
  multiple: {
    group: 'attr',
    type: boolean,
    config: ['multiple', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'multiple',
  },
  removable: {
    group: 'attr',
    type: boolean,
    config: ['removable', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'removable',
  },
  events: {
    group: 'attr',
    value: `@change="onChange" :files="storyFiles"`,
  },
  vModel: {
    group: 'attr',
    value: `v-model="storyFiles"`,
  },
  removeAriaLabel: {
    group: 'attr',
    type: text,
    config: ['remove-arial-label', 'Custom remove aria label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'remove-aria-label',
  },
};

let variants = [
  { name: 'default', excludes: ['events', 'vModel', 'dropTargetSlot'] },
  { name: 'minimal', includes: [] },
  { name: 'slot', excludes: ['events', 'vModel', 'dropTargetLabel'] },
  { name: 'events', excludes: ['vModel'] },
  { name: 'vModel', excludes: ['events'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-file-uploader${settings.group.attr} ref="fileUploader">${settings.group.slots}
</cv-file-uploader>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      ref="templateView"
      sv-margin
      sv-alt-back
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <TimerButton @timer-start="doStart" @timer-end="doEnd" label="Call focus() method" active-label-prefix="Call blur() method in" />
        <div v-if="vModelOrEvents">
          <ul>V-Model value</span>
            <li v-for="(item, index) in storyFiles" :key="index" style="list-style: initial;">
              <span>{{item.file.name}}: {{item.file.size}}</span>
              <button @click="setState(index, '')">No state</button>
              <button @click="setState(index, 'uploading')">uploading</button>
              <button @click="setState(index, 'complete')">complete</button>
              <button @click="toggleInvalidState(index)">toggle invalid</button>
              <button @click="remove(index)">remove</button>
            </li>
          </ul>
        </div>
        <button v-if="vModelOrEvents" @click="clear">Clear</button>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvFileUploader, SvTemplateView, AddFilled16, TimerButton },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            storyFiles: [],
            vModelOrEvents: settings.group.attr.indexOf('v-model') > 0 || settings.group.attr.indexOf('@change') > 0,
          };
        },
        methods: {
          actionChange: action('cv-file-uploader - change event'),
          onChange(changedFiles) {
            this.actionChange(changedFiles);
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
            // Alternative
            // this.storyFiles[index].invalidMessage = this.storyFiles[index].invalidMessage
            //   ? ''
            //   : 'Something went wrong.';
          },
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.blur();
          },
        },
      };
    },
    {
      notes: { markdown: CvFileUploaderNotesMD },
    }
  );
}

// cv-file-uploader-skeleton

preKnobs = {};

variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
        <cv-file-uploader-skeleton></cv-file-uploader-skeleton>
      `;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { CvFileUploaderSkeleton, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvFileUploaderNotesMD },
    }
  );
}
