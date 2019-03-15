import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvButtonNotesMD from './cv-button-notes.md';
import CvButton from './cv-button';
import CvButtonSkeleton from './cv-button-skeleton';

const storiesDefault = storiesOf('Default/CvButton', module);
const storiesExperimental = storiesOf('Experimental/CvButton', module);
import { componentsX, override, reset } from '../../_internal/_feature-flags';

const exampleIconPath = require('../../assets/images/example-icons.svg');
import AddFilled16 from '@carbon/icons-vue/lib/add--filled/16';

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
    config: ['icon', false],
    prop: {
      name: 'icon',
      type: String,
      value: val => (val ? `${exampleIconPath}#icon--add--solid` : ''),
    },
  },
  icon: {
    group: 'attr',
    type: boolean,
    config: ['with icon', false],
    prop: {
      name: 'icon',
      type: Object,
      value: val => (val ? AddFilled16 : null),
    },
  },
};

let defaultVariants = [
  {
    name: 'default',
    excludes: componentsX ? ['iconHref'] : ['icon'],
  },
];
if (componentsX) {
  defaultVariants.push({
    name: 'icon as path',
    excludes: ['small', 'disabled', 'icon', 'iconHref'],
    extra: {
      icon: {
        group: 'attr',
        value: `icon="${exampleIconPath}#icon--add--solid"`,
      },
    },
  });
}

let variants = [
  ...defaultVariants,
  {
    name: 'iconHref',
    excludes: ['small', 'disabled', 'icon', 'iconHref'],
    extra: {
      iconHref: {
        group: 'attr',
        value: `iconHref="${exampleIconPath}#icon--add--solid"`,
      },
    },
  },
  {
    name: 'minimal',
    excludes: ['small', 'disabled', 'icon', 'iconHref'],
  },
  {
    name: 'primary',
    excludes: componentsX ? ['iconHref'] : ['icon'],
    extra: { kind: { group: 'attr', value: 'kind="primary"' } },
  },
  {
    name: 'secondary',
    excludes: componentsX ? ['iconHref'] : ['icon'],
    extra: { kind: { group: 'attr', value: 'kind="secondary"' } },
  },
  {
    name: 'tertiary',
    excludes: componentsX ? ['iconHref'] : ['icon'],
    extra: { kind: { group: 'attr', value: 'kind="tertiary"' } },
  },
  {
    name: 'ghost',
    excludes: componentsX ? ['iconHref'] : ['icon'],
    extra: { kind: { group: 'attr', value: 'kind="ghost"' } },
  },
  {
    name: 'danger',
    excludes: componentsX ? ['iconHref'] : ['icon'],
    extra: { kind: { group: 'attr', value: 'kind="danger"' } },
  },
  {
    name: 'danger-primary',
    excludes: componentsX ? ['iconHref'] : ['icon'],
    extra: { kind: { group: 'attr', value: 'kind="danger--primary"' } },
    skip: { default: false, experimental: true },
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    if (
      story.skip &&
      ((story.skip.default && !experimental) ||
        (story.skip.experimental && experimental))
    ) {
      continue;
    }
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
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
        :sv-experimental="experimental"
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

        return {
          components: { CvButton, SvTemplateView },
          data: () => ({ experimental }),
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
}
variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
        const settings = story.knobs();

        const templateString = `
        <cv-button-skeleton${settings.group.attr}></cv-button-skeleton>
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
          components: { CvButtonSkeleton, SvTemplateView },
          data: () => ({ experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvButtonNotesMD },
      }
    );
  }
}
