//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

// helper functions for component props

import './demo-components'; // import and register components for use in stories

/**
 * Prepare a set of props, or prop types or default props, merging values
 * from one or more sets and optionally blocking keys which should not be
 * passed. Returns the prepared set of props. Does not modify any of the
 * objects passed.
 *
 * @param {{} | '' | ['']} values One or more sets of keys and values to be
 * merged, or names of keys to be blocked. Each parameter that is an object is
 * treated as keys and values to be merged, and each parameter that is a string
 * or an array of strings is treated as keys to be blocked.
 *
 * Examples:
 *   const props = { a: 3, c: 4, d: 5 };
 *
 *   * prepareProps(props) -> { a: 3, c: 4, d: 5 }
 *   * prepareProps(props, 'c') -> { a: 3, d: 5 }
 *   * prepareProps(props, ['a', 'c', 'e']) -> { d: 5 }
 *
 *   * prepareProps({ a: 1, b: 2 }, props) -> { a: 3, b: 2, c: 4, d: 5 }
 *   * prepareProps({ a: 1, b: 2 }, props, ['a', 'c']) -> { b: 2, d: 5 }
 *
 *   * prepareProps(props, { c: 6 }) -> { a: 3, c: 6, d: 5 }
 *   * prepareProps(props, 'a', { c: 6 }) -> { c: 6, d: 5 }
 */
export const prepareProps = (...values) => {
  // Convert any string or array arg into an object with nulls as values
  const toNulls = arg =>
    typeof arg === 'string'
      ? { [arg]: null }
      : Array.isArray(arg)
      ? Object.fromEntries(arg.map(key => [key, null]))
      : arg;

  // Merge all the args from left to right
  const merged = Object.assign({}, ...values.map(toNulls));

  // Now strip any keys whose final value is null
  return Object.entries(merged).reduce((result, [key, value]) => {
    if (value !== null) {
      result[key] = value;
    }
    return result;
  }, {});
};

export const removedProps = arr => {
  return arr.reduce((acc, val) => {
    acc[val] = null;
    return acc;
  }, {});
};

const removedArgValue = { table: { disable: true } };
export const removeArgTypes = arr => {
  return arr.reduce((acc, item) => {
    acc[item] = { ...removedArgValue };
    return acc;
  }, {});
};

// returns an argTypes object for props marked as deprecated
// NOTE: props must have `deprecated: true` as a property which is not standard Vue
export const deprecatedArgTypes = component => {
  const result = {};

  const depCheck = obj => {
    if (obj?.props) {
      for (let prop in obj.props) {
        if (obj.props[prop].deprecated) {
          result[prop] = { ...removedArgValue };
        }
      }
    }
  };

  if (component) {
    depCheck(component);
  }
  if (component.mixins) {
    for (let i = 0; i < component.mixins.length; i++) {
      depCheck(component.mixins[i]);
    }
  }

  return result;
};

const capitalCase = s => s.replace(/((-.)|(^.))/g, x => (x[1] ?? x[0]).toUpperCase());
// const camelCase = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());
// const snakeFormat = (s) => s.replace(/([^A-Z][A-Z])|(^[A-Z])/g, (x) => (x[1] ? x[0] + '-' + x[1].toLowerCase() : x[0].toLowerCase()));

// will be wrapped with a div to make the storybook content work.
const selectLabelsHelper = (arr, wrap) =>
  arr.map(option => (option === undefined ? 'undefined' : option.label || (wrap ? `<div>${option}</div>` : option)));

const slotTemplate = (slotName, slotText, scope) => {
  const slot = scope ? `v-slot:${slotName}="{scope}"` : `slot="${slotName}"`;
  return `<template v-if="${slotText}" ${slot}><div v-html="${slotText}" /></template>`;
};
const slotTemplateVerbose = (slotName, propName, options) =>
  options.map((option, index) => {
    const slot = option?.scope ? 'v-slot:${slotName}="{scope}"' : 'slot="${slotName}"';
    return option && `<template v-if="${propName} === '${index}'" ${slot}>${option?.value || option}</template>`;
  });

