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
    value: `@change="onChange"`,
  },
};

const variants = [
  { name: 'default', excludes: ['events'] },
  { name: 'minimal', includes: [] },
  { name: 'events', includes: ['value', 'events'] },
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
        <label>Index<input class="file-index" type="number" value="0" /></label>
        <label>State
          <select class="file-state">
            <option value="">''</option>
            <option value="complete">complete</option>
            <option value="uploading">uploading</option>
          </select>
        </label>
        <button @click="setState">Set state</button>
        <button @click="remove">Remove</button>
        <button @click="clear">Clear all</button>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvFileUploader, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        methods: {
          onChange: action('cv-file-uploader - change event'),
          setState() {
            const index = parseInt(
              document.querySelector('.file-index').value,
              10
            );
            const state = document.querySelector('.file-state').value;

            try {
              // setState with index
              this.$children[0].$children[0].setState(index, state);

              // setState directly on file object
              // this.$children[0].$children[0].files[index].setState(state);
            } catch (err) {
              // ignore;
            }
          },
          remove() {
            const index = parseInt(
              document.querySelector('.file-index').value,
              10
            );
            try {
              // remove with index
              // this.$children[0].$children[0].remove(index);

              // remove directly on file object
              this.$children[0].$children[0].files[index].remove();
            } catch (err) {
              // ignore;
            }
          },
          clear() {
            this.$children[0].$children[0].clear();
          },
        },
      };
    },
    {
      notes: { markdown: CvFileUploaderNotesMD },
    }
  );
}
