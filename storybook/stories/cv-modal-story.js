import { storiesOf } from '@storybook/vue';
import { boolean, select } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvModalNotesMD from '../../packages/core/src/components/cv-modal/cv-modal-notes.md';
import { CvModal } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvModal', module);
// const storiesExperimental = storiesOf('Experimental/CvModal', module);

const preKnobs = {
  label: {
    group: 'content',
    slot: 'label',
    value: 'Label of modal',
  },
  title: {
    group: 'content',
    slot: 'title',
    value: 'Title of modal',
  },
  content: {
    group: 'content',
    slot: 'content',
    value: `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`,
  },
  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        default: '',
        'xs (extra small)': 'xs',
        small: 'small',
        large: 'large',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'size',
  },
  contentWithInput: {
    group: 'content',
    slot: 'content',
    value: `
      <div class="bx--form-item">
        <label for="text-input-3h9mddk235a" class="bx--label">Text Input label</label>
        <input id="text-input-3h9mddk235a" type="text" class="bx--text-input" placeholder="Optional placeholder text" data-modal-primary-focus>
      </div>
      `,
  },
  scrollingContent: {
    group: 'content',
    slot: 'content',
    value: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
    vitae
    tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
    facilisi.
    Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum. </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
    vitae
    tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
    facilisi.
    Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum. </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
    vitae
    tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
    facilisi.
    Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum. </p>
    <h3>Lorem ipsum</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
    vitae
    tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
    facilisi.
    Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum. </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
    vitae
    tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
    facilisi.
    Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum. </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
    vitae
    tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
    facilisi.
    Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum. </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id accumsan augue. Phasellus consequat augue
    vitae
    tellus tincidunt posuere. Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum risus. Nulla
    facilisi.
    Etiam venenatis molestie tellus. Quisque consectetur non risus eu rutrum. </p>
    `,
  },
  secondaryButton: {
    group: 'content',
    slot: 'secondary-button',
    value: 'secondary',
  },
  primaryButton: {
    group: 'content',
    slot: 'primary-button',
    value: 'primary',
  },
  primaryButtonDisabled: {
    group: 'attr',
    type: boolean,
    config: ['primary button disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'primary-button-disabled',
  },
  visible: {
    group: 'attr',
    type: boolean,
    config: ['visible', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'visible',
  },
  events: {
    group: 'attr',
    value: `@modal-shown="actionShown"
  @modal-hidden="actionHidden"
  @modal-hide-request="actionHideRequest"`,
  },
  primarySecondaryEvents: {
    group: 'attr',
    value: `
    @primary-click="actionPrimary"
    @secondary-click="actionSecondary"`,
  },
  autoHideOff: {
    group: 'attr',
    type: boolean,
    config: ['auto-hide-off', false],
    prop: 'auto-hide-off',
  },
};

const variants = [
  { name: 'default', includes: ['label', 'title', 'content', 'size', 'visible', 'events', 'autoHideOff'] },
  { name: 'no-body', includes: ['label', 'title', 'visible', 'size', 'events', 'autoHideOff'] },
  {
    name: 'buttons',
    includes: [
      'label',
      'title',
      'content',
      'size',
      'primaryButton',
      'primaryButtonDisabled',
      'secondaryButton',
      'events',
      'autoHideOff',
    ],
  },
  {
    name: 'buttons with listeners',
    includes: [
      'label',
      'title',
      'content',
      'size',
      'primaryButton',
      'primaryButtonDisabled',
      'secondaryButton',
      'events',
      'primarySecondaryEvents',
      'autoHideOff',
    ],
  },
  {
    name: 'primary-only',
    includes: ['label', 'title', 'content', 'size', 'primaryButton', 'primaryButtonDisabled', 'events', 'autoHideOff'],
  },
  {
    name: 'secondary-only',
    includes: ['label', 'title', 'size', 'content', 'secondaryButton', 'events', 'autoHideOff'],
  },
  { name: 'minimal', includes: ['label', 'title', 'content'] },
  { name: 'with input', excludes: ['label', 'title', 'content', 'scrollingContent'] },
  {
    name: 'danger',
    excludes: ['contentWithInput'],
    extra: { kind: { group: 'attr', value: 'kind="danger"' } },
  },
  {
    name: 'scrolling-contnet',
    includes: ['label', 'title', 'size', 'primaryButton', 'secondaryButton', 'scrollingContent'],
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<cv-modal${settings.group.attr}>${settings.group.content}
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
        props: settings.props,
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
          actionHideRequest: action('Cv Modal - modal-hide-request'),
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvModalNotesMD },
    }
  );
}
