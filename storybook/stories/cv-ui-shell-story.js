import { storiesOf } from '@storybook/vue';
import {} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvHeaderNotesMD from '@carbon/vue/src/components/cv-ui-shell/cv-header-notes.md';

import CvHeader from '@carbon/vue/src/components/cv-ui-shell/cv-header';
import CvHeaderPanel from '@carbon/vue/src/components/cv-ui-shell/cv-header-panel';
import CvHeaderNav from '@carbon/vue/src/components/cv-ui-shell/cv-header-nav';
import CvHeaderName from '@carbon/vue/src/components/cv-ui-shell/cv-header-name';
import CvHeaderMenu from '@carbon/vue/src/components/cv-ui-shell/cv-header-menu';
import CvHeaderMenuItem from '@carbon/vue/src/components/cv-ui-shell/cv-header-menu-item';
import CvHeaderGlobalAction from '@carbon/vue/src/components/cv-ui-shell/cv-header-global-action';
import CvHeaderMenuButton from '@carbon/vue/src/components/cv-ui-shell/cv-header-menu-button';
import CvSideNav from '@carbon/vue/src/components/cv-ui-shell/cv-side-nav';
import CvSideNavLink from '@carbon/vue/src/components/cv-ui-shell/cv-side-nav-link';
import CvSideNavMenu from '@carbon/vue/src/components/cv-ui-shell/cv-side-nav-menu';
import CvSideNavItems from '@carbon/vue/src/components/cv-ui-shell/cv-side-nav-items';
import CvSideNavMenuItem from '@carbon/vue/src/components/cv-ui-shell/cv-side-nav-menu-item';
import CvSkipToContent from '@carbon/vue/src/components/cv-ui-shell/cv-skip-to-content';
import CvSwitcher from '@carbon/vue/src/components/cv-ui-shell/cv-switcher';
import CvSwitcherItem from '@carbon/vue/src/components/cv-ui-shell/cv-switcher-item';
import CvSwitcherItemLink from '@carbon/vue/src/components/cv-ui-shell/cv-switcher-item-link';
import Fade16 from '@carbon/icons-vue/es/fade/16';
import Notification20 from '@carbon/icons-vue/es/notification/20';
import UserAvatar20 from '@carbon/icons-vue/es/user--avatar/20';
import AppSwitcher20 from '@carbon/icons-vue/es/app-switcher/20';

const storiesDefault = storiesOf('Components/CvUIShell - header', module);
const storiesExperimental = storiesOf('Experimental/CvUIShell - header', module);

const preKnobs = {
  // flipMenu: {
  //   group: 'attr',
  //   type: boolean,
  //   config: ['flip menu', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
  //   prop: { type: Boolean, name: 'flip-menu' },
  // },
  // up: {
  //   group: 'attr',
  //   type: boolean,
  //   config: ['up', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
  //   prop: { type: Boolean, name: 'up' },
  // },
  // offset: {
  //   group: 'attr',
  //   type: object,
  //   config: ['offset example', { left: 0, top: 0 }], // consts.CONFIG], // fails when used with number in storybook 4.1.4
  //   prop: { type: Object, name: 'offset' },
  // },
  headerName: {
    group: 'headerName',
    value: `<cv-skip-to-content href="#main-content">
    Skip to content
  </cv-skip-to-content>
  <cv-header-name href="javascript:void(0)" prefix="IBM">
    ${'&nbsp;'}[Platform]
  </cv-header-name>`,
  },
  headerNav: {
    group: 'headerNav',
    value: `<cv-header-nav aria-label="Carbon nav">
  <cv-header-menu-item href="javascript:void(0)">
    Link 1
  </cv-header-menu-item>
  <cv-header-menu-item href="javascript:void(0)">
    Link 2
  </cv-header-menu-item>
  <cv-header-menu-item href="javascript:void(0)">
    Link 3
  </cv-header-menu-item>
  <cv-header-menu aria-label="Link 4">
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
</cv-header-nav>`,
  },
  headerActions: {
    group: 'headerActions',
    value: `<template slot="header-global">
    <cv-header-global-action
      aria-label="Notifications"
      aria-controls="notifications-panel"
      @click="actionNotifications" >
      <Notification20 />
    </cv-header-global-action>
    <cv-header-global-action aria-label="User avatar" @click="actionUserAvatar" aria-controls="">
      <UserAvatar20 />
    </cv-header-global-action>
    <cv-header-global-action
      aria-label="App switcher"
      aria-controls="switcher-panel"
      @click="actionAppSwitcher">
      <AppSwitcher20 />
    </cv-header-global-action>
  </template>`,
  },
  notificationsPanel: {
    group: 'rightPanels',
    value: `<cv-header-panel  id="notifications-panel">
      An empty panel
    </cv-header-panel>`,
  },
  switcherPanel: {
    group: 'rightPanels',
    value: `<cv-header-panel id="switcher-panel">
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
    </cv-header-panel>`,
  },
  headerMenuButton: {
    group: 'headerMenuButton',
    value: `<cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />`,
  },
  sideNavFixed: {
    group: 'leftPanels2',
    value: `<cv-side-nav id="side-nav" fixed expanded>
      <cv-side-nav-items>
        <cv-side-nav-menu title="L1 menu">
          <cv-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
        </cv-side-nav-menu>
        <cv-side-nav-menu title="L1 menu">
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
        </cv-side-nav-menu>
        <cv-side-nav-link href="javascript:void(0)">
          L1 link
        </cv-side-nav-link>
        <cv-side-nav-link href="javascript:void(0)">
          L1 link
        </cv-side-nav-link>
      </cv-side-nav-items>
    </cv-side-nav>`,
  },
  sideNavFixedWithIcons: {
    group: 'leftPanels2',
    value: `<cv-side-nav id="side-nav" fixed expanded>
      <cv-side-nav-items>
        <cv-side-nav-menu title="L1 menu">
          <template slot="nav-icon"><Fade16 /></template>
          <cv-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
        </cv-side-nav-menu>
        <cv-side-nav-menu title="L1 menu">
          <template slot="nav-icon"><Fade16 /></template>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
        </cv-side-nav-menu>
        <cv-side-nav-link href="javascript:void(0)">
          <template slot="nav-icon"><Fade16 /></template>
          L1 link
        </cv-side-nav-link>
        <cv-side-nav-link href="javascript:void(0)">
          <template slot="nav-icon"><Fade16 /></template>
          L1 link
        </cv-side-nav-link>
      </cv-side-nav-items>
    </cv-side-nav>`,
  },
  sideNav: {
    group: 'leftPanels',
    value: `<cv-side-nav id="side-nav">
      <cv-side-nav-items>
        <cv-side-nav-menu title="L1 menu">
          <cv-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
        </cv-side-nav-menu>
        <cv-side-nav-menu title="L1 menu">
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
        </cv-side-nav-menu>
        <cv-side-nav-link href="javascript:void(0)">
          L1 link
        </cv-side-nav-link>
        <cv-side-nav-link href="javascript:void(0)">
          L1 link
        </cv-side-nav-link>
      </cv-side-nav-items>
    </cv-side-nav>`,
  },
  sideNavWithIcons: {
    group: 'leftPanels',
    value: `<cv-side-nav id="side-nav">
      <cv-side-nav-items>
        <cv-side-nav-menu title="L1 menu">
          <template slot="nav-icon"><Fade16 /></template>
          <cv-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
        </cv-side-nav-menu>
        <cv-side-nav-menu title="L1 menu">
          <template slot="nav-icon"><Fade16 /></template>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
        </cv-side-nav-menu>
        <cv-side-nav-link href="javascript:void(0)">
          <template slot="nav-icon"><Fade16 /></template>
          L1 link
        </cv-side-nav-link>
        <cv-side-nav-link href="javascript:void(0)">
          <template slot="nav-icon"><Fade16 /></template>
          L1 link
        </cv-side-nav-link>
      </cv-side-nav-items>
    </cv-side-nav>`,
  },
};

