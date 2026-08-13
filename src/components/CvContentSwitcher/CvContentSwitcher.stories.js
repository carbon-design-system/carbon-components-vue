import { action } from '@storybook/addon-actions';
import { CvContentSwitcher } from '.';
import CvContentSwitcherButton from './CvContentSwitcherButton.vue';
import CvContentSwitcherContent from './CvContentSwitcherContent.vue';
import { IbmSecurity20 } from '@carbon/icons-vue';
import { storyParametersObject } from '../../global/storybook-utils';

const components = {
  CvContentSwitcher,
  CvContentSwitcherButton,
  CvContentSwitcherContent,
};

const excludeCommon = ['default', 'selected'];

export default {
  title: 'Component/CvContentSwitcher',
  component: CvContentSwitcher,
  argTypes: {
    size: {
      control: 'select',
      options: ['', 'sm', 'md', 'xl'],
    },
  },
  args: {
    light: true,
    selectedIndex: 0,
  },
};

// ---------------------------------------------------------------------------
// Default (owner-id / CvContentSwitcherContent)
// ---------------------------------------------------------------------------
const templateDefault = `
<div>
  <cv-content-switcher aria-label="Choose content" v-bind="args" @selected="onSelected">
    <cv-content-switcher-button owner-id="csb-1" :selected="args.selectedIndex === 0">Button Name 1</cv-content-switcher-button>
    <cv-content-switcher-button owner-id="csb-2" :selected="args.selectedIndex === 1">Button Name 2</cv-content-switcher-button>
    <cv-content-switcher-button :icon="iconSample" owner-id="csb-3" :selected="args.selectedIndex === 2">Button Name 3</cv-content-switcher-button>
  </cv-content-switcher>
  <section style="margin: 10px 0;">
    <cv-content-switcher-content owner-id="csb-1">
      <p>This is the content for option 1</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content owner-id="csb-2">
      <p>This is the content for option 2</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content owner-id="csb-2">
      <p>This is more content for option 2</p>
    </cv-content-switcher-content>
    <cv-content-switcher-content owner-id="csb-3">
      <p>This is the content for option 3</p>
    </cv-content-switcher-content>
  </section>
</div>`;

export const Default = args => ({
  components,
  setup: () => ({
    args,
    iconSample: IbmSecurity20,
    onSelected: action('selected'),
  }),
  template: templateDefault,
});
Default.args = { selectedIndex: 0 };
Default.parameters = storyParametersObject(
  { controls: { exclude: excludeCommon } },
  templateDefault,
  Default.args
);

// ---------------------------------------------------------------------------
// Direct DOM (content-selector)
// ---------------------------------------------------------------------------
const templateDirectDOM = `
<div>
  <cv-content-switcher aria-label="Choose content" v-bind="args" @selected="onSelected">
    <cv-content-switcher-button content-selector=".content-1" :selected="args.selectedIndex === 0">Button Name 1</cv-content-switcher-button>
    <cv-content-switcher-button content-selector=".content-2" :selected="args.selectedIndex === 1">Button Name 2</cv-content-switcher-button>
    <cv-content-switcher-button :icon="iconSample" content-selector=".content-3" :selected="args.selectedIndex === 2">Button Name 3</cv-content-switcher-button>
  </cv-content-switcher>
  <section style="margin: 10px 0;">
    <div class="content-1">
      <p>This is the DOM content for option 1</p>
    </div>
    <div class="content-2">
      <p>This is the DOM content for option 2</p>
    </div>
    <div class="content-2">
      <p>This is more DOM content for option 2</p>
    </div>
    <div class="content-3">
      <p>This is the DOM content for option 3</p>
    </div>
  </section>
</div>`;

export const DirectDOM = args => ({
  components,
  setup: () => ({
    args,
    iconSample: IbmSecurity20,
    onSelected: action('selected'),
  }),
  template: templateDirectDOM,
});
DirectDOM.storyName = 'Direct DOM';
DirectDOM.args = { selectedIndex: 0 };
DirectDOM.parameters = storyParametersObject(
  { controls: { exclude: excludeCommon } },
  templateDirectDOM,
  DirectDOM.args
);

// ---------------------------------------------------------------------------
// Multiple switchers on the same page
// ---------------------------------------------------------------------------
const templateMultiple = `
<div>
  <cv-content-switcher tabindex="0" aria-label="Choose content" v-bind="args" @selected="onSelected" id="star-wars">
    <cv-content-switcher-button parent-switcher="star-wars" owner-id="episode-1" :selected="args.selectedIndex === 0">Episode 1</cv-content-switcher-button>
    <cv-content-switcher-button parent-switcher="star-wars" owner-id="episode-2" :selected="args.selectedIndex === 1">Episode 2</cv-content-switcher-button>
    <cv-content-switcher-button parent-switcher="star-wars" :icon="iconSample" owner-id="episode-3" :selected="args.selectedIndex === 2">Episode 3</cv-content-switcher-button>
  </cv-content-switcher>
  <section style="margin: 10px 0;">
    <cv-content-switcher-content parent-switcher="star-wars" owner-id="episode-1"><p>Padme</p></cv-content-switcher-content>
    <cv-content-switcher-content parent-switcher="star-wars" owner-id="episode-2"><p>Anakin</p></cv-content-switcher-content>
    <cv-content-switcher-content parent-switcher="star-wars" owner-id="episode-2"><p>Zam</p></cv-content-switcher-content>
    <cv-content-switcher-content parent-switcher="star-wars" owner-id="episode-3"><p>Yoda</p></cv-content-switcher-content>
  </section>

  <cv-content-switcher tabindex="1" aria-label="Choose content" v-bind="args" @selected="onSelected" id="LotR">
    <cv-content-switcher-button parent-switcher="LotR" owner-id="book-1" :selected="args.selectedIndex === 0">Book 1</cv-content-switcher-button>
    <cv-content-switcher-button parent-switcher="LotR" owner-id="book-2" :selected="args.selectedIndex === 1">Book 2</cv-content-switcher-button>
    <cv-content-switcher-button parent-switcher="LotR" :icon="iconSample" owner-id="book-3" :selected="args.selectedIndex === 2">Book 3</cv-content-switcher-button>
  </cv-content-switcher>
  <section style="margin: 10px 0;">
    <cv-content-switcher-content parent-switcher="LotR" owner-id="book-1"><p>Bilbo</p></cv-content-switcher-content>
    <cv-content-switcher-content parent-switcher="LotR" owner-id="book-2"><p>Frodo</p></cv-content-switcher-content>
    <cv-content-switcher-content parent-switcher="LotR" owner-id="book-2"><p>Sauron</p></cv-content-switcher-content>
    <cv-content-switcher-content parent-switcher="LotR" owner-id="book-3"><p>Gandalf</p></cv-content-switcher-content>
  </section>
</div>`;

export const MultipleSwitchers = args => ({
  components,
  setup: () => ({
    args,
    iconSample: IbmSecurity20,
    onSelected: action('selected'),
  }),
  template: templateMultiple,
});
MultipleSwitchers.storyName = 'Multiple Switchers';
MultipleSwitchers.args = { selectedIndex: 0 };
MultipleSwitchers.parameters = storyParametersObject(
  { controls: { exclude: excludeCommon } },
  templateMultiple,
  MultipleSwitchers.args
);
