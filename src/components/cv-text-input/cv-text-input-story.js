import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvTextInputNotesMD from './cv-text-input-notes.md';
import CvTextInput from './cv-text-input';

const stories = storiesOf('CvTextInput', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const kinds = null;
const preKnobs = {
  light: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false, consts.CONFIG],
    prop: {
      type: String,
      optional: true,
      name: 'theme',
      value: `theme="light ? 'light' : ''"`,
    },
  },
  label: {
    group: 'content',
    slot: {
      name: 'label',
      value: 'Text input label',
    },
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false, consts.CONFIG],
    prop: {
      type: Boolean,
      optional: true,
      default: false,
      name: 'disabled',
    },
  },
  vModel: {
    group: 'attr',
    type: boolean,
    config: ['v-model', false, consts.OTHER],
    value: val => (val ? '\n  v-model="modelValue"' : ''),
  },
  events: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @input="onInput"`
        : '',
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-text-input${settings.group.attr}>
</cv-text-input>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      :sv-alt-back="!light"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div class="v-model-example" v-if="${settings.raw.vModel}">
          <label>Model value:
            <input type="text" v-model="modelValue" />
          </label>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        data() {
          return {
            modelValue: 'initial value',
          };
        },
        components: { CvTextInput, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        methods: {
          onInput: action('cv-text-input - input event'),
        },
      };
    },
    {
      notes: { markdown: CvTextInputNotesMD },
    }
  );
}
