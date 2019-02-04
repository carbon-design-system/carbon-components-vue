import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvFileUploaderNotesMD from './cv-file-uploader-notes.md';
import CvFileUploader from './cv-file-uploader';

const stories = storiesOf('CvFileUploader', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Choose files to upload'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: { name: 'label', type: String },
  },
  helperText: {
    group: 'attr',
    type: text,
    config: ['helper text', 'Select the files you want to upload'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: { name: 'helperText', type: String },
  },
  buttonLabel: {
    group: 'attr',
    type: text,
    config: ['button label', 'Add file'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: { name: 'buttonLabel', type: String },
  },
  accept: {
    group: 'attr',
    type: text,
    config: ['accept', '.jpg,.png'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'accept', type: String },
  },
  clearOnReselect: {
    group: 'attr',
    type: boolean,
    config: ['Clear on reselect', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'clear-on-reselect', type: Boolean },
  },
  initialStateUploading: {
    group: 'attr',
    type: boolean,
    config: ['Initial state uploading', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'initial-state-uploading', type: Boolean },
  },
  multiple: {
    group: 'attr',
    type: boolean,
    config: ['multiple', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'multiple', type: Boolean },
  },
  removable: {
    group: 'attr',
    type: boolean,
    config: ['removable', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'removable', type: Boolean },
  },
  events: {
    group: 'attr',
    value: `@change="onChange" :files="storyFiles"`,
  },
  vModel: {
    group: 'attr',
    value: `v-model="storyFiles"`,
  },
};

const variants = [
  { name: 'default', excludes: ['events', 'vModel'] },
  { name: 'minimal', includes: [] },
  { name: 'events', excludes: ['vModel'] },
  { name: 'vModel', excludes: ['events'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-file-uploader${settings.group.attr}>
</cv-file-uploader>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-alt-back
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div v-if="vModelOrEvents">
          <ul>V-Model value</span>
            <li v-for="(item, index) in storyFiles" :key="index" style="list-style: initial;">
              <span>{{item.file.name}}: {{item.file.size}}</span>
              <button @click="setState(index, '')">No state</button>
              <button @click="setState(index, 'uploading')">uploading</button>
              <button @click="setState(index, 'complete')">complete</button>
              <button @click="remove(index)">remove</button>
            </li>
          </ul>
        </div>
        <button v-if="vModelOrEvents" @click="clear">Clear</button>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvFileUploader, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            storyFiles: [],
            vModelOrEvents:
              settings.group.attr.indexOf('v-model') > 0 ||
              settings.group.attr.indexOf('@change') > 0,
          };
        },
        methods: {
          actionChange: action('cv-file-uploader - change event'),
          onChange(changedFiles) {
            this.actionChange(changedFiles);
            this.storyFiles = changedFiles;
          },
          setState(index, state) {
            this.storyFiles[index].state = state;
          },
          remove(index) {
            this.storyFiles.splice(index, 1);
          },
          clear() {
            this.storyFiles = [];
          },
        },
      };
    },
    {
      notes: { markdown: CvFileUploaderNotesMD },
    }
  );
}
