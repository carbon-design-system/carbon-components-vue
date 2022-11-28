import { sbCompPrefix, storyParametersObject } from '@/global/storybook-utils';

import { CvContentSwitcher } from '.';
import CvContentSwitcherButton from './CvContentSwitcherButton';
import CvContentSwitcherContent from './CvContentSwitcherContent';
import { IbmSecurity20 } from '@carbon/icons-vue';
import { action } from '@storybook/addon-actions';

const initArgs = {
  light: false,
  selectedIndex: 0,
};

export default {
  title: `${sbCompPrefix}/CvContentSwitcher`,
  component: CvContentSwitcher,
  parameters: {
    a11y: {
      config: {
        rules: [],
      },
      options: {},
      manual: true,
    },
    controls: { exclude: ['default', 'selected'] },
  },
  argTypes: {
    light: {
      description: 'light theme',
      table: {
        category: 'props',
      },
    },
    size: {
      type: 'select',
      options: ['sm', 'md', 'xl'],
    },
  },
};

const template = `
<div>
<cv-content-switcher aria-label='Choose content' v-bind='args' @selected="onSelected">
  <cv-content-switcher-button owner-id="csb-1" :selected="selectedIndex === 0">Button Name 1</cv-content-switcher-button>
  <cv-content-switcher-button owner-id="csb-2" :selected="selectedIndex === 1">Button Name 2</cv-content-switcher-button>
  <cv-content-switcher-button :icon="iconSample" owner-id="csb-3" :selected="selectedIndex === 2">Button Name 3</cv-content-switcher-button>
</cv-content-switcher>
<section style="margin: 10px 0;">
  <cv-content-switcher-content owner-id="csb-1">
    <p>This is the content for option 1</p>
  </cv-content-switcher-content>
  <cv-content-switcher-content owner-id="csb-2">
    <p>This is the content for option 2</p>
  </cv-content-switcher-content>
  <cv-content-switcher-content owner-id="csb-2" >
    <p>This is more content for option 2</p>
  </cv-content-switcher-content>
  <cv-content-switcher-content owner-id="csb-3">
    <p>This is the content for option 3</p>
  </cv-content-switcher-content>
</section>
</div>
`;
const Template = args => {
  return {
    components: {
      CvContentSwitcher,
      CvContentSwitcherButton,
      CvContentSwitcherContent,
    },
    setup: () => ({
      args,
      onSelected: action('selected'),
      selectedIndex: args.selectedIndex,
      iconSample: IbmSecurity20,
    }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = initArgs;
// Default.parameters = storyParametersObject(
//   Default.parameters,
//   template,
//   Default.args
// );
// Default.parameters.controls = { exclude: ['default', 'selected'] };

/**
 * Direct DOM
 */
const templateDom = `
<div>
<cv-content-switcher aria-label='Choose content' v-bind='args' @selected="onSelected">
  <cv-content-switcher-button content-selector=".content-1" :selected="selectedIndex === 0">Button Name 1</cv-content-switcher-button>
  <cv-content-switcher-button content-selector=".content-2" :selected="selectedIndex === 1">Button Name 2</cv-content-switcher-button>
  <cv-content-switcher-button :icon="iconSample" content-selector=".content-3" :selected="selectedIndex === 2">Button Name 3</cv-content-switcher-button>
</cv-content-switcher>
  <section style="margin: 10px 0;">
    <div class="content-1">
      <p>This is the DOM content for option 1</p>
    </div>
    <div class="content-2">
      <p>This is the DOM content for option 2</p>
    </div>
    <div class="content-2" >
      <p>This is more DOM content for option 2</p>
    </div>
    <div class="content-3">
      <p>This is the DOM content for option 3</p>
    </div>
  </section>
</div>
`;
const TemplateDom = args => {
  return {
    components: {
      CvContentSwitcher,
      CvContentSwitcherButton,
      CvContentSwitcherContent,
    },
    setup: () => ({
      args,
      onSelected: action('selected'),
      selectedIndex: args.selectedIndex,
      iconSample: IbmSecurity20,
    }),
    template: templateDom,
  };
};
export const directDom = TemplateDom.bind({});
directDom.args = initArgs;
directDom.parameters = storyParametersObject(
  directDom.parameters,
  templateDom,
  directDom.args
);
directDom.parameters.controls = { exclude: ['default', 'selected'] };

/**
 * Multiple switchers
 */
const templateMultiple = `
<div>
  <cv-content-switcher aria-label='Choose content' v-bind='args' @selected="onSelected" id="star-wars">
    <cv-content-switcher-button parentSwitcher="star-wars" owner-id="episode-1" :selected="selectedIndex === 0">Episode 1</cv-content-switcher-button>
    <cv-content-switcher-button parentSwitcher="star-wars" owner-id="episode-2" :selected="selectedIndex === 1">Episode 2</cv-content-switcher-button>
    <cv-content-switcher-button parentSwitcher="star-wars" :icon="iconSample" owner-id="episode-3" :selected="selectedIndex === 2">Episode 3</cv-content-switcher-button>
  </cv-content-switcher>
  <section style="margin: 10px 0;">
    <cv-content-switcher-content parentSwitcher="star-wars" owner-id="episode-1">
      <p>Padme</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content parentSwitcher="star-wars" owner-id="episode-2">
      <p>Anakin</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content parentSwitcher="star-wars" owner-id="episode-2" >
      <p>Zam</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content parentSwitcher="star-wars" owner-id="episode-3">
      <p>Yoda</p>
    </cv-content-switcher-content>
  </section>
  <cv-content-switcher aria-label='Choose content' v-bind='args' @selected="onSelected" id="LotR">
    <cv-content-switcher-button parentSwitcher="LotR" owner-id="book-1" :selected="selectedIndex === 0">Book 1</cv-content-switcher-button>
    <cv-content-switcher-button parentSwitcher="LotR" owner-id="book-2" :selected="selectedIndex === 1">Book 2</cv-content-switcher-button>
    <cv-content-switcher-button parentSwitcher="LotR" :icon="iconSample" owner-id="book-3" :selected="selectedIndex === 2">Book 3</cv-content-switcher-button>
  </cv-content-switcher>
  <section style="margin: 10px 0;">
    <cv-content-switcher-content parentSwitcher="LotR" owner-id="book-1">
      <p>Bilbo</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content parentSwitcher="LotR" owner-id="book-2">
      <p>Frodo</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content parentSwitcher="LotR" owner-id="book-2" >
      <p>Sauron</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content parentSwitcher="LotR" owner-id="book-3">
      <p>Gandalf</p>
    </cv-content-switcher-content>
  </section>
</div>
`;
const TemplateMultiple = args => {
  return {
    components: {
      CvContentSwitcher,
      CvContentSwitcherButton,
      CvContentSwitcherContent,
    },
    setup: () => ({
      args,
      onSelected: action('selected'),
      selectedIndex: args.selectedIndex,
      iconSample: IbmSecurity20,
    }),
    template: templateMultiple,
  };
};
export const multipleSwitchers = TemplateMultiple.bind({});
multipleSwitchers.args = initArgs;
multipleSwitchers.parameters = storyParametersObject(
  multipleSwitchers.parameters,
  templateMultiple,
  multipleSwitchers.args
);
multipleSwitchers.parameters.controls = { exclude: ['default', 'selected'] };
