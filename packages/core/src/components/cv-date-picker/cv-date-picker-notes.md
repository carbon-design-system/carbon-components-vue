# cv-date-picker

A Vue implementation of a Carbon Components date-picker.

http://www.carbondesignsystem.com/components/date-picker/code

## Usage

### Short

```html
<cv-date-picker kind="short" pattern="\d{1,2}/\d{2}" placeholder="mm/yy" @onChange="actionChange"> </cv-date-picker>
```

### Simple

```html
<cv-date-picker kind="simple" pattern="\d{1,2}/\d{1,2}/\d{4}" placeholder="mm/dd/yyyy" @onChange="actionChange">
</cv-date-picker>
```

### Single

```html
<cv-date-picker
  kind="single"
  pattern="\d{1,2}/\d{1,2}/\d{4}"
  placeholder="mm/dd/yyyy"
  :cal-options="calOptions"
  @onChange="actionChange"
>
</cv-date-picker>
```

### Range

```html
<cv-date-picker
  kind="range"
  pattern="\d{1,2}/\d{1,2}/\d{4}"
  placeholder="mm/dd/yyyy"
  :cal-options="calOptions"
  @onChange="actionChange"
>
</cv-date-picker>
```

## Attributes

- dateLabel: optional label for the date input (first in range)
- dateEndLabel: optional for the end range date input (first in range)
- kind: 'short', 'simple', 'single', 'range' as per carbon components core only single and range have a date picker
- calOptions: Options to confiure flatpickr, see flatpickr for full details.

  - e.g. { dateFormat: 'd/m/Y', defaultDate: '01/01/2019' }
  - NOTE: passing event handlers onChange and onValueUpdate are swallowed internally. Both produce an onChange.

- pattern: Regex pattern used for form validation '\\d{1,2}/\\d{1,2}/\\d{4}',
- placeholder: Shown when date picker is empty,
- invalidMessage: Message displayed if invalid is true

- value: can be
  - Javascript Date
  - String with a date matching the format based on the calendar options
  - Object (kind === 'range' only): { startDate: val, endDate: val2 } where val and val2 are a javascript date or date string as per format option

## Slots

invalid-message: Overrides the invalid message property

###

## Events

- change raised when single or ranged date picker value changes.
- simpleChange[DEPRECATED] use change event instead
