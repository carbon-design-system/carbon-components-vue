# cv-loading

A Vue implementation of a Carbon Components loading

http://www.carbondesignsystem.com/components/loading/code

## Usage

```html
<cv-loading active overlay small></cv-loading>
```

## Attributes

- active: Boolean,
- description: Optional description used as a title text default 'Loading'
- overlay: Boolean,
- small: Boolean,

## Events

loading-end: Raised after the exit animation has concluded, when loading or end are used to deactivate the loader. This is to allow parents to discard the component if needed.
