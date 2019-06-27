import { storiesOf } from '@storybook/vue';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvMultiSelectNotesMD from '@carbon/vue/src/components/cv-multi-select/cv-multi-select-notes.md';
import CvMultiSelect from '@carbon/vue/src/components/cv-multi-select/cv-multi-select';

const storiesDefault = storiesOf('Components/CvMultiSelect', module);
const storiesExperimental = storiesOf('Experimental/CvMultiSelect', module);

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
    value: `@change="actionChange"`,
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
};

let variants = [
  {
    name: 'default',
    excludes: ['vModel', 'events', 'helperTextSlot', 'invalidMessageSlot'],
  },
  {
    name: 'slots',
    excludes: ['vModel', 'events', 'helperText', 'invalidMessage'],
  },
  { name: 'minimal', includes: ['value'] },
  { name: 'events', includes: ['value', 'events'] },
  { name: 'vModel', includes: ['value', 'vModel'] },
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
      <label>Check 10s:
        <input type="checkbox" value="10s" v-model="checks">
      </label>
      <label>Check 20s:
        <input type="checkbox" value="20s" v-model="checks">
      </label>
      <label>Check 30s:
        <input type="checkbox" value="30s" v-model="checks">
      </label>
      <label>Check 40s:
        <input type="checkbox" value="40s" v-model="checks">
      </label>
      <label>Check 50s:
        <input type="checkbox" value="50s" v-model="checks">
      </label>
      <br>
      <br>
      <span>Checked: {{ checks }}</span>
    </div>
    <pre v-else>
    options: [
      { value: '10s', label: 'Tens', name: 'tens' },
      { value: '20s', label: 'Twenties', name: 'twenties' },
      { value: '30s', label: 'Thirties', name: 'thirties' },
      { value: '40s', label: 'Fourties', name: 'fourties' },
      { value: '50s', label: 'Fifties', name: 'fifties' },
    ]
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
            options: [
              {
                value: '10s',
                label: 'Tens',
                name: 'tens',
              },
              {
                value: '20s',
                label: 'Twenties',
                name: 'twenties',
              },
              {
                value: '30s',
                label: 'Thirties',
                name: 'thirties',
              },
              {
                value: '40s',
                label: 'Fourties',
                name: 'fourties',
              },
              {
                value: '50s',
                label: 'Fifties',
                name: 'fifties',
              },
            ],
          };
        },
        methods: {
          actionChange: action('CV MultiSelect - change'),
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvMultiSelectNotesMD },
    }
  );
}
