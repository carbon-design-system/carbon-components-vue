import { storiesOf } from '@storybook/vue';
import SvVersions from '../_storybook/views/sv-template-view/sv-versions';
// import { setVersion } from '@carbon/vue/src/internal/feature-flags';

const stories = storiesOf('Versions', module);

stories.add('default', () => {
  // ----------------------------------------------------------------
  const templateViewString = `<sv-versions></sv-versions>`;

  return {
    components: { SvVersions },
    template: templateViewString,
  };
});
