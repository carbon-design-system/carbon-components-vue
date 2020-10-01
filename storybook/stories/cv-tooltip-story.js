import { storiesOf } from '@storybook/vue';
import { text, select, boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';
import TimerButton from '../_storybook/components/timer-button';

import CvTooltipNotesMD from '../../packages/core/src/components/cv-tooltip/cv-tooltip-notes.md';
import { CvInteractiveTooltip, CvTooltip, CvDefinitionTooltip } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvTooltip', module);
// const storiesExperimental = storiesOf('Experimental/CvTooltip', module);

import Filter16 from '@carbon/icons-vue/es/filter/16';

let preKnobs = {
  alignment: {
    group: 'attr',
    type: select,
    config: [
      'alignment',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
      },
      'center',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'alignment',
  },
  direction: {
    group: 'attr',
    type: select,
    config: [
      'direction',
      {
        Top: 'top',
        Right: 'right',
        Bottom: 'bottom',
        Left: 'left',
      },
      'bottom',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'direction',
  },
  label: {
    group: 'content',
    slot: 'label',
    value: `
    Tooltip label
  `,
  },
  trigger: {
    group: 'content',
    slot: 'trigger',
    value: `<Filter16 class="bx--overflow-menu__icon bx--toolbar-filter-icon" />
  `,
  },
  content: {
    group: 'content',
    slot: 'content',
    value: `
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <button class="bx--button">Clicky one</button>
  `,
  },
  visible: {
    group: 'attr',
    type: boolean,
    config: ['visible', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'visible',
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', includes: ['content', 'definition', 'term', 'tip'] }];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name + ' (Interactive tootlip)',
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-interactive-tooltip${settings.group.attr}>${settings.group.content}
</cv-interactive-tooltip>
  `;
      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      ref="templateView"
      sv-margin
      sv-source='${templateString.trim()}'
      sv-position="center"
      >
      <template slot="other">
      <TimerButton @timer-start="doStart" @timer-end="doEnd" label="Show" active-label-prefix="Hide in" />
      </template>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { CvInteractiveTooltip, SvTemplateView, Filter16, TimerButton },
        template: templateViewString,
        props: settings.props,
        methods: {
          doStart() {
            this.$refs.templateView.$slots.component[0].componentInstance.show();
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.hide();
          },
        },
      };
    },
    {
      notes: { markdown: CvTooltipNotesMD },
    }
  );
}
// /* ----------------------------------------------------- */

preKnobs = {
  alignment: {
    group: 'attr',
    type: select,
    config: [
      'alignment',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
      },
      'center',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'alignment',
  },
  direction: {
    group: 'attr',
    type: select,
    config: [
      'direction',
      {
        Top: 'top',
        Right: 'right',
        Bottom: 'bottom',
        Left: 'left',
      },
      'bottom',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'direction',
  },
  tip: {
    group: 'attr',
    type: text,
    config: ['tip', 'This is your tip!'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: 'tip',
  },
  trigger: {
    group: 'content',
    slot: 'default',
    value: `<svg width="16" height="12" viewBox="0 0 16 12">
  <path d="M8.05 2a2.5 2.5 0 0 1 4.9 0H16v1h-3.05a2.5 2.5 0 0 1-4.9 0H0V2h8.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.05 9a2.5 2.5 0 0 1 4.9 0H16v1H7.95a2.5 2.5 0 0 1-4.9 0H0V9h3.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
</svg>`,
  },
};

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name + ' (Tootlip)',
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-tooltip${settings.group.attr}>${settings.group.content}
</cv-tooltip>
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
        components: { CvTooltip, SvTemplateView, Filter16 },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvTooltipNotesMD },
    }
  );
}

// /* ----------------------------------------------------- */

preKnobs = {
  alignment: {
    group: 'attr',
    type: select,
    config: [
      'alignment',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
      },
      'center',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'alignment',
  },
  direction: {
    group: 'attr',
    type: select,
    config: [
      'direction',
      {
        Top: 'top',
        Bottom: 'bottom',
      },
      'bottom',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'direction',
  },
  definition: {
    group: 'attr',
    type: text,
    config: [
      'definition',
      'Brief description of the dotted, underlined term',
      // consts.CONTENT,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'definition',
  },
  term: {
    group: 'attr',
    type: text,
    config: ['term', 'A term needeing definition'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: 'term',
  },
};

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name + ' (Definition Tootlip)',
    () => {
      const settings = story.knobs(); // storiesDefault.add(

      // ----------------------------------------------------------------

      const templateString = `
<cv-definition-tooltip${settings.group.attr} />
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
        components: { CvDefinitionTooltip, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvTooltipNotesMD },
    }
  );
}
