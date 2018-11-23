import { storiesOf } from '@storybook/vue';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvContentSwitcherNotesMD from './cv-content-switcher-notes.md';
import CvContentSwitcher from './cv-content-switcher';
import CvContentSwitcherButton from './cv-content-switcher-button';

const stories = storiesOf('CvContentSwitcher', module);
stories.addDecorator(withKnobs);

const kinds = null;

const preKnobs = {
  initialSelected: {
    group: '',
    type: selectV2,
    config: [
      'Initiallly selected',
      {
        'Button Name 1': '0',
        'Button Name 2': '1',
        'Button Name 3': '2',
      },
      '0',
      consts.CONFIG,
    ],
  },
  otherAttributes: {
    group: 'attr',
    type: text,
    config: ['other attributes', '', consts.OTHER],
    value: val => val,
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    withNotes(CvContentSwitcherNotesMD)(() => {
      const settings = story.knobs();
      // ----------------------------------------------------------------

      const templateString = `
  <cv-content-switcher
    @content-switcher-selected="actionSelected"
    @content-switcher-beingselected="actionBeingSelected"${settings.group.attr}
    >
    <cv-content-switcher-button content-selector=".content-1" ${
      settings.raw.initialSelected === '0' ? ' selected' : ''
    }>Button Name 1</cv-content-switcher-button>
    <cv-content-switcher-button content-selector=".content-2" ${
      settings.raw.initialSelected === '1' ? ' selected' : ''
    }>Button Name 2</cv-content-switcher-button>
    <cv-content-switcher-button content-selector=".content-3" ${
      settings.raw.initialSelected === '2' ? ' selected' : ''
    }>Button Name 3</cv-content-switcher-button>
  </cv-content-switcher>

  <section style="margin: 10px 0;">
    <div class="content-1">
      <p>This is the content for option 1</p>
    </div>
    <div class="content-2" hidden>
      <p>This is the content for option 2</p>
    </div>
    <div class="content-2" hidden >
      <p>This is more content for option 2</p>
    </div>
    <div class="content-3" hidden>
      <p>This is the content for option 3</p>
    </div>
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
        components: {
          CvContentSwitcher,
          CvContentSwitcherButton,
          SvTemplateView,
        },
        methods: {
          actionSelected: action(
            'Cv Content Switcher - content-switcher-selected'
          ),
          actionBeingSelected: action(
            'Cv Content Switcher - content-switcher-beingselected'
          ),
        },
        template: templateViewString,
      };
    })
  );
}
