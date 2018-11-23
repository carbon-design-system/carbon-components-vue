import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvBreadcrumbNotesMD from './cv-breadcrumb-notes.md';
import CvBreadcrumb from './cv-breadcrumb';
import CvBreadcrumbItem from './cv-breadcrumb-item';

const stories = storiesOf('CvBreadcrumb', module);
stories.addDecorator(withKnobs);

const kinds = null;

const preKnobs = {
  noTrailingSlash: {
    group: 'attr',
    type: boolean,
    config: ['No trailing slash', false, consts.CONFIG],
    value: val => (val ? ' no-trailing-slash' : ''),
  },
  otherAttributes: {
    group: 'attr',
    type: text,
    config: ['other attributes', '', consts.OTHER],
    value: val => val,
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    withNotes(CvBreadcrumbNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
  <cv-breadcrumb${settings.group.attr}>
    <cv-breadcrumb-item>
      Some text
    </cv-breadcrumb-item>
    <cv-breadcrumb-item>
      <cv-link href="parent">parent-link</cv-link>
    </cv-breadcrumb-item>
    <cv-breadcrumb-item>
      <input type="text" value="name of thing"></input>
    </cv-breadcrumb-item>
  </cv-breadcrumb>
`;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        :sv-margin="true"
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { CvBreadcrumb, CvBreadcrumbItem, SvTemplateView },
        template: templateViewString,
      };
    })
  );
}
