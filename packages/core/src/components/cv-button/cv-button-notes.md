# cv-button

A Vue implementation of a Carbon Components button.

http://www.carbondesignsystem.com/components/button/code

## Usage

```html
<cv-button kind="secondary" :icon="iconPath" @click="actionClick">
  Hello I am a button
</cv-button>
```

## Attributes

- kind: 'primary' (default), 'secondary', ghost, or 'danger'. Optional.
- small: If true smaller version of button.
- icon: is optional. It takes an Vue Component expected to be an icon or a string path to an SVG icon.
- icon-href: deprecated in favour of icon attribute. Expects tring path to SVG icon..
