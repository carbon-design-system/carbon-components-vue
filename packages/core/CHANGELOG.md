# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.42.0](https://github.com/carbon-design-system/carbon-components-vue/compare/@carbon/vue@2.22.0-canary.0...@carbon/vue@2.42.0) (2021-11-02)

### Bug Fixes

- change label HTML tag in cv-file-uploader component ([#1145](https://github.com/carbon-design-system/carbon-components-vue/issues/1145)) ([5c8da0a](https://github.com/carbon-design-system/carbon-components-vue/commit/5c8da0a5faf143fe44103e7622804863214840e9))
- cv-data-table headers have no padding when sortable = false ([#1162](https://github.com/carbon-design-system/carbon-components-vue/issues/1162)) ([22564a4](https://github.com/carbon-design-system/carbon-components-vue/commit/22564a4b42eb7bc9dc5e8699312eb883379b3746))
- cv-data-table listener is called after navigation ([#1089](https://github.com/carbon-design-system/carbon-components-vue/issues/1089)) ([68a18d5](https://github.com/carbon-design-system/carbon-components-vue/commit/68a18d50bade6af70e9bca48c2cb7f4e7a4b475f))
- cv-date-picker range plugin use ([#1104](https://github.com/carbon-design-system/carbon-components-vue/issues/1104)) ([1d58ca4](https://github.com/carbon-design-system/carbon-components-vue/commit/1d58ca4d82783a3bac691a5a7a781abd86ef599e))
- cv-tabs fails in focusout event when using router-link in a tab ([#1084](https://github.com/carbon-design-system/carbon-components-vue/issues/1084)) ([91adefb](https://github.com/carbon-design-system/carbon-components-vue/commit/91adefbd24b2e6a837fe732e2f132049eda9dc87)), closes [#1083](https://github.com/carbon-design-system/carbon-components-vue/issues/1083) [#1083](https://github.com/carbon-design-system/carbon-components-vue/issues/1083)
- **cv-tabs:** Fix error on parentNode on doScrollIntoView. ([#1269](https://github.com/carbon-design-system/carbon-components-vue/issues/1269)) ([f4aab3a](https://github.com/carbon-design-system/carbon-components-vue/commit/f4aab3a7235f159c99d21a0445358402f1c212b2))
- ensure no previous transitionend event triggers after-modal-hidden ([#1081](https://github.com/carbon-design-system/carbon-components-vue/issues/1081)) ([0c5ffe2](https://github.com/carbon-design-system/carbon-components-vue/commit/0c5ffe2ba8dc78567eb0f528d56074877b96119c))
- error due to l10n exported with "default" field. ([#1271](https://github.com/carbon-design-system/carbon-components-vue/issues/1271)) ([97781a4](https://github.com/carbon-design-system/carbon-components-vue/commit/97781a40e42d6ccd289e555177c828a4401d2944))
- **file-uploader:** mark files with invalid types/formats ([#1231](https://github.com/carbon-design-system/carbon-components-vue/issues/1231)) ([dc3d8e1](https://github.com/carbon-design-system/carbon-components-vue/commit/dc3d8e1bbf2bbf55952d60e486218bff2ce8cc1a))
- ignore side panel focusout b4 click on safari ([#1060](https://github.com/carbon-design-system/carbon-components-vue/issues/1060)) ([ae9bf76](https://github.com/carbon-design-system/carbon-components-vue/commit/ae9bf76d14127d0b2076113c87a89cc15a2c3602))
- make label on cv-icon-button required ([#1258](https://github.com/carbon-design-system/carbon-components-vue/issues/1258)) ([8716c3e](https://github.com/carbon-design-system/carbon-components-vue/commit/8716c3e1a41c2ddb2f46dadfcbfd06ab367bed46))
- modal 10-30 updates ([#1166](https://github.com/carbon-design-system/carbon-components-vue/issues/1166)) ([ff56466](https://github.com/carbon-design-system/carbon-components-vue/commit/ff564667ee46f11327e2e800e7b8ea6451821d74))
- remove extra tabIndex in tag ([#1049](https://github.com/carbon-design-system/carbon-components-vue/issues/1049)) ([bfbd2ad](https://github.com/carbon-design-system/carbon-components-vue/commit/bfbd2ad6f13d75de864e98e1c3412040d7e243b9))
- **server:** cv-button default color error issue ([#1076](https://github.com/carbon-design-system/carbon-components-vue/issues/1076)) ([451816b](https://github.com/carbon-design-system/carbon-components-vue/commit/451816bdb6ec19babb99519d5e92870e0cfbdced))
- typo ([#1163](https://github.com/carbon-design-system/carbon-components-vue/issues/1163)) ([cc46805](https://github.com/carbon-design-system/carbon-components-vue/commit/cc46805edca34fb0d1d90bf04e70ca83936a9984))
- use check slot pattern in side nav ([#1092](https://github.com/carbon-design-system/carbon-components-vue/issues/1092)) ([b6d1287](https://github.com/carbon-design-system/carbon-components-vue/commit/b6d1287a7cc93d7ebf9304a353023a36f99ab3a8))

### Features

- 1030 update for text components ([#1186](https://github.com/carbon-design-system/carbon-components-vue/issues/1186)) ([71f7848](https://github.com/carbon-design-system/carbon-components-vue/commit/71f78481ff59d6ad988d7dc561cb01e1f7123002))
- add hide close to toast ([#1242](https://github.com/carbon-design-system/carbon-components-vue/issues/1242)) ([15b4f66](https://github.com/carbon-design-system/carbon-components-vue/commit/15b4f66162f55fbe4d4819163673271aa4fe580a))
- add show/hide events to cv-interactive-tooltip ([#1094](https://github.com/carbon-design-system/carbon-components-vue/issues/1094)) ([6670837](https://github.com/carbon-design-system/carbon-components-vue/commit/66708375181af8ad93b26dd455afe16a9782a00c))
- adding hideCloseButton prop to cv-inline-notification ([#1233](https://github.com/carbon-design-system/carbon-components-vue/issues/1233)) ([fd41a30](https://github.com/carbon-design-system/carbon-components-vue/commit/fd41a30880680a8c02f2f12772f2e237b827e2d9))
- emit event on progress step click. update story book & update md ([#1219](https://github.com/carbon-design-system/carbon-components-vue/issues/1219)) ([6088957](https://github.com/carbon-design-system/carbon-components-vue/commit/60889573650481cc59a26758fc82623d405b42c2))
- update number input to 10-30 ([#1168](https://github.com/carbon-design-system/carbon-components-vue/issues/1168)) ([b72c49d](https://github.com/carbon-design-system/carbon-components-vue/commit/b72c49d00701f208653b7b88154058097ebce08f))
- update progress indicator to 1030 format ([#1170](https://github.com/carbon-design-system/carbon-components-vue/issues/1170)) ([f924de1](https://github.com/carbon-design-system/carbon-components-vue/commit/f924de141f8ddcf5785b52d10fb56a2c38c5313a))
- update tile to 1030 ([#1189](https://github.com/carbon-design-system/carbon-components-vue/issues/1189)) ([b8a4fd6](https://github.com/carbon-design-system/carbon-components-vue/commit/b8a4fd69949352b3e39228fddf6be0ad19a5447e))
- update ui shell to 1030 ([#1191](https://github.com/carbon-design-system/carbon-components-vue/issues/1191)) ([41b9241](https://github.com/carbon-design-system/carbon-components-vue/commit/41b924188d0e174853d81079aa52c008ce5440a6))
- update v2 radio button to 1030 ([#1171](https://github.com/carbon-design-system/carbon-components-vue/issues/1171)) ([a9eb378](https://github.com/carbon-design-system/carbon-components-vue/commit/a9eb378e3dc2582658d61d666b91ded8fc27700e))
- v2 tooltip to 1030 ([#1190](https://github.com/carbon-design-system/carbon-components-vue/issues/1190)) ([6a18cf6](https://github.com/carbon-design-system/carbon-components-vue/commit/6a18cf67684b09d618f5e685ba378e7d7659aecd))

# 2.34.0 (2020-10-07)

### Bug Fixes

- 927 dropdown focus reset post selection ([#931](https://github.com/carbon-design-system/carbon-components-vue/issues/931)) ([803d36c](https://github.com/carbon-design-system/carbon-components-vue/commit/803d36c2ab5317eac511c9180331def762c6a284))
- add close aria label to modal ([#815](https://github.com/carbon-design-system/carbon-components-vue/issues/815)) ([9b56b0f](https://github.com/carbon-design-system/carbon-components-vue/commit/9b56b0f19c820e22d54c6a453d8d3b1105fa5633))
- add role tablist to CvContentSwitcher ([#854](https://github.com/carbon-design-system/carbon-components-vue/issues/854)) ([378a517](https://github.com/carbon-design-system/carbon-components-vue/commit/378a5179715809f3fa809974b9b3006d25c22de6))
- aria states for bools ([#934](https://github.com/carbon-design-system/carbon-components-vue/issues/934)) ([191cb6e](https://github.com/carbon-design-system/carbon-components-vue/commit/191cb6e856c0fdf11127ed75095e9ce2e7de2af5))
- button snapshot ([#897](https://github.com/carbon-design-system/carbon-components-vue/issues/897)) ([42a9ab6](https://github.com/carbon-design-system/carbon-components-vue/commit/42a9ab6349b9d57d2caa23f3df646707b470ab13))
- column styles on chrome ([#827](https://github.com/carbon-design-system/carbon-components-vue/issues/827)) ([acae072](https://github.com/carbon-design-system/carbon-components-vue/commit/acae07261b93b7a3185200bfefc0f6dad2b53310))
- notes links to carbondesignsystem.com ([#1043](https://github.com/carbon-design-system/carbon-components-vue/issues/1043)) ([3aafcff](https://github.com/carbon-design-system/carbon-components-vue/commit/3aafcffe63a16d61257b4c0bb5bbb971ebe6c660))
- remove down chevron role ([#1044](https://github.com/carbon-design-system/carbon-components-vue/issues/1044)) ([7904f2d](https://github.com/carbon-design-system/carbon-components-vue/commit/7904f2dac69b98f3c951150b742d94fa1bcde9bf))
- **cv-dropdown:** missing classes ([#1039](https://github.com/carbon-design-system/carbon-components-vue/issues/1039)) ([010dd69](https://github.com/carbon-design-system/carbon-components-vue/commit/010dd69665ccf8b44edca1d4726216bcf67f89b5))
- click outside dropdown ([#1013](https://github.com/carbon-design-system/carbon-components-vue/issues/1013)) ([9a1ff2c](https://github.com/carbon-design-system/carbon-components-vue/commit/9a1ff2cff2d5a36950f88b05bc7707f8b0bca871))
- combo and multi empty class ([#964](https://github.com/carbon-design-system/carbon-components-vue/issues/964)) ([beb2fdb](https://github.com/carbon-design-system/carbon-components-vue/commit/beb2fdb8cf6a2a171df7c9f958c00d13dd8acca4))
- content switcher accessibility ([#851](https://github.com/carbon-design-system/carbon-components-vue/issues/851)) ([b93f464](https://github.com/carbon-design-system/carbon-components-vue/commit/b93f464393ef71f2dd39a0791a30913b5134e6c7))
- correct button small deprecation behaviour ([#818](https://github.com/carbon-design-system/carbon-components-vue/issues/818)) ([d704b48](https://github.com/carbon-design-system/carbon-components-vue/commit/d704b4876b364d4d481c120ec7b40c39a85363bd))
- deploy step ([#865](https://github.com/carbon-design-system/carbon-components-vue/issues/865)) ([8c76692](https://github.com/carbon-design-system/carbon-components-vue/commit/8c76692f19fe9aad0eb87ba7fc82e3a5f7b9c392))
- disabled drop combo tag ([#912](https://github.com/carbon-design-system/carbon-components-vue/issues/912)) ([1cc67ab](https://github.com/carbon-design-system/carbon-components-vue/commit/1cc67ab727175c8fe429b6ce7235a08456f3893f))
- dropdown clearing of value ([#975](https://github.com/carbon-design-system/carbon-components-vue/issues/975)) ([bc17f76](https://github.com/carbon-design-system/carbon-components-vue/commit/bc17f76832aa56dd9cd828aa4fc23cb6ad27e890))
- dropdown placeholder updates ([#850](https://github.com/carbon-design-system/carbon-components-vue/issues/850)) ([59c265a](https://github.com/carbon-design-system/carbon-components-vue/commit/59c265a86038d19093ce1c2488cd72fa771d824a))
- dropdown value presentation ([#873](https://github.com/carbon-design-system/carbon-components-vue/issues/873)) ([1d4ab65](https://github.com/carbon-design-system/carbon-components-vue/commit/1d4ab65a79fd790f731f0c7c793bc3e4fbf9d9c8))
- empty space in combo and multi ([#963](https://github.com/carbon-design-system/carbon-components-vue/issues/963)) ([229759e](https://github.com/carbon-design-system/carbon-components-vue/commit/229759e33a8239c5129c829bee868aba058a3124))
- empty space on combo and multi ([#967](https://github.com/carbon-design-system/carbon-components-vue/issues/967)) ([14e82ec](https://github.com/carbon-design-system/carbon-components-vue/commit/14e82ec729e5ad2c8e1fcd609685931054f24221))
- ensure that CvDropdown has single tabindex for accessibility ([#868](https://github.com/carbon-design-system/carbon-components-vue/issues/868)) ([b8f0d55](https://github.com/carbon-design-system/carbon-components-vue/commit/b8f0d555f9def1616f3777410031b1ab28865d3d))
- firefox dropdown close ([#993](https://github.com/carbon-design-system/carbon-components-vue/issues/993)) ([9ee8d9e](https://github.com/carbon-design-system/carbon-components-vue/commit/9ee8d9ed3e8a70bce7cf5240cf2c2608c695041c))
- heading and data style when sortable ([#826](https://github.com/carbon-design-system/carbon-components-vue/issues/826)) ([59bd310](https://github.com/carbon-design-system/carbon-components-vue/commit/59bd3101835854c01eb47b974a0a446b072cf42f))
- ids for controlled panels ([#829](https://github.com/carbon-design-system/carbon-components-vue/issues/829)) ([b27c2f6](https://github.com/carbon-design-system/carbon-components-vue/commit/b27c2f69c254a5570b2be99512de2fcacc8d9165))
- ie11 svg class usage ([#973](https://github.com/carbon-design-system/carbon-components-vue/issues/973)) ([e861cfa](https://github.com/carbon-design-system/carbon-components-vue/commit/e861cfa0fb0a0d55dac8e4acdc656d40d7be2560))
- improve svg icon support ([#933](https://github.com/carbon-design-system/carbon-components-vue/issues/933)) ([2fc40e4](https://github.com/carbon-design-system/carbon-components-vue/commit/2fc40e4fda6cb79da455b9723abe7e43c0ce426f))
- interactive tooltip position on ie11 ([#841](https://github.com/carbon-design-system/carbon-components-vue/issues/841)) ([3551531](https://github.com/carbon-design-system/carbon-components-vue/commit/35515312dc1205aa7d4c74a371dba036869cd0cb))
- issue 923 comboBox attrs name ([#928](https://github.com/carbon-design-system/carbon-components-vue/issues/928)) ([2759d48](https://github.com/carbon-design-system/carbon-components-vue/commit/2759d48e55986aafd6d2d1ce94b6839e2ad25619))
- issue 924 passing \$listeners to cv-form ([#929](https://github.com/carbon-design-system/carbon-components-vue/issues/929)) ([3fd9208](https://github.com/carbon-design-system/carbon-components-vue/commit/3fd920859a451177cd51b33ba11194d5522ffc17))
- labels in table checkboxes ([#906](https://github.com/carbon-design-system/carbon-components-vue/issues/906)) ([4acf0c7](https://github.com/carbon-design-system/carbon-components-vue/commit/4acf0c7d1e6136ddfd417344dec5442cfc7edac1))
- lower case loading states ([#823](https://github.com/carbon-design-system/carbon-components-vue/issues/823)) ([f9fa047](https://github.com/carbon-design-system/carbon-components-vue/commit/f9fa047c45e7203f0032f9cc58fc4f0cfc927e56))
- missing aria label on batch action checkbox ([#834](https://github.com/carbon-design-system/carbon-components-vue/issues/834)) ([c2864fd](https://github.com/carbon-design-system/carbon-components-vue/commit/c2864fddcb50a04b73464b570f0b22144c5a66b0))
- multi select expand ([#880](https://github.com/carbon-design-system/carbon-components-vue/issues/880)) ([e032ea2](https://github.com/carbon-design-system/carbon-components-vue/commit/e032ea283bde18cb9f26d5e61252890e8560ece5))
- multi select use of filter tag ([#957](https://github.com/carbon-design-system/carbon-components-vue/issues/957)) ([136610e](https://github.com/carbon-design-system/carbon-components-vue/commit/136610e7dad7bd35b3e4feac6e75a09c2dfc12e0))
- multi select user filter ([#958](https://github.com/carbon-design-system/carbon-components-vue/issues/958)) ([5c03407](https://github.com/carbon-design-system/carbon-components-vue/commit/5c03407d1d853cc0649c5ad47f4226b9d2d04253))
- number input snapshot ([#808](https://github.com/carbon-design-system/carbon-components-vue/issues/808)) ([dc38a3a](https://github.com/carbon-design-system/carbon-components-vue/commit/dc38a3a98fe7b42de57e3c2b6c0487846d9f7208))
- progress step carbonPrefix ([#974](https://github.com/carbon-design-system/carbon-components-vue/issues/974)) ([7ede1a9](https://github.com/carbon-design-system/carbon-components-vue/commit/7ede1a9a7a70b40daa9ffb30af816db5f4cfec03))
- slot not updating with v-slot ([#1026](https://github.com/carbon-design-system/carbon-components-vue/issues/1026)) ([2b026c4](https://github.com/carbon-design-system/carbon-components-vue/commit/2b026c40954c5e680efbc19213b32e43aa7cf224))
- snapshot test ([#844](https://github.com/carbon-design-system/carbon-components-vue/issues/844)) ([6d08a80](https://github.com/carbon-design-system/carbon-components-vue/commit/6d08a8049113fcd5ebea0c421f8bc42c0a2c80f2))
- tooltip on icon only button ([#895](https://github.com/carbon-design-system/carbon-components-vue/issues/895)) ([a116424](https://github.com/carbon-design-system/carbon-components-vue/commit/a11642424f0220c54e46100579c13cfaa8936ad9))
- try just 5 workers on test ([#879](https://github.com/carbon-design-system/carbon-components-vue/issues/879)) ([aa03ee1](https://github.com/carbon-design-system/carbon-components-vue/commit/aa03ee14822a0dcc7750648f15fa8c1d3a5fbd3a))
- use of uidMixin without id use ([#1009](https://github.com/carbon-design-system/carbon-components-vue/issues/1009)) ([397be58](https://github.com/carbon-design-system/carbon-components-vue/commit/397be581e1503d506acb0278208bc78decc4fb8f))

### Features

- add cv-grid, cv-row, cv-column ([#1038](https://github.com/carbon-design-system/carbon-components-vue/issues/1038)) ([2ba3a5f](https://github.com/carbon-design-system/carbon-components-vue/commit/2ba3a5ff1887b558d3fd1f92bf8417e44689502d))
- **mixins:** add index for mixins and simplify imports ([#1036](https://github.com/carbon-design-system/carbon-components-vue/issues/1036)) ([a0a57d7](https://github.com/carbon-design-system/carbon-components-vue/commit/a0a57d76d7b7cefb650d5fa02dc8c56d59e9f5b8))
- add 10-11-2 update to carbon modal ([#881](https://github.com/carbon-design-system/carbon-components-vue/issues/881)) ([5b57dec](https://github.com/carbon-design-system/carbon-components-vue/commit/5b57decec3496784b7ea6df166d963264f3927d2))
- add 24 hour clock support to the time input ([#952](https://github.com/carbon-design-system/carbon-components-vue/issues/952)) ([2783e9e](https://github.com/carbon-design-system/carbon-components-vue/commit/2783e9eb1fd40fa5f91126c9623b646225c8b559))
- add accordion change event and state value ([#820](https://github.com/carbon-design-system/carbon-components-vue/issues/820)) ([e9e27e0](https://github.com/carbon-design-system/carbon-components-vue/commit/e9e27e0498cf01ced5f3022bc53b8e3217235e00))
- add aria label for expanding row button ([#1008](https://github.com/carbon-design-system/carbon-components-vue/issues/1008)) ([5c3a9a1](https://github.com/carbon-design-system/carbon-components-vue/commit/5c3a9a163d7e00e6d7606db9a86555b2f1e4098c))
- add focus method to text inputs ([#932](https://github.com/carbon-design-system/carbon-components-vue/issues/932)) ([64ab976](https://github.com/carbon-design-system/carbon-components-vue/commit/64ab9760db3bb1ad36dd635cbeb86a5f6e303c03))
- add hide label to checkbox ([#843](https://github.com/carbon-design-system/carbon-components-vue/issues/843)) ([ee6ed25](https://github.com/carbon-design-system/carbon-components-vue/commit/ee6ed25e000d5e726d02aed8ec91a73ae8dffa2c))
- add mobile number input ([#805](https://github.com/carbon-design-system/carbon-components-vue/issues/805)) ([e8cc1e8](https://github.com/carbon-design-system/carbon-components-vue/commit/e8cc1e861e13d4cabace8b8a9aa84e4ac2015158))
- disabled pagination forwards backwards btn ([#896](https://github.com/carbon-design-system/carbon-components-vue/issues/896)) ([324d78c](https://github.com/carbon-design-system/carbon-components-vue/commit/324d78c96665e41d50bb092d6e8e7485f0dd475c))
- prefix inline-loading link and number input ([#721](https://github.com/carbon-design-system/carbon-components-vue/issues/721)) ([eef6e51](https://github.com/carbon-design-system/carbon-components-vue/commit/eef6e510141b5a487661c5f5c315353e3202114b))
- use carbon flatpickr plugins ([#1031](https://github.com/carbon-design-system/carbon-components-vue/issues/1031)) ([4bbcceb](https://github.com/carbon-design-system/carbon-components-vue/commit/4bbccebfc905c97844c2ea1bec1ee281e794d3ba))
- v-html in notifications to allow markup ([#1035](https://github.com/carbon-design-system/carbon-components-vue/issues/1035)) ([44f1b61](https://github.com/carbon-design-system/carbon-components-vue/commit/44f1b612aa237564edec943f00d6ada27606d7de))

## 2.40.0

feat: CvFileUploader mark dropped files of the wrong type as invalid
feat: CvInlineNotification add ability to hide close button
feat: CvToastNotification add ability to hide close button

## 2.39.0

feat: emit event on progress step click
feat: emit event on data table row expand
feat: add sticky header option to data table
feat: add static width option to data table

## 2.38.2

fix: modal primary button and storybook usage.

## 2.38.1

fix: correct secondary button on modal to raise a 'secondary-click'

## 2.38.0

chore: promote canary release

## 2.38.0-canary.1

fix: dist versioning

## 2.38.0-canary.0

fix: cv-file-uploader dom update
fix: cv-data-table header padding
fix: 10.30 update

- cv-inline-loading
- cv-button
- cv-icon-button
- cv-code-snippet-inline
- cv-code-snippet-oneline
- cv-code-snippet-multiline
- cv-data-table
- cv-loading
- cv-modal
- cv-number-input
- cv-progress-indicator
- cv-form-group
- cv-text-area
- cv-text-input
- cv-tile
- cv-tooltip
- cv-ui-shell
- cv-tab - now uses the scroll format

## 2.37.1

chore: documentation correction for CvDataTable
chore: added Carbon Telemetry

## 2.37.0

fix: CvDatePicker use of range plugin
fix: CvMultiSelect hiding first option alternately on expand
feat: add show and hide events to CvTooltip

## 2.36.0

fix: use check slot patter in side nav
fix: cv-tabs fail during focus event
fix cv-data-table listener called after navigation
chore: update dependency

## 2.36.0-canary.0

fix: transition end after modal hidden
feat: add left right to tooltip direction
fix: data table listener called after navigation
fix: tab listener when called after nav
fix: use check slot pattern for side nav icons

## 2.35.0

feat: 10 23 1 update (#1058) - adds numerous minor changes to bring the library up to Carbon v10.23.1
chore: listen for click out only post blur (#1061)
chore: Content tune the first usage steps (#1055)
feat: Add after hidden modal event (#1069)
fix: cv-button default color error issue (#1076)

## 2.34.1

chore: add tests for cv-code-snippet, cv-toolbar, cv-structured-list
fix: spurious tab index in tag
fix: safari focus out before click

## 2.34.0

fix: links in storybook notes
fix: #1042 - CvDropdown role applied incorrectly to chevron

## 2.34.0-canary.1

fix: update flatpikr to use Carbon plugin versions
feat: allow html in notification subtitle and caption
fix: add tests for cv-tooltip
chore: update mixin imports
fix: CvDropdown missing listbox classes
fix: add test for cv-search
feat: add cv-grid, cv-row and cv-column to match Carbon React feature.

## 2.34.0-canary.0

fix: use of v-slot syntax not visible in beforeUpdate lifecycle method switched to updated.

## 2.33.0

Promote canary

## 2.33.0-canary.0

fix: dropdown click outside - issue #1004 was still causing problems which a directive seems more reliable for.

## 2.32.0

Promote canary

## 2.32.0-canary.0

feat: use of uidMixin without id use (add to top level element)
fix: aria label for expanding row button (expanded and collapsed)
fix: remove event listener from dropdown in beforeDestroy

## 2.31.1

fix: dropdown click closing list on firefox and safari (caused by button not getting focus on click)

## 2.31.0

fix: dropdown in darker themes
chore: add theme switching to stories

## 2.31.0-canary.0

fix: Dropdown focus on firefox (and any browser where click does not focus on button)

## 2.30.2

chore: remove empty folder (#984)
feat: Added items prop to Cv-Dropdown (#982)

## 2.30.1

fix: dropdown clearing of value (#975)
chore(deps): bump elliptic from 6.5.2 to 6.5.3 in /packages/core (#972)
fix: progress step carbonPrefix (#974)
fix: ie11 svg class usage (#973)

## 2.30.0

- fix: empty space in combo and multi
- feat: add focus and blur methods to numerous components

## 2.30.0-canary.1

- fix snapshots

## 2.30.0-canary.0

- feat: add kind 'button' to file upload component.
- chore: update inputs to 10.16.0 most noticably by moving helper text below the input
- fix: Multiselect filter tag usage (causing validator warning)
- fix: Combobox and multiselect user filter for non-existent item

## 2.29.0

- feat: Includes use of coded prefix
- feat: Adds 24 hour support to time picker.

## 2.29.0-canary.0

- chore: Replace use of the 'bx' prefix with the prefix in carbon components everywhere. This was quite an extensive change. It is more than possible one or two errors may have crept in. A full weeks Canary is likely.

## 2.28.0

- chore: added carbonPrefix to inline-loading, link, number input, breadcrumb and checkbox
- fix: combobox typoe v-bind="$attr" -> v-bind="$attrs"
- fix: add \$listeners to CvForm to allow @submit
- fix: return focus on dropdown to dropdown component after item click
- feat: add focus methods to CvDropdown, CvTextInput, CvTextArea
- fix: improvve SVG icon support in buttons, now possible to specify component (e.g. @carbon/icons-vue), SVG path, SVG symbol path or raw SVG. NOTE: Until SVG2 using SVG path does not style.
- fix: aria-hidden, aria-selected and aria-expanded false values. These do not default to false on undefined. Instead undefined means not applicable, false as a result implies true is possible.

## 2.27.1

- fix: lower node requirement to 10
- chore: make accordion class prefix use carbon prefix

## 2.27.0

Release previuos canarys

## 2.27.0-canary-2

- chore: fix aria label on template view
- fix: table skeleton appearance
- fix: dropdown aria warning with no label
- feat: add table oveflow options

## 2.27.0-canary.1

- Fix combobox disable to fully disable
- Fix dropdown disable to fully disable
- Fix tag filter disable to fully disable

## 2.27.0-canary.0

- Feat: Allow the number of items on page to be set for pagination seperately from page size
- Fix: Checkbox labels in data table.

## 2.26.0

- Fix animation issues in data table and accordion
- Fix combo box expansion.
- Release slotted header updates

## 2.26.0-canary.0

- Feat: Add slotted headings to data table## 2.25.0

- Fix: tooltip on icon only button
- Feat: Add disabled attributes for forwards and backwards pagination buttons.

## 2.25.0-canary.0

### Chore

- Update to Carbon 10.11.2
- Update to node 12
- Update other dependencies

## 2.24.1

### Fix

Dropdown value presentation

## 2.24.0

##£ Feat

- Left and right options added to cv-tooltip

### Fix

- CvDropdown needed multiple tab presses to move past #868
- CircleCI deployment fix

### Chore

- Warn on duplicate IDs in table row and tab
- Dependency bot bumps
- Other dependency version bumps
- Update documentation on use of expanded/isExpanded in table rows

## 2.23.2

Publis canary fixes as listed

## 2.23.2-canary.1

### Fix

- CvContentSwitcher adds tablist to container #849

## 2.23.2-canary.0

### Fix

- CvDropdown placeholder updates
- CvContentSwitcher accessibility violation #849

### Chore

- Removed spurious 'await' usage

## 2.23.1

Roll up of canary releases.

## 2.23.1-canary.2

## Feat

- Add hideLabel property to CvCheckbox and raised bug relating to the shape of the component https://github.com/carbon-design-system/carbon/issues/5461

## Fix

- UIShell fix ids for controlled panels
- Overflow menu tooltip postion on IE11
- Interactive menu tooltip position on IE11
- Missing aria-label on CvDataTable batch action checkbox (aria-label-for-batch-checkbox)

## Chore

- Update package dependencies

## 2.23.0

### Fix

- Data table heading styles when sortable is used.

## 2.23.0-canary.0

### Feat

- Add change event to accordion on open close through UI. Show in story how to use to force single open.

### Fix

- Validator state checks in inline loadeing (allow case insensitive)
- CvSelect event usage in CvTimePicker and CvPagination changed to 'chagne' event to support IE 11.

## 2.22.0

### Fix

- Removed deprecation message when using size instead of small button property

## 2.22.0-canary.1 (feb 4th 2020)

### Feat

- Mobile number input version
- Expanded property added to UIShell sidenav menus

-

### Fix

- Number input tests
- Input event emit from CvNumberInput on use of up down buttons
- Add missing closeAriaLabel property to CvModal

### Chore

- Copy button position is stories
- FavIcon in storybook
- Linter warnings on story source loading
- CI messages

## 2.22.0-canary.0 (jan 29th 2020)

### Chore

- move to Vue CLI 4
- Fix node engine version
- Ensure CI Check run before deploying storybook

### Fix

- Linter warnings

## 2.21.0 (jan 24th 2020)

### fix

- Error icon used in inline-loading
- Toast notification notes typo

## 2.21.0-canary.0 (jan 21st 2020)

### feat

- Add size variations to CvModal
- Add hide selected option to CvDropDown.
- Make title only CvModal possible
- Add container option to CvTabs
- Update CvTag styling to 10.9
- Update CvSearch size options

### fix

- Tab behaviour when adding and removing tabs when selecting a tab immediately after

## 2.20.1 (jan 16th 2020)

- fix: Disable number input up down buttons when component disabled

## 2.20.1-canary.3 (jan 16th 2020)

- fix: Merge missing commits from last release

## 2.20.1-canary.2 (jan 16th 2020)

### fix

- Reverted to using stepUp/stepDOwn input methods for number input after checking IE11 support.
- Initial value of date picker was not being set

## 2.20.1-canary.1 (jan 10th 2020)

### fix

- Decimal number edits e.g. 10.001 with step 001. Using the keyboard to delete .001 caused .000 to be reapplied.

## 2.20.1-canary.0 (jan 3rd 2020)

### fix

- Possible IE11 fix for colspan > 1000 defaulting to 1
- Loading overlay fix

## 2.20.0 (Dec 16th 2019)

### fix

- Prevent double event on date change

## 2.20.0-canary.2 (Dec 13th 2019)

### Feat

- Add side nav rail feature
- Add support for light cv-tile (needs Carbon > 10.7.4)
- Add button set

### Fix

- Fixed some typos (requried -> required)
- Fix date picker change event error

## 2.20.0-canary.1 (Dec 6th 2019)

### Feat

- Update to carbon-components 10.7.4 DOM
- Add edning state to CvInlineLoader
- Make individual columns sortable in CvDataTable
- Router link object usage (Location)
- Additional tests
  - CvInlineLoader
  - CvInlineNotification
  - CvToastNotification
  - CvTextInput
  - CvList
  - CvLoading

### Chore

- Welcome page updates

### Fix

- Use internal pagination bind property
- IE11 missing input event (use change)
- icon use warning in toast notification
- SVG ClassList missing IE and pre canary Edge

## 2.20.0-canary.0 (Nov 21th 2019)

### Feat

- Add decimal ability to number input.

### Fix

- Fix CvIconButton tooltip

## 2.19.0 (Nov 19th 2019)

### Chore

- CvOverflowMenu correct html to include menu-item option-content span

## 2.19.0-canary.1 (Nov 18th 2019)

### Feat

- CvToggleSkeleton

### Fix

- Slot check reactivyt (accross 12 components with helperText and invalidMessage)
- CvCombobox placeholder
- CvMultiSelect filter clear event
- CvMultiSelect expand / close when clicking chevron
- CvCombobox auto-filter true at startup presenting empty list

### Chore

- CvLink tests
- CvTextArea tests
- Restored storybook version to keep package.json in sync

## 2.19.0-canary.0 (Nov 12th 2019)

### Chore

- Change CvTabs to use same HTML as core carbon.

## 2.18.0 (Nov 11th 2019)

### Feat

- Rework for SSR, removing all style tags from components in favour of using :style in the template.

## 2.17.1 (Nov 6th 2019)

### Fix

- CvTabs not closing lower indexed tabs

## 2.17.0 (Nov 4th 2019)

### Feat

- Tests added or updated for
  - CvAccordion
  - CvWrapper
  - CvCheckbox
  - CvToggle
  - CvTag
  - CvRadioButton
  - CvTabs
- Updated CvTabs behaviour when tab list is dynamic

### Fix

- Dropdown workingn when disabled
- Overflow not closing on button click

## 2.16.0 (Oct 28th 2019)

### Feat

Allow number input to work with string or number for value, v-model and events.

### Chore

Updated tests for

- CvBreadcrumb
- CvButton
- CvBNumberInput
- CvTag

### Fix

CvButton raising two click events

## 2.15.0 (Oct 24th 2019)

### Feat

- Add v-model for date picker
- Add up down aria labels for number input
- Update to Carbon 10.7
  - CvButton, CvIconButton
  - CvComboBox
  - CvContentSwitcher
  - CvDataTable
  - CvDropdown
  - CvFileUploader
  - CvInlineNotification
  - CvLink
  - CvList
  - CvNumberInput
  - CvOverflowMenu
  - CvToastNotification
  - CvTextInput
  - CvToggle
  - CvTags
- Add expand all to data table
- Add inline link
- Add nested list ordering
- Add CvTabsSkeleton component
- Tests for CvCheckbox, CvToggle, CvBreadcrumb added
- Rework tabs component to behave better when dynamically adding/removing tabs.
- Added CvTabs property no-default-to-first option to revent auto default to first tab.
- Add hover expand for header menu items
- Add keyboard scroll to modal dialog, suppressing background scroll.

### Fix

- Uploader skeleton typo
- CvTabs behaviour when switching tab set (beforeDestory event name typo)
- Remove trimRight usage for wider support

### Chore

- Tidy up knobs
- Work on tests

## 2.14.0 (Sept 25, 2019)

### Feat

- Add various optional customisable labels/text where they previously were fixed.
- Allow primary button to be disabled on the modal dialog
- Add disabled property to CvLink and other components with links

### Fixes

- Tidy up popups (CvOverflowMenu and CvInteractiveTooltip) on beforeDestroy event
- To date activation in date picker range mode (was activating from on icon click)

## 2.13.0 (Sept 20, 2019)

### Feat

- code snippet now has
  - light theme
  - customisable copy feedback and aria label
- Modal
  - Add 'auto-hide-off' property which causes 'modal-hide-request' events to be raised instead of auto closing

### Fix

- Stop overflow menu grabbing focus on close
- v-model for selectable tile

## 2.12.7 (Sept 13, 2019)

### Feat

- Add vertical progress bar

### Fix

- Code snippet no longer copies encoded html
- Correct tab story
- Fix checkbox v-model unefined
- Fix panel expansion event
- Add v-model for header panels
- Re-order header panel events
- Update lock file
- Fix combobox input spilling into controls
- Fix non-cv-button types (cv-data-table, cv-text-input password button)
- Password input button labels
- Update data table to have attributes for cancel button and search labels.

## 2.12.6 (August 14, 2019)

### Fix

- Add missing title to CvHeaderMenu.

## 2.12.5 (August 6, 2019)

See changes below.

## 2.12.5-rc.0 (August 5, 2019)

### Fix

- Change how cv-link and other link-mixin usage

## 2.12.4 (August 3, 2019)

### Fix

- Correct clear button color for combobox and multiselect
- Fix value/v-model updates for combobox

## 2.12.3 (August 1, 2019)

### Fix

The following is true for combobox and multi-select

- Removed space auto-completion to allow spaces in filter.
- Enter now used for auto-completion
- Escapes regex special characters

## 2.12.2 (July 30, 2019)

### Fix

- CvPagination case when number of items is zero.

# Changelog

## 2.12.1 (July 25, 2019)

### Fix

- CvDropdown component was incorrectly named CvDropdownInner

## 2.12.0 (July 22, 2019)

### Features

- Add table pagination scoped slot pass through.
- Add table skeleton
- Add initial change vent to pagination

### Fix

- CvHeaderNav aria-label usage
- Update lodash based on security alert

## 2.11.0 (July 16, 2019)

### Features

- Add vertical options to radio button group
- Add left-label option to radio button

### Fixes

- add default tab id
- move non-breaking space in header name due to rendering differences
- make aria-controls optional in header-global-action
- hide data table toolbar when empty

## 2.10.0 (July 10, 2019)

### Feat

- Add CvContent to UI shell
- Correct switch between 'router-link' and 'a' tag based on use of 'href' or 'to' in links

## 2.9.0 (July 9, 2019)

### Feat

- Move multi-select to experimental
- Updates to multi select API
- Add combo box
- Update export to surface individual components

## 2.8.0 (June 27, 2019)

### Feat

- Added scoped slots to table for constructed string.

## 2.7.0 (June 27, 2019)

### Feat

- Add multi select dropdown (without filter)
- Added scoped slots to pagination for constructed strings.

## 2.6.2 (June 24, 2019)

### Fixes

- Removed side nav sub menu close on focusout
- Removed spurious \ in header menu button
- Fixed active menu button status
- Temp CSS fix for Safari not moving following side nav chevrons on expand.

## 2.6.1 (June 21, 2019)

### Fixes

- Add page to pagination change event
- Fix text input password layout.

### Chores

- Update dependencies

## 2.6.0 (June 19, 2019)

### Features

- Wire up hide/show to footer link in ui shell side nav
- Add Space in header between name and prefix

### Fixes

- Focus on side nav and header panel links

### Chores

- Added UI shell notes
- Make link logic (anchor or router-link) common

## 2.5.0 (June 4, 2019)

### Features

- Add UI Shell
  - Added Header
  - Added right panels with global actions
  - Added left nav

### Fixes

- Aria label on overflow menu and toast nofification

### Chores

- Removed data-viz

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.3.0  |       |
| carbon-components | 10.3.0  |       |
| flatpickr         | 4.6.1   |       |
| vue               | 2.6.10  |       |

## 2.4.0 (June 4, 2019)

- Add disabled tag

## 2.3.0 (June 3, 2019)

### Features

- Added an example project
- Marked CvDataTable as ready
- Added initial CvHeader component and some parts
- Added cv-tag skeleton
- Added cv-slider skeleton
- Added tag disabled feature

### Bug Fixes

- Time picker story fix
- Tab usage of dropdown when narrow
- Restored tag fileter story

### Chores

- Removed Carbon 9 / X switches
- Updated Carbon dependencies

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.2.0  |       |
| carbon-components | 10.2.0  |       |
| flatpickr         | 4.5.7   |       |
| vue               | 2.6.10  |       |

## 2.2.1 (May 24, 2019)

### Fixes

- Ensure tab disabled when created with disabled attribute

## 2.2.0 (May 24, 2019)

### General

- Some code tidying, removing v9 code.
- Dependency updates to potential issue See #441

### Features

- Add \$attrs to nav element of cv-tabs, this allows aria-label to be specified on the nav.

## 2.1.1 (May 15, 2019)

### Fixes

- Change @carbon/icons-vue/lib to @carbon/icons/vue/es

## 2.1.0 (May 14, 2019)

### Features

- Add expanding content feature to table

## 2.0.7 (May 7, 2019)

### Bug fixes

- Various table pagination fixes
- Ensure search is available when @search event is listented to.

## 2.0.4/5/6 (May 3, 2019)

### Bug fixes

- Table pagination fixes

## 2.0.3 (April 24, 2019)

### Bug fixes

- Correct cv-tab name

## 2.0.1/2 (April 24, 2019)

### Bug fixes

- Correct tabs narrow styling
- Correct dropdown initial value

## 2.0.0 (April 24, 2019)

### Features

- Added filter tag
- Added disabled state for tab component

### Bug Fixes

- Fixed multiple roots in dropdown.
- Fixes to table layout
- Fixes to search
- Styling fixes for structured list selectable

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.0.0  |       |
| carbon-components | 10.1.0  |       |
| flatpickr         | 4.5.7   |       |
| vue               | 2.6.10  |       |

## 2.0.0-beta.2 (April 16, 2019)

### Features

- Add up overflow menu
- Some story updates

### Bug Fixes

- Remove linter warnings from structured list

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.0.0  |       |
| carbon-components | 10.1.0  |       |
| flatpickr         | 4.5.7   |       |
| vue               | 2.6.10  |       |

## 2.0.0-beta.1 (April 12, 2019)

As per beta 0 fresh build

## 2.0.0-beta.0 (April 12, 2019)

### Features

- Carbon 10 data table

### Bug Fixes

- Search review fixes
- Select review fixes
- Select initial selected enhancment
- Added missing experimental stories
- A number of data table fixes (still not ready)
- Dropdown review fixes

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.0.0  |       |
| carbon-components | 10.1.0  |       |
| flatpickr         | 4.5.7   |       |
| vue               | 2.6.10  |       |

## 2.0.0-alpha.2 (April 10, 2019)

### Features

- Carbon 10 data table

### Bug Fixes

- Correct breadcrumb story
- Checkbox mixed updates
- Multiline code snippet layout
- Inline code snippet example made smaller
- Fixed number input layout
- Fixed overflow menu layout
- Fixed pagination layout

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.0.0  |       |
| carbon-components | 10.1.0  |       |
| flatpickr         | 4.5.2   |       |
| vue               | 2.6.10  |       |

## 1.1.1 (March 19, 2019)

### Features

- A number of experimental additions for carbon x
- Change node requirements to > 10 in package.json

### Bug Fixes

- Fix tabs on narrow screens (#273)
- Fix dorpdown-items v-for (#273)

### Dependency versions

Versions reflect those version was built using.

| Dependency           | Version      | Notes                    |
| -------------------- | ------------ | ------------------------ |
| @carbon/icon-helpers | 0.0.1-beta.0 | experimental only        |
| @carbon/icons-vue    | 0.0.1-beta.0 | experimental only        |
| carbon-components    | 9.70.1       |                          |
| d3                   | 5.8.2        | Only needed for data-viz |
| flatpickr            | 4.5.2        |                          |
| vue                  | 2.6.3        |                          |

## 1.1.0 (March 14, 2019)

### Features

- Experimental CvCodeSnippet behind feature flag (#244).
- Experimental CvContentSwitcher behind feature flag (#246)
- Experimental CvDatePicker behind feature flag (#251)
- Added CvInlineLoader (#253)
- Added password behviour for CvTextInput (#254)
- Experimental toggle added for supporting components (#257)

### Bug Fixes

- chore: Reduced storybook CSS payload
- fix: Checkbox hover when disabled (#241)
- fix: add missing inherit attrs false (#249)
- fix: show tip and hide tip buttons for interactive tooltip storybook (#248)
- fix: content switcher icon spacing (#258)

### Dependency versions

Versions reflect those version was built using.

| Dependency           | Version      | Notes                    |
| -------------------- | ------------ | ------------------------ |
| @carbon/icon-helpers | 0.0.1-beta.0 | experimental only        |
| @carbon/icons-vue    | 0.0.1-beta.0 | experimental only        |
| carbon-components    | 9.70.1       |                          |
| d3                   | 5.8.2        | Only needed for data-viz |
| flatpickr            | 4.5.2        |                          |
| vue                  | 2.6.3        |                          |

## 1.0.2 (Mar 8, 2019)

### Features

- Add row-select-change and row-select-changes events to table.
- Add rows-selected property to table
- Add use rows-selected with v-model for table

### Bug fixes

- Fix overflow menu issue #234

### Dependency versions

| Dependency           | Version      | Notes                                           |
| -------------------- | ------------ | ----------------------------------------------- |
| @carbon/icon-helpers | 0.0.1-beta.0 | experimental only                               |
| @carbon/icons-vue    | 0.0.1-beta.0 | experimental only                               |
| carbon-components    | 9.70.1       |                                                 |
| d3                   | 5.7.0        | Only needed for data-viz                        |
| flatpickr            | 4.5.1        |                                                 |
| vue                  | 2.6.1        | some reactivity (e.g. data table) requires this |

## 1.0.1 (Mar 4, 2019)

- Removed setTimeout use
- Added Skeleton components for
- CvFileUpload
- CvDropdown
- CvCodeSnippet
- CvCheckbox

## 1.0.0 (Feb 19, 2019) :balloon: :tada: :balloon: :coffee: :balloon:

- Add actions option to data table
- Add batch actions option to data table
- Updated table pagination
- Add CvDataTableRow and CvDataTableCell to allow HTML use in tables
- Add CvButtonSkeleton
- Add overflow menu option to table.

## 1.0.0-beta.4 (Feb 13, 2019)

- Fix initially hidden expanding tile behaviour.
- Add CvBreadCrumbSkeleton

## 1.0.0-beta.3 (Feb 13, 2019)

- Add header and footer slots for CvTable
- Set button type="button" for all buttons except CvButton. This prevents form submit if a component happens to be inside a form.
- Added CvSkeletonText, CvAccordionSeketon and CvAccordionItemSekeleton.

## v1.0.0-beta.2 (Feb 10, 2019)

- Removed Symbol use in prop types, fixing CvRadioButton, CvSlider and CvPagination use with the minified compiled modules.
- Minor story fixes
- Fix typo in CvContentSwitcherContent component name

## v1.0.0-beta.1 (Feb 10, 2019)

FAIL

## v1.0.0-beta.0 (Feb 8, 2019)

- Storybook: update views
- CvFileUploader: added v-model and missing parts to
- CvToolbar: added
- CvDataTable: added minus the filter/toolbar
- Tests - Added unit test suite and first tests (CvTag)
- CvContentSwitcher - Added non-DOM direct content managment
- Turned helper and invalidMessages into slops (slot-prop hybrid)
- CvIcon - Downgraded to helper component to remove dependency on carbon-icons
- Renamed UMD and CommonJS modules from carbon-components-vue... to carbon-vue...

## v0.3.0 (Feb 1, 2019)

- Initial data-viz/bar-graph added
- Story corrections
- Change use of \$parent to prefer events
- Chagne use of \$children to check child type
- Fix overflow and interactive-tooltip position on scroll/resize

## v0.2.9 (Jan 25, 2019)

- Add gauge component - story is Data-viz/CvGauge
- Add pie chart component - story is Data-viz/CvPieChart
- Add router-link version of CvLink

## v0.2.8 (Jan 23, 2019)

Correct duff deploy

## v0.2.7 (Jan 23, 2019)

- Fix click on modal dialog closing it

## v0.2.6 (Jan 23, 2019)

- Fix tab out of modal
- Remove unused vars

## v0.2.5 - Minor fixes (Jan 22, 2019)

- Make structured list native Vue
- Simplify structured list components
- Removed non-core CSS
- Fix to paginator reactivity

## v0.2.4 - Minor fixes (Jan 18, 2019)

- Make tooltip native Vue
- Tidy up a bit of unused code
- Make tabs native Vue and use carbon react pattern (breaks previous tab use)

## v0.2.3 - Minor fixes (Jan 14, 2019)

- Fix modal hide on main body click and show visible in story.
- Make cv-search native Vue.
- Make cv-number-input native Vue.

## v0.2.2 - Minor fixes (Jan 10, 2019)

- Fixed expandable tile and made it native Vue
- Made notification componentes native Vue
- Tidied toggle stories.

## v0.2.0 - Moved to Storybook 4 (Jan 10, 2019)

- Knobs now operate as Vue properties the template is no longer replaced each time (as per Knobs in storybook 3)
- Story kinds array replaced by variants which define the settings used in each story.
- NOTE: slots no longer editable

## v0.1.0 - First draft of carbon-components-vue implementation (Dec 3, 2018)

This initial set of components, based on v9 of carbon components, includes draft implementations of all non-data viz components found in the core carbon components library. Public parts of the component: properties, events, data, methods, computed values are at this point subject to review at this point.
