import { storiesOf } from '@storybook/vue';

const stories = storiesOf('Welcome', module);

stories.add('default', () => {
  // ----------------------------------------------------------------
  const templateViewString = `
  <main>
      <h1>Ooops.</h1>
      <p>Applogies we appear to have broken storybook in a number of ways. Currently remedying this.</p>
  </main
  `;

  return {
    template: templateViewString,
  };
});
