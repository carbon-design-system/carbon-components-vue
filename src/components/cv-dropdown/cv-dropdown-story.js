import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/consts';

import CvDropdownNotesMD from './cv-dropdown-notes.md';
import CvDropdown from './cv-dropdown';

const stories = storiesOf('CvDropdown', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  placeholder: text('Placeholder', 'Choose an option', consts.CONTENT)
});

stories.add(
  'All',
  withNotes(CvDropdownNotesMD)(() => {
    const settings = knobs();
    settings.placeholder = `placeholder="${settings.placeholder}"`;

    const templateString = `
<cv-dropdown class="cv-dropdown" ${settings.placeholder}>
  <cv-dropdown-item value="10">Option 1</cv-dropdown-item>
  <cv-dropdown-item value="20">Option 2</cv-dropdown-item>
  <cv-dropdown-item value="30">Option 3</cv-dropdown-item>
  <cv-dropdown-item value="40">Option 4</cv-dropdown-item>
  <cv-dropdown-item value="50">Option 5</cv-dropdown-item>
</cv-dropdown>
`;

    // ----------------------------------------------------------------

    const templateViewString = `
<sv-template-view
  :sv-margin="true"
  sv-source='${templateString.trim()}'>
  <template slot="component">${templateString}</template>
</sv-template-view>
`;

    return {
      components: {
        CvDropdown,
        SvTemplateView
      },
      template: templateViewString
    };
  })
);
