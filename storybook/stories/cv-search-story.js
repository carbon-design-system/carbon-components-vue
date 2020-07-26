import { storiesOf } from '@storybook/vue';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';
import TimerButton from '../_storybook/components/timer-button';

import CvSearchNotesMD from '../../packages/core/src/components/cv-search/cv-search-notes.md';
import { CvSearch } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvSearch', module);
// const storiesExperimental = storiesOf('Experimental/CvSearch', module);

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
    config: ['label', 'Search input label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  placeholder: {
    group: 'attr',
    type: text,
    config: ['placeholder', 'Search placeholder'], // consts.CONFIG],
    prop: 'placeholder',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        small: 'small',
        large: 'large',
        'default (xl)': '',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'size',
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  events: {
    group: 'attr',
    value: `@input="onInput"`,
  },
  clearArialabel: {
    group: 'attr',
    type: text,
    config: ['clear-aria-label', 'Custom search aria label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'clear-aria-label',
  },
};

const variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
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
<cv-search${settings.group.attr}>
</cv-search>
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
          <label>Model value:
            <input type="text" v-model="modelValue" />
          </label>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvSearch, SvTemplateView, TimerButton },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            modelValue: '',
          };
        },
        methods: {
          onInput: action('cv-search - input event'),
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
      notes: { markdown: CvSearchNotesMD },
    }
  );
}
