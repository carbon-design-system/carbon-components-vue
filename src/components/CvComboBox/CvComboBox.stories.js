import { storyParametersObject } from '../../global/storybook-utils';
import { CvComboBox } from '.';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Kiwi Fruit',
  'Lemon',
  'Lime',
  'Mango',
  'Orange',
  'Passion Fruit',
  'Raisin',
  'Satsuma',
  'Tangerine',
  'Ugli Fruit',
  'Watermelon',
].map(item => {
  const nameVal = item.replace(/\W/, '_').toLowerCase();
  return {
    name: nameVal,
    label: item,
    value: `val-${nameVal}`,
  };
});

const initArgs = {
  title: 'Combo Box title',
  options: fruits,
  helperText: 'Combobox helper text',
};

export default {
  title: 'Component/CvComboBox',
  component: CvComboBox,
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: 'aria-input-field-name',
            selector: '.bx--combo-box',
          },
        ],
      },
      options: {},
      manual: true,
    },
  },
  argTypes: {
    title: { type: String, description: 'Combo Box title' },
    options: { type: Array, description: 'Combo Box options' },
  },
};

const template = `
<div style="width: 18.75rem">
  <cv-combo-box aria-label="Choose a fruit" @change="onChange" @filter="onFilter" v-bind="args">
  </cv-combo-box>
</div>`;

const Template = args => ({
  components: { CvComboBox },
  setup: () => ({
    args,
    onChange: action('change'),
    onFilter: action('filter'),
  }),
  template,
});

export const Default = args => Template(args);
Default.args = initArgs;
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

/**
 * Slots
 */
const templateSlots = `
<div style="width: 18.75rem">
  <cv-combo-box aria-label="Choose a fruit" @change="onChange" @filter="onFilter" v-bind="args">
    <template v-if="args.use_helperTextSlot" #helper-text>Some helpful text</template>
    <template v-if="args.use_invalidMessageSlot" #invalid-message>Invalid message text</template>
  </cv-combo-box>
</div>`;

const TemplateSlots = args => ({
  components: { CvComboBox },
  setup: () => ({
    args,
    onChange: action('change'),
    onFilter: action('filter'),
  }),
  template: templateSlots,
});

export const Slots = args => TemplateSlots(args);
Slots.args = {
  use_helperTextSlot: false,
  use_invalidMessageSlot: false,
  title: 'Combo Box title',
  options: fruits,
};
Slots.parameters = storyParametersObject(
  Slots.parameters,
  templateSlots,
  Slots.args
);

/**
 * v-model story
 */
const modelValue = ref('val-fig');
const templateVModel = `
<div style="width: 50%">
  <div style="width: 18.75rem">
    <cv-combo-box aria-label="Choose a fruit" @change="onChange" @filter="onFilter" v-bind="args" v-model="modelValue">
    </cv-combo-box>
  </div>
  <div style="margin-top:2rem; background-color: #888888; padding:1rem">
    <div style="font-size: 150%;">Sample interaction</div>
    <label for="fruits" style="margin: 0.5rem">V-model:</label>
    <select style="margin: 0.5rem" name="fruits" id="fruits" @change="(ev) => { modelValue = ev.currentTarget.value }">
      <option value="val-elderberry">Elderberry</option>
      <option value="val-fig">Fig</option>
      <option value="val-grape">Grape</option>
      <option value="val-apple">Apple</option>
    </select>
    <div style="margin: 0.5rem">Value: <span style="font-weight: bold;">{{modelValue}}</span></div>
  </div>
</div>`;

const TemplateVModel = args => ({
  components: { CvComboBox },
  setup: () => ({
    args,
    modelValue,
    onChange: action('change'),
    onFilter: action('filter'),
  }),
  template: templateVModel,
});

export const VModel = args => TemplateVModel(args);
VModel.args = initArgs;
VModel.parameters = storyParametersObject(
  VModel.parameters,
  templateVModel,
  VModel.args
);
