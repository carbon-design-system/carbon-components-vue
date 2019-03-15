import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvLinkNotesMD from './cv-link-notes.md';
import CvLink from './cv-link';

const storiesDefault = storiesOf('Default/CvLink', module);
const storiesExperimental = storiesOf('Experimental/CvLink', module);
import { override, reset } from '../../_internal/_feature-flags';

const preKnobs = {
  href: {
    group: 'attr',
    type: text,
    config: ['href', '#'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'href',
      type: String,
    },
  },
  to: {
    group: 'attr',
    type: text,
    config: ['to', '#'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'to',
      type: String,
    },
  },
};

const variants = [
  { name: 'a', includes: ['href'] },
  { name: 'router-link', includes: ['to'] },
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
<cv-link${settings.group.attr}>
  Link
</cv-link>
  `;

        // ----------------------------------------------------------------

        const templateViewString = `
    <sv-template-view
      :sv-experimental="experimental"
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

        return {
          components: { CvLink, SvTemplateView },
          data: () => ({ experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvLinkNotesMD },
      }
    );
  }
}
