import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvSearchNotesMD from '@carbon/vue/src/components/cv-search/cv-search-notes.md';
import CvSearch from '@carbon/vue/src/components/cv-search/cv-search';

const storiesDefault = storiesOf('Components/CvSearch', module);
const storiesExperimental = storiesOf('Experimental/CvSearch', module);
import { versions, setVersion, componentsX } from '@carbon/vue/src/internal/feature-flags';

const preKnobs = {
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
    config: ['label', 'Search input label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'label',
    },
  },
  placeholder: {
    group: 'attr',
    type: text,
    config: ['placeholder', 'Search placeholder'], // consts.CONFIG],
    prop: { name: 'placeholder', type: String },
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
  large: {
    group: 'attr',
    type: boolean,
    config: ['large', false], // consts.CONFIG],
    prop: { name: 'large', type: Boolean },
  },
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false], // consts.CONFIG],
    prop: { name: 'small', type: Boolean },
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  events: {
    group: 'attr',
    value: `@input="onInput"`,
  },
};

const variants = [
  { name: 'default', excludes: ['vModel', 'events', componentsX ? 'large' : 'small'] },
  { name: 'minimal', includes: ['label'] },
  { name: 'events', includes: ['label', 'events'] },
  { name: 'vModel', includes: ['label', 'vModel'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions(true)) {
  const stories = version.experimental && !version.default ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        setVersion(version);
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
<cv-search${settings.group.attr}>
</cv-search>
  `;
        // ----------------------------------------------------------------

        const templateViewString = `
    <sv-template-view
      :sv-experimental="experimental"
      sv-margin
      :sv-alt-back="this.$options.propsData.theme !== 'light'"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div v-if="${templateString.indexOf('v-model') > 0}">
          <label>Model value:
            <input type="text" v-model="modelValue" />
          </label>
        </div>
      </template>
    </sv-template-view>
  `;

        return {
          components: { CvSearch, SvTemplateView },
          template: templateViewString,
          props: settings.props,
          data() {
            return {
              experimental: version.experimental,
              modelValue: '',
            };
          },
          methods: {
            onInput: action('cv-search - input event'),
          },
        };
      },
      {
        notes: { markdown: CvSearchNotesMD },
      }
    );
  }
}
