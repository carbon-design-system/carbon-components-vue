import { storiesOf } from '@storybook/vue3';
import SvWelcome from './sv-welcome.vue';

const stories = storiesOf('Welcome', module);

stories.add(
  'default',
  () => {
    // ----------------------------------------------------------------
    const templateViewString = `<sv-welcome></sv-welcome>`;

    return {
      components: { SvWelcome },
      template: templateViewString,
    };
  },
  {
    options: {
      isToolshown: false,
      showPanel: false,
    },
  }
);
