# CvList

A Vue implementation of a Carbon Components list

http://www.carbondesignsystem.com/components/list/code

## Usage

### unordered

```html
<cv-list>
  <cv-list-item>list item 1</cv-list-item>
  <cv-list-item>list item 2</cv-list-item>
  <cv-list-item>list item 3</cv-list-item>
</cv-list>
```

### ordered

```html
<cv-list ordered>
  <cv-list-item>list item 1</cv-list-item>
  <cv-list-item>list item 2</cv-list-item>
  <cv-list-item>list item 3</cv-list-item>
</cv-list>
```

### with nested

Lists can be nested inside of each other.

```html
<cv-list>
  <cv-list-item
    >list item 1
    <cv-list nested>
      <cv-list-item>nested item 1</cv-list-item>
      <cv-list-item>nested item 2</cv-list-item>
      <cv-list-item>nested item 3</cv-list-item>
    </cv-list>
  </cv-list-item>
  <cv-list-item>list item 2</cv-list-item>
  <cv-list-item>list item 3</cv-list-item>
</cv-list>
```

## Attributes

ordered - if set non-nested list is numbered
nested - if set list uses nested form
