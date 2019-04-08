import { storiesOf } from '@storybook/vue';
import { boolean, text, number } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvSkeletonTextNotesMD from '@carbon/vue/src/components/cv-skeleton-text/cv-skeleton-text-notes.md';
import CvSkeletonText from '@carbon/vue/src/components/cv-skeleton-text/cv-skeleton-text';

const storiesDefault = storiesOf('Current/CvSkeletonText', module);
const storiesExperimental = storiesOf('Experimental/CvSkeletonText', module);
import { versions, setVersion } from '@carbon/vue/src/internal/feature-flags';

const preKnobs = {
  heading: {
    group: 'attr',
    type: boolean,
    config: ['Skeleton text at a larger size (heading)', false], // consts.CONFIG
    prop: {
      name: 'heading',
      type: Boolean,
    },
  },
  paragraph: {
    group: 'attr',
    type: boolean,
    config: ['Use multiple lines of text (paragraph)', false], // consts.CONFIG
    prop: {
      name: 'paragraph',
      type: Boolean,
    },
  },
  lineCount: {
    group: 'attr',
    type: number,
    config: ['The number of lines in a paragraph (lineCount)', 3],
    prop: { name: 'line-count', type: Number },
  },
  width: {
    group: 'attr',
    type: text,
    config: ['Width (in px or %) of single line of text or max-width of paragraph lines (width)', '100%'], // consts.CONFIG
    prop: { name: 'width', type: String },
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', excludes: ['heading', 'width', 'paragraph', 'lineCount'] }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions(false)) {
  const stories = version.experimental && !version.default ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        setVersion(version);
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
        <cv-skeleton-text${settings.group.attr}></cv-skeleton-text>
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
          components: { CvSkeletonText, SvTemplateView },
          data: () => ({ experimental: version.experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvSkeletonTextNotesMD },
      }
    );
  }
}
