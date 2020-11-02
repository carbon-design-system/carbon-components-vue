# CV MultiSelect

A Vue implementation of a Carbon Components multi-select

https://www.carbondesignsystem.com/components/dropdown/code

## Usage

```html
<cv-multi-select
  :auto-filter="autoFilter"
  :auto-highlight="autoHighlight"
  :disabled="disabled"
  filterable="filterable"
  :helper-text="helperText"
  :inline="inline"
  :invalid-message="invalidMessage"
  :label="label"
  :options="options"
  selection-feedback="selectionFeedback"
  :theme="theme"
  :title="title"
  @change="actionChange"
  v-model="checks"
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
  initialValue: ['20s', '40s'],
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
},
selectionFeedback: 'top-after-reopen',
filterable: false,
autofilter: false,
autohighlight: false
```

## Attributes

- auto-filter: optional if true the combo box is filtered based on matching any string in the options
- auto-highlight: optional if true the combo box item highlighted is the first match of any string in the options
- helper-text: optional helper text
- invalid-message: optional error message
- title: the title text for the input
- light: Lighter variant, typically alternate background
- theme: (deprecated use light) '' or 'light'
- inline: optional boolean, if true changes layout and hides helper text
- disabled: enable disables the component
- options: array objects containing value, label and name for checkboxes.
- value: initial selected values
- selection-feedback: after checking an option it is sorted based on the following values
  - 'top-after-reopen': joins other selected options at the top after the dropdown is reopened
  - 'top': joins other selected options at the top immediately
  - 'fixed': stays where it is in the list.
    -filterable: If true the multi select list can be filtered.

Other standard props e.g. disabled and placeholder

## slots

- helper-text: optional and overrides the helper-text attribute
- invalid-message: optional and overrides the invalid-message attribute

## Events

- change - passes the value of the selected option
- filter - passes up the value of the current filter

  - When not using auto-filter and/or auto-highlight the user can intercept the filter event to update the options and highlight properties.
    e.g.

  ```js
      onFilter(filter) {
      let pat = new RegExp(`^${filter}`, 'ui');
      // filter the options
      this.options = fruits.filter(opt => pat.test(opt.label)).slice(0);

      // highlihgt an option
      if (this.options.length > 0) {
        let found = this.options.find(opt => pat.test(opt.label));
        if (found) {
          this.highlight = found.value;
        } else {
          this.highlight = '';
        }
      }
    },
  ```

## Keyboard interaction

Use cursor keys to move up and down list and space to check/uncheck an option.
