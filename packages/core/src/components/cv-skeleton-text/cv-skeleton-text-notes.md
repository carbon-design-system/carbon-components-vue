# CvSkeletonText

A utility component that used as a progressive loading state while the user waits for content to load.

## Usage

```html
<cv-skeleton-text :heading="true" :width="90%" :paragraph="true" :lineCount="3"></cv-skeleton-text>
```

## Attributes

- heading: generates skeleton text at a larger size. Optional. Default - false.
- width: width (in px or %) of single line of text or max-width of paragraph lines. Optional. Default - 100%.
- paragraph: will generate multiple lines of text. Optional. Default - false.
- lineCount: the number of lines in a paragraph. Optional. Default - 3.
