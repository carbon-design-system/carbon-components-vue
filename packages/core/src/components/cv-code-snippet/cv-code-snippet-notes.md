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

## attributes

- copyFeedback: string of tip shown after copy performed. Default: 'Copied!'
- feedback-aria-label: aria label for the feedback button. Default: 'Copy code'
- hideCopyButton: disable/hide the copy button
- light: Lighter variant, typically alternate background
- theme: (deprecated use light) '' or 'light'

Oneline and Multiline

- diabled: standard disable behaviour

Multiline code snippet where expand is possible

- lessText: label for show more button
- moreText: label for show more button
- wrapText: Wrap text/code or not

## slots

- default: slotted code content
