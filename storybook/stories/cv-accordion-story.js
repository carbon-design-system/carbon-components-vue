import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvAccordionNotesMD from '@carbon/vue/src/components/cv-accordion/cv-accordion-notes.md';
import CvAccordion from '@carbon/vue/src/components/cv-accordion/cv-accordion';
import CvAccordionItem from '@carbon/vue/src/components/cv-accordion/cv-accordion-item';
import CvAccordionSkeleton from '@carbon/vue/src/components/cv-accordion/cv-accordion-skeleton';

const storiesDefault = storiesOf('Components/CvAccordion', module);
const storiesExperimental = storiesOf('Experimental/CvAccordion', module);
import { versions, setVersion } from '@carbon/vue/src/internal/feature-flags';

const preKnobs = {
  open1: {
    group: 'one',
    type: boolean,
    config: ['open for item 1', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: {
      type: Boolean,
      name: 'open',
    },
  },
  open2: {
    group: 'two',
    type: boolean,
    config: ['open for item 2', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: {
      type: Boolean,
      name: 'open',
    },
  },
  open3: {
    group: 'three',
    type: boolean,
    config: ['open for item 3', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: {
      type: Boolean,
      name: 'open',
    },
  },
  open4: {
    group: 'four',
    type: boolean,
    config: ['open for item 4', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: {
      type: Boolean,
      name: 'open',
    },
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', includes: [] }];

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
  <cv-accordion>
    <cv-accordion-item${settings.group.one}>
      <template slot="title">Section 1 title </template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </cv-accordion-item>
    <cv-accordion-item${settings.group.two}>
      <template slot="title">Section 2 title</template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </cv-accordion-item>
    <cv-accordion-item${settings.group.three}>
      <template slot="title">Section 3 title</template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </cv-accordion-item>
    <cv-accordion-item${settings.group.four}>
      <template slot="title">Section 4 title</template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </cv-accordion-item>
  </cv-accordion>
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
          components: { CvAccordion, CvAccordionItem, SvTemplateView },
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvAccordionNotesMD },
      }
    );
  }
}

const templateString = `<cv-accordion-skeleton></cv-accordion-skeleton>`;
for (const version of versions(true)) {
  const stories = version.experimental && !version.default ? storiesDefault : storiesExperimental;

  stories.add(
    'skeleton',
    () => {
      setVersion(version);
      return {
        components: { SvTemplateView, CvAccordionSkeleton },
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
      };
    },
    {
      notes: { markdown: CvAccordionNotesMD },
    }
  );
}
