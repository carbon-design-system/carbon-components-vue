import { storiesOf } from '@storybook/vue';
import { select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvContentSwitcherNotesMD from './cv-content-switcher-notes.md';
import CvContentSwitcher from './cv-content-switcher';
import CvContentSwitcherButton from './cv-content-switcher-button';
import CvContentSwitcherContent from './cv-content-switcher-content';

const storiesDefault = storiesOf('Default/CvContentSwitcher', module);
const storiesExperimental = storiesOf('Experimental/CvContentSwitcher', module);
import { override, reset } from '../../_internal/_feature-flags';

const exampleIconPath = require('../../assets/images/example-icons.svg');
import AddFilled16 from '@carbon/icons-vue/lib/add--filled/16';

const preKnobs = {
  initialSelected: {
    group: 'other',
    type: select,
    config: [
      'Initiallly selected',
      {
        'Button Name 1': 0,
        'Button Name 2': 1,
        'Button Name 3': 2,
      },
      0,
      // consts.CONFIG, // fails when used with number in storybook 4.1.4
    ],
    prop: {
      name: 'selected',
      type: Number,
    },
  },
  toggle3: {
    group: 'attr3',
    type: boolean,
    config: ['toggle switcher 3', true],
    prop: {
      type: Boolean,
      name: 'toggle3',
    },
  },
  events: {
    group: 'attr',
    value: `@selected="actionSelected"`,
    inline: true,
  },
  icon: {
    group: 'icon',
    type: boolean,
    config: ['with icon', false],
    prop: {
      name: 'icon',
      type: Object,
      value: val => (val ? AddFilled16 : null),
    },
  },
};

const variants = [
  {
    name: 'default',
    excludes: ['events'],
  },
  {
    name: 'icon as path',
    excludes: ['icon'],
    extra: {
      icon: {
        group: 'icon',
        value: `icon="${exampleIconPath}#icon--add--solid"`,
      },
    },
  },
  { name: 'events' },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

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
  <cv-content-switcher${settings.group.attr}>
    <cv-content-switcher-button owner-id="csb-1" :selected="isSelected(0)" ${
      settings.group.icon
    }>Button Name 1</cv-content-switcher-button>
    <cv-content-switcher-button owner-id="csb-2" :selected="isSelected(1)" ${
      settings.group.icon
    }>Button Name 2</cv-content-switcher-button>
    <cv-content-switcher-button owner-id="csb-3" :selected="isSelected(2)" v-if="toggle3" ${
      settings.group.icon
    }>Button Name 3</cv-content-switcher-button>
  </cv-content-switcher>

  <section style="margin: 10px 0;">
    <cv-content-switcher-content owner-id="csb-1">
      <p>This is the content for option 1</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content owner-id="csb-2">
      <p>This is the content for option 2</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content owner-id="csb-2" >
      <p>This is more content for option 2</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content owner-id="csb-3">
      <p>This is the content for option 3</p>
    </cv-content-switcher-content>
  </section>
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
          components: {
            CvContentSwitcher,
            CvContentSwitcherButton,
            CvContentSwitcherContent,
            SvTemplateView,
          },
          data() {
            return { experimental, toggle: false };
          },
          mounted() {
            setInterval(() => {
              this.toggle = !this.toggle;
            }, 5000);
          },
          props: settings.props,
          computed: {
            isSelected() {
              return index => this.initialSelected === index;
            },
          },
          methods: {
            actionSelected: action('Cv Content Switcher - selected'),
          },
          template: templateViewString,
        };
      },
      {
        notes: { markdown: CvContentSwitcherNotesMD },
      }
    );
  }
}

for (const experimental of [false]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      `${story.name} - direct DOM usage`,
      () => {
        experimental ? override({ componentsX: true }) : reset();
        const settings = story.knobs();
        // ----------------------------------------------------------------

        const templateString = `
  <cv-content-switcher${settings.group.attr}>
    <cv-content-switcher-button content-selector=".content-1" :selected="isSelected(0)" ${
      settings.group.icon
    }>Button Name 1</cv-content-switcher-button>
    <cv-content-switcher-button content-selector=".content-2" :selected="isSelected(1)" ${
      settings.group.icon
    }>Button Name 2</cv-content-switcher-button>
    <cv-content-switcher-button content-selector=".content-3" :selected="isSelected(2)" v-if="toggle3" ${
      settings.group.icon
    }>Button Name 3</cv-content-switcher-button>
  </cv-content-switcher>

  <section style="margin: 10px 0;">
    <div class="content-1">
      <p>This is the content for option 1</p>
    </div>
    <div class="content-2">
      <p>This is the content for option 2</p>
    </div>
    <div class="content-2" >
      <p>This is more content for option 2</p>
    </div>
    <div class="content-3">
      <p>This is the content for option 3</p>
    </div>
  </section>
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
          components: {
            CvContentSwitcher,
            CvContentSwitcherButton,
            SvTemplateView,
          },
          data: () => ({ experimental }),
          props: settings.props,
          computed: {
            isSelected() {
              return index => this.initialSelected === index;
            },
          },
          methods: {
            actionSelected: action('Cv Content Switcher - selected'),
          },
          template: templateViewString,
        };
      },
      {
        notes: { markdown: CvContentSwitcherNotesMD },
      }
    );
  }
}
