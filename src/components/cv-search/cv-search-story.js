import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvSearchNotesMD from './cv-search-notes.md';
import CvSearch from './cv-search';

const stories = storiesOf('CvSearch', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  label: text('label', 'Search label', consts.CONTENT),
  placeholder: text('placeholder', 'Search placeholder', consts.CONFIG),
  disabled: boolean('disabled', false, consts.CONFIG) ? '\n  disabled' : '',
  large: boolean('large', false, consts.CONFIG) ? '\n large' : '',
  vModel: boolean('v-model', false, consts.OTHER)
    ? '\n  v-model="modelValue"'
    : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvSearchNotesMD)(() => {
    const settings = knobs();

    settings.label = settings.label.length ? `${settings.label}` : '';
    settings.placeholder = settings.placeholder.length
      ? `\n placeholder="${settings.placeholder}"`
      : '';
    settings.listeners = !settings.vModel.includes('v-model')
      ? '\n   @input="onInput"'
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-search${settings.large}${settings.disabled}${settings.vModel}${
      settings.otherAttributes
    }${settings.placeholder}
  label="${settings.label}" ${settings.listeners}>
</cv-search>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <span class="v-model-example" v-if="${settings.vModel.includes(
          'v-model'
        )}">Model value: {{modelValue}}</span>
      </template>
    </sv-template-view>
  `;

    return {
      data() {
        return {
          modelValue: '',
        };
      },
      components: { CvSearch, SvTemplateView },
      template: templateViewString,
      methods: {
        onInput: action('cv-search - input event'),
      },
    };
  })
);
