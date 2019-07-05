import { storiesOf } from '@storybook/vue';
import { text, boolean, select, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvMultiSelectNotesMD from '@carbon/vue/src/components/cv-multi-select/cv-multi-select-notes.md';
import CvMultiSelect from '@carbon/vue/src/components/cv-multi-select/cv-multi-select';

const storiesDefault = storiesOf('Components/CvMultiSelect', module);
const storiesExperimental = storiesOf('Experimental/CvMultiSelect', module);

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
    prop: {
      type: String,
      name: 'theme',
      value: val => (val ? 'light' : ''),
    },
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Choose an option'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'label',
    },
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
    prop: {
      type: Boolean,
      name: 'inline',
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
    group: 'slots',
    slot: {
      name: 'helper-text',
      value: 'Some helpful text',
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
      value: 'Invalid message text',
    },
  },
  title: {
    group: 'attr',
    type: text,
    config: ['title', 'Multiselect title'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'title',
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
    prop: {
      name: 'selection-feedback',
      type: String,
    },
  },
  filterable: {
    group: 'attr',
    type: boolean,
    config: ['filterable', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'filterable',
    },
  },
  autoFilter: {
    group: 'attr',
    type: boolean,
    config: ['auto filter', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'auto-filter',
    },
  },
  userFilter: {
    group: 'misc',
    type: boolean,
    config: ['user filter', false],
    prop: {
      type: Boolean,
      name: 'userFilter',
    },
  },
  userHighlight: {
    group: 'misc',
    type: boolean,
    config: ['user highlight', false],
    prop: {
      name: 'userHighlight',
      type: Boolean,
    },
  },
  userFilterOrHighlight: {
    group: 'attr',
    value: `@filter="onFilter" :highlight="highlight"`,
  },
  autoHighlight: {
    group: 'attr',
    type: boolean,
    config: ['auto hihglight', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'auto-highlight',
    },
  },
  initialValue: {
    group: 'attr',
    type: array,
    config: ['initial-value', ['20s', '40s'], ','],
    prop: {
      type: Array,
      name: 'value',
    },
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
    excludes: [
      'vModel',
      'events',
      'helperText',
      'invalidMessage',
      'userFilter',
      'userHighlight',
      'userFilterOrHighlight',
    ],
  },
  { name: 'events', includes: ['filterable', 'events'] },
  { name: 'vModel', includes: ['vModel'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesExperimental.add(
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
    sv-margin
    :sv-alt-back="this.$options.propsData.theme !== 'light'"
    sv-source='${templateString.trim()}'>
    <template slot="component">${templateString}</template>
    <template slot="other">
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
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvMultiSelectNotesMD },
    }
  );
}
