import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvModalNotesMD from './cv-modal-notes.md';
import CvModal from './cv-modal';

const stories = storiesOf('CvModal', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  label: text('slot:label', 'label', consts.CONTENT),
  title: text('slot:title', '', consts.CONTENT),
  content: text(
    'slot:content',
    `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`,
    consts.CONTENT
  ),
  secondaryButton: text('slot:secondary-button', '', consts.CONTENT),
  primaryButton: text('slot:primary-button', '', consts.CONTENT),
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvModalNotesMD)(() => {
    const settings = knobs();

    settings.label = settings.label.length
      ? `\n  <template slot="label">${settings.label}</template>`
      : '';
    settings.title = settings.title.length
      ? `\n  <template slot="title">${settings.title}</template>`
      : '';
    settings.content = settings.content.length
      ? `\n  <template slot="content">${settings.content}</template>`
      : '';
    settings.secondaryButton = settings.secondaryButton.length
      ? `\n <template slot="secondary-button">${
          settings.secondaryButton
        }</template>`
      : '';
    settings.primaryButton = settings.primaryButton.length
      ? `\n <template slot="primary-button">${
          settings.primaryButton
        }</template>`
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-modal${settings.otherAttributes}
  @modal-beingshown="actionBeforeShown"
  @modal-shown="actionShown"
  @modal-beinghidden="actionBeforeHidden"
  @modal-hidden="actionHidden"
  >${settings.label}${settings.title}${settings.content}${
      settings.secondaryButton
    }${settings.primaryButton}
</cv-modal>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view ref="view"
      :sv-margin="true"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other"><button @click="show">Show</button></template>
    </sv-template-view>
  `;

    return {
      components: { CvModal, SvTemplateView },
      methods: {
        doSave() {
          this.$refs.view.method('hide')();
        },
        show() {
          this.$refs.view.method('show')();
        },
        actionBeforeShown: action('CV Modal - modal-beingshown'),
        actionShown: action('CV Modal - modal-shown'),
        actionHidden: action('CV Modal - modal-hidden'),
        actionBeforeHidden: action('CV Modal - modal-beinghidden'),
        actionPrimary: action('CV Modal - primary-click'),
        actionSecondary: action('CV Modal - secondary-click'),
      },
      template: templateViewString,
    };
  })
);
