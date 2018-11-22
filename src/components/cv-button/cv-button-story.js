import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvButtonNotesMD from './cv-button-notes.md';
import CvButton from './cv-button';
import CvIcon from '../cv-icon/cv-icon';

const stories = storiesOf('CvButton', module);
stories.addDecorator(withKnobs);

const kinds = {
  options: {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    ghost: 'ghost',
    danger: 'danger',
    'danger-primary': 'danger--primary',
  },
  default: 'primary',
};

const preKnobs = {
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false, consts.CONFIG],
    value: val => (val ? '\n  small' : ''),
  },
  slotContent: {
    group: 'slot',
    type: text,
    config: [
      'slot:content',
      'I am a button <cv-icon href="cv(icon--add)" class="bx--btn__icon"></cv-icon>',
      consts.CONTENT,
    ],
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false, consts.CONFIG],
    value: val => (val ? '\n  disabled' : ''),
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
    withNotes(CvButtonNotesMD)(() => {
      const settings = story.knobs();

      const templateString = `
<cv-button${settings.kind}${settings.group.attr}
  @click="actionClick">
  ${settings.group.slot}
</cv-button>
    `;
      // console.log(templateString);

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        :sv-margin="true"
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
      };
    })
  );
}
