import { storiesOf } from '@storybook/vue';
import { boolean, text } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvBreadcrumbNotesMD from '../../packages/core/src/components/cv-breadcrumb/cv-breadcrumb-notes.md';
import { CvBreadcrumb, CvBreadcrumbItem, CvBreadcrumbSkeleton, CvLink } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvBreadcrumb', module);
// const storiesExperimental = storiesOf('Experimental/CvBreadcrumb', module);

const preKnobs = {
  ariaLabel: {
    group: 'attr',
    type: text,
    config: ['aria label', 'breadcrumb aria label'],
    prop: 'aria-label',
  },
  noTrailingSlash: {
    group: 'attr',
    type: boolean,
    config: ['No trailing slash', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'no-trailing-slash',
  },
};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
  <cv-breadcrumb${settings.group.attr}>
    <cv-breadcrumb-item>
      <cv-link href="#somewhere">Some text</cv-link>
    </cv-breadcrumb-item>
    <cv-breadcrumb-item>
      <cv-link href="parent">parent-link</cv-link>
    </cv-breadcrumb-item>
    <cv-breadcrumb-item>
      <cv-link href="#" aria-current="page">here</cv-link>
    </cv-breadcrumb-item>
    <cv-breadcrumb-item>
      <input type="text" class="bx--text-input bx--text-input--light" value="name of thing"></input>
    </cv-breadcrumb-item>
  </cv-breadcrumb>
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
        components: { CvBreadcrumb, CvBreadcrumbItem, CvLink, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvBreadcrumbNotesMD },
    }
  );
}

const templateString = `<cv-breadcrumb-skeleton></cv-breadcrumb-skeleton>`;
storiesDefault.add(
  'skeleton',
  () => ({
    components: { SvTemplateView, CvBreadcrumbSkeleton },
    template: `
      <sv-template-view
        sv-margin
        sv-position="center"
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `,
    props: {},
  }),
  {
    notes: { markdown: CvBreadcrumbNotesMD },
  }
);
