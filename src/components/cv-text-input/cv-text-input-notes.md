# cv-text-input

A Vue implementation of a Carbon Components text-input

http://www.carbondesignsystem.com/components/text-input/code

## Usage

```html
<cv-text-input label="label" v-model="modelValue"> </cv-text-input>
```

## Attributes

- helper-text: optional helper text
- invalid-message: optional error message
- label: the label text for the input
- passwordVisible: Boolean makes password text visible
- theme: optional 'light',
- type: If 'password' adds password features
- value: optional initial value of the text input,

Other standard props e.g. disabled and placeholder

## slots

- helper-text: optional and overrides the helper-text attribute
- invalid-message: optional and overrides the invalid-message attribute
