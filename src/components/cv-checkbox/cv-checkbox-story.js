import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvCheckboxNotesMD from './cv-checkbox-notes.md';
import CvCheckbox from './cv-checkbox';

const stories = storiesOf('CvCheckbox', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'checkbox'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'label',
    },
  },
  checked: {
    group: 'attr',
    type: boolean,
    config: ['checked', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'checked',
    },
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', 'check-1'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'value',
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
    value: `@change="actionChange"`,
  },
};

const variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
  { name: 'minimal', includes: ['label', 'value'] },
  { name: 'events', includes: ['label', 'value', 'events'] },
  { name: 'vModel', includes: ['label', 'value', 'vModel'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-checkbox${settings.group.attr}>
</cv-checkbox>
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
          <label>Check 1:
            <input type="checkbox" value="check-1" v-model="modelValue">
          </label>
          <br>
          <br>
          <span>Checked: {{ modelValue }}</span>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvCheckbox, SvTemplateView },
        props: settings.props,
        data() {
          return {
            modelValue: this.$options.propsData.checked || false,
          };
        },
        methods: {
          actionChange: action('CV Checkbox - change'),
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvCheckboxNotesMD },
    }
  );
}

stories.add(
  'Array v-model',
  () => {
    const templateString = `
<cv-checkbox v-model="checks" label="Check 1" name="check-1" value="check-1" @change="actionChange"></cv-checkbox>
<cv-checkbox v-model="checks" label="Check 2" name="check-2" value="check-2" @change="actionChange"></cv-checkbox>
<cv-checkbox v-model="checks" label="Check 3" name="check-3" value="check-3" @change="actionChange"></cv-checkbox>
`;

    // ----------------------------------------------------------------

    const templateViewString = `
  <sv-template-view
    sv-margin
    sv-source='${templateString.trim()}'>
    <p>This story only demonstrates the array syntax for v-model</p>
    <template slot="component">${templateString}</template>

    <template slot="other">
      <div>
        <br>
        <br>
        <span>
          V-model:
        </span>
        <label>Check 1:
          <input type="checkbox" value="check-1" v-model="checks">
        </label>
        <label>Check 2:
          <input type="checkbox" value="check-2" v-model="checks">
        </label>
        <label>Check 3:
          <input type="checkbox" value="check-3" v-model="checks">
        </label>
        <br>
        <br>
        <span>Checks: {{ checks }}</span>
      </div>
    </template>
  </sv-template-view>
`;

    return {
      components: { CvCheckbox, SvTemplateView },
      data() {
        return {
          checks: array(
            'Initial cheks',
            ['check-3', 'check-2'],
            ','
            // consts.CONFIG
          ),
        };
      },
      methods: {
        actionChange: action('CV Checkbox - change'),
      },
      template: templateViewString,
    };
  },
  {
    notes: { markdown: CvCheckboxNotesMD },
  }
);
