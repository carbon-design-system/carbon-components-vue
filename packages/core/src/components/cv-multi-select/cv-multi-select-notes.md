# CV MultiSelect

A Vue implementation of a Carbon Components multi-select

https://www.carbondesignsystem.com/components/multi-select/code

## Usage

```html
<cv-multi-select
  :theme="theme"
  :label="label"
  :inline="inline"
  :helper-text="helperText"
  :invalid-message="invalidMessage"
  :title="title"
  :disabled="disabled"
  :options="options"
  @change="actionChange"
  v-model="checks"
  selection-feedback="selectionFeedback
>
</cv-multi-select>
```

The data

```js
{
  theme: "",
  label: "Choose an option",
  inline: false,
  helperText: null,
  invalidMessage: null,
  title: "Multiselect title",
  disabled: false,
  checks: [],
  options: [
              {
                value: '10s',
                label: '10s',
                name: 'Tens',
              },
              {
                value: '20s',
                label: '20s',
                name: 'Twenties',
              },
              {
                value: '30s',
                label: '30s',
                name: 'Thirties',
              },
              {
                value: '40s',
                label: '40s',
                name: 'Fourties',
              },
              {
                value: '50s',
                label: '50s',
                name: 'Fifties',
              },
            ]
}
```

## Attributes

- helper-text: optional helper text
- invalid-message: optional error message
- title: the title text for the input
- theme: optional 'light',
- inline: optional boolean, if true changes layout and hides helper text
- disabled: enable disables the component
- options: array objects containing value, label and name for checkboxes.
- selection-feedback: after checking an option it is sorted based on the following values
  - 'top-after-reopen': joins other selected options at the top after the dropdown is reopened
  - 'top': joins other selected options at the top immediately
  - 'fixed': stays where it is in the list.

Other standard props e.g. disabled and placeholder

## slots

- helper-text: optional and overrides the helper-text attribute
- invalid-message: optional and overrides the invalid-message attribute

## Keyboard interaction

Use cursor keys to move up and down list and space to check/uncheck an option.
