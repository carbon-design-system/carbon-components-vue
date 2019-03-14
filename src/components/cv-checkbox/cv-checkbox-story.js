import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvCheckboxNotesMD from './cv-checkbox-notes.md';
import CvCheckbox from './cv-checkbox';
import CvCheckboxSkeleton from './cv-checkbox-skeleton';

const storiesDefault = storiesOf('Default/CvCheckbox', module);
const storiesExperimental = storiesOf('Experimental/CvCheckbox', module);
import { override, reset } from '../../_internal/_feature-flags';

let preKnobs = {
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

let variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
  { name: 'minimal', includes: ['label', 'value'] },
  { name: 'events', includes: ['label', 'value', 'events'] },
  { name: 'vModel', includes: ['label', 'value', 'vModel'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
<cv-checkbox${settings.group.attr}>
</cv-checkbox>
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
              experimental,
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
}
preKnobs = {
  vModel: {
    group: 'attr',
    value: `v-model="checks"`,
  },
};

variants = [{ name: 'Array v-model', includes: ['vModel'] }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
<cv-checkbox${settings.group.attr} value="check-1" label="check-1">
</cv-checkbox>
<cv-checkbox${settings.group.attr} value="check-2" label="check-2">
</cv-checkbox>
<cv-checkbox${settings.group.attr} value="check-3" label="check-3">
</cv-checkbox>
  `;

        // ----------------------------------------------------------------

        const templateViewString = `
    <sv-template-view
      sv-margin
      :sv-experimental="experimental"
      sv-source='${templateString.trim()}'>
      <p>This story only demonstrates the array syntax for v-model</p>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div v-if="${templateString.indexOf('v-model') > 0}">
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
          <span>Checked: {{ checks }}</span>
        </div>
      </template>
    </sv-template-view>
  `;

        return {
          components: { CvCheckbox, SvTemplateView },
          data() {
            return {
              experimental,
              checks: ['check-1', 'check-2'],
            };
          },
          template: templateViewString,
        };
      },
      {
        notes: { markdown: CvCheckboxNotesMD },
      }
    );
  }
}

preKnobs = {};
variants = [{ name: 'skeleton' }];
storySet = knobsHelper.getStorySet(variants, preKnobs);
for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
        const settings = story.knobs();

        const templateString = `
        <cv-checkbox-skeleton></cv-checkbox-skeleton>
      `;

        // ----------------------------------------------------------------

        const templateViewString = `
      <sv-template-view
        :sv-experimental="experimental"
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

        return {
          components: { CvCheckboxSkeleton, SvTemplateView },
          data: () => ({ experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvCheckboxNotesMD },
      }
    );
  }
}