const variants = [
  { name: 'default' },
  { name: 'Header Base', includes: ['headerName'] },
  { name: 'Header Base with Navigation', includes: ['headerName', 'headerNav'] },
  { name: 'Header Base with Actions', includes: ['headerName', 'headerActions'] },
  { name: 'Header Base with Navigation and Actions', includes: ['headerName', 'headerActions', 'headerActions'] },
  { name: 'Header Base with Actions and right panel', includes: ['headerName', 'headerActions', 'notificationsPanel'] },
  { name: 'Header Base with Actions and switcher panel', includes: ['headerName', 'headerActions', 'switcherPanel'] },
  {
    name: 'Header Base with Actions and right panels',
    includes: ['headerName', 'headerActions', 'notificationsPanel', 'switcherPanel'],
  },
  {
    name: 'Fixed Side Nav',
    includes: ['headerName', 'sideNavFixed'],
  },
  {
    name: 'Fixed Side Nav and icons',
    includes: ['headerName', 'sideNavFixedWithIcons'],
  },
  {
    name: 'Header Base with Side Nav',
    includes: ['headerName', 'headerMenuButton', 'sideNav'],
  },
  {
    name: 'Header Base with Side Nav and icons',
    includes: ['headerName', 'headerMenuButton', 'sideNavWithIcons'],
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesExperimental.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `<cv-header aria-label="Carbon header">${settings.group.headerMenuButton}${settings.group.headerName}${settings.group.headerNav}${settings.group.headerActions}
    <template slot="left-panels" v-if="areLeftPanels">
      ${settings.group.leftPanels}
    </template>
    <template slot="right-panels" v-if="areRightPanels">
    ${settings.group.rightPanels}
  </template>
</cv-header>
${settings.group.leftPanels2}
          `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      under-construction
      sv-source='${templateString.trim()}'
      sv-position="center"
      sv-padding="150px 0 50px 0"
      :sv-extra-margin="areLeftPanels ? '300px' : ''"
      >
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: {
          SvTemplateView,
          CvHeader,
          CvHeaderPanel,
          CvHeaderName,
          CvHeaderNav,
          CvHeaderGlobalAction,
          CvHeaderMenu,
          CvHeaderMenuItem,
          CvHeaderMenuButton,
          CvSideNav,
          CvSideNavLink,
          CvSideNavMenu,
          CvSideNavItems,
          CvSideNavMenuItem,
          CvSkipToContent,
          CvSwitcher,
          CvSwitcherItem,
          CvSwitcherItemLink,
          Notification20,
          UserAvatar20,
          AppSwitcher20,
          Fade16,
        },
        template: templateViewString,
        props: settings.props,
        mounted() {
          this.doActionNotification = () => action('Notifications - click');
          this.doActionSwitcher = () => action('Notifications - click');
        },
        computed: {
          areLeftPanels() {
            return settings.group.leftPanels.length > 0 || settings.group.leftPanels2.length > 0;
          },
          areRightPanels() {
            return settings.group.rightPanels.length > 0;
          },
        },
        methods: {
          actionNotifications() {
            this.doActionNotification();
          },
          actionUserAvatar: action('User avatar - click'),
          actionAppSwitcher() {
            this.doActionSwitcher();
          },
        },
      };
    },
    {
      notes: { markdown: CvHeaderNotesMD },
    }
  );
}
