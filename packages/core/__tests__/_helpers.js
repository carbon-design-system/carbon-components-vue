import { shallowMount } from '@vue/test-utils';

export const testComponent = {
  propsAreRequired: (component, props) => {
    test.each(props)('has a required prop: %s', prop => {
      expect(component.props[prop].required).toBe(true);
    });
  },

  propsAreType: (component, props, types) => {
    let typeName;
    if (types.map) {
      const typeNames = types.map(type => type.name);
      typeName = `(${typeNames.join('|')})`;
    } else {
      typeName = types.name;
    }
    test.each(props)(`has a prop of ${typeName} type: %s`, prop => {
      if (types.map) {
        expect(component.props[prop].type).toEqual(expect.arrayContaining(types));
      } else {
        expect(component.props[prop].type).toBe(types);
      }
    });
  },

  propsHaveDefault: (component, props) => {
    test.each(props)('has a prop with a default: %s', prop => {
      expect(component.props[prop].default).toBeDefined();
    });
  },
};

const PLACEMENT_STRING = 'Now is > the FOO &amp; of &#128169; our (discontent)';

export const testInstance = {
  propStringIsRendered: (component, prop, selector) => {
    test(`renders the String prop: ${prop}`, () => {
      expect(
        shallowMount(component, {
          propsData: { [prop]: PLACEMENT_STRING },
        })
          .find(selector)
          .text()
      ).toMatch(PLACEMENT_STRING);
    });
  },
};
