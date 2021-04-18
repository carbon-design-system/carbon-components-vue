import { storiesOf } from '@storybook/vue';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvTagNotesMD from '../../packages/core/src/components/cv-tag/cv-tag-notes.md';
import { CvTag, CvTagSkeleton } from '../../packages/core/src/';

import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

const storiesDefault = storiesOf('Components/CvTag', module);
// // const storiesExperimental = storiesOf('Experimental/CvTag', module);

let preKnobs = {
  clearAriaLabel: {
    group: 'attr',
    type: text,
    config: ['Clear aria label', 'Custom clear filter'], // consts.CONTENT],
    prop: 'clear-aria-label',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  icon: {
    group: 'attr',
    type: boolean,
    config: ['with icon', false],
    prop: 'icon',
    value: val => (val ? AddFilled16 : undefined),
  },
  kind: {
    group: 'attr',
    type: select,
    config: [
      'Tag kind',
      ['red', 'magenta', 'purple', 'blue', 'cyan', 'teal', 'green', 'gray', 'cool-gray', 'warm-gray', 'high-contrast'],
      'gray',
    ],
    prop: 'kind',
  },
  label: {
    group: 'attr',
    type: text,
    config: ['Tag label', 'I am a tag'], // consts.CONTENT],
    prop: 'label',
  },
  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        small: 'sm',
        default: '',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'size',
  },
};

let variants = [
  {
    name: 'standard',
    excludes: ['clearAriaLabel'],
  },
  {
    name: 'filter',
    excludes: ['clearAriaLabel'],
    extra: { kind: { group: 'attr', value: 'filter @remove="onRemove"' } },
  },
  {
    name: 'filter clear aria label',
    extra: { kind: { group: 'attr', value: 'filter @remove="onRemove"' } },
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-tag${settings.group.attr}></cv-tag>
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
        components: { CvTag, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        methods: {
          onRemove: action('Filter remove event'),
        },
      };
    },
    {
      notes: { markdown: CvTagNotesMD },
    }
  );
}

preKnobs = {
  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        small: 'sm',
        default: '',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'size',
  },
};
variants = [{ name: 'skeleton' }];
storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<cv-tag-skeleton${settings.group.attr}></cv-tag-skeleton>
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
        components: { CvTagSkeleton, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvTagNotesMD },
    }
  );
}
