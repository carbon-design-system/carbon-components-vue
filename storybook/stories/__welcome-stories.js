import SvWelcome from '../_storybook/views/sv-template-view/sv-welcome';

export default {
  title: 'Welcome',
  component: SvWelcome,
  parameters: { options: { showPanel: false }, layout: 'fullscreen' },
};

const Template = (args, { argTypes }) => ({
  components: { SvWelcome },
  template: `<sv-welcome></sv-welcome>`,
});

export const _default = Template.bind({});
