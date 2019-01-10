# cv-button

A Vue implementation of a Carbon Components button.

http://www.carbondesignsystem.com/components/button/code

## Usage

```html
<cv-button kind="secondary" icon-href="cv(icon--add)" @click="actionClick">
  Hello I am a button
</cv-button>
```

## Attributes

- kind: 'primary' (default), 'secondary', ghost, or 'danger'. Optional.
- small: If true smaller version of button.
- icon-href: the href for the SVG to use as the right icon, if any. Optional.

### Additional

icon-href attribute is optional. It is used to insert an svg and use elements for a bx--btn\_\_icon.

- cv(icon--add)
- "require('carbon-icons/dist/carbon-icons.svg') + '#icon--add'"

The above both add icons from the carbon-icons.svg symbol file. 'cv(xxx)' is provided for convenience. Any require could be used.
