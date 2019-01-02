import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvStructuredListNotesMD from './cv-structured-list-notes.md';
import CvStructuredList from './cv-structured-list';

const stories = storiesOf('CvStructuredList', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const kinds = null;
const preKnobs = {
  selectable: {
    group: 'attrSelectable',
    type: boolean,
    config: ['selectable', false, consts.CONFIG],
    value: val => (val ? ' selectable' : ''),
  },
  border: {
    group: 'attr',
    type: boolean,
    config: ['border', false, consts.CONFIG],
    value: val => (val ? ' border' : ''),
  },
  condensed: {
    group: 'attr',
    type: boolean,
    config: ['condensed', false, consts.CONFIG],
    value: val => (val ? ' condensed' : ''),
  },
  noWrap: {
    group: 'data',
    type: boolean,
    config: ['Prevent wrapping', false, consts.CONFIG],
    value: val => (val ? ' no-wrap' : ''),
  },
  vModel: {
    group: 'checksSelectable',
    type: boolean,
    config: ['v-model', false, consts.OTHER],
    value: val => (val ? 'v-model="listVal" ' : ''),
  },
  events: {
    group: 'attrSelectable',
    type: boolean,
    config: ['withEvnets', false, consts.OTHER],
    value: val => (val ? ' @change="actionChange"' : ''),
  },
  otherAttributes: {
    group: 'attr',
    type: text,
    config: ['list:other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
  otherAttributesItem: {
    group: 'attrItem',
    type: text,
    config: ['item:other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);
for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      let templateString = '';

      if (settings.raw.selectable) {
        templateString = `
    <cv-structured-list${settings.group.attrSelectable}${settings.group.attr}>
      <template slot="headings">
        <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
      </template>
      <template slot="items">
        <cv-structured-list-item-selectable name="group-1" value="value-1" ${
          settings.raw.vModel ? settings.group.checksSelectable : 'checked'
        }${settings.group.attrItem}>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data${
            settings.group.data
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item-selectable>
        <cv-structured-list-item-selectable name="group-1" value="value-2" ${
          settings.group.checksSelectable
        }${settings.group.attrItem}>
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data${
            settings.group.data
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item-selectable>
        <cv-structured-list-item-selectable name="group-1" value="value-3" ${
          settings.group.checksSelectable
        }${settings.group.attrItem}>
        <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data${
            settings.group.data
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item-selectable>
      </template>
    </cv-structured-list>
    `;
      } else {
        templateString = `
    <cv-structured-list${settings.group.attr}>
      <template slot="headings">
        <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
      </template>
      <template slot="items">
        <cv-structured-list-item${settings.group.attrItem}>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data${
            settings.group.data
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
        <cv-structured-list-item${settings.group.attrItem}>
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data${
            settings.group.data
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
        <cv-structured-list-item${settings.group.attrItem}>
          <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data${
            settings.group.data
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
      </template>
    </cv-structured-list>
    `;
      }

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>

      <template slot="other">
        <span class="v-model-example" v-if="${
          settings.raw.vModel
        }">Selected value ''{{listVal}}''</span>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvStructuredList, SvTemplateView },
        data() {
          return {
            listVal: 'value-3',
          };
        },
        methods: {
          actionChange: action('Structured list - change'),
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvStructuredListNotesMD },
    }
  );
}
