import { action } from '@storybook/addon-actions';
import { ref } from 'vue';
import { storyParametersObject } from '../../global/storybook-utils';
import {
  CvStructuredList,
  CvStructuredListHeading,
  CvStructuredListData,
  CvStructuredListItem,
} from '.';

export default {
  title: 'Component/CvStructuredList',
  component: CvStructuredList,
  argTypes: {
    selectable: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
      description:
        'Makes list items selectable (prop on cv-structured-list component)',
    },
    condensed: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
      description:
        'Condense spacing of the structured list (prop on cv-structured-list component)',
    },
    noWrap: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
      description:
        'Prevent text wrapping in list data (prop on cv-structured-list-data component)',
    },
  },
};

const DefaultListItems = [
  {
    id: 'item-1',
    data: [
      'Item_1',
      'Item_1',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.',
    ],
  },
  {
    id: 'item-2',
    data: [
      'Item_2',
      'Item_2',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.',
    ],
  },
];

const template = `
<div>
  <cv-structured-list v-bind="args">
    <template v-slot:headings>
      <cv-structured-list-heading>
        Heading 1
      </cv-structured-list-heading>
      <cv-structured-list-heading>
        Heading 2
      </cv-structured-list-heading>
      <cv-structured-list-heading>
        Heading 3
      </cv-structured-list-heading>
    </template>

    <template v-slot:items>
      <cv-structured-list-item v-for="({id, data}, index) in DefaultListItems" :key="index" name="group-1" :value="id" v-model="listValue" @change="onChange">
        <cv-structured-list-data v-for="(itemData, dataIndex) in data" :key="dataIndex" :no-wrap="args.noWrap">{{ itemData }}</cv-structured-list-data>
      </cv-structured-list-item>
    </template>
  </cv-structured-list>

  <div style="margin-top:1rem; background-color: #888888; padding:1rem" v-if="args.withVModel">
    <div style="font-size: 150%">Sample interaction</div>
    <template
      v-for="({id}, vmodelIndex) in DefaultListItems"
      :key="vmodelIndex"
    >
      <input name="listValue" :id="id" type="radio" @change="(ev) => {listValue = ev.target.id}" :checked="id === listValue" />
      <label :for="id" style="margin-right: 16px;">{{id}}:</label>
    </template>

    <div style="margin-top: 16px;">Checked: <span style="font-weight: bold;">{{ listValue }}</span></div>
  </div>
</div>
`;

const Template = args => {
  return {
    components: {
      CvStructuredList,
      CvStructuredListHeading,
      CvStructuredListData,
      CvStructuredListItem,
    },
    setup: () => ({
      args,
      listValue: ref(DefaultListItems[0].id),
      DefaultListItems,
      onChange: action('change'),
    }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = {
  withVModel: false,
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

export const VModel = Template.bind({});
VModel.args = {
  selectable: true,
  withVModel: true,
};
VModel.parameters = storyParametersObject(
  VModel.parameters,
  template,
  VModel.args
);
