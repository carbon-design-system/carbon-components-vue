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

- kind: 'primary' (default), 'secondary', 'tertiary', 'ghost', 'danger', 'danger--ghost' or 'danger--tertiary'. Optional.
- small: (deprecated prefer size) If true smaller version of button.
- size: optional value; default, 'field', 'sm' (small), 'lg' (large), 'xl' (extra large). NOTE: At Carbon 10.23.1 icon-button treats 'lg' and 'xl' as default.
- icon: is optional. It takes an Vue Component expected to be a an icon that follows the pattern used for fill/color/stroke in Carbon Icons. It can be in the form of: a component (e.g. @carbon/icons-vue), an SVG symbol path, an SVG path, raw SVG.
- icon-href: deprecated in favour of icon attribute. Expects tring path to SVG icon..

NOTE: Recommend using icons as components or SVG symbols.
NOTE 2: Using an SVG path without an element ID will not style correctly. This is due to SVG1.1 not supporting 'use' tag without ID being specified, as a result an img tag is used.

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

- selected: whether the Button is currently selected
- tip-text: String displayed in tip
- tip-position: top, left, bottom or right
- tip-alignment: start, center or end.

# cv-button-set

A wrapper for a set of cv-button components that formats them as a group

## Attributes

- stacked: Button set is arranged vertically

```html
<cv-button-set>
  <cv-button kind="primary">button 1</cv-button>
  <cv-button kind="secondary">button 2</cv-button>
  <cv-button kind="danger">button 3</cv-button>
</cv-button-set>
```
