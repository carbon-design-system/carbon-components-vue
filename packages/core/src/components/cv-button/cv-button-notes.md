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
- small: (deprecated prefer size) If true smaller version of button.
- size: optional value 'field' or 'small'
- icon: is optional. It takes an Vue Component expected to be an icon or a string path to an SVG icon.
- icon-href: deprecated in favour of icon attribute. Expects tring path to SVG icon..

# cv-icon-button

Rather than add extra properties that do not work with the standard button, an icon only button has been created. If in future the standard button supports the tooltip then these properties will be merged back into CvButton.

```html
<cv-icon-button
  :kind="kind"
  :size="size"
  :disabled="disabled"
  :icon="icon"
  :tip-text="tipText"
  :tip-position="tipPosition"
  :tip-alignment="tipAlignment"
/>
```

## Attributes

As per CvButton with the addition of

- tip-text: String displayed in tip
- tip-position: top, left, bottom or right
- tip-alignment: start, center or end.
