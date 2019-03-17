import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvBreadcrumbNotesMD from './cv-breadcrumb-notes.md';
import CvBreadcrumb from './cv-breadcrumb';
import CvBreadcrumbItem from './cv-breadcrumb-item';
import CvBreadcrumbSkeleton from './cv-breadcrumb-skeleton';

const storiesDefault = storiesOf('Default/CvBreadcrumb', module);
const storiesExperimental = storiesOf('Experimental/CvBreadcrumb', module);
import { versions, setVersion } from '../../_internal/_feature-flags';

const preKnobs = {
  noTrailingSlash: {
    group: 'attr',
    type: boolean,
    config: ['No trailing slash', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'no-trailing-slash',
    },
  },
};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions()) {
  const stories = version.experimental ? storiesExperimental : storiesDefault;
  setVersion(version);

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
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
        :sv-experimental="experimental"
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

        return {
          components: { CvBreadcrumb, CvBreadcrumbItem, SvTemplateView },
          data: () => ({ experimental: version.experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvBreadcrumbNotesMD },
      }
    );
  }
}

const templateString = `<cv-breadcrumb-skeleton></cv-breadcrumb-skeleton>`;
for (const version of versions()) {
  const stories = version.experimental ? storiesExperimental : storiesDefault;
  setVersion(version);

  stories.add(
    'skeleton',
    () => ({
      components: { SvTemplateView, CvBreadcrumbSkeleton },
      data: () => ({ experimental: version.experimental }),
      template: `
      <sv-template-view
        :sv-experimental="experimental"
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
}
