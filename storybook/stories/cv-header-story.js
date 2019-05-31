import { storiesOf } from '@storybook/vue';
import {} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvHeaderNotesMD from '@carbon/vue/src/components/cv-header/cv-header-notes.md';

import CvHeader from '@carbon/vue/src/components/cv-header/cv-header';
import CvHeaderNav from '@carbon/vue/src/components/cv-header/cv-header-nav';
import CvHeaderName from '@carbon/vue/src/components/cv-header/cv-header-name';
import CvHeaderMenu from '@carbon/vue/src/components/cv-header/cv-header-menu';
import CvHeaderMenuItem from '@carbon/vue/src/components/cv-header/cv-header-menu-item';
import CvHeaderGlobalAction from '@carbon/vue/src/components/cv-header/cv-header-global-action';
import CvSkipToContent from '@carbon/vue/src/components/cv-header/cv-skip-to-content';
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
  <cv-header-name href="/" prefix="IBM">
    ${'&nbsp;'}[Platform]
  </cv-header-name>`,
  },
  headerNav: {
    group: 'headerNav',
    value: `<cv-header-nav aria-label="Carbon nav">
  <cv-header-menu-item href="/link1">
    Link 1
  </cv-header-menu-item>
  <cv-header-menu-item href="/link2">
    Link 2
  </cv-header-menu-item>
  <cv-header-menu-item href="/link3">
    Link 3
  </cv-header-menu-item>
  <cv-header-menu aria-label="Link 4">
    <cv-header-menu-item href="/submenu-link1">
      Submenu Link 1
    </cv-header-menu-item>
    <cv-header-menu-item href="/submenu-link2">
      Submenu Link 2
    </cv-header-menu-item>
    <cv-header-menu-item href="/submenu-link3">
      Submenu Link 3
    </cv-header-menu-item>
  </cv-header-menu>
</cv-header-nav>`,
  },
  headerActions: {
    group: 'headerActions',
    value: `<template slot="header-global">
    <cv-header-global-action aria-label="Notifications" @click="actionNotifications">
      <Notification20 />
    </cv-header-global-action>
    <cv-header-global-action aria-label="User avatar" @click="actionUserAvatar">
      <UserAvatar20 />
    </cv-header-global-action>
    <cv-header-global-action aria-label="App switcher" @click="actionAppSwitcher">
      <AppSwitcher20 />
    </cv-header-global-action>
  </template>`,
  },
};

const variants = [
  { name: 'default' },
  { name: 'Header Base', includes: ['headerName'] },
  { name: 'Header Base with Navigation', includes: ['headerName', 'headerNav'] },
  { name: 'Header Base with Actions', includes: ['headerName', 'headerActions'] },
  { name: 'Header Base with Navigation and Actions', includes: ['headerName', 'headerActions', 'headerActions'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesExperimental.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<cv-header aria-label="Carbon header">${settings.group.headerName}${settings.group.headerNav}${
        settings.group.headerActions
      }
</cv-header>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      under-construction
      sv-source='${templateString.trim()}'
      sv-position="center"
      sv-padding="150px 0 50px 0"
      >
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: {
          SvTemplateView,
          CvHeader,
          CvHeaderName,
          CvHeaderNav,
          CvHeaderGlobalAction,
          CvHeaderMenu,
          CvHeaderMenuItem,
          CvSkipToContent,
          Notification20,
          UserAvatar20,
          AppSwitcher20,
        },
        methods: {
          actionNotifications: action('Notifications - click'),
          actionUserAvatar: action('User avatar - click'),
          actionAppSwitcher: action('App switcher - click'),
        },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvHeaderNotesMD },
    }
  );
}
