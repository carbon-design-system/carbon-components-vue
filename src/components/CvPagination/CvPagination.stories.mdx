import { Canvas, Meta, Story } from '@storybook/addon-docs';
import { CvPagination } from '.';
import { sbCompPrefix } from '../../global/storybook-utils';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';
const myPage=ref(1);
const myPageSizes=ref([5,7,10,11,13])
const myNumItems=ref(13)

<Meta title={`${sbCompPrefix}/CvPagination`} component={CvPagination} />

export const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: {
    CvPagination,
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return {
      ...args,
      myPage,
      myPageSizes,
      myNumItems,
      onChange: action('change'),
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: args.template,
});
const defaultTemplate = `
  <cv-pagination
    @change="onChange"
    id="pagination-story"
    :backward-text="backwardText"
    :forward-text="forwardText"
    :page-number-label="pageNumberLabel"
    :page-sizes-label="pageSizesLabel"
    :number-of-items="myNumItems"
    :actual-items-on-page="actualItemsOnPage"
    :page="myPage"
    :page-sizes="myPageSizes"
    :backwards-button-disabled="backwardsButtonDisabled"
    :forwards-button-disabled="forwardsButtonDisabled">
  </cv-pagination>
  <div style="margin-top:2rem; background-color: #888888;  padding:1rem">
    <h3>Reactive properties</h3>
    page: <button @click="myPage--">← prev page</button>
    <button @click="myPage++">next page →</button><br/>
    page-sizes: <button @click="myPageSizes=[5,10]">change page sizes to [5,10]</button>
    <button @click="myPageSizes=[10,20,30,40,50]">change page sizes to [10,20,30,40,50]</button><br/>
    number-of-items: <button @click="myNumItems=4">Set total items = 4</button>
    <button @click="myNumItems=103">Set total items = 103</button>
  </div>
`;
const slotsTemplate = `
<cv-pagination
  @change="onChange"
  :backward-text="backwardText"
  :forward-text="forwardText"
  :page-number-label="pageNumberLabel"
  :page-sizes-label="pageSizesLabel"
  :number-of-items="numberOfItems"
  :actual-items-on-page="actualItemsOnPage"
  :page="page"
  :page-sizes="pageSizes"
  :backwards-button-disabled="backwardsButtonDisabled"
  :forwards-button-disabled="forwardsButtonDisabled">
  <template v-slot:range-text="{scope}">
    <span v-if="locale === 'en'">From {{scope.start}} to {{scope.end}} out of {{scope.items}}</span>
    <span v-else>Del {{scope.start}} al {{scope.end}} de {{scope.items}}</span>
  </template>
  <template v-slot:of-n-pages="{scope}">
    <span v-if="locale === 'en'"> out of {{scope.pages}} pages</span>
    <span v-else> von {{scope.pages}} Seiten</span>
  </template>
  </cv-pagination>
`;

# CvPagination

Migration notes:
- If you specify `pageNumberLabel` a trailing colon (:) is no longer automatically appended to the text

<Canvas>
  <Story
    name="Default"
    parameters={{
      controls: {
        exclude: [
          'default',
          'template',
          'data',
          'range-text',
          'change',
          'of-n-pages',
        ],
      },
      docs: { source: { code: defaultTemplate } },
    }}
    args={{
      data: {},
      template: defaultTemplate,
      backwardText: undefined,
      forwardText: undefined,
      pageNumberLabel: undefined,
      pageSizesLabel: undefined,
      backwardsButtonDisabled: false,
      forwardsButtonDisabled: false,
      actualItemsOnPage: Infinity,
    }}
    argTypes={{
      page: { control: false },
      pageSizes: { control: false },
      numberOfItems: { control: false }
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>


Use slots to set the range text and "of n pages" text. A good use case for this is internationalization.

<Canvas>
  <Story
    name="Slots"
    parameters={{
      controls: {
        exclude: [
          'default',
          'template',
          'data',
          'change',
          'of-n-pages',
        ],
      },
      docs: { source: { code: slotsTemplate } },
    }}
    args={{
      data: {},
      template: slotsTemplate,
      backwardText: undefined,
      forwardText: undefined,
      pageNumberLabel: undefined,
      pageSizesLabel: undefined,
      numberOfItems: 103,
      page: 2,
      pageSizes: [
        10,
        {
          value: 20,
          selected: true,
        },
        30,
        40,
        50,
      ],
      backwardsButtonDisabled: false,
      forwardsButtonDisabled: false,
      actualItemsOnPage: Infinity,
      locale: 'en'
    }}
    argTypes={{
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>
