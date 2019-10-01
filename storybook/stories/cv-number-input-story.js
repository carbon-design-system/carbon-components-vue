import { storiesOf } from '@storybook/vue';
import { text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvNumberInputNotesMD from '@carbon/vue/src/components/cv-number-input/cv-number-input-notes.md';
import { CvNumberInput } from '@carbon/vue/src';

const storiesDefault = storiesOf('Components/CvNumberInput', module);
const storiesExperimental = storiesOf('Experimental/CvNumberInput', module);

const preKnobs = {
  theme: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'theme',
    value: val => (val ? 'light' : ''),
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Text input label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  invalidMessage: {
    group: 'attr',
    type: text,
    config: ['invalid message', ''],
    prop: 'invalid-message',
    value: val => (val.length ? val : undefined),
  },
  invalidMessageSlot: {
    group: 'content',
    slot: 'invalid-message',
    value: 'Invalid message text',
  },
  helperText: {
    group: 'attr',
    type: text,
    config: ['helper text', ''],
    prop: 'helper-text',
    value: val => (val.length ? val : undefined),
  },
  helperTextSlot: {
    group: 'content',
    slot: 'helper-text',
    value: 'Some helpful textThis is some helpful text',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  value: {
    group: 'attr',
    type: number,
    config: ['value', 0], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'value',
    value: val => `${val}`,
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
  storiesDefault.add(
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
