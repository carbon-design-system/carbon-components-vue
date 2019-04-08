import { storiesOf } from '@storybook/vue';
import SvWelcome from '../_storybook/views/sv-template-view/sv-welcome';
// import { setVersion } from '@carbon/vue/src/internal/feature-flags';

const stories = storiesOf('Welcome', module);

stories.add('default', () => {
  // ----------------------------------------------------------------
  const templateViewString = `<sv-welcome></sv-welcome>`;

  return {
    components: { SvWelcome },
    template: templateViewString,
  };
});
