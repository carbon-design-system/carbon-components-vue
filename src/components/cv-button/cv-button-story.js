import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvButtonNotesMD from './cv-button-notes.md';
import CvButton from './cv-button';
import CvButtonSkeleton from './cv-button-skeleton';

const stories = storiesOf('CvButton', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const exampleIconPath = require('../../assets/images/example-icons.svg');

let preKnobs = {
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'small',
      type: Boolean,
    },
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'disabled',
      type: Boolean,
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
  iconHref: {
    group: 'attr',
    type: boolean,
    config: ['with icon', false],
    prop: {
      name: 'icon-href',
      type: String,
      value: val => (val ? `${exampleIconPath}#icon--add--solid` : ''),
    },
  },
};

let variants = [
  { name: 'default' },
  { name: 'minimal', excludes: ['small', 'disabled', 'iconHref'] },
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
  {
    name: 'danger-primary',
    extra: { kind: { group: 'attr', value: 'kind="danger--primary"' } },
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
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
      type: Boolean,
    },
  },
};

variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
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
