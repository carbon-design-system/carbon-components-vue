import SvVersions from '../_storybook/views/sv-template-view/sv-versions';

export default {
  title: 'Versions',
  component: SvVersions,
  parameters: { options: { showPanel: false }, layout: 'fullscreen' },
};

const Template = (args, { argTypes }) => ({
  components: { SvVersions },
  template: `<sv-versions></sv-versions>`,
});

export const _default = Template.bind({});
