# cv-toggle

A Vue implementation of a Carbon Components loading

http://www.carbondesignsystem.com/components/loading/code

## Usage

```html
<cv-loading overlay small></cv-loading>
```

## Attributes

- overlay: Boolean,
- small: Boolean,

## Events

loading-end: Raised after the exit animation has concluded, when toggle or end are used to deactivate the loader. This is to allow parents to discard the component if needed.
