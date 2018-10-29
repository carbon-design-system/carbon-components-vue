# cv-slider

A Vue implementation of a Carbon Components slider

http://www.carbondesignsystem.com/components/slider/code

## Usage

```html
<cv-slider
  label="Text input label"
  min="0"
  max="100"
  value="45"></cv-slider>
```

### v-model

```html
<cv-slider
  label="Text input label"
  min="0"
  max="100"
  v-model="modelValue">
</cv-slider>
```

```javascript
...
data() {
  return {
    modelValue: '45', // a string to match underlying slider control
  };
},
```

## Attributes

- invalid: set to true to indicate the current value is invalid
- label: the label text for the input label
- value: value

- label: String slider label
- disabled: standard property
- min: String standard property default 0
- max: String standard property default 100
- value: String standard property default (max + min) / 2
- step: String standard property,
- stepMultiplier: String multiplier > 1,
- minLabel: String label for min side of slider, otehrwise min value used,
- maxLabel: String label for max side of slider, otehrwise max value used,

## events

Change - not cancellable
