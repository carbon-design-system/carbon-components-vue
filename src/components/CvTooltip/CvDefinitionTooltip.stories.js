import CvDefinitionTooltip from './CvDefinitionTooltip.vue';
import { storyParametersObject } from '../../global/storybook-utils';
import { alignments, directions } from './consts';

export default {
  title: 'Component/CvDefinitionTooltip',
  component: CvDefinitionTooltip,
  argTypes: {
    alignment: {
      control: {
        type: 'select',
      },
      options: alignments,
      defaultValue: CvDefinitionTooltip.props.alignment.default,
    },
    direction: {
      control: {
        type: 'select',
      },
      options: directions,
      defaultValue: CvDefinitionTooltip.props.direction.default,
    },
    definition: {
      control: { type: 'text' },
      table: { category: 'props' },
      description: 'Definition of the term',
    },
    term: {
      control: { type: 'text' },
      table: { category: 'props' },
      description: 'Term to be defined',
    },
    'definition ': {
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Definition of the term slot.',
    },
    'term ': {
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Term slot',
    },
  },
};

const Term = 'A term needing definition';
const Definition = 'Brief description of the dotted, underlined term';

const template = `<cv-definition-tooltip v-bind="args" />`;

const Template = args => {
  return {
    components: { CvDefinitionTooltip },
    template,
    setup() {
      return {
        args,
      };
    },
  };
};

export const Default = Template.bind({});
Default.args = {
  term: Term,
  definition: Definition,
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
