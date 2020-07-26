import { storiesOf } from '@storybook/vue';
import { text, boolean, select, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';
import TimerButton from '../_storybook/components/timer-button';

import CvMultiSelectNotesMD from '../../packages/core/src/components/cv-multi-select/cv-multi-select-notes.md';
import { CvMultiSelect } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvMultiSelect', module);
// const storiesExperimental = storiesOf('Experimental/CvMultiSelect', module);

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Kiwi Fruit',
  'Lemon',
  'Lime',
  'Mango',
  'Orange',
  'Passion Fruit',
  'Raisin',
  'Satsuma',
  'Tangerine',
  'Ugli Fruit',
  'Watermelon',
].map(item => {
  const nameVal = item.replace(/\W/, '_').toLowerCase();
  return {
    name: nameVal,
    label: item,
    value: nameVal,
  };
});

let preKnobs = {
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
    config: ['label', 'Choose an option'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  vModel: {
    group: 'attr',
    value: `v-model="checks"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange" @filter="actionFilter"`,
  },
  inline: {
    group: 'attr',
    type: boolean,
    config: ['inline', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'inline',
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
  title: {
    group: 'attr',
    type: text,
    config: ['title', 'Multiselect title'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'title',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  selectionFeedback: {
    group: 'attr',
    type: select,
    config: [
      'Selection feedback',
      {
        'top-after-reopen': 'top-after-reopen',
        top: 'top',
        fixed: 'fixed',
      },
      'top-after-reopen',
    ],
    prop: 'selection-feedback',
  },
  filterable: {
    group: 'attr',
    type: boolean,
    config: ['filterable', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'filterable',
  },
  autoFilter: {
    group: 'attr',
    type: boolean,
    config: ['auto filter', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'auto-filter',
  },
  userFilter: {
    group: 'misc',
    type: boolean,
    config: ['user filter', false],
    prop: 'userFilter',
  },
  userHighlight: {
    group: 'misc',
    type: boolean,
    config: ['user highlight', false],
    prop: 'userHighlight',
  },
  userFilterOrHighlight: {
    group: 'attr',
    value: `@filter="onFilter" :highlight="highlight"`,
  },
  autoHighlight: {
    group: 'attr',
    type: boolean,
    config: ['auto hihglight', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'auto-highlight',
  },
  initialValue: {
    group: 'attr',
    type: array,
    config: ['initial-value', ['banana', 'ugli_fruit'], ','],
    prop: 'value',
  },
};

let variants = [
  {
    name: 'default',
    excludes: [
      'vModel',
      'events',
      'helperTextSlot',
      'invalidMessageSlot',
      'userFilter',
      'userHighlight',
      'userFilterOrHighlight',
    ],
  },
  {
    name: 'user Filter and/or Highlight',
    includes: ['filterable', 'userFilterOrHighlight', 'userFilter', 'userHighlight'],
  },
  {
    name: 'slots',
    excludes: ['vModel', 'events', 'userFilter', 'userHighlight', 'userFilterOrHighlight'],
  },
  { name: 'events', includes: ['filterable', 'events'] },
  { name: 'vModel', includes: ['vModel'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `<cv-multi-select ${settings.group.attr}
  :options="options">${settings.group.slots}
</cv-multi-select>
  `;

      // ----------------------------------------------------------------
      const templateViewString = `
  <sv-template-view
    ref="templateView"
    sv-margin
    :sv-alt-back="this.$options.propsData.theme !== 'light'"
    sv-source='${templateString.trim()}'>
    <template slot="component">${templateString}</template>
    <template slot="other">
    <TimerButton @timer-start="doStart" @timer-end="doEnd" label="Call focus() method" active-label-prefix="Call blur() method in" />
    <div v-if="${templateString.indexOf('v-model') > 0}">
      <br>
      <br>
      <span>
        V-model:
      </span>
      <span v-for="fruit in options">
        <label :style="{whiteSpace: 'nowrap'}">{{fruit.label}}:
          <input type="checkbox" :value="fruit.value" v-model="checks">
        </label>,
      </span>
      <br>
      <br>
      <span>Checked: {{ checks }}</span>
    </div>
    <pre v-else>
    :options: fruits
    </pre>
  </template>  </sv-template-view>
  `;

      return {
        components: {
          CvMultiSelect,
          SvTemplateView,
          TimerButton,
        },
        props: settings.props,
        data() {
          return {
            checks: [],
            options: fruits,
            highlight: '',
          };
        },
        methods: {
          actionChange: action('CV MultiSelect - change'),
          actionFilter: action('Cv MultiSelect - filter'),
          onFilter(filter) {
            let pat = new RegExp(`^${filter}`, 'ui');
            if (this.userFilter) {
              this.options = fruits.filter(opt => pat.test(opt.label)).slice(0);
            }
            if (this.userHighlight && this.options.length > 0) {
              let found = this.options.find(opt => pat.test(opt.label));
              if (found) {
                this.highlight = found.value;
              } else {
                this.highlight = '';
              }
            }
          },
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.blur();
          },
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvMultiSelectNotesMD },
    }
  );
}
