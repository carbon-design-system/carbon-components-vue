import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvTagNotesMD from '@carbon/vue/src/components/cv-tag/cv-tag-notes.md';
import CvTag from '@carbon/vue/src/components/cv-tag/cv-tag';

const storiesDefault = storiesOf('Components/CvTag', module);
const storiesExperimental = storiesOf('Experimental/CvTag', module);
import { versions, setVersion } from '@carbon/vue/src/internal/feature-flags';

const preKnobs = {
  label: {
    group: 'attr',
    type: text,
    config: ['Tag label', 'I am a tag'], // consts.CONTENT],
    prop: { name: 'label', type: String },
  },
};

const variants = [
  { name: 'default', skip: { default: false, experimental: true } },
  {
    name: 'IBM',
    extra: { kind: { group: 'attr', value: 'kind="ibm"' } },
    skip: { default: false, experimental: true },
  },
  {
    name: 'beta',
    extra: { kind: { group: 'attr', value: 'kind="beta"' } },
    skip: { default: false, experimental: true },
  },
  {
    name: 'third party',
    extra: { kind: { group: 'attr', value: 'kind="third-party"' } },
    skip: { default: false, experimental: true },
  },
  {
    name: 'local',
    extra: { kind: { group: 'attr', value: 'kind="local"' } },
    skip: { default: false, experimental: true },
  },
  {
    name: 'dedicated',
    extra: { kind: { group: 'attr', value: 'kind="dedicated"' } },
    skip: { default: false, experimental: true },
  },
  {
    name: 'custom',
    extra: { kind: { group: 'attr', value: 'kind="custom"' } },
    skip: { default: false, experimental: true },
  },
  {
    name: 'experimental',
    extra: { kind: { group: 'attr', value: 'kind="experimental"' } },
    skip: { default: false, experimental: true },
  },
  {
    name: 'community',
    extra: { kind: { group: 'attr', value: 'kind="community"' } },
    skip: { default: false, experimental: true },
  },
  {
    name: 'private',
    extra: { kind: { group: 'attr', value: 'kind="private"' } },
    skip: { default: false, experimental: true },
  },
  {
    name: 'deprecated',
    extra: { kind: { group: 'attr', value: 'kind="deprecated"' } },
    skip: { default: false, experimental: true },
  },
  {
    name: 'red',
    extra: { kind: { group: 'attr', value: 'kind="red"' } },
    skip: { default: true, experimental: false },
  },
  {
    name: 'magenta',
    extra: { kind: { group: 'attr', value: 'kind="magenta"' } },
    skip: { default: true, experimental: false },
  },
  {
    name: 'purple',
    extra: { kind: { group: 'attr', value: 'kind="purple"' } },
    skip: { default: true, experimental: false },
  },
  {
    name: 'blue',
    extra: { kind: { group: 'attr', value: 'kind="blue"' } },
    skip: { default: true, experimental: false },
  },
  {
    name: 'cyan',
    extra: { kind: { group: 'attr', value: 'kind="cyan"' } },
    skip: { default: true, experimental: false },
  },
  {
    name: 'teal',
    extra: { kind: { group: 'attr', value: 'kind="teal"' } },
    skip: { default: true, experimental: false },
  },
  {
    name: 'green',
    extra: { kind: { group: 'attr', value: 'kind="green"' } },
    skip: { default: true, experimental: false },
  },
  {
    name: 'gray',
    extra: { kind: { group: 'attr', value: 'kind="gray"' } },
    skip: { default: true, experimental: false },
  },
  {
    name: 'cool-gray',
    extra: { kind: { group: 'attr', value: 'kind="cool-gray"' } },
    skip: { default: true, experimental: false },
  },
  {
    name: 'warm-gray',
    extra: { kind: { group: 'attr', value: 'kind="warm-gray"' } },
    skip: { default: true, experimental: false },
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions(false)) {
  const stories = version.experimental && !version.default ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    if (
      story.skip &&
      ((story.skip.default && !version.experimental) || (story.skip.experimental && version.experimental))
    ) {
      continue;
    }

    stories.add(
      story.name,
      () => {
        setVersion(version);
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
<cv-tag${settings.group.attr}></cv-tag>
  `;

        // ----------------------------------------------------------------

        const templateViewString = `
    <sv-template-view
      :sv-experimental="experimental"
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

        return {
          components: { CvTag, SvTemplateView },
          data: () => ({ experimental: version.experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvTagNotesMD },
      }
    );
  }
}
