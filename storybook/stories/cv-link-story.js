import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvLinkNotesMD from '@carbon/vue/src/components/cv-link/cv-link-notes.md';
import CvLink from '@carbon/vue/src/components/cv-link/cv-link';
import { action } from '@storybook/addon-actions';

const storiesDefault = storiesOf('Components/CvLink', module);
const storiesExperimental = storiesOf('Experimental/CvLink', module);

const preKnobs = {
  href: {
    group: 'attr',
    type: text,
    config: ['href', 'javascript:void(0)'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'href',
      type: String,
    },
  },
  to: {
    group: 'attr',
    type: text,
    config: ['to', 'javascript:void(0)'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'to',
      type: String,
    },
  },
  events: {
    group: 'attr',
    value: `@click="actionClick"`,
  },
  disabled: {
    group: 'attr',
    value: 'aria-disabled="true"',
  },
};

const variants = [
  { name: 'a', includes: ['href', 'events'] },
  { name: 'a disabled', includes: ['disabled', 'events'] },
  { name: 'router-link', includes: ['to', 'events'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
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
        props: settings.props,
        methods: {
          actionClick: action('Click event'),
        },
      };
    },
    {
      notes: { markdown: CvLinkNotesMD },
    }
  );
}
