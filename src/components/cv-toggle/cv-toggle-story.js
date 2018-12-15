import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvToggleNotesMD from './cv-toggle-notes.md';
import CvToggle from './cv-toggle';

const stories = storiesOf('CvToggle', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false, consts.CONFIG],
    value: val => (val ? '\n  small' : ''),
  },
  textLeft: {
    group: 'slots',
    type: text,
    config: ['slot:text-left', 'Off', consts.CONTENT],
    value: val =>
      val.length ? `\n  <template slot="text-left">${val}</template>` : '',
  },
  textRight: {
    group: 'slots',
    type: text,
    config: ['slot:text-right', 'On', consts.CONTENT],
    value: val =>
      val.length ? `\n  <template slot="text-right">${val}</template>` : '',
  },
  checked: {
    group: 'attr',
    type: boolean,
    config: ['checked', false, consts.CONFIG],
    value: val => (val ? '\n  checked' : ''),
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false, consts.CONFIG],
    value: val => (val ? '\n  disabled' : ''),
  },
  vModel: {
    group: 'attr',
    type: boolean,
    config: ['v-model', false, consts.OTHER],
    value: val => (val ? '\n  v-model="checked"' : ''),
  },
  events: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @change="actionChange"
  @keydown="actionKeydown"`
        : '',
  },
  otherAttributes: {
    group: 'attr',
    type: text,
    config: ['other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    'Default',
    withNotes(CvToggleNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-toggle${settings.group.attr}\n  value="toggle-1">${settings.group.slots}
</cv-toggle>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>

      <template slot="other">
        <span class="v-model-example" v-if="${
          settings.raw.vModel
        }">Checked value {{checked}}</span>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvToggle, SvTemplateView },
        data() {
          return {
            checked: settings.raw.checked,
          };
        },
        methods: {
          actionChange: action('CV Toggle - change'),
          actionKeydown: action('CV Toggle - keydown'),
        },
        template: templateViewString,
      };
    })
  );
}

stories.add(
  'Array v-model',
  withNotes(CvToggleNotesMD)(() => {
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
      <span class="v-model-example">Checked values: {{checks}}</span>
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
  })
);