/**
 *
 * @param {[{slot: String, options: Array, containsComponent: Boolean}]} slotsInfo
 * @returns { { argTypes: 'object containing arg types', computed: 'an object containing functions', html: 'slot HTML for template' } }
 */
export const slotHelper = slotsInfo => {
  const slotDomArray = [];
  const slotComputedFunctions = {};
  const slotArgTypes = {};

  slotsInfo.forEach(({ slot, options, defaultIndex, containsComponent, description }) => {
    const capitalized = capitalCase(slot);
    const propName = `slot${capitalized}`;
    const computedName = `computed${capitalized}`;

    // if the slot contains components do not interpolate using {{}} or v-html
    // as the storybook templates are immutable.
    const verboseTemplate = containsComponent ?? false;

    slotArgTypes[propName] = {
      control: {
        type: 'select',
        labels: selectLabelsHelper(options, true),
      },
      options: Object.keys({ ...options }),
      defaultValue: defaultIndex ? `${defaultIndex}` : '0',
      name: `Slot:"${slot}"`,
      description,
    };

    slotArgTypes[slot] = removedArgValue;

    if (verboseTemplate) {
      slotDomArray.push(slotTemplateVerbose(slot, propName, options).join('\n'));
      // console.log(slotTemplateVerbose(slot, propName, options).join('\n'));
    } else {
      slotDomArray.push(slotTemplate(slot, computedName, options.scope));

      slotComputedFunctions[computedName] = function() {
        const optionIndex = this.$props[propName] ?? defaultIndex ?? 0;
        const option = options[optionIndex];
        return option?.value || option;
      };
    }
    // console.log(slotDomArray);
  });

  return { argTypes: slotArgTypes, computed: slotComputedFunctions, html: slotDomArray.join('\n') };
};

/**
 *
 * @param {[{prop: String, options: Array}]} propInfo
 * @returns { { argTypes: 'object containing arg types', computed: 'an object containing functions' } }
 */
export const propHelper = propsInfo => {
  const propComputedFunctions = {};
  const propArgTypes = {};
  const propAttributes = [];

  propsInfo.forEach(({ prop, options, defaultIndex, description }) => {
    const capitalized = capitalCase(prop);
    const propName = `prop${capitalized}`;
    const computedName = `computed${capitalized}`;

    propArgTypes[propName] = {
      control: {
        type: 'select',
        labels: selectLabelsHelper(options),
      },
      options: Object.keys({ ...options }),
      defaultValue: defaultIndex ? `${defaultIndex}` : '0',
      name: prop,
      description,
    };
    propArgTypes[prop] = removedArgValue;

    propAttributes.push(`:${prop}="${computedName}"`);

    propComputedFunctions[computedName] = function() {
      const optionIndex = this.$props[propName] ?? defaultIndex ?? 0;
      const option = options[optionIndex];
      return option?.value !== undefined ? option.value : option;
    };
    // console.log(propDomArray);
  });

  const initMappedProps = that => {
    that.mappedProps = {};

    return propsInfo.forEach(({ prop }) => {
      const capitalized = capitalCase(prop);
      that.mappedProps[prop] = () => that[`computed${capitalized}`];
    });
  };

  return {
    argTypes: propArgTypes,
    computed: propComputedFunctions,
    attrs: propAttributes.join(' '),
    initMappedProps,
  };
};

export const betterSource = (templateFn, instance) => {
  console.log('better source');
  const template = templateFn(instance.args, { argTypes: {} }).template;

  return { code: template.replace(/v-bind="\{\.\.\.\$props[^}]*\}"/, 'v-bind-"$attrs"') };
};

export const radioArgTypes = options => ({
  control: { type: 'radio' },
  options: options,
  description: `Options: ${options.map(val => `'${val}'`).join(', ')}`,
});
