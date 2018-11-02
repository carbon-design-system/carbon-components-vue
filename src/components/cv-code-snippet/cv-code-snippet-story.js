import { storiesOf } from '@storybook/vue';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvCodeSnippetNotesMD from './cv-code-snippet-notes.md';
import CvCodeSnippet from './cv-code-snippet';

const stories = storiesOf('CvCodeSnippet', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  kind: selectV2(
    'kind',
    {
      Default: '',
      Inline: 'inline',
      Multiline: 'multiline',
    },
    '',
    consts.CONFIG
  ),
  lessText: text('Less text', '', consts.CONTENT),
  moreText: text('More text', '', consts.CONTENT),
  content: text(
    'slot:content',
    `@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);

  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
    padding-left: padding(xs);
  }
}

$z-indexes: (
  modal : 9000,
  overlay : 8000,
  dropdown : 7000,
  header : 6000,
  footer : 5000,
  hidden : - 1,
  overflowHidden: - 1,
  floating: 10000
);`,
    consts.CONTENT
  ),
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvCodeSnippetNotesMD)(() => {
    const settings = knobs();

    settings.content = settings.content.length ? `\n  ${settings.content}` : '';
    settings.kind = settings.kind.length ? `\n  kind="${settings.kind}"` : '';
    settings.lessText = settings.lessText.length
      ? `\n  less-text="${settings.lessText}"`
      : '';
    settings.moreText = settings.moreText.length
      ? `\n  more-text="${settings.moreText}"`
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-code-snippet${settings.kind}${settings.lessText}${settings.moreText}${
      settings.otherAttributes
    }>${settings.content}
</cv-code-snippet>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view ref="view"
      sv-margin
      :sv-alt-back="${settings.kind.indexOf('inline') > -1}"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

    return {
      components: { CvCodeSnippet, SvTemplateView },
      template: templateViewString,
    };
  })
);
