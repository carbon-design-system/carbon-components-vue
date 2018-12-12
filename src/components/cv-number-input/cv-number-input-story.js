import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvNumberInputNotesMD from './cv-number-input-notes.md';
import CvNumberInput from './cv-number-input';

const stories = storiesOf('CvNumberInput', module);
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
  invalidMessage: {
    group: 'content',
    type: text,
    config: ['slot:Invalid message', '', consts.CONTENT],
    value: val =>
      val.length
        ? `
  <template slot="invalid-message">
    ${val}
  </template>`
        : '',
  },
  helperText: {
    group: 'content',
    type: text,
    config: ['slot:Helper text', '', consts.CONTENT],
    value: val =>
      val.length
        ? `
  <template slot="helper-text">
    ${val}
  </template>`
        : '',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false, consts.CONFIG],
    value: val => (val ? '\n  disabled' : ''),
  },
  invalid: {
    group: 'attr',
    type: boolean,
    config: ['invalid', false, consts.CONFIG],
    value: val => (val ? '\n  invalid' : ''),
  },
  value: {
    group: 'attr',
    type: text,
    config: ['initial-value', '', consts.CONFIG],
    value: val => (val.length ? `\n  initial-value="${val}"` : ''),
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
  @change="onChange"`
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
    withNotes(CvNumberInputNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-number-input${settings.group.attr}>${settings.group.content}
</cv-number-input>
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
            modelValue: '100',
            light: settings.raw.light,
          };
        },
        components: { CvNumberInput, SvTemplateView },
        template: templateViewString,
        methods: {
          onChange: action('cv-number-input - change event'),
        },
      };
    })
  );
}
