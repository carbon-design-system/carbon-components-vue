import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvGaugeNotesMD from './cv-gauge-notes.md';
import CvGauge from './cv-gauge';

const stories = storiesOf('CvGauge', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  light: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false, consts.CONFIG],
    value: val => (val ? '\n  theme="light"' : ''),
  },
  amount: {
    group: 'attr',
    type: number,
    config: ['amount', 56, consts.CONFIG],
    value: val => `\n :amount="${val}"`,
  },
  total: {
    group: 'attr',
    type: number,
    config: ['total', 100, consts.CONFIG],
    value: val => `\n :total="${val}"`,
  },
  suffix: {
    group: 'attr',
    type: text,
    config: ['suffix', 'GB', consts.CONFIG],
    value: val => (val ? `\n suffix="${val}"` : ''),
  },
  header: {
    group: 'attr',
    type: text,
    config: ['header', 'Example Header', consts.CONFIG],
    value: val => (val ? `\n header="${val}"` : ''),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    withNotes(CvGaugeNotesMD)(() => {
      const settings = story.knobs();

      const templateString = `
  <cv-gauge ${settings.group.attr}>
  </cv-gauge>
  `;

      // ----------------------------------------------------------------
      const templateViewString = `
  <sv-template-view
    sv-margin
    :sv-alt-back="!light"
    sv-source='${templateString.trim()}'>
    <template slot="component">${templateString}</template>
  </sv-template-view>
  `;

      return {
        components: {
          CvGauge,
          SvTemplateView,
        },
        data() {
          return {
            light: settings.raw.light,
            amount: settings.raw.amount,
            total: settings.raw.total,
            header: settings.raw.header,
            suffic: settings.raw.suffix,
          };
        },
        template: templateViewString,
      };
    })
  );
}
