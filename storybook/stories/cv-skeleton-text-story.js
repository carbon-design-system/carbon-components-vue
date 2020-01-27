import { storiesOf } from '@storybook/vue';
import { boolean, text, number } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvSkeletonTextNotesMD from '../../packages/core/src/components/cv-skeleton-text/cv-skeleton-text-notes.md';
import { CvSkeletonText } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvSkeletonText', module);
// const storiesExperimental = storiesOf('Experimental/CvSkeletonText', module);

const preKnobs = {
  heading: {
    group: 'attr',
    type: boolean,
    config: ['Skeleton text at a larger size (heading)', false], // consts.CONFIG
    prop: 'heading',
  },
  paragraph: {
    group: 'attr',
    type: boolean,
    config: ['Use multiple lines of text (paragraph)', false], // consts.CONFIG
    prop: 'paragraph',
  },
  lineCount: {
    group: 'attr',
    type: number,
    config: ['The number of lines in a paragraph (lineCount)', 3],
    prop: 'line-count',
  },
  width: {
    group: 'attr',
    type: text,
    config: ['Width (in px or %) of single line of text or max-width of paragraph lines (width)', '100%'], // consts.CONFIG
    prop: 'width',
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', excludes: ['heading', 'width', 'paragraph', 'lineCount'] }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
        <cv-skeleton-text${settings.group.attr}></cv-skeleton-text>
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
        components: { CvSkeletonText, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvSkeletonTextNotesMD },
    }
  );
}
