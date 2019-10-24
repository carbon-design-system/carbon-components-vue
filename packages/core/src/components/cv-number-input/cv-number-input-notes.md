# cv-number-input

A Vue implementation of a Carbon Components number-input

http://www.carbondesignsystem.com/components/number-input/code

## Usage

```html
<cv-number-input label="label" v-model="modelValue"> </cv-number-input>
```

```html
<cv-number-input label="Text input label" @change="onChange">
  <template slot="invalid-message">
    Number not valid
  </template>

  <template slot="helper-text">
    Helpful text
  </template>
</cv-number-input>
```

## Attributes

- helper-text: optional helper text
- invalid-message: optional error message
- label: the label text for the input
- theme: optional 'light',
- value: optional initial value of the input (string or number)
- ariaLabelForDownButton: optional defaults to 'Decrease number input'
- ariaLabelForUpButton: optional defaults to 'Increase number input'

Other standard props e.g. disabled

## v-model

The value and/or v-model attributes can be integers represented by string or number types. The same type will be raised in events as is supplied to value or v-model attributes.

## slots

none - helper-text: optional and overrides the helper-text attribute

- invalid-message: optional and overrides the invalid-message attribute
