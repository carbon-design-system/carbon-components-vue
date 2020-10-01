import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';
import TimerButton from '../_storybook/components/timer-button';

import CvToggleNotesMD from '../../packages/core/src/components/cv-toggle/cv-toggle-notes.md';
import { CvToggle, CvToggleSkeleton } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvToggle', module);
// const storiesExperimental = storiesOf('Experimental/CvToggle', module);

let preKnobs = {
  checked: {
    group: 'attr',
    type: boolean,
    config: ['checked', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'checked',
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Toggle label'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', 'check-1'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'value',
  },
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'small',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  formItem: {
    group: 'attr',
    type: boolean,
    config: ['form-item', true], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'form-item',
  },
  hideLabel: {
    group: 'attr',
    type: boolean,
    config: ['hide-label', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'hide-label',
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
    slot: 'text-left',
    value: '0',
  },
  textRight: {
    group: 'slots',
    slot: 'text-right',
    value: '1',
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
  storiesDefault.add(
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
        components: { CvToggle, SvTemplateView, TimerButton },
        props: settings.props,
        data() {
          return {
            modelValue: this.$options.propsData.checked || false,
          };
        },
        methods: {
          actionChange: action('CV Toggle - change'),
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
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
      <cv-toggle${settings.group.attr} name="check-1" value="check-1"></cv-toggle>
      <cv-toggle${settings.group.attr} name="check-2" value="check-2"></cv-toggle>
      <cv-toggle${settings.group.attr} name="check-3" value="check-3"></cv-toggle>
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

// cv-toggle-skeleton

preKnobs = {};

variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
      <cv-toggle-skeleton></cv-toggle-skeleton>
      `;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
    `;

      return {
        components: { CvToggleSkeleton, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvToggleNotesMD },
    }
  );
}
