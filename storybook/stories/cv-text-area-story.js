import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';
import TimerButton from '../_storybook/components/timer-button';

import CvTextAreaNotesMD from '../../packages/core/src/components/cv-text-area/cv-text-area-notes.md';
import { CvTextArea } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvTextArea', module);
// const storiesExperimental = storiesOf('Experimental/CvTextArea', module);

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
    config: ['label', 'Text area label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', ''], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'value',
    value: val => (val.length ? val : undefined),
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
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
    prop: 'helper-text',
    value: val => (val.length ? val : undefined),
  },
  helperTextSlot: {
    group: 'slots',
    slot: 'helper-text',
    value: 'Some helpful text',
  },
  invalidMessage: {
    group: 'attr',
    type: text,
    config: ['invalid message', ''],
    prop: 'invalid-message',
    value: val => (val.length ? val : undefined),
  },
  invalidMessageSlot: {
    group: 'slots',
    slot: 'invalid-message',
    value: 'Invalid message text',
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
  storiesDefault.add(
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
      ref="templateView"
      :sv-alt-back="this.$options.propsData.theme !== 'light'"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div v-if="${templateString.indexOf('v-model') > 0}">
          <label>Model value:
            <textarea v-model="modelValue"></textarea>
          </label>
        </div>
      <TimerButton @timer-start="doStart" @timer-end="doEnd" label="Call focus() method" active-label-prefix="Call blur() method in" />
      </template>
      </sv-template-view>
  `;

      return {
        data() {
          return {
            modelValue: 'initial value',
          };
        },
        components: { CvTextArea, SvTemplateView, TimerButton },
        template: templateViewString,
        props: settings.props,
        methods: {
          onInput: action('cv-text-area - input event'),
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.blur();
          },
        },
      };
    },
    {
      notes: { markdown: CvTextAreaNotesMD },
    }
  );
}
