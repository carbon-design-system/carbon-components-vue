import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
// import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvButtonNotesMD from './cv-button-notes.md';
import CvButton from './cv-button';
import CvIcon from '../cv-icon/cv-icon';

const stories = storiesOf('CvButton', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'small',
      type: Boolean,
    },
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'disabled',
      type: Boolean,
    },
  },
  events: {
    group: 'attr',
    value: `@click="actionClick"`,
  },
  content: {
    group: 'slots',
    slot: {
      name: '',
      value:
        'I am a button <cv-icon href="cv(icon--add)" class="bx--btn__icon"></cv-icon>',
    },
  },
};

const variants = [
  { name: 'default' },
  { name: 'minimal', exclude: ['small', 'disabled'] },
  {
    name: 'primary',
    extra: { kind: { group: 'attr', value: 'primary' } },
  },
  {
    name: 'secondary',
    extra: { kind: { group: 'attr', value: 'secondary' } },
  },
  {
    name: 'tertiary',
    extra: { kind: { group: 'attr', value: 'tertiary' } },
  },
  { name: 'ghost', extra: { kind: { group: 'attr', value: 'ghost' } } },
  {
    name: 'danger',
    extra: { kind: { group: 'attr', value: 'danger' } },
  },
  {
    name: 'danger-primary',
    extra: { kind: { group: 'attr', value: 'danger--primary' } },
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
<cv-button${settings.group.attr}>
  ${settings.group.slots}
</cv-button>
    `;
      // console.log(templateString);

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { CvButton, CvIcon, SvTemplateView },
        methods: {
          actionClick: action('Cv Button - click'),
        },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvButtonNotesMD },
    }
  );
}
