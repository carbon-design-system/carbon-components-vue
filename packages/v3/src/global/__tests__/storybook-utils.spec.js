import { storybookControlsFromProps } from '../storybook-utils';

const props = {
  boolean_0: true,
  boolean_1: Boolean,
  boolean_2: { type: Boolean },
  boolean_3: { type: Boolean, default: true },
  boolean_4: { default: true },
  string_0: 'test',
  string_1: String,
  string_2: { type: String },
  string_3: { type: String, default: 'test' },
  string_4: { default: 'test' },
  number_0: 1,
  number_1: Number,
  number_2: { type: Number },
  number_3: { type: Number, default: 1 },
  number_4: { default: 1 },
  errNotSure: {},
  errNotSure2: { type: {} },
};

const expectedResult = {
  boolean_0: { control: { type: 'boolean', default: true } },
  boolean_1: { control: { type: 'boolean', default: false } },
  boolean_2: { control: { type: 'boolean', default: false } },
  boolean_3: { control: { type: 'boolean', default: true } },
  boolean_4: { control: { type: 'boolean', default: true } },
  string_0: { control: { type: 'text', default: 'test' } },
  string_1: { control: { type: 'text', default: '' } },
  string_2: { control: { type: 'text', default: '' } },
  string_3: { control: { type: 'text', default: 'test' } },
  string_4: { control: { type: 'text', default: 'test' } },
  number_0: { control: { type: 'number', default: 1 } },
  number_1: { control: { type: 'number', default: 0 } },
  number_2: { control: { type: 'number', default: 0 } },
  number_3: { control: { type: 'number', default: 1 } },
  number_4: { control: { type: 'number', default: 1 } },
  errNotSure: { control: { type: 'text', default: '' } },
  errNotSure2: { control: { type: 'text', default: '' } },
};

describe('global/storybook-utils', () => {
  it('Should convert common props to storybook control types', () => {
    const controls = storybookControlsFromProps(props);

    expect(controls).toEqual(expectedResult);
  });
});
