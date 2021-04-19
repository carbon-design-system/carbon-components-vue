# cv-tag

A Vue implementation of a Carbon Components tag

http://www.carbondesignsystem.com/components/tag/code

## Usage

```html
<cv-tag kind="???" label="I am a tag" />
```

## Attributes

- icon: non-filter only add icon before label

- kind
  'filter',
  'red',
  'magenta',
  'purple',
  'blue',
  'cyan',
  'teal',
  'green',
  'gray',
  'cool-gray',
  'warm-gray',

- label (required)
  string content value

- size: 'sm' or default

### kind === 'filter'

A special kind which includes a clickable x which raises a 'remove' event'

- clearAriaLabel: { type: String, default: 'Clear filter' },

## Events

- remove: 'filter' kind only
