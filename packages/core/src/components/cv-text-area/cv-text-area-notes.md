# cv-text-area

A Vue implementation of a Carbon Components text-area

http://www.carbondesignsystem.com/components/text-input/code

## Usage

```html
<cv-text-area label="label" v-model="modelValue"> </cv-text-area>
```

## Attributes

- helper-text: optional helper text
- invalid-message: optional error message
- label: the label text for the text area
- light: Lighter variant, typically alternate background
- placeholder: standard behavior
- theme: (deprecated use light) '' or 'light'
- value: optional initial value of the text area,

Other standard props e.g. disabled and placeholder

## Methods

Focus - sets focus to the text area

## slots

- helper-text: optional and overrides the helper-text attribute
- invalid-message: optional and overrides the invalid-message attribute
