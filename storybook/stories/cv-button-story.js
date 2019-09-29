import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvButtonNotesMD from '@carbon/vue/src/components/cv-button/cv-button-notes.md';
import { CvButton, CvButtonSkeleton } from '@carbon/vue/src';

const storiesDefault = storiesOf('Components/CvButton', module);
const storiesExperimental = storiesOf('Experimental/CvButton', module);

const exampleIconPath = require('@carbon/vue/src/assets/images/example-icons.svg');
import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

let preKnobs = {
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'small',
    },
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'disabled',
    },
  },
  events: {
    group: 'attr',
    value: `@click="actionClick"`,
  },
  content: {
    group: 'slots',
    slot: {
      name: '',
      value: `I am a button`,
    },
  },
  icon: {
    group: 'attr',
    type: boolean,
    config: ['with icon', false],
    prop: {
      name: 'icon',

      value: val => (val ? AddFilled16 : null),
    },
  },
};

let variants = [
  {
    name: 'default',
  },
  {
    name: 'icon as path',
    excludes: ['small', 'disabled', 'icon', 'iconHref'],
    extra: {
      icon: {
        group: 'attr',
        value: `icon="${exampleIconPath}#icon--add--solid"`,
      },
    },
  },
  {
    name: 'minimal',
    excludes: ['small', 'disabled', 'icon'],
  },
  {
    name: 'primary',
    extra: { kind: { group: 'attr', value: 'kind="primary"' } },
  },
  {
    name: 'secondary',
    extra: { kind: { group: 'attr', value: 'kind="secondary"' } },
  },
  {
    name: 'tertiary',
    extra: { kind: { group: 'attr', value: 'kind="tertiary"' } },
  },
  {
    name: 'ghost',
    extra: { kind: { group: 'attr', value: 'kind="ghost"' } },
  },
  {
    name: 'danger',
    extra: { kind: { group: 'attr', value: 'kind="danger"' } },
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
<cv-button${settings.group.attr}
>${settings.group.slots}
</cv-button>
    `;
      // console.log(templateString);

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { CvButton, SvTemplateView },

        methods: {
          actionClick: action('Cv Button - click'),
        },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvButtonNotesMD },
    }
  );
}

// cv-button-skeleton

preKnobs = {
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'small',
    },
  },
};

variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
        <cv-button-skeleton${settings.group.attr}></cv-button-skeleton>
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
        components: { CvButtonSkeleton, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvButtonNotesMD },
    }
  );
}
