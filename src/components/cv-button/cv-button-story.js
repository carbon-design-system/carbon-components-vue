import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvButtonNotesMD from './cv-button-notes.md';
import CvButton from './cv-button';
import CvIcon from '../cv-icon/cv-icon';

const stories = storiesOf('CvButton', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  small: boolean('small', false, consts.CONFIG) ? '\n  small' : '',
  kind: selectV2(
    'kind',
    {
      Blank: '',
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      Ghost: 'ghost',
      Danger: 'danger',
      DangerPrimary: 'danger--primary',
    },
    'primary',
    consts.CONFIG
  ),
  slotContent: text(
    'slot:content',
    'I am a button <cv-icon href="cv(icon--add)" class="bx--btn__icon"></cv-icon>',
    consts.CONTENT
  ),
  disabled: boolean('disabled', false, consts.CONFIG) ? '\n  disabled' : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvButtonNotesMD)(() => {
    const settings = knobs();

    settings.kind = settings.kind.length ? `\n  kind="${settings.kind}"` : '';

    settings.otherAttributes = settings.otherAttributes
      ? `${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------
    console.dir(settings);

    const templateString = `
<cv-button${settings.kind}${settings.disabled}${settings.small}${
      settings.otherAttributes
    }
  @click="actionClick">
  ${settings.slotContent}
</cv-button>
  `;
    console.log(templateString);

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
