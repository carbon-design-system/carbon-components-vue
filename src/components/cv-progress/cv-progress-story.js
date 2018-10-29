import { storiesOf } from '@storybook/vue';
import { withKnobs, selectV2, array, text } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvProgressNotesMD from './cv-progress-notes.md';
import CvProgress from './cv-progress';

const stories = storiesOf('CvProgress', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  steps: array(
    'Steps',
    ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
    ',',
    consts.CONFIG
  ),
  initialStep: text('Initial step index', '0', consts.CONFIG),
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvProgressNotesMD)(() => {
    const settings = knobs();

    settings.initialStep = `\n initial-step="${parseInt(
      settings.initialStep
    )}"`;
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-progress :steps="steps"${settings.initialStep}${
      settings.otherAttributes
    }></cv-progress>
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
      components: { CvProgress, SvTemplateView },
      data() {
        return { steps: settings.steps };
      },
      template: templateViewString,
    };
  })
);
