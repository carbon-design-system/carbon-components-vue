import { storiesOf } from '@storybook/vue';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvTagNotesMD from './cv-tag-notes.md';
import CvTag from './cv-tag';

const stories = storiesOf('CvTag', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  kind: selectV2(
    'kind',
    {
      IBM: 'ibm',
      Beta: 'beta',
      'Third-party': 'third-party',
      Local: 'local',
      Dedicated: 'dedicated',
      Custom: 'custom',
      Experimental: 'experimental',
      Community: 'community',
      Private: 'private',
      Deprecated: 'deprecated',
    },
    'ibm',
    consts.CONFIG
  ),

  label: text('Tag label', 'I ama a tag', consts.CONTENT),
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvTagNotesMD)(() => {
    const settings = knobs();

    settings.kind = `\n kind="${settings.kind}"`;
    settings.label = settings.label.length
      ? `\n  label="${settings.label}"`
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-tag${settings.kind}${settings.label}${settings.otherAttributes}></cv-tag>
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
      components: { CvTag, SvTemplateView },
      template: templateViewString,
    };
  })
);
