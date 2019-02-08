import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvLoadingNotesMD from './cv-loading-notes.md';
import CvLoading from './cv-loading';

const stories = storiesOf('CvLoading', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  active: {
    group: 'attr',
    type: boolean,
    config: ['active', true], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'active', type: Boolean },
  },
  overlay: {
    group: 'attr',
    type: boolean,
    config: ['overlay', true], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'overlay', type: Boolean },
  },
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'small', type: Boolean },
  },
  events: {
    group: 'attr',
    value: `@loading-end="actionEnd"`,
  },
};

const variants = [
  { name: 'default', excludes: ['events'] },
  { name: 'events' },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<cv-loading${settings.group.attr}></cv-loading>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component" ref="component">
        ${templateString}
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvLoading, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        methods: {
          actionEnd: action('CvLoading - loading-end'),
        },
      };
    },
    {
      notes: { markdown: CvLoadingNotesMD },
    }
  );
}
