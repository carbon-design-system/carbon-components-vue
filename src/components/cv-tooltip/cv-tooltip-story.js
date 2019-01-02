import { storiesOf } from '@storybook/vue';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvTooltipNotesMD from './cv-tooltip-notes.md';
import CvInteractiveTooltip from './cv-interactive-tooltip';
import CvTooltip from './cv-tooltip';
import CvDefinitionTooltip from './cv-definition-tooltip';

const stories = storiesOf('CvTooltip', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

/* ----------------------------------------------------- */
stories.add(
  'Interactive tooltip',
  () => {
    const settings = {
      direction: select(
        'direction',
        {
          Top: 'top',
          Right: 'right',
          Bottom: 'bottom',
          Left: 'left',
        },
        'bottom',
        consts.CONFIG
      ),

      label: text('slot:label', 'Tooltip label', consts.CONTENT),
      trigger: text('slot:trigger', '', consts.CONTENT),
      content: text(
        'slot:content',
        `
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <button class="bx--button">Clicky one</button>
        `,
        consts.CONTENT
      ),
      otherAttributes: text('other attributes', '', consts.OTHER),
    };

    settings.label = settings.label.length
      ? `\n  <template slot="label">${settings.label}</template>`
      : '';
    settings.trigger = settings.trigger.length
      ? `\n  <template slot="trigger">${settings.trigger}</template>`
      : '';
    settings.content = settings.content.length
      ? `\n  <template slot="content">${settings.content}</template>`
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-interactive-tooltip${settings.otherAttributes}
  direction="${settings.direction}"
  >${settings.label}${settings.term}${settings.content}
</cv-interactive-tooltip>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="other">
        <button @click="show" style="margin-left: 500px;">Show tip</button>
        <button @click="hide">Hide tip</button>
      </template>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

    return {
      components: { CvInteractiveTooltip, SvTemplateView },
      template: templateViewString,
      methods: {
        show() {
          this.$children[0].$children[0].show();
        },
        hide() {
          this.$children[0].$children[0].hide();
        },
      },
    };
  },
  {
    notes: { markdown: CvTooltipNotesMD },
  }
);

/* ----------------------------------------------------- */
stories.add(
  'Tooltip',
  () => {
    const settings = {
      direction: select(
        'direction',
        {
          Top: 'top',
          Bottom: 'bottom',
        },
        'bottom',
        consts.CONFIG
      ),

      tip: text('tip', 'This is your tip!', consts.CONTENT),
      trigger: text(
        'slot:trigger',
        `
<svg width="16" height="12" viewBox="0 0 16 12">
  <path d="M8.05 2a2.5 2.5 0 0 1 4.9 0H16v1h-3.05a2.5 2.5 0 0 1-4.9 0H0V2h8.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.05 9a2.5 2.5 0 0 1 4.9 0H16v1H7.95a2.5 2.5 0 0 1-4.9 0H0V9h3.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
</svg>
`,
        consts.CONTENT
      ),
      otherAttributes: text('other attributes', '', consts.OTHER),
    };

    settings.tip = settings.tip.length ? `\n  tip="${settings.tip}"` : '';
    settings.trigger = settings.trigger.length
      ? `\n  <template>${settings.trigger}</template>`
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-tooltip${settings.otherAttributes}
  direction="${settings.direction}"${settings.tip}
  >${settings.trigger}
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
      components: { CvDefinitionTooltip, SvTemplateView },
      template: templateViewString,
    };
  },
  {
    notes: { markdown: CvTooltipNotesMD },
  }
);

/* ----------------------------------------------------- */
stories.add(
  'Definition tooltip',
  () => {
    const settings = {
      direction: select(
        'direction',
        {
          Top: 'top',
          Bottom: 'bottom',
        },
        'bottom',
        consts.CONFIG
      ),

      definition: text(
        'definition',
        'Brief description of the dotted, underlined term.',
        consts.CONTENT
      ),
      term: text('term', `Definition tooltip`, consts.CONTENT),
      otherAttributes: text('other attributes', '', consts.OTHER),
    };

    settings.definition = settings.definition.length
      ? `\n  definition="${settings.definition}"`
      : '';
    settings.term = settings.term.length ? `\n  term="${settings.term}"` : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-definition-tooltip${settings.otherAttributes}
  direction="${settings.direction}"${settings.definition}${settings.term}
  >
</cv-definition-tooltip>
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
      components: { CvTooltip, SvTemplateView },
      template: templateViewString,
    };
  },
  {
    notes: { markdown: CvTooltipNotesMD },
  }
);
