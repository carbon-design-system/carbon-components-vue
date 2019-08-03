import { storiesOf } from '@storybook/vue';
import { text, boolean, select, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvComboBoxNotesMD from '@carbon/vue/src/components/cv-combo-box/cv-combo-box-notes.md';
import { CvComboBox } from '@carbon/vue/src';

const storiesDefault = storiesOf('Components/CvComboBox', module);
const storiesExperimental = storiesOf('Experimental/CvComboBox', module);

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
    value: `val-${nameVal}`,
  };
});

const selectFruits = {};
fruits.forEach(item => {
  selectFruits[item.name] = item.label;
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
    value: `v-model="value"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange" @filter="actionFilter"`,
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
    config: ['title', 'ComboBox title'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
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
    type: select,
    config: [
      'value',
      {
        default: '',
        ...selectFruits,
      },
      '',
      // consts.CONTENT, // fails when used with number in storybook 4.1.4
    ],
    prop: {
      name: 'value',
      type: String,
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
    includes: ['userFilterOrHighlight', 'userFilter', 'userHighlight'],
  },
  {
    name: 'slots',
    excludes: [
      'vModel',
      'events',
      'helperText',
      'invalidMessage',
      'userFilterOrHighlight',
      'userFilter',
      'userHighlight',
    ],
  },
  { name: 'events', includes: ['events'] },
  { name: 'vModel', includes: ['vModel'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesExperimental.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `<cv-combo-box ${settings.group.attr}
  :options="options">${settings.group.slots}
</cv-combo-box>
  `;

      // ----------------------------------------------------------------
      const templateViewString = `
  <sv-template-view
  under-construction
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
      <select v-model="value" >
        <option v-for="opt in options" :value="opt.value">{{opt.label}}</option>
      </select>
      <br>
      <br>
      <span>Value: {{value}}</span>
    </div>
    <pre v-else>
    :options: options
    </pre>
  </template>
</sv-template-view>
  `;

      return {
        components: {
          CvComboBox,
          SvTemplateView,
        },
        props: settings.props,
        data() {
          return {
            value: '',
            options: fruits,
            highlight: '',
          };
        },
        methods: {
          actionChange: action('CV ComboBox - change'),
          actionFilter: action('Cv ComboBox - filter'),
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
      notes: { markdown: CvComboBoxNotesMD },
    }
  );
}
