import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvCheckboxNotesMD from './cv-checkbox-notes.md';
import CvCheckbox from './cv-checkbox';

const stories = storiesOf('CvCheckbox', module);
stories.addDecorator(withKnobs);

const kinds = null;

const preKnobs = {
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'checkbox', consts.CONFIG],
    value: val => (val.length ? `\n  label="${val}"` : ''),
    data: (obj, key, val) => (obj[key] = val),
  },
  checked: {
    group: 'attr',
    type: boolean,
    config: ['checked', false, consts.CONFIG],
    value: val => (val ? '\n  checked' : ''),
  },
  mixed: {
    group: 'attr',
    type: boolean,
    config: ['mixed', false, consts.CONFIG],
    value: val => (val ? `\n  mixed` : ''),
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
    withNotes(CvCheckboxNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<cv-checkbox${settings.group.attr} value="check-1">
</cv-checkbox>
  `;

      // ----------------------------------------------------------------
      // console.dir(settings);
      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>

      <template slot="other">
        <div v-if="${settings.raw.vModel}">
          <br>
          <br>
          <span>
            V-model:
          </span>
          <label>Check 1:
            <input type="checkbox" value="check-1" v-model="checked">
          </label>
          <br>
          <br>
          <span>Checked: {{ checked }}</span>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvCheckbox, SvTemplateView },
        data() {
          return {
            checked: settings.raw.checked,
          };
        },
        methods: {
          actionChange: action('CV Checkbox - change'),
          actionKeydown: action('CV Checkbox - keydown'),
        },
        template: templateViewString,
      };
    })
  );
}

stories.add(
  'Array v-model',
  withNotes(CvCheckboxNotesMD)(() => {
    const templateString = `
<cv-checkbox v-model="checks" name="check-1" value="check-1" @change="actionChange" label="check-1"></cv-checkbox>
<cv-checkbox v-model="checks" name="check-2" value="check-2" @change="actionChange" label="check-2" mixed></cv-checkbox>
<cv-checkbox v-model="checks" name="check-3" value="check-3" @change="actionChange" label="check-3"></cv-checkbox>
<cv-checkbox v-model="checks" name="check-4" value="check-4" @change="actionChange" label="check-4" mixed></cv-checkbox>
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
          <label>Check 4:
            <input type="checkbox" value="check-4" v-model="checks">
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
            ['check-3', 'check-4'],
            ',',
            consts.CONFIG
          ),
        };
      },
      methods: {
        actionChange: action('CV Checkbox - change'),
      },
      template: templateViewString,
    };
  })
);
