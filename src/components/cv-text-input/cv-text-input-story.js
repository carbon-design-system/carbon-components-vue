import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvTextInputNotesMD from './cv-text-input-notes.md';
import CvTextInput from './cv-text-input';

const stories = storiesOf('CvTextInput', module);
stories.addDecorator(withKnobs);

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
    config: ['label', 'Text input label', consts.CONTENT],
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
  otherAttributes: {
    group: 'attr',
    type: text,
    config: ['other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    withNotes(CvTextInputNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-text-input${settings.group.attr}>
</cv-text-input>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      :sv-alt-back="!light"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <span class="v-model-example" v-if="${
          settings.raw.vModel
        }">Model value: {{modelValue}}</span>
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
        components: { CvTextInput, SvTemplateView },
        template: templateViewString,
        methods: {
          onInput: action('cv-text-input - input event'),
        },
      };
    })
  );
}
