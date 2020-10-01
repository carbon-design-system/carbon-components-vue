import { storiesOf } from '@storybook/vue';
import { object, boolean, text, select } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';
import TimerButton from '../_storybook/components/timer-button';

import CvOverflowMenuNotesMD from '../../packages/core/src/components/cv-overflow-menu/cv-overflow-menu-notes.md';
import { CvOverflowMenu, CvOverflowMenuItem } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvOverflowMenu', module);
// const storiesExperimental = storiesOf('Experimental/CvOverflowMenu', module);

const preKnobs = {
  flipMenu: {
    group: 'attr',
    type: boolean,
    config: ['flip menu', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'flip-menu',
  },
  up: {
    group: 'attr',
    type: boolean,
    config: ['up', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'up',
  },
  offset: {
    group: 'attr',
    type: object,
    config: ['offset example', { left: 0, top: 0 }], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'offset',
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label for assistive text', 'Oveflow menu'],
    prop: 'label',
  },
  tipPosition: {
    group: 'attr',
    type: select,
    config: [
      'Tip position',
      {
        Top: 'top',
        Right: 'right',
        Bottom: 'bottom',
        Left: 'left',
      },
      'right',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'tip-position',
  },
  tipAlignment: {
    group: 'attr',
    type: select,
    config: [
      'Tip alignment',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
      },
      'center',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    prop: 'tip-alignment',
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', includes: ['label'] }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-overflow-menu${settings.group.attr}>
  <cv-overflow-menu-item primary-focus>list item 1</cv-overflow-menu-item>
  <cv-overflow-menu-item disabled>list item 2</cv-overflow-menu-item>
  <cv-overflow-menu-item danger>list item 3</cv-overflow-menu-item>
</cv-overflow-menu>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      ref="templateView"
      sv-margin
      sv-source='${templateString.trim()}'
      sv-position="center"
      sv-padding="150px 0 50px 0"
      >
      <template slot="component">${templateString}</template>
      <template slot="other">
        <TimerButton @timer-start="doStart" @timer-end="doEnd" label="Call focus() method" active-label-prefix="Call blur() method in" />
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvOverflowMenu, CvOverflowMenuItem, SvTemplateView, TimerButton },

        template: templateViewString,
        props: settings.props,
        methods: {
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.blur();
          },
        },
      };
    },
    {
      notes: { markdown: CvOverflowMenuNotesMD },
    }
  );
}
