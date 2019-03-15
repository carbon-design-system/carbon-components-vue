import { storiesOf } from '@storybook/vue';
import { text, boolean, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvToggleNotesMD from './cv-toggle-notes.md';
import CvToggle from './cv-toggle';

const stories = storiesOf('Default/CvToggle', module);

let preKnobs = {
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
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'small',
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

let variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
  { name: 'minimal', includes: ['value'] },
  { name: 'events', includes: ['value', 'events'] },
  { name: 'vModel', includes: ['value', 'vModel'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

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
        <div v-if="${templateString.indexOf('v-model') > 0}">
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
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvToggleNotesMD },
    }
  );
}

preKnobs = {
  vModel: {
    group: 'attr',
    value: `v-model="checks"`,
  },
};

variants = [{ name: 'Array v-model', includes: ['vModel'] }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
      <cv-toggle${
        settings.group.attr
      } name="check-1" value="check-1"></cv-toggle>
      <cv-toggle${
        settings.group.attr
      } name="check-2" value="check-2"></cv-toggle>
      <cv-toggle${
        settings.group.attr
      } name="check-3" value="check-3"></cv-toggle>
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
            checks: ['check-3', 'check-2'],
          };
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvToggleNotesMD },
    }
  );
}
