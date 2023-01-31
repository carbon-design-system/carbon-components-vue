import { action } from '@storybook/addon-actions';
import {
  CvHeader,
  CvHeaderGlobalAction,
  CvHeaderMenu,
  CvHeaderMenuButton,
  CvHeaderMenuItem,
  CvHeaderName,
  CvHeaderNav,
  CvHeaderPanel,
  CvSideNav,
  CvSideNavDivider,
  CvSideNavItems,
  CvSideNavLink,
  CvSideNavMenu,
  CvSideNavMenuItem,
  CvSkipToContent,
  CvSwitcher,
  CvSwitcherItem,
  CvSwitcherItemLink,
  CvHeaderSideNavItems,
} from '../../packages/core/src/';
import { Notification20, Login20, UserAvatar20, AppSwitcher20, Fade16 } from '@carbon/icons-vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvUIShell',
  argTypes: {
    actions: {
      control: { type: 'select', labels: ['None', 'Actions', 'Actions and right side panels'] },
      options: [0, 1, 2],
      description: 'Actions with or without side panels',
      defaultValue: 0,
    },
    sideNav: {
      control: { type: 'select', labels: ['None', 'SideNav', 'SideNav Rail', 'Sidenav Fixed'] },
      options: [0, 1, 2, 3],
      description: 'Side nav options',
      defaultValue: 0,
    },
    sideNavExpanded: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    withNav: {
      control: { type: 'boolean' },
      description: 'Add a nav/menu options',
      defaultValue: false,
    },
  },
  decorators: [
    () => ({
      template: `<div class="cv-sb__see-docs-tab"><story /><div style="margin: 200px">View source in 'Docs' tab.</div></div>`,
    }),
  ], // component: CvUiShell,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

