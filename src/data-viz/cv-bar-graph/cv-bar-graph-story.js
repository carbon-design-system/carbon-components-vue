import { storiesOf } from '@storybook/vue';
import { text, object, number, boolean } from '@storybook/addon-knobs';
// import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvBarGraphNotesMD from './cv-bar-graph-notes.md';
import CvBarGraph from './cv-bar-graph';

const stories = storiesOf('Data-Viz/CvBarGraph', module);

const preKnobs = {
  width: {
    group: 'attr',
    type: number,
    config: ['width', 800],
    prop: {
      name: 'width',
      type: Number,
      value: val => (val === null ? undefined : val),
    },
  },
  height: {
    group: 'attr',
    type: number,
    config: ['height', 300],
    prop: {
      name: 'height',
      type: Number,
      value: val => (val === null ? undefined : val),
    },
  },
  margins: {
    group: 'attr',
    type: object,
    config: ['margins', { top: 30, right: 120, bottom: 70, left: 65 }],
    prop: { name: 'margins', type: Object },
  },
  xAxisTimeFormat: {
    group: 'attr',
    type: text,
    config: ['x-axis-time-format', '%b'],
    prop: { name: 'x-axis-time-format', type: String },
  },
  yAxisFormat: {
    group: 'attr',
    type: text,
    config: ['y-axis-format', '~s'],
    prop: { name: 'y-axis-format', type: String },
  },
  xAxisLabel: {
    group: 'attr',
    type: text,
    config: ['xAxisLabel', 'X-axis Label'],
    prop: { name: 'x-axis-label', type: String },
  },
  yAxisLabel: {
    group: 'attr',
    type: text,
    config: ['yAxisLabel', 'Y-axis Label'],
    prop: { name: 'y-axis-label', type: String },
  },
  barColors: {
    group: 'attr',
    type: object,
    config: [
      'bar-colors',
      ['#00a78f', '#3b1a40', '#473793', '#3c6df0', '#56d2bb'],
    ],
    prop: { name: 'bar-colors', type: Array },
  },
  xAxisLabelOffset: {
    group: 'attr',
    type: number,
    config: ['x-axis-label-offset', undefined],
    prop: {
      name: 'x-axis-label-offset',
      type: Number,
      value: val => (val === null ? undefined : val),
    },
  },
  yAxisLabelOffset: {
    group: 'attr',
    type: number,
    config: ['y-axis-label-offset', undefined],
    prop: {
      name: 'y-axis-label-offset',
      type: Number,
      value: val => (val === null ? undefined : val),
    },
  },
  yAxisGridLines: {
    group: 'attr',
    type: boolean,
    config: ['y-axis-grid-lines', true],
    prop: { name: 'y-axis-grid-lines', type: Boolean },
  },
  keyLabels: {
    group: 'attr',
    type: object,
    config: [
      'key-labels',
      [
        'Data set #1',
        'Data set #2',
        'Data set #3',
        'Data set #4',
        'Data set #5',
      ],
    ],
    prop: { name: 'key-labels', type: Array },
  },
  emptyText: {
    group: 'attr',
    type: text,
    config: ['empty-text', 'No data'],
    prop: { name: 'empty-text', type: String },
  },
  emptyContent: {
    group: 'content',
    slot: {
      name: 'emptyContent',
      value: `<span style="color:red">There is currently no data for the selected parameters</span>`,
    },
  },
  data: {
    group: 'attr',
    type: object,
    config: [
      'data',
      [
        { x: 'Apples', y: 10 },
        { x: 'Oranges', y: 40 },
        { x: 'Pears', y: 20 },
        { x: 'Bananas', y: 60 },
      ],
    ],
    prop: { name: 'data', type: Array },
  },
  groupedData: {
    group: 'attr',
    type: object,
    config: [
      'data',
      [
        { x: new Date('2018-11-01'), y: [10, 20, 30, 15, 50] },
        { x: new Date('2018-12-01'), y: [40, 30, 70, 11, 110] },
        { x: new Date('2019-01-01'), y: [20, 0, -110, undefined, 20] },
        { x: new Date('2019-02-01'), y: [60, 55.3, 50, 30, 90] },
      ],
    ],
    prop: { name: 'data', type: Array },
  },
};

const variants = [
  { name: 'default', excludes: ['data'] },
  { name: 'minimal', includes: ['data'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();
      // ----------------------------------------------------------------

      const templateString = `
<cv-bar-graph${settings.group.attr}>
  ${settings.group.content}
</cv-bar-graph>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'
      under-construction>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { CvBarGraph, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        methods: {},
      };
    },
    {
      notes: { markdown: CvBarGraphNotesMD },
    }
  );
}
