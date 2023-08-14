import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import {
  CvStructuredList,
  CvStructuredListHeading,
  CvStructuredListData,
  CvStructuredListItem,
} from '.';

export default {
  title: `${sbCompPrefix}/CvStructuredList`,
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

const template = `
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
    <cv-structured-list-item>
      <cv-structured-list-data v-bind="{noWrap: args.noWrap}">Item_1</cv-structured-list-data>
      <cv-structured-list-data v-bind="{noWrap: args.noWrap}">Item_1</cv-structured-list-data>
      <cv-structured-list-data v-bind="{noWrap: args.noWrap}"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>

    <cv-structured-list-item>
      <cv-structured-list-data v-bind="{noWrap: args.noWrap}">Item_2</cv-structured-list-data>
      <cv-structured-list-data v-bind="{noWrap: args.noWrap}">Item_2</cv-structured-list-data>
      <cv-structured-list-data v-bind="{noWrap: args.noWrap}"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
  </template>
</cv-structured-list>
`;

const Template = args => {
  return {
    components: {
      CvStructuredList,
      CvStructuredListHeading,
      CvStructuredListData,
      CvStructuredListItem,
    },
    setup: () => ({ args }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
