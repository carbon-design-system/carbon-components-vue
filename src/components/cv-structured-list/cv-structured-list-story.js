import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvStructuredListNotesMD from './cv-structured-list-notes.md';
import CvStructuredList from './cv-structured-list';

const stories = storiesOf('CvStructuredList', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  selectable: boolean('selectable', false, consts.CONFIG),
  border: boolean('border', false, consts.CONFIG) ? ' border' : '',
  condensed: boolean('condensed', false, consts.CONFIG) ? ' condensed' : '',
  noWrap: boolean('Prevent wrapping', false, consts.CONFIG) ? ' no-wrap' : '',
  vModel: boolean('v-model', false, consts.OTHER) ? 'v-model="listVal" ' : '',
  otherAttributes: text('list:other attributes', '', consts.OTHER),
  otherAttributesItem: text('item:other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvStructuredListNotesMD)(() => {
    const settings = knobs();
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';
    settings.otherAttributesItem = settings.otherAttributesItem
      ? `\n  ${settings.otherAttributesItem}`
      : '';

    // ----------------------------------------------------------------

    let templateString = '';

    if (settings.selectable) {
      templateString = `
    <cv-structured-list @change="actionChange" selectable${settings.border}${
        settings.condensed
      }${settings.otherAttributes}>
      <template slot="headings">
        <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
      </template>
      <template slot="items">
        <cv-structured-list-item-selectable name="group-1" value="value-1"${
          settings.vModel ? settings.vModel : 'checked'
        }${settings.otherAttributesItem}>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data${
            settings.noWrap
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item-selectable$>
        <cv-structured-list-item-selectable name="group-1" value="value-2" ${
          settings.vModel
        }${settings.otherAttributesItem}>
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data${
            settings.noWrap
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item-selectable$>
        <cv-structured-list-item-selectable name="group-1" value="value-3" ${
          settings.vModel
        }${settings.otherAttributesItem}>
          <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data${
            settings.noWrap
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item-selectable$>
      </template>
    </cv-structured-list>
    `;
    } else {
      templateString = `
    <cv-structured-list ${settings.border}${settings.condensed}${
        settings.otherAttributes
      }>
      <template slot="headings">
        <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
      </template>
      <template slot="items">
        <cv-structured-list-item${settings.otherAttributesItem}>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data${
            settings.noWrap
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
        <cv-structured-list-item${settings.otherAttributesItem}>
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data${
            settings.noWrap
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
        <cv-structured-list-item${settings.otherAttributesItem}>
          <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data${
            settings.noWrap
          }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
      </template>
    </cv-structured-list>
    `;
    }

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>

      <template slot="other">
        <span class="v-model-example" v-if="${settings.vModel.includes(
          'v-model'
        )}">Selected value ''{{listVal}}''</span>
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
  })
);
