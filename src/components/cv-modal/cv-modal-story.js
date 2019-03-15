import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvModalNotesMD from './cv-modal-notes.md';
import CvModal from './cv-modal';

const storiesDefault = storiesOf('Default/CvModal', module);
const storiesExperimental = storiesOf('Experimental/CvModal', module);
import { componentsX, override, reset } from '../../_internal/_feature-flags';

const preKnobs = {
  label: {
    group: 'content',
    slot: {
      name: 'label',
      value: 'Label of modal',
    },
  },
  title: {
    group: 'content',
    slot: {
      name: 'title',
      value: 'Title of modal',
    },
  },
  content: {
    group: 'content',
    slot: {
      name: 'content',
      value: `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`,
    },
  },
  contentWithInput: {
    group: 'content',
    slot: {
      name: 'content',
      value: `
      <div class="bx--form-item">
        <label for="text-input-3h9mddk235a" class="bx--label">Text Input label</label>
        <input id="text-input-3h9mddk235a" type="text" class="bx--text-input" placeholder="Optional placeholder text" data-modal-primary-focus>
      </div>
      `,
    },
  },
  secondaryButton: {
    group: 'content',
    slot: {
      name: 'secondary-button',
      value: 'secondary',
    },
  },
  primaryButton: {
    group: 'content',
    slot: {
      name: 'primary-button',
      value: 'primary',
    },
  },
  visible: {
    group: 'attr',
    type: boolean,
    config: ['visible', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'visible',
      type: Boolean,
    },
  },
  events: {
    group: 'attr',
    value: `@modal-shown="actionShown"
  @modal-hidden="actionHidden"`,
  },
};

const variants = [
  { name: 'default', includes: ['content', 'visible', 'events'] },
  {
    name: 'buttons',
    includes: ['content', 'primaryButton', 'secondaryButton', 'events'],
  },
  { name: 'primary-only', includes: ['content', 'primaryButton', 'events'] },
  {
    name: 'secondary-only',
    includes: ['content', 'secondaryButton', 'events'],
  },
  { name: 'minimal', includes: ['content'] },
  { name: 'with input', excludes: ['content'] },
  {
    name: 'danger',
    excludes: ['contentWithInput'],
    extra: { kind: { group: 'attr', value: 'kind="danger"' } },
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
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
      :sv-experimental="experimental"
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other"><button @click="show">Show</button></template>
    </sv-template-view>
  `;

        return {
          components: { CvModal, SvTemplateView },
          data: () => ({ experimental }),
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
          },
          template: templateViewString,
        };
      },
      {
        notes: { markdown: CvModalNotesMD },
      }
    );
  }
}
