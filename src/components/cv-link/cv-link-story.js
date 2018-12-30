import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvLinkNotesMD from './cv-link-notes.md';
import CvLink from './cv-link';

const stories = storiesOf('CvLink', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  href: {
    group: 'attr',
    type: text,
    config: ['href', '#', consts.CONFIG],
    value: val => (val.length ? ` href="${val}"` : ''),
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false, consts.CONFIG],
    value: val => (val ? ' tabindex="-1" aria-disabled="true"' : ''),
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
    withNotes(CvLinkNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-link${settings.group.attr}>
  Link
</cv-link>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { CvLink, SvTemplateView },
        template: templateViewString,
      };
    })
  );
}
