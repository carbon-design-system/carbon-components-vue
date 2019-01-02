import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvFileUploaderNotesMD from './cv-file-uploader-notes.md';
import CvFileUploader from './cv-file-uploader';

const stories = storiesOf('CvFileUploader', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const kinds = null;

const preKnobs = {
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Add file', consts.CONTENT],
    value: val => (val.length ? `\n  label="${val}"` : ''),
  },
  accept: {
    group: 'attr',
    type: text,
    config: ['accept', '.jpg,.png', consts.CONFIG],
    value: val => (val.length ? `\n  accept="${val}"` : ''),
  },
  clearOnReselect: {
    group: 'attr',
    type: boolean,
    config: ['Clear on reselect', false, consts.CONFIG],
    value: val => (val ? '\n  clear-on-reselect' : ''),
  },
  initialStateUploading: {
    group: 'attr',
    type: boolean,
    config: ['Initial state uploading', false, consts.CONFIG],
    value: val => (val ? '\n  initial-state-uploading' : ''),
  },
  multiple: {
    group: 'attr',
    type: boolean,
    config: ['multiple', false, consts.CONFIG],
    value: val => (val ? '\n  multiple' : ''),
  },
  removable: {
    group: 'attr',
    type: boolean,
    config: ['removable', false, consts.CONFIG],
    value: val => (val ? '\n  removable' : ''),
  },
  events: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @input="onInput"`
        : '',
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

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
        methods: {
          onInput: action('cv-file-uploader - input event'),
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
