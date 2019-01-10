# cv-text-input

A Vue implementation of a Carbon Components file-uploader

http://www.carbondesignsystem.com/components/file-uploader/code

## Usage

```html
<cv-file-uploader
  accept="image/jpg,image/png"
  clear-on-reselect
  initial-state-uploading
  multiple
  removable
  label="Add file"
  @input="onInput"
>
</cv-file-uploader>
```

## Attributes

accept - standard input attribute for file type
clear-on-reselect - selecting files a second time clears the first selection
initial-state-uploading - set the uploading state when a file is selected
multiple - standard input attribute for file type
removable - show remove button
label - text label for the input

## Events

change

## slots

none
