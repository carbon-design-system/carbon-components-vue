# cv-date-picker

A Vue implementation of a Carbon Components date-picker.

http://www.carbondesignsystem.com/components/date-picker/code

## Usage

### Short

```html
<cv-date-picker
  kind="short"
  pattern="\d{1,2}/\d{2}"
  placeholder="mm/yy"
  :flatpickr-options="flatpickrOptions"
  @onChange="actionChange"
>
</cv-date-picker>
```

### Simple

```html
<cv-date-picker
  kind="simple"
  pattern="\d{1,2}/\d{1,2}/\d{4}"
  placeholder="mm/dd/yyyy"
  :flatpickr-options="flatpickrOptions"
  @onChange="actionChange"
>
</cv-date-picker>
```

### Single

```html
<cv-date-picker
  kind="single"
  pattern="\d{1,2}/\d{1,2}/\d{4}"
  placeholder="mm/dd/yyyy"
  :flatpickr-options="flatpickrOptions"
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
  :flatpickr-options="flatpickrOptions"
  @onChange="actionChange"
>
</cv-date-picker>
```

## Attributes

- dateLabel: optional label for the date input (first in range)
- dateEndLabel: optional for the end range date input (first in range)
- kind: 'short', 'simple', 'single', 'range' as per carbon components core only single and range have a date picker
- flatpickrOptions: Options to confiure flatpickr, see flatpickr for full details.

  - e.g. { dateFormat: 'd/m/Y', defaultDate: '01/01/2019' }
  - NOTE: passing event handlers onChange and onValueUpdate are swallowed internally. Both produce an onChange.

- pattern: Regex pattern used for form validation '\\d{1,2}/\\d{1,2}/\\d{4}',
- placeholder: Shown when date picker is empty,
- invalid: Used to indicate the date selected is invalid,
- invalidDateMessage: Message displayed if invalid is true

###

## Events

- change raised when single or ranged date picker value changes.
- simpleChange raised when the simple or short text input fields are changed.
