import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvListNotesMD from '@carbon/vue/src/components/cv-list/cv-list-notes.md';
import CvList from '@carbon/vue/src/components/cv-list/cv-list';
import CvListItem from '@carbon/vue/src/components/cv-list/cv-list-item';

const storiesDefault = storiesOf('Default/CvList', module);
const storiesExperimental = storiesOf('Experimental/CvList', module);
import { versions, setVersion } from '@carbon/vue/src/_internal/_feature-flags';

const preKnobs = {
  ordered: {
    group: 'attr',
    type: boolean,
    config: ['ordered', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'ordered', type: Boolean },
  },
  nested: {
    group: 'nested',
    value: `<cv-list nested>
      <cv-list-item>nested item 1</cv-list-item>
      <cv-list-item>nested item 2</cv-list-item>
      <cv-list-item>nested item 3</cv-list-item>
    </cv-list>
    `,
  },
};

const variants = [{ name: 'default', excludes: ['nested'] }, { name: 'nested' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions()) {
  const stories = version.experimental && !version.default ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        setVersion(version);
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
<cv-list${settings.group.attr}>
  <cv-list-item>list item 1${settings.group.nested}</cv-list-item>
  <cv-list-item>list item 2</cv-list-item>
  <cv-list-item>list item 3</cv-list-item>
</cv-list>
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
          components: { CvList, CvListItem, SvTemplateView },
          data: () => ({ experimental: version.experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvListNotesMD },
      }
    );
  }
}
