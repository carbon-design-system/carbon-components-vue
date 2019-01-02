import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvModalNotesMD from './cv-modal-notes.md';
import CvModal from './cv-modal';

const stories = storiesOf('CvModal', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const kinds = {
  options: {
    Default: '',
    Danger: 'danger',
  },
  default: '',
};
const preKnobs = {
  label: {
    group: 'content',
    type: text,
    config: ['slot:label', 'label', consts.CONTENT],
    value: val =>
      val.length ? `\n  <template slot="label">${val}</template>` : '',
  },
  title: {
    group: 'content',
    type: text,
    config: ['slot:title', '', consts.CONTENT],
    value: val =>
      val.length ? `\n  <template slot="title">${val}</template>` : '',
  },
  content: {
    group: 'content',
    type: text,
    config: [
      'slot:content',
      `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`,
      consts.CONTENT,
    ],
    value: val => `\n  <template slot="content">${val}</template>`,
  },
  secondaryButton: {
    group: 'content',
    type: text,
    config: ['slot:secondary-button', '', consts.CONTENT],
    value: val =>
      val.length
        ? `\n <template slot="secondary-button">${val}</template>`
        : '',
  },
  primaryButton: {
    group: 'content',
    type: text,
    config: ['slot:primary-button', '', consts.CONTENT],
    value: val =>
      val.length ? `\n <template slot="primary-button">${val}</template>` : '',
  },
  visible: {
    group: 'attr',
    type: boolean,
    config: ['visible', false, consts.CONFIG],
    value: val => (val ? '\n  visible' : ''),
  },
  events: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @modal-shown="actionShown"
  @modal-hidden="actionHidden"`
        : '',
  },
  otherAttributes: {
    group: 'attr',
    type: text,
    config: ['other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<cv-modal${settings.kind}${settings.group.attr}>${settings.group.content}
</cv-modal>
  `;
      // console.log(templateString);

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view ref="view"
      sv-margin
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
          actionShown: action('CV Modal - modal-shown'),
          actionHidden: action('CV Modal - modal-hidden'),
          actionPrimary: action('CV Modal - primary-click'),
          actionSecondary: action('CV Modal - secondary-click'),
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvModalNotesMD },
    }
  );
}
