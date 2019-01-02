import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvTextAreaNotesMD from './cv-text-area-notes.md';
import CvTextArea from './cv-text-area';

const stories = storiesOf('CvTextArea', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const kinds = null;
const preKnobs = {
  light: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false, consts.CONFIG],
    value: val => (val ? '\n  theme="light"' : ''),
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Text area label', consts.CONTENT],
    value: val => (val.length ? `\n  label="${val}"` : ''),
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false, consts.CONFIG],
    value: val => (val ? '\n  disabled' : ''),
  },
  vModel: {
    group: 'attr',
    type: boolean,
    config: ['v-model', false, consts.OTHER],
    value: val => (val ? '\n  v-model="modelValue"' : ''),
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
<cv-text-area${settings.group.attr}>
</cv-text-area>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      :sv-alt-back="!light"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div class="v-model-example" v-if="${settings.raw.vModel}">
          <label>Model value:
            <textarea v-model="modelValue"></textarea>
          </label>
        </div>
      </template>
      </sv-template-view>
  `;

      return {
        data() {
          return {
            modelValue: 'initial value',
            light: settings.raw.light,
          };
        },
        components: { CvTextArea, SvTemplateView },
        template: templateViewString,
        methods: {
          onInput: action('cv-text-area - input event'),
        },
      };
    },
    {
      notes: { markdown: CvTextAreaNotesMD },
    }
  );
}
