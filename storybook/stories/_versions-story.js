import { storiesOf } from '@storybook/vue';
import SvVersions from '../_storybook/views/sv-template-view/sv-versions';

const stories = storiesOf('Versions', module);

stories.add(
  'default',
  () => {
    // ----------------------------------------------------------------
    const templateViewString = `<sv-versions></sv-versions>`;

    return {
      components: { SvVersions },
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
