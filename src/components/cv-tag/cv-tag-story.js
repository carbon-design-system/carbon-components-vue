import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
// import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvTagNotesMD from './cv-tag-notes.md';
import CvTag from './cv-tag';

const stories = storiesOf('CvTag', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  label: {
    group: 'attr',
    type: text,
    config: ['Tag label', 'I am a tag'], // consts.CONTENT],
    prop: { name: 'label', type: String },
  },
};

const variants = [
  { name: 'default', extra: { kind: { group: 'attr', value: 'ibm' } } },
  { name: 'IBM', extra: { kind: { group: 'attr', value: 'ibm' } } },
  { name: 'beta', extra: { kind: { group: 'attr', value: 'beta' } } },
  {
    name: 'third party',
    extra: { group: 'attr', kind: { value: 'third-party' } },
  },
  { name: 'local', extra: { kind: { group: 'attr', value: 'local' } } },
  { name: 'dedicated', extra: { kind: { group: 'attr', value: 'dedicated' } } },
  { name: 'custom', extra: { kind: { group: 'attr', value: 'custom' } } },
  {
    name: 'experimental',
    extra: { kind: { group: 'attr', value: 'experimental' } },
  },
  { name: 'community', extra: { kind: { group: 'attr', value: 'community' } } },
  { name: 'private', extra: { kind: { group: 'attr', value: 'private' } } },
  {
    name: 'deprecated',
    extra: { kind: { group: 'attr', value: 'deprecated' } },
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-tag${settings.group.attr}></cv-tag>
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
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvTagNotesMD },
    }
  );
}
