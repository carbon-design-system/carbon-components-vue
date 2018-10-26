import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvAccordionNotesMD from './cv-accordion-notes.md';
import CvAccordion from './cv-accordion';
import CvAccordionItem from './cv-accordion-item';

const stories = storiesOf('CvAccordion', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  open1: boolean('open for item 1', false, consts.CONFIG) ? ' open' : '',
  open2: boolean('open for item 2', false, consts.CONFIG) ? ' open' : '',
  open3: boolean('open for item 3', false, consts.CONFIG) ? ' open' : '',
  open4: boolean('open for item 4', false, consts.CONFIG) ? ' open' : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvAccordionNotesMD)(() => {
    const settings = knobs();
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
  <cv-accordion${settings.otherAttributes}>
    <cv-accordion-item${settings.open1}>
      <template slot="title">Section 1 title </template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </cv-accordion-item>
    <cv-accordion-item${settings.open2}>
      <template slot="title">Section 2 title</template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </cv-accordion-item>
    <cv-accordion-item${settings.open3}>
      <template slot="title">Section 3 title</template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </cv-accordion-item>
    <cv-accordion-item${settings.open4}>
      <template slot="title">Section 4 title</template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </cv-accordion-item>
  </cv-accordion>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      sv-margin
      sv-alt-back
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

    return {
      components: { CvAccordion, CvAccordionItem, SvTemplateView },
      template: templateViewString,
    };
  })
);
