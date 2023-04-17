import { Canvas, Meta, Story } from '@storybook/addon-docs';
import CvTile from './CvTile.vue';
import CvTileStandard from './CvTileStandard.vue';
import CvTileClickable from './CvTileClickable.vue';
import { sbCompPrefix } from '../../global/storybook-utils';
import { action } from '@storybook/addon-actions';

<Meta title={`${sbCompPrefix}/CvTile`} component={CvTile} />

export const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: {
    CvTile,
    CvTileStandard,
    CvTileClickable,
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return {
      args: {
        light: args.light,
        kind: args.kind,
        disabled: args.disabled,
        expanded: args.expanded,
        tileCollapsedLabel: args.tileCollapsedLabel,
        tileExpandedLabel: args.tileExpandedLabel,
      },
      onChange: action('change'),
      onExpanded: action('expanded'),
      onClick: action('click'),
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: args.template,
});
const defaultTemplate = `<cv-tile v-bind='args'>Hello!</cv-tile>`;
const defaultCode = defaultTemplate.replace("v-bind='args'", '');
const expandableTemplate = `<cv-tile v-bind='args' kind="expandable" @expanded="onExpanded">Hello expandable!<template #below><h1>More Content</h1><p>Expanded</p></template></cv-tile>`;
const expandableCode = expandableTemplate.replace("v-bind='args'", '');
const clickableTemplate = `<cv-tile v-bind='args' kind="clickable" @click="onClick" to="{name: 'something'}">Hello clickable!</cv-tile>`;
const clickableCode = clickableTemplate.replace("v-bind='args'", '');
const selectableTemplate = `<cv-tile v-bind='args' kind="selectable" value="my-selection" @change="onChange">Hello selectable! </cv-tile>`;
const selectableCode = selectableTemplate.replace("v-bind='args'", '');

# CvTile

**Migration notes:**

- The `light` and '`theme` options continue to be supported but the boolean `light` is preferred.
- The expandable tile now emits a `expanded` event with a Boolean value.

<Canvas>
  <Story
    name="Default"
    parameters={{
      controls: {
        exclude: [
          'default',
          'selected',
          'template',
          'data',
          'kind',
          'expanded',
          'tileExpandedLabel',
          'tileCollapsedLabel',
        ],
      },
      docs: { source: { code: defaultCode } },
    }}
    args={{
      kind: '',
      light: false,
      disabled: false,
      template: defaultTemplate,
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

<Canvas>
  <Story
    name="Expandable"
    parameters={{
      controls: {
        exclude: ['default', 'selected', 'template', 'data', 'kind', 'slots'],
      },
      docs: { source: { code: expandableCode } },
    }}
    args={{
      light: false,
      disabled: false,
      template: expandableTemplate,
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

<Canvas>
  <Story
    name="Clickable"
    parameters={{
      controls: {
        exclude: [
          'default',
          'selected',
          'template',
          'data',
          'kind',
          'slots',
          'expanded',
          'tileExpandedLabel',
          'tileCollapsedLabel',
        ],
      },
      docs: { source: { code: clickableCode } },
    }}
    args={{
      light: false,
      disabled: false,
      template: clickableTemplate,
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

<Canvas>
  <Story
    name="Selectable"
    parameters={{
      controls: {
        exclude: [
          'default',
          'selected',
          'template',
          'data',
          'kind',
          'slots',
          'expanded',
          'tileExpandedLabel',
          'tileCollapsedLabel',
        ],
      },
      docs: { source: { code: selectableCode } },
    }}
    args={{
      light: false,
      disabled: false,
      template: selectableTemplate,
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>
