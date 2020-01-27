import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvLoadingNotesMD from '../../packages/core/src/components/cv-loading/cv-loading-notes.md';
import { CvLoading } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvLoading', module);
// const storiesExperimental = storiesOf('Experimental/CvLoading', module);

const preKnobs = {
  active: {
    group: 'attr',
    value: ':active="isActive"',
  },
  overlay: {
    group: 'attr',
    type: boolean,
    config: ['overlay', true], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'overlay',
  },
  fixedOverlay: {
    group: 'attr',
    value: 'overlay',
  },
  events: {
    group: 'attr',
    value: `@loading-end="actionEnd"`,
  },
};

const variants = [
  { name: 'default', excludes: ['events', 'fixedOverlay'] },
  { name: 'fixedOverlay', excludes: ['events', 'overlay'] },
  { name: 'events' },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
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
      <template slot="other">
        <button @click="makeActive" :disabled="isActive">{{buttonLabel}}</button>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvLoading, SvTemplateView },

        template: templateViewString,
        props: settings.props,
        methods: {
          actionEnd: action('CvLoading - loading-end'),
          runCountDown() {
            setTimeout(() => {
              this.countDown--;
              if (this.countDown <= 0) {
                this.isActive = false;
              } else {
                this.runCountDown();
              }
            }, 1000);
          },
          makeActive() {
            this.isActive = true;
            this.countDown = 5;
            this.runCountDown();
          },
        },
        data() {
          return {
            isActive: false,
            countDown: 0,
          };
        },
        computed: {
          buttonLabel() {
            if (this.isActive) {
              return `Active: ${this.countDown}s`;
            } else {
              return 'Make active';
            }
          },
        },
      };
    },
    {
      notes: { markdown: CvLoadingNotesMD },
    }
  );
}
