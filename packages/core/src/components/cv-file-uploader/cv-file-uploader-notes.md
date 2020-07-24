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
dropTargetLabel: { type: String, default: 'Drag and drop files here or upload' },
initial-state-uploading - set the uploading state when a file is selected
kind - Defaults to 'drag-target' other options 'button'.
label - text label for the input
multiple - standard input attribute for file type
removable - show remove button
removeAriaLabel: { type: String, default: 'Remove file' },

## Events

- change(files)

The files object returned can be stored and manipulated to set clear the file uploader or for individual files: set state, remove or set an invalid message.

## Methods

- setState(index, state)
  state can be an empty string, 'complete' or 'uploading'

- remove(index)
  Removes an individual file

- clear()
  Clears all files

- setInvalidMessage(index, message);

Sets the invalid state and message.
Setting to empty string clears the invalid state and message.

## slots

- drop-target: Overrides the drop-target-label with slotted content.

## Usage

Uploading files can be interacted with via the methods, alternatively you can manipulate the file list provided by the change event.
