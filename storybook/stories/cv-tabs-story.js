import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvTabsNotesMD from '@carbon/vue/src/components/cv-tabs/cv-tabs-notes.md';
import CvTabs from '@carbon/vue/src/components/cv-tabs/cv-tabs';
import CvTab from '@carbon/vue/src/components/cv-tabs/cv-tab';

const storiesDefault = storiesOf('Components/CvTabs', module);
const storiesExperimental = storiesOf('Experimental/CvTabs', module);
import { versions, setVersion } from '@carbon/vue/src/internal/feature-flags';

const preKnobs = {
  selected: {
    group: 'tab2',
    type: boolean,
    config: ['2-selected', false], // consts.CONFIG],
    prop: {
      name: 'selected',
      type: Boolean,
    },
  },
  disabled: {
    group: 'tab4',
    type: boolean,
    config: ['4-disabled', false],
    prop: {
      name: 'disabled',
      type: Boolean,
    },
  },
  events: {
    group: 'attr',
    value: `@tab-selected="actionSelected"`,
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', excludes: ['events', 'selected', 'disabled'] }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions(true)) {
  const stories = version.experimental && !version.default ? storiesDefault : storiesExperimental;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        setVersion(version);
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
<cv-tabs${settings.group.attr}>
  <cv-tab id="tabs-1" label="Tab link 1">
    Sample tab panel content 1
  </cv-tab>
  <cv-tab id="tabs-2" label="Tab link 2" ${settings.group.tab2}>
    Sample tab panel content 2
  </cv-tab>
  <cv-tab id="tabs-3" label="Tab link 3">
    Sample tab panel content 3
  </cv-tab>
  <cv-tab id="tabs-4" label="Tab link 4" ${settings.group.tab4}>
    Sample tab panel content 4
  </cv-tab>
  <cv-tab id="tabs-5" label="Tab link 5">
    Sample tab panel content 5
  </cv-tab>
</cv-tabs>
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
          components: { CvTabs, CvTab, SvTemplateView },
          data: () => ({ experimental: version.experimental }),
          methods: {
            actionSelected: action('Cv Tabs - tab-selected'),
            actionBeingSelected: action('Cv Tabs - tab-beingselected'),
          },
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvTabsNotesMD },
      }
    );
  }
}
