import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvTagNotesMD from './cv-tag-notes.md';
import CvTag from './cv-tag';

const stories = storiesOf('Default/CvTag', module);

const preKnobs = {
  label: {
    group: 'attr',
    type: text,
    config: ['Tag label', 'I am a tag'], // consts.CONTENT],
    prop: { name: 'label', type: String },
  },
};

const variants = [
  { name: 'default' },
  { name: 'IBM', extra: { kind: { group: 'attr', value: 'kind="ibm"' } } },
  { name: 'beta', extra: { kind: { group: 'attr', value: 'kind="beta"' } } },
  {
    name: 'third party',
    extra: { kind: { group: 'attr', value: 'kind="third-party"' } },
  },
  { name: 'local', extra: { kind: { group: 'attr', value: 'kind="local"' } } },
  {
    name: 'dedicated',
    extra: { kind: { group: 'attr', value: 'kind="dedicated"' } },
  },
  {
    name: 'custom',
    extra: { kind: { group: 'attr', value: 'kind="custom"' } },
  },
  {
    name: 'experimental',
    extra: { kind: { group: 'attr', value: 'kind="experimental"' } },
  },
  {
    name: 'community',
    extra: { kind: { group: 'attr', value: 'kind="community"' } },
  },
  {
    name: 'private',
    extra: { kind: { group: 'attr', value: 'kind="private"' } },
  },
  {
    name: 'deprecated',
    extra: { kind: { group: 'attr', value: 'kind="deprecated"' } },
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
