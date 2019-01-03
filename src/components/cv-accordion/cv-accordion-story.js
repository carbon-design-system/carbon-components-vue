import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvAccordionNotesMD from './cv-accordion-notes.md';
import CvAccordion from './cv-accordion';
import CvAccordionItem from './cv-accordion-item';

const stories = storiesOf('CvAccordion', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const kinds = null;

// console.dir(CvAccordionItem);

const preKnobs = {
  open1: {
    group: 'one',
    type: boolean,
    config: ['open for item 1', false, consts.CONFIG],
    prop: {
      type: Boolean,
      optional: true,
      name: 'open',
      inline: true,
    },
  },
  open2: {
    group: 'two',
    type: boolean,
    config: ['open for item 2', false, consts.CONFIG],
    prop: {
      type: Boolean,
      optional: true,
      name: 'open',
      inline: true,
    },
  },
  open3: {
    group: 'three',
    type: boolean,
    config: ['open for item 3', false, consts.CONFIG],
    prop: {
      type: Boolean,
      optional: true,
      name: 'open',
      inline: true,
    },
  },
  open4: {
    group: 'four',
    type: boolean,
    config: ['open for item 4', false, consts.CONFIG],
    prop: {
      type: Boolean,
      optional: true,
      name: 'open',
      inline: true,
    },
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
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
