import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvTextAreaNotesMD from './cv-text-area-notes.md';
import CvTextArea from './cv-text-area';

const stories = storiesOf('Default/CvTextArea', module);

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
    config: ['label', 'Text area label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'label',
    },
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', ''], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'value',
      value: val => (val.length ? val : null),
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
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  events: {
    group: 'attr',
    value: `@input="onInput"`,
  },
  placeholder: {
    group: 'attr',
    value: 'placeholder="sample placeholder"',
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
    group: 'slots',
    slot: {
      name: 'helper-text',
      value: 'This is a helpful slot overrides the property helper-text',
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
    group: 'slots',
    slot: {
      name: 'invalid-message',
      value: 'Invalid message slot overrides the invalid-message property',
    },
  },
};

const variants = [
  {
    name: 'default',
    excludes: ['vModel', 'events', 'helperTextSlot', 'invalidMessageSlot'],
  },
  { name: 'helper and error slots', excludes: ['vModel', 'events'] },
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
<cv-text-area${settings.group.attr}>${settings.group.slots}
</cv-text-area>
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
          };
        },
        components: { CvTextArea, SvTemplateView },
        template: templateViewString,
        props: settings.props,
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
