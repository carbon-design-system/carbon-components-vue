import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvTagNotesMD from '@carbon/vue/src/components/cv-tag/cv-tag-notes.md';
import CvTag from '@carbon/vue/src/components/cv-tag/cv-tag';

const storiesDefault = storiesOf('Components/CvTag', module);
const storiesExperimental = storiesOf('Experimental/CvTag', module);

const preKnobs = {
  label: {
    group: 'attr',
    type: text,
    config: ['Tag label', 'I am a tag'], // consts.CONTENT],
    prop: { name: 'label', type: String },
  },
};

const variants = [
  {
    name: 'red',
    extra: { kind: { group: 'attr', value: 'kind="red"' } },
  },
  {
    name: 'magenta',
    extra: { kind: { group: 'attr', value: 'kind="magenta"' } },
  },
  {
    name: 'purple',
    extra: { kind: { group: 'attr', value: 'kind="purple"' } },
  },
  {
    name: 'blue',
    extra: { kind: { group: 'attr', value: 'kind="blue"' } },
  },
  {
    name: 'cyan',
    extra: { kind: { group: 'attr', value: 'kind="cyan"' } },
  },
  {
    name: 'teal',
    extra: { kind: { group: 'attr', value: 'kind="teal"' } },
  },
  {
    name: 'green',
    extra: { kind: { group: 'attr', value: 'kind="green"' } },
  },
  {
    name: 'gray',
    extra: { kind: { group: 'attr', value: 'kind="gray"' } },
  },
  {
    name: 'cool-gray',
    extra: { kind: { group: 'attr', value: 'kind="cool-gray"' } },
  },
  {
    name: 'warm-gray',
    extra: { kind: { group: 'attr', value: 'kind="warm-gray"' } },
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
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
        methods: {
          onRemove: action('Filter remove event'),
        },
      };
    },
    {
      notes: { markdown: CvTagNotesMD },
    }
  );
}
