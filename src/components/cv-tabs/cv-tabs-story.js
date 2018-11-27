import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvTabsNotesMD from './cv-tabs-notes.md';
import CvTabs from './cv-tabs';
import CvTabsButton from './cv-tabs-button';
import CvTabsPanel from './cv-tabs-panel';

const stories = storiesOf('CvTabs', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  withEvents: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @tab-selected="actionSelected"
  @tab-beingselected="actionBeingSelected"`
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
    withNotes(CvTabsNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-tabs${settings.group.attr}>
  <cv-tabs-button id="tabs-button-1" content-selector="#tabs-panel-1" tabs-panel-id="tabs-panel-5" selected>
    Tab label 1
  </cv-tabs-button>
  <cv-tabs-button id="tabs-button-2" content-selector="#tabs-panel-2" tabs-panel-id="tabs-panel-2">
    Tab label 2
  </cv-tabs-button>
  <cv-tabs-button id="tabs-button-3" content-selector="#tabs-panel-3" tabs-panel-id="tabs-panel-3">
    Tab label 3
  </cv-tabs-button>
  <cv-tabs-button id="tabs-button-4" content-selector="#tabs-panel-4" tabs-panel-id="tabs-panel-4">
    Tab label 4
  </cv-tabs-button>
  <cv-tabs-button id="tabs-button-5" content-selector="#tabs-panel-5" tabs-panel-id="tabs-panel-5">
    Tab label 5
  </cv-tabs-button>
</cv-tabs>

<section>
  <cv-tabs-panel id="tabs-panel-1" tabs-button-id="tabs-button-1" selected>
    Sample tab panel content 1
  </cv-tabs-panel>
  <cv-tabs-panel id="tabs-panel-2" tabs-button-id="tabs-button-2">
    Sample tab panel content 2
  </cv-tabs-panel>
  <cv-tabs-panel id="tabs-panel-3" tabs-button-id="tabs-button-3">
    Sample tab panel content 3
  </cv-tabs-panel>
  <cv-tabs-panel id="tabs-panel-4" tabs-button-id="tabs-button-4">
    Sample tab panel content 4
  </cv-tabs-panel>
  <cv-tabs-panel id="tabs-panel-5" tabs-button-id="tabs-button-5">
    Sample tab panel content 5
  </cv-tabs-panel>
</section>
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
        components: { CvTabs, CvTabsButton, CvTabsPanel, SvTemplateView },
        methods: {
          actionSelected: action('Cv Tabs - tab-selected'),
          actionBeingSelected: action('Cv Tabs - tab-beingselected'),
        },
        template: templateViewString,
      };
    })
  );
}
