import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvNumberInputNotesMD from './cv-number-input-notes.md';
import CvNumberInput from './cv-number-input';

const stories = storiesOf('CvNumberInput', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  theme: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'theme',
      value: val => (val ? 'light' : ''),
    },
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Text input label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'label',
    },
  },
  invalidMessage: {
    group: 'attr',
    type: text,
    config: ['invalid message', ''],
    prop: {
      name: 'invalid-message',
      type: String,
      value: val => (val.length ? val : null),
    },
  },
  invalidMessageSlot: {
    group: 'content',
    slot: {
      name: 'invalid-message',
      value: 'Invalid message slot overrides the invalid-message property',
    },
  },
  helperText: {
    group: 'attr',
    type: text,
    config: ['helper text', ''],
    prop: {
      name: 'helper-text',
      type: String,
      value: val => (val.length ? val : null),
    },
  },
  helperTextSlot: {
    group: 'content',
    slot: {
      name: 'helper-text',
      value:
        'This is a helpful slot overrides the property helper-textThis is some helpful text',
    },
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'disabled',
    },
  },
  value: {
    group: 'attr',
    type: number,
    config: ['value', 0], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'value',
      type: String,
      value: val => `${val}`,
    },
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  events: {
    group: 'attr',
    value: `@input="onInput"`,
  },
};

const variants = [
  {
    name: 'default',
    excludes: ['vModel', 'events', 'invalidMessageSlot', 'helperTextSlot'],
  },
  {
    name: 'helper and invalid slots',
    excludes: ['vModel', 'events'],
  },
  { name: 'minimal', includes: ['label'] },
  { name: 'events', includes: ['label', 'events'] },
  { name: 'vModel', includes: ['label', 'vModel'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
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
    :sv-alt-back="this.$options.propsData.theme !== 'light'"
    sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div v-if="${templateString.indexOf('v-model') > 0}">
          <label>Model value:
            <input type="number" v-model="modelValue" />
          </label>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvNumberInput, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            modelValue: '100',
          };
        },
        methods: {
          onInput: action('cv-number-input - input event'),
        },
      };
    },
    {
      notes: { markdown: CvNumberInputNotesMD },
    }
  );
}
