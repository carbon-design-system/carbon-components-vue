import { storiesOf } from '@storybook/vue';
import { text, object, number, boolean } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvPaginationNotesMD from '../../packages/core/src/components/cv-pagination/cv-pagination-notes.md';
import { CvPagination } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvPagination', module);
// const storiesExperimental = storiesOf('Experimental/CvPagination', module);

const preKnobs = {
  backwardsText: {
    group: 'attr',
    type: text,
    config: ['backwards button text', 'Previous page'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'backward-text',
  },
  forwardsText: {
    group: 'attr',
    type: text,
    config: ['forwards button text', 'Next page'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'forward-text',
  },
  pageNumberLabel: {
    group: 'attr',
    type: text,
    config: ['page number label', 'Page number'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'page-number-label',
  },
  pageSizesLabel: {
    group: 'attr',
    type: text,
    config: ['page sizes label', 'Items per page:'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'page-sizes-label',
  },
  numberOfItems: {
    group: 'attr',
    type: number,
    config: ['Number of items', 103],
    prop: 'number-of-items',
  },
  page: {
    group: 'attr',
    type: number,
    config: ['initial page', 2],
    prop: 'page',
  },
  pageSizes: {
    group: 'attr',
    type: object,
    config: ['Page sizes', { list: [10, { value: 20, selected: true }, 30, 40, 50] }],
    prop: 'page-sizes',
    value: val => val.list,
  },
  disableBackwards: {
    group: 'attr',
    type: boolean,
    config: ['Disable backwards button', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'backwards-button-disabled',
  },
  disabledForwards: {
    group: 'attr',
    type: boolean,
    config: ['Disable forwards button', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'forwards-button-disabled',
  },
  events: {
    group: 'attr',
    value: `@change="onChange"`,
  },
  slots: {
    group: 'slots',
    value: `<template v-slot:range-text="{scope}">From {{scope.start}} to {{scope.end}} out of {{scope.items}}</template>
  <template v-slot:of-n-pages="{scope}">out of {{scope.pages}} pages</template>
  `,
  },
};

const variants = [
  { name: 'default', excludes: ['events', 'slots'] },
  { name: 'slottedFields', excludes: ['events'] },
  { name: 'minimal', includes: ['disabledForwards'] },
  { name: 'events', includes: ['events'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<cv-pagination${settings.group.attr}>${settings.group.slots}</cv-pagination>
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
        components: { CvPagination, SvTemplateView },

        template: templateViewString,
        props: settings.props,
        methods: {
          onChange: action('cv-paginationr - change event'),
        },
      };
    },
    {
      notes: { markdown: CvPaginationNotesMD },
    }
  );
}
