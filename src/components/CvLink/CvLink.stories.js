import {
  sbCompPrefix,
  storybookControlsFromProps,
  storyParametersObject,
} from '../../global/storybook-utils';

import { CvLink } from '.';
import { props as propsCvLink, linkSizes } from '../../use/cvLink';

export default {
  title: `${sbCompPrefix}/CvLink`,
  component: CvLink,
  argTypes: {
    ...storybookControlsFromProps(propsCvLink),
    disabled: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
      defaultValue: false,
      description: 'Toogle anchor / router-link disable state.',
    },
    inline: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
      defaultValue: false,
      description:
        'Specify whether you want the inline version of this control.',
    },
    href: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description: 'Provide the href attribute for the `<a>` node.',
    },
    to: {
      type: 'string',
      table: {
        type: {
          summary:
            'string, object (see vue-router documentation for router-link)',
        },
        category: 'props',
      },
      description:
        "Replace `<a>` node for vue-router's `router-link`, providing `to` property to it. Cannot be used with href.",
    },
    visited: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
      defaultValue: false,
      description:
        'Specify whether you want the link to receive visited styles after the link has been clicked.',
    },
    size: {
      type: 'string',
      table: {
        type: { summary: linkSizes.join(' | ') },
        defaultValue: { summary: 'medium (md)' },
        category: 'props',
      },
      options: linkSizes,
      control: {
        type: 'select',
        labels: {
          sm: 'small (sm)',
          md: 'medium (md)',
          lg: 'large (lg)',
        },
      },
      defaultValue: 'md',
      description:
        'Specify the size of the Link. Currently supports either `sm`, `md` (default) or `lg` as an option.',
    },
    default: {
      type: 'string',
      table: {
        type: { summary: 'html' },
        category: 'slots',
      },
      description: 'Inner `<a>` node / router-link content.',
    },
  },
};

const template = `<cv-link href='#' v-bind='args'>{{ args.default }}</cv-link>`;
const Template = args => {
  return {
    components: { CvLink },
    setup: () => ({ args }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = { default: 'Link' };
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

export const Disabled = Template.bind({});
Disabled.args = { default: 'Disabled link', disabled: true };
Disabled.parameters = storyParametersObject(
  Disabled.parameters,
  template,
  Disabled.args
);

const inlineTemplate = `
<p>
  Ut facilisis semper lorem in aliquet. Aliquam accumsan ante justo, vitae
  fringilla eros vehicula id. Ut at enim quis libero pharetra ullamcorper.
  Maecenas feugiat sodales arcu ut porttitor. In blandit ultricies est.
  Vivamus risus massa, cursus eu tellus sed, sagittis commodo nunc.
  <cv-link href="#" v-bind='args'>{{ args.default }}</cv-link>,
  finibus suscipit nunc. Phasellus ex quam, placerat quis tempus sit amet,
  pretium nec sem. Etiam dictum scelerisque mauris, blandit ultrices erat
  pellentesque id. Quisque venenatis purus sit amet sodales condimentum.
  Duis at tincidunt orci. Ut velit ipsum, lacinia at ex quis, aliquet
  rhoncus purus. Praesent et scelerisque ligula.
</p>
`;
const InlineTemplate = args => {
  return {
    components: { CvLink },
    setup: () => ({ args }),
    template: inlineTemplate,
  };
};

export const Inline = InlineTemplate.bind({});
Inline.args = {
  default: 'Maecenas nunc mauris, consequat quis mauris sit amet',
  inline: true,
};
Inline.parameters = storyParametersObject(
  Inline.parameters,
  inlineTemplate,
  Inline.args
);
