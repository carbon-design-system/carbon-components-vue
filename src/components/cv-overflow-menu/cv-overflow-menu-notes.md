# CvOverflowMenu

A Vue implementation of a Carbon Components overflow menu.

http://www.carbondesignsystem.com/components/overflow-menu/code

## Usage

CvOverflowMenu contains slotted CvOverflowMenuItem's which have slotted contents.

```html
<cv-overflow-menu>
  <cv-overflow-menu-item>list item 1</cv-overflow-menu-item>
  <cv-overflow-menu-item>list item 2</cv-overflow-menu-item>
  <cv-overflow-menu-item>list item 3</cv-overflow-menu-item>
</cv-overflow-menu>
```

## CvOverflowMenu

### Attributes

- flip-menu: Boolean, optionally moves caret from right to left of popup menu
- offset: Object, optional offset setting for left and top position.
  - e.g. { left: 0, top: 200 }

NOTE: Default behaviour (no offset) automatically positions the popup menu.

### Slots

One default content

## CvOverflowMenuItem

### Attributes

danger: Boolean, optionally make use danger colors for item
disabled: Boolean, optionally disable the item
primary: Boolean, optional initially selected item on menu
