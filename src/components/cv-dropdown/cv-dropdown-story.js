import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvDropdownNotesMD from './cv-dropdown-notes.md';
import CvDropdown from './cv-dropdown';
import { selectV2 } from '@storybook/addon-knobs/dist/vue';

const stories = storiesOf('CvDropdown', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  light: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false, consts.CONFIG],
    value: val => (val ? '\n  theme="light"' : ''),
  },
  placeholder: {
    group: 'attr',
    type: text,
    config: ['Placeholder', 'Choose an option', consts.CONFIG],
    value: val => (val.length ? `\n  placeholder="${val}"` : ''),
  },
  value: {
    group: 'attr',
    type: selectV2,
    config: [
      'value',
      {
        default: '',
        'Value 10': '10',
        'Value 20': '20',
        'Value 30': '30',
        'Value 40': '40',
        'Value 50': '50',
      },
      '',
      consts.CONTENT,
    ],
    value: val => `\n  :value="value"`,
    data: (obj, key, val) => (obj[key] = val),
  },
  vModel: {
    group: 'attr',
    type: boolean,
    config: ['v-model', false, consts.OTHER],
    value: val => (val ? '\n  v-model="value" ' : ''),
  },
  events: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @change="actionChange"`
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
    story.name,
    withNotes(CvDropdownNotesMD)(() => {
      const settings = story.knobs();

      const templateString = `
  <cv-dropdown class="cv-dropdown" ${settings.group.attr}>
    <cv-dropdown-item value="10">Option with value 10</cv-dropdown-item>
    <cv-dropdown-item value="20">Option with value 20</cv-dropdown-item>
    <cv-dropdown-item value="30">Option with value 30</cv-dropdown-item>
    <cv-dropdown-item value="40">Option with value 40</cv-dropdown-item>
    <cv-dropdown-item value="50">Option with value 50</cv-dropdown-item>
  </cv-dropdown>
  `;

      // ----------------------------------------------------------------
      const templateViewString = `
  <sv-template-view
    sv-margin
    :sv-alt-back="!light"
    sv-source='${templateString.trim()}'>
    <template slot="component">${templateString}</template>
    <template slot="other">
      <div v-if="showVModel">
        <span>V-Model value</span>
          <select v-model="value" >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </span>
      </div>
    </template>
  </sv-template-view>
  `;

      return {
        components: {
          CvDropdown,
          SvTemplateView,
        },
        data() {
          return {
            light: settings.raw.light,
            showVModel: settings.raw.vModel,
            value: settings.data.value,
          };
        },
        methods: {
          actionChange: action('CV Dropdown - change'),
        },
        template: templateViewString,
      };
    })
  );
}