const actionUserLogInOut = action('Login/out');
const actionNotification = action('Notification');
const actionAppSwitcher = action('App switcher');

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvHeader,
    CvHeaderGlobalAction,
    CvHeaderMenu,
    CvHeaderMenuButton,
    CvHeaderMenuItem,
    CvHeaderName,
    CvHeaderNav,
    CvHeaderPanel,
    CvSideNav,
    CvSideNavDivider,
    CvSideNavItems,
    CvSideNavLink,
    CvSideNavMenu,
    CvSideNavMenuItem,
    CvSkipToContent,
    CvSwitcher,
    CvSwitcherItem,
    CvSwitcherItemLink,
    CvHeaderSideNavItems,
    Notification20,
    Login20,
    UserAvatar20,
    AppSwitcher20,
    Fade16,
  },
  data() {
    return {
      baseNav: [
        'Link 1',
        'Link 2',
        'Link 3',
        { label: 'Link 4', items: ['Submenu link 1', 'Submenu link 2', 'Submenu link 3'] },
      ],
      loggedIn: false,
    };
  },
  methods: {
    handleLoginOut() {
      this.loggedIn = !this.loggedIn;
      actionUserLogInOut();
    },
    handleNotification() {
      actionNotification();
    },
    handleAppSwitcher() {
      actionAppSwitcher();
    },
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-header aria-label="Carbon header">
  <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" v-if="sideNav > 0 || withNav" :active="sideNavExpanded" />
  <cv-skip-to-content href="#main-content">
    Skip to content
  </cv-skip-to-content>
  <cv-header-name href="javascript:void(0)" prefix="IBM">
    [Platform]
  </cv-header-name>
  <cv-header-nav aria-label="Carbon nav" v-if="withNav">
    <component v-for="link in baseNav"
      :is="link.items ? 'cv-header-menu' : 'cv-header-menu-item'"
      :aria-label="link.items ? link.label : link"
      :href="link.items ? undefined : 'javascript:void(0)'"
      :title="link.items ? link.label : undefined">
      <span v-if="!link.items">{{link}}</span>
      <cv-header-menu-item v-for="item in (link.items || [])" href="javascript:void(0)">
        {{item}}
      </cv-header-menu-item>
    </component>
  </cv-header-nav>

  <template slot="header-global" v-if="actions > 0">
    <cv-header-global-action
      aria-label="Notifications"
      aria-controls="notifications-panel"
      @click="handleNotification"
      label="Notifications"
      tipPosition="bottom"
      tipAlignment="start"
      >
      <Notification20 />
    </cv-header-global-action>
    <cv-header-global-action
      aria-label="User avatar"
      @click="handleLoginOut"
      aria-controls="user-panel"
      :label="loggedIn ? 'Log out' : 'Log in'"
      tipPosition="bottom"
      tipAlignment="center"
      >
      <UserAvatar20 v-if="loggedIn"/>
      <Login20 v-else />
    </cv-header-global-action>
    <cv-header-global-action
      aria-label="App switcher"
      aria-controls="switcher-panel"
      @click="handleAppSwitcher"
      label="App switcher"
      tipPosition="bottom"
      tipAlignment="end"
      >
      <AppSwitcher20 />
    </cv-header-global-action>
  </template>

  <template slot="right-panels" v-if="actions > 1">
    <cv-header-panel  id="user-panel">
        An empty user panel
      </cv-header-panel>
    <cv-header-panel  id="notifications-panel">
        An empty panel
      </cv-header-panel>
    <cv-header-panel id="switcher-panel">
      <cv-switcher>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)" selected>
            Selected app
          </cv-switcher-item-link>
        </cv-switcher-item>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)">
            Other app
          </cv-switcher-item-link>
        </cv-switcher-item>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)">
            Other app
          </cv-switcher-item-link>
        </cv-switcher-item>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)">
            Other app
          </cv-switcher-item-link>
        </cv-switcher-item>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)">
            Other app
          </cv-switcher-item-link>
        </cv-switcher-item>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)">
            Other app
          </cv-switcher-item-link>
        </cv-switcher-item>
      </cv-switcher>
    </cv-header-panel>
  </template>

  <cv-side-nav id="side-nav" :expanded="sideNavExpanded" :fixed="sideNav === 3" :rail="sideNav === 2">
    <cv-side-nav-items v-if="withNav || sideNav > 0">
      <cv-header-side-nav-items v-if="withNav">
        <cv-header-menu-item href="javascript:void(0)">
        Link 1
        </cv-header-menu-item>
        <cv-header-menu-item href="javascript:void(0)">
          Link 2
        </cv-header-menu-item>
        <cv-header-menu-item href="javascript:void(0)">
          Link 3
        </cv-header-menu-item>
        <cv-header-menu aria-label="Link 4" title="Link 4" :hover-toggle="false">
          <cv-header-menu-item href="javascript:void(0)">
            Submenu Link 1
          </cv-header-menu-item>
          <cv-header-menu-item href="javascript:void(0)">
            Submenu Link 2
          </cv-header-menu-item>
          <cv-header-menu-item href="javascript:void(0)">
            Submenu Link 3
          </cv-header-menu-item>
        </cv-header-menu>
      </cv-header-side-nav-items>

      <cv-side-nav-menu title="L1 menu" v-if="sideNav > 0">
        <template slot="nav-icon"><Fade16 /></template>
        <cv-side-nav-menu-item href="javascript:void(0)" active>
          L2a menu item
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item href="javascript:void(0)">
          L2b menu item
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item href="javascript:void(0)">
          L2c menu item
        </cv-side-nav-menu-item>
      </cv-side-nav-menu>
      <cv-side-nav-menu title="L1 menu" v-if="sideNav > 0">
        <template slot="nav-icon"><Fade16 /></template>
        <cv-side-nav-menu-item href="javascript:void(0)">
          L2d menu item
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item href="javascript:void(0)" aria-current="page">
          L2e menu item
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item href="javascript:void(0)">
          L2f menu item
        </cv-side-nav-menu-item>
      </cv-side-nav-menu>
      <cv-side-nav-link href="javascript:void(0)" v-if="sideNav > 0">
        <template slot="nav-icon"><Fade16 /></template>
        L1a link
      </cv-side-nav-link>
      <cv-side-nav-link href="javascript:void(0)" v-if="sideNav > 0">
        <template slot="nav-icon"><Fade16 /></template>
        L1b link
      </cv-side-nav-link>
    </cv-side-nav-items>
  </cv-side-nav>
</cv-header>`,
});

export const _CvUiShell = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvUiShell.args = {};
