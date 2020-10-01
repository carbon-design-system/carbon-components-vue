import { storiesOf } from '@storybook/vue';
import { select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvContentSwitcherNotesMD from '../../packages/core/src/components/cv-content-switcher/cv-content-switcher-notes.md';
import { CvContentSwitcher, CvContentSwitcherButton, CvContentSwitcherContent } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvContentSwitcher', module);
// const storiesExperimental = storiesOf('Experimental/CvContentSwitcher', module);

const exampleIconPath = require('../../packages/core/src/assets/images/example-icons.svg');
import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

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
    prop: 'selected',
  },
  toggle3: {
    group: 'attr3',
    type: boolean,
    config: ['toggle switcher 3', true],
    prop: 'toggle3',
  },
  disabled3: {
    group: 'attr3',
    type: boolean,
    config: ['disabled 3', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
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
    prop: 'icon',
    value: val => (val ? AddFilled16 : undefined),
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

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();
      // ----------------------------------------------------------------

      const templateString = `
  <cv-content-switcher${settings.group.attr}>
    <cv-content-switcher-button owner-id="csb-1" :selected="isSelected(0)" ${settings.group.icon}>Button Name 1</cv-content-switcher-button>
    <cv-content-switcher-button owner-id="csb-2" :selected="isSelected(1)" ${settings.group.icon}>Button Name 2</cv-content-switcher-button>
    <cv-content-switcher-button owner-id="csb-3" :selected="isSelected(2)" v-if="toggle3" ${settings.group.attr3} ${settings.group.icon}>Button Name 3</cv-content-switcher-button>
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
          return { toggle: false };
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

for (const story of storySet) {
  storiesDefault.add(
    `${story.name} - direct DOM usage`,
    () => {
      const settings = story.knobs();
      // ----------------------------------------------------------------

      const templateString = `
  <cv-content-switcher${settings.group.attr}>
    <cv-content-switcher-button content-selector=".content-1" :selected="isSelected(0)" ${settings.group.icon}>Button Name 1</cv-content-switcher-button>
    <cv-content-switcher-button content-selector=".content-2" :selected="isSelected(1)" ${settings.group.icon}>Button Name 2</cv-content-switcher-button>
    <cv-content-switcher-button content-selector=".content-3" :selected="isSelected(2)" v-if="toggle3" ${settings.group.attr3} ${settings.group.icon}>Button Name 3</cv-content-switcher-button>
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
