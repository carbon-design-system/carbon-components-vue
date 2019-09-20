# cv-tag

A Vue implementation of a Carbon Components tag

http://www.carbondesignsystem.com/components/tag/code

## Usage

```html
<cv-tag kind="???" label="I am a tag" />
```

## Attributes

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

### kind === 'filter'

A special kind which includes a clickable x which raieses a 'remove' event'

- clearAriaLabel: { type: String, default: 'Clear filter' },

## Events

- remove: 'filter' kind only
