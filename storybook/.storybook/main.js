module.exports = {
  stories: ['../stories/**/*-story.js'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-notes/register',
    '@storybook/addon-storysource/register',
    '@storybook/addon-options/register',
  ],
};
