import { storyParametersObject } from '..';
import { storySourceCode } from '../story-source-code';

describe('global/storybook-utils/storyParametersObject', () => {
  it('Should build properties from null', () => {
    const parameters = storyParametersObject(null, '<div v-bind="args" />', {
      prop1: 'prop1',
      prop2: 'prop2',
    });

    expect(parameters).toEqual({
      docs: {
        source: {
          code: '<div prop1="prop1" prop2="prop2" />',
        },
      },
    });
  });

  it('Should build properties from {}', () => {
    const parameters = storyParametersObject({}, '<div v-bind="args" />', {
      prop1: 'prop1',
      prop2: 'prop2',
    });

    expect(parameters).toEqual({
      docs: {
        source: {
          code: '<div prop1="prop1" prop2="prop2" />',
        },
      },
    });
  });

  it('Should build properties from { docs: {}}', () => {
    const parameters = storyParametersObject(
      { docs: {} },
      '<div v-bind="args" />',
      {
        prop1: 'prop1',
        prop2: 'prop2',
      }
    );

    expect(parameters).toEqual({
      docs: {
        source: {
          code: '<div prop1="prop1" prop2="prop2" />',
        },
      },
    });
  });

  it('Should build properties from { docs: { source: {}}}', () => {
    const parameters = storyParametersObject(
      { docs: { source: {} } },
      '<div v-bind="args" />',
      {
        prop1: 'prop1',
        prop2: 'prop2',
      }
    );

    expect(parameters).toEqual({
      docs: {
        source: {
          code: '<div prop1="prop1" prop2="prop2" />',
        },
      },
    });
  });

  it('Should build properties from with non-string props', () => {
    const parameters = storyParametersObject(null, '<div v-bind="args" />', {
      prop1: true,
      prop2: 2,
    });

    expect(parameters).toEqual({
      docs: {
        source: {
          code: '<div prop1 :prop2="2" />',
        },
      },
    });
  });

  it('Should replace alternate v-bind', () => {
    const parameters = storyParametersObject(
      null,
      '<div v-bind="otherProps" />',
      {
        prop1: true,
      },
      'v-bind="otherProps"'
    );

    expect(parameters).toEqual({
      docs: {
        source: {
          code: '<div prop1 />',
        },
      },
    });
  });

  it('Should deal with default values', () => {
    const parameters = storyParametersObject(null, '<div v-bind="args" />', {
      prop1: false,
      prop2: '',
      prop3: 0,
    });

    expect(parameters).toEqual({
      docs: {
        source: {
          code: '<div prop2="" :prop3="0" />',
        },
      },
    });
  });

  it('Is OK with zero pros', () => {
    const parameters = storyParametersObject(
      null,
      '<div v-bind="args" />',
      null
    );

    expect(parameters).toEqual({
      docs: {
        source: {
          code: '<div  />',
        },
      },
    });
  });

  it('Is does not add slotArgs', () => {
    const parameters = storyParametersObject(null, '<div v-bind="args" />', {
      'slotArgs.abc': 'abc',
    });

    expect(parameters).toEqual({
      docs: {
        source: {
          code: '<div  />',
        },
      },
    });
  });
});

describe('global/storybook-utils/storySourceCode', () => {
  it('Works with a default parameter', () => {
    const result = storySourceCode('<div v-bind="args" />', {
      prop1: 'prop1',
    });

    expect(result).toEqual('<div prop1="prop1" />');
  });
});
