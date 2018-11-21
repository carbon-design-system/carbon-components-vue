# cv-time-picker

A Vue implementation of a Carbon Components time-picker

http://www.carbondesignsystem.com/components/time-picker/code

## Usage

### Minimal

````html
<cv-time-picker>
</cv-time-picker>```

### v-model
```html
<cv-time-picker v-model="modelValue">
</cv-time-picker>

<script>
...
data() {
  return {
    modelValue: { time: '12:00', ampm: 'AM', timezone: '' }
  }
}
...
<script>
````

### All in

```html
<cv-time-picker :initial-value="initialValue" :timezones="timezones"
  label="Time select label"
  pattern="[01][0-9]:[0-6][0-9]"
  placeholder="hh:mm"
  theme="light"
  timezonesSelectLabel="timezone label"
  ampmSelectLabel="ampm label"
  invalidMessage="invalid time"
  disabled
  @change="onChange">
</cv-time-picker>

<script>
...
data() {
  return {
    initialValue: { time: '12:00', ampm: 'AM', timezone: '' },
    timezons: {
      "list": [
        {
          "label": "Timezone-1",
          "value": "timezone1"
        },
        {
          "label": "Timezone-2",
          "value": "timezone2"
        }
      ]
    },
  }
},
methods: {
  onChange() {
    ...
  }
}
...
<script>
```

## Attributes

```javascript
ampmSelectLabel: { type: String, default: 'Select AM/PM' },
disabled: Boolean,
initialValue: {
  type: Object,
  default: () => ({ time: '', ampm: 'AM', timezone: '' }),
},
invalidMessage: { type: String, default: '' },
label: { type: String, default: 'Select a time' },
pattern: { type: String, default: '([01][0-9]:[0-6][0-9])' },
placeholder: { type: String, default: 'hh:mm' },
timezones: { type: Array, default: () => [] },
timezonesSelectLabel: { type: String, default: 'Select time zone' },
```

## Computed

- value in object form { time: '', ampm: 'AM', timezone: '' }
