# CvIcon

A utility component to facilitate SVG 'use'ing icons from the standard Carbon
Icons set or custom icons.

## Usage

```html
<cv-icon class="my-icon-class" href="cv(icon--add)"></cv-icon>
<cv-icon
  style="fill: #00f"
  href="require('assets/icons/my-icons.svg') + '#my-icon-id'"
></cv-icon>
```

## Attributes

- href:
  - An icon from the standard Carbon Icons set (e.g. href="cv(icon--add)")
  - A custom icon (e.g. href="require('assets/icons/my-icons.svg') + '#my-icon-id'")
