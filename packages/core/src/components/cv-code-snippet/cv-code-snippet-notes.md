# CvCode-snippet

A Vue implementation of a Carbon Components code-snippet

http://www.carbondesignsystem.com/components/code-snippet/code

NOTE: Clicking the copy button places the code in the clipboard.

## Usage

```scss
<cv-code-snippet>
  @mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);


  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
    padding-left: padding(xs);
  }
}

$z-indexes: (
  modal : 9000,
  overlay : 8000,
  dropdown : 7000,
  header : 6000,
  footer : 5000,
  hidden : - 1,
  overflowHidden: - 1,
  floating: 10000
);
</cv-code-snippet>
```

## slots

- default: slotted code content
