import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvFileUploaderNotesMD from './cv-file-uploader-notes.md';
import CvFileUploader from './cv-file-uploader';

const stories = storiesOf('CvFileUploader', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  label: text('label', 'Add file', consts.CONTENT),
  accept: text('accept', '.jpg,.png', consts.CONFIG),
  clearOnReselect: boolean('Clear on reselect', false, consts.CONFIG)
    ? '\n  clear-on-reselect'
    : '',
  initialStateUploading: boolean(
    'Initial state uploading',
    false,
    consts.CONFIG
  )
    ? '\n  initial-state-uploading'
    : '',
  multiple: boolean('multiple', false, consts.CONFIG) ? '\n  multiple' : '',
  removable: boolean('removable', false, consts.CONFIG) ? '\n  removable' : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvFileUploaderNotesMD)(() => {
    const settings = knobs();

    settings.label = settings.label.length ? `${settings.label}` : '';
    settings.accept = settings.accept.length
      ? `\n  accept="${settings.accept}"`
      : '';
    settings.listeners = '\n   @input="onInput"';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-file-uploader${settings.accept}${settings.clearOnReselect}${
      settings.initialStateUploading
    }${settings.multiple}${settings.removable}${settings.otherAttributes}
  label="${settings.label}" ${settings.listeners}>
</cv-file-uploader>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
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
      data() {
        return {
          modelValue: 'initial value',
        };
      },
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
  })
);
