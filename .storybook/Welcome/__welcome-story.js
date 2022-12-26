import { storiesOf } from '@storybook/vue3';
import SvWelcome from './sv-welcome.vue';

const stories = storiesOf('Carbon', module);

stories.add(
  'Welcome',
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
