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
- passwordHideLabel: aria-label for the password button if visible, default: 'Hide password',
- passwordShowLabel: aria-label for the password button if not visible, default: 'Show password',
- passwordVisible: Boolean makes password text visible
- light: Lighter variant, typically alternate background
- theme: (deprecated use light) '' or 'light'
- type: If 'password' adds password features
- value: optional initial value of the text input,
- warn-text: optional used to convey a warning

Other standard props e.g. disabled and placeholder

## Methods

Focus - sets focus to the text input

## slots

- helper-text: optional and overrides the helper-text attribute
- invalid-message: optional and overrides the invalid-message attribute
- warn-text: optional and overrides the warn-text attribute
