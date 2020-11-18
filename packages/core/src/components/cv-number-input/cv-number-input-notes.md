# cv-number-input

A Vue implementation of a Carbon Components number-input

http://www.carbondesignsystem.com/components/number-input/code

## Usage

```html
<cv-number-input label="label" v-model="modelValue"> </cv-number-input>
```

```html
<cv-number-input label="Text input label" @input="onInput">
  <template slot="invalid-message">
    Number not valid
  </template>

  <template slot="helper-text">
    Helpful text
  </template>
</cv-number-input>
```

## Attributes

- ariaLabelForDownButton: optional defaults to 'Decrease number input'
- ariaLabelForUpButton: optional defaults to 'Increase number input'
- helper-text: optional helper text
- hide-selected: optional hides selected from dropdown list
- invalid-message: optional error message
- label: the label text for the input
- max: optional max (string or number) operates as per stanard html number input
- min: optional min (string or number) operates as per stanard html number input
- step: optional step (string or number) operates as per stanard html number input
- light: Lighter variant, typically alternate background
- theme: (deprecated use light) '' or 'light'
- value: optional initial value of the input (string or number)
- mobile: optional mobile variant

Other standard props e.g. disabled, min, max, step

NOTE: A decimal can be used to for the step value, however to cope with floating point inacuracies we restrict to 10 decimal places.

## v-model

The value and/or v-model attributes can be numbers represented by string or number types. The same type will be raised in events as is supplied to value or v-model attributes.

## slots

none - helper-text: optional and overrides the helper-text attribute

- invalid-message: optional and overrides the invalid-message attribute

## Limitations

Use of a javascript number with the value property is possible. However, it is worth noting that it will suffer from the limitations of floating point and integer numbers in javascript.
