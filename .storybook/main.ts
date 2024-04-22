import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  stories: [
    './Welcome/__welcome-story.js',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
};
export default config;
