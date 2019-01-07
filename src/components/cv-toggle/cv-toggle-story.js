import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvToggleNotesMD from './cv-toggle-notes.md';
import CvToggle from './cv-toggle';

const stories = storiesOf('CvToggle', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  checked: {
    group: 'attr',
    type: boolean,
    config: ['checked', false, consts.CONFIG],
    prop: {
      type: Boolean,
      default: false,
      name: 'checked',
    },
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', 'check-1', consts.CONFIG],
    prop: {
      type: String,
      name: 'value',
    },
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false, consts.CONFIG],
    prop: {
      type: Boolean,
      default: false,
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
  textLeft: {
    group: 'slots',
    slot: {
      name: 'text-left',
      value: '0',
    },
  },
  textRight: {
    group: 'slots',
    slot: {
      name: 'text-right',
      value: '1',
    },
  },
};

const variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
  { name: 'minimal', includes: ['value'] },
  { name: 'events', includes: ['value', 'events'] },
  { name: 'vModel', includes: ['value', 'vModel'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-toggle${settings.group.attr}>${settings.group.slots}
</cv-toggle>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      :sv-alt-back="this.$options.propsData.theme !== 'light'"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div class="v-model-example" v-if="${templateString.indexOf('v-model') >
          0}">
          <br>
          <br>
          <span>
            V-model:
          </span>
          <label>Check 1:
            <input type="checkbox" v-model="modelValue">
          </label>
          <br>
          <br>
          <span>Checked: {{ modelValue }}</span>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvToggle, SvTemplateView },
        props: settings.props,
        data() {
          return {
            modelValue: this.$options.propsData.checked || false,
          };
        },
        methods: {
          actionChange: action('CV Toggle - change'),
          actionKeydown: action('CV Toggle - keydown'),
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvToggleNotesMD },
    }
  );
}

stories.add(
  'Array v-model',
  () => {
    const templateString = `
<cv-toggle v-model="checks" name="check-1" value="check-1" @change="actionChange"></cv-toggle>
<cv-toggle v-model="checks" name="check-2" value="check-2" @change="actionChange"></cv-toggle>
<cv-toggle v-model="checks" name="check-3" value="check-3" @change="actionChange"></cv-toggle>
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
      components: { CvToggle, SvTemplateView },
      data() {
        return {
          checks: array(
            'Initial cheks',
            ['check-3', 'check-2'],
            ',',
            consts.CONFIG
          ),
        };
      },
      methods: {
        actionChange: action('CV Toggle - change'),
      },
      template: templateViewString,
    };
  },
  {
    notes: { markdown: CvToggleNotesMD },
  }
);
