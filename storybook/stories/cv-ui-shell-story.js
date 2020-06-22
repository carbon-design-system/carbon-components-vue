import { storiesOf } from '@storybook/vue';
import {} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvHeaderNotesMD from '../../packages/core/src/components/cv-ui-shell/cv-ui-shell-notes.md';

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

import Fade16 from '@carbon/icons-vue/es/fade/16';
import Notification20 from '@carbon/icons-vue/es/notification/20';
import UserAvatar20 from '@carbon/icons-vue/es/user--avatar/20';
import AppSwitcher20 from '@carbon/icons-vue/es/app-switcher/20';

const storiesDefault = storiesOf('Components/CvUIShell - header', module);
// const storiesExperimental = storiesOf('Experimental/CvUIShell - header', module);

const preKnobs = {
  // flipMenu: {
  //   group: 'attr',
  //   type: boolean,
  //   config: ['flip menu', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
  //   prop: 'flip-menu'
  // },
  // up: {
  //   group: 'attr',
  //   type: boolean,
  //   config: ['up', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
  //   prop: 'up'
  // },
  // offset: {
  //   group: 'attr',
  //   type: object,
  //   config: ['offset example', { left: 0, top: 0 }], // consts.CONFIG], // fails when used with number in storybook 4.1.4
  //   prop: 'offset'
  // },
  headerName: {
    group: 'headerName',
    value: `<cv-skip-to-content href="#main-content">
    Skip to content
  </cv-skip-to-content>
  <cv-header-name href="javascript:void(0)" prefix="IBM">
    [Platform]
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
  <cv-header-menu aria-label="Link 4" title="Link 4">
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
    <cv-header-global-action aria-label="User avatar" @click="actionUserAvatar" aria-controls="user-panel">
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
  userPanel: {
    group: 'rightPanels',
    value: `<cv-header-panel  id="user-panel">
      An empty user panel
    </cv-header-panel>`,
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
  sideNavHeader: {
    group: 'leftPanels',
    value: `<cv-side-nav id="side-nav" fixed>
    <cv-side-nav-items>
      <cv-header-side-nav-items>
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
    </cv-side-nav-items>
  </cv-side-nav>`,
  },
  sideNavAndHeaderNav: {
    group: 'leftPanels',
    value: `<cv-side-nav id="side-nav" rail>
    <cv-side-nav-items>
      <cv-header-side-nav-items divider>
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
        <cv-side-nav-menu title="L1 menu" expanded>
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
  sideNav2: {
    group: 'leftPanels2',
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
  sideNavWithIcons2: {
    group: 'leftPanels2',
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
  sideNavRail: {
    group: 'leftPanels',
    value: `<cv-side-nav id="side-nav" rail>
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
  { name: 'Header Base', includes: ['headerName'] },
  { name: 'Header Base with Navigation', includes: ['headerMenuButton', 'headerName', 'headerNav', 'sideNavHeader'] },
  { name: 'Header Base with Actions', includes: ['headerName', 'headerActions'] },
  {
    name: 'Header Base with Navigation and Actions',
    includes: ['headerName', 'headerMenuButton', 'headerNav', 'headerActions', 'sideNavHeader'],
  },
  {
    name: 'Header Base with Actions and right panels',
    includes: ['headerName', 'headerActions', 'notificationsPanel', 'userPanel', 'switcherPanel'],
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
    name: 'Side Nav rail',
    includes: ['sideNavRail'],
  },
  {
    name: 'Side Nav rail with header',
    includes: ['headerName', 'headerMenuButton', 'sideNavRail'],
  },
  {
    name: 'Header Base with Side rail and header Nav',
    includes: ['headerName', 'headerMenuButton', 'headerNav', 'sideNavAndHeaderNav'],
  },
  {
    name: 'Header Base with Side Nav',
    includes: ['headerName', 'headerMenuButton', 'sideNav'],
  },
  {
    name: 'Header Base with Side Nav and icons',
    includes: ['headerName', 'headerMenuButton', 'sideNavWithIcons'],
  },
  {
    name: 'Header Base with seperate Side Nav',
    includes: ['headerName', 'sideNav2'],
  },
  {
    name: 'Header Base with seperate Side Nav and icons',
    includes: ['headerName', 'sideNavWithIcons2'],
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
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
          CvHeaderSideNavItems,
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
