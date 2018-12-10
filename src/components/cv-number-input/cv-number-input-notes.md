# cv-number-input

A Vue implementation of a Carbon Components number-input

http://www.carbondesignsystem.com/components/number-input/code

## Usage

```html
<cv-number-input
  label="label"
  v-model="modelValue">
</cv-number-input>
```

```html
<cv-number-input
  label="Text input label"
   @change="onChange">

  <template slot="invalid-message">
    Number not valid
  </template>

  <template slot="helper-text">
    Helpful text
  </template>
</cv-number-input>
```

## Attributes

- invalid: set to true to indicate the current value is invalid
- label: the label text for the input label
- value: value

## slots

- invalid-message: Message shown when the invalid attribute is set
- helper-text: Text to help the user enter appropriate data
