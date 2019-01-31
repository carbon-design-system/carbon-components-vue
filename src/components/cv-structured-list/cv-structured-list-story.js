import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvStructuredListNotesMD from './cv-structured-list-notes.md';
import CvStructuredList from './cv-structured-list';

const stories = storiesOf('CvStructuredList', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  border: {
    group: 'attr',
    type: boolean,
    inline: true,
    config: ['border', false], // consts.CONFIG],
    prop: { name: 'border', type: Boolean },
  },
  condensed: {
    group: 'attr',
    type: boolean,
    inline: true,
    config: ['condensed', false], // consts.CONFIG],
    prop: { name: 'condensed', type: Boolean },
  },
  noWrap: {
    group: 'data',
    type: boolean,
    inline: true,
    config: ['Prevent wrapping', false], // consts.CONFIG],
    prop: { name: 'no-wrap', type: Boolean },
  },
  vModel: {
    group: 'checksSelectable',
    inline: true,
    value: 'v-model="listVal"',
  },
  events: {
    group: 'attr',
    inline: true,
    value: '@change="actionChange"',
  },
};

const variants = [
  { name: 'default', excludes: ['vModel', 'events', 'selectable'] },
  { name: 'minimal', includes: [] },
  { name: 'selectable with events', includes: ['selectable', 'events'] },
  { name: 'selectable with vModel', includes: ['selectable', 'vModel'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      let templateString = '';
      let isVModel = story.name.indexOf('vModel') > -1;
      let isSelectable = story.name.startsWith('selectable');

      templateString = `
  <cv-structured-list${isSelectable ? ' selectable' : ''}${settings.group.attr}>
    <template slot="headings">
      <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
      <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
      <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
    </template>
    <template slot="items">
      <cv-structured-list-item${
        isSelectable ? ' name="group-1" value="value-1" ' : ''
      }${
        isVModel && isSelectable ? settings.group.checksSelectable : ' checked'
      }>
        <cv-structured-list-data>Item_1</cv-structured-list-data>
        <cv-structured-list-data>Item_1</cv-structured-list-data>
        <cv-structured-list-data${
          settings.group.data
        }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
      </cv-structured-list-item>
      <cv-structured-list-item${
        isSelectable ? ' name="group-1" value="value-2" ' : ''
      }${settings.group.checksSelectable}>
        <cv-structured-list-data>Item_2</cv-structured-list-data>
        <cv-structured-list-data>Item_2</cv-structured-list-data>
        <cv-structured-list-data${
          settings.group.data
        }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
      </cv-structured-list-item>
      <cv-structured-list-item${
        isSelectable ? ' name="group-1" value="value-3" ' : ''
      }${settings.group.checksSelectable}>
      <cv-structured-list-data>Item_3</cv-structured-list-data>
        <cv-structured-list-data>Item_3</cv-structured-list-data>
        <cv-structured-list-data${
          settings.group.data
        }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
      </cv-structured-list-item>
    </template>
  </cv-structured-list>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>

      <template slot="other">
        <div v-if="${templateString.indexOf('v-model') > 0}">
          Selected value ''{{listVal}}''
          <input type="radio" value="value-1" v-model="listVal" group="story">Radio 1</input>
          <input type="radio" value="value-2" v-model="listVal" group="story">Radio 2</input>
          <input type="radio" value="value-3" v-model="listVal" group="story">Radio 3</input>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvStructuredList, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            listVal: 'value-3',
          };
        },
        methods: {
          actionChange: action('Structured list - change'),
        },
      };
    },
    {
      notes: { markdown: CvStructuredListNotesMD },
    }
  );
}
