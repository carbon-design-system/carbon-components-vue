# cv-time-picker

A Vue implementation of a Carbon Components time-picker

https://www.carbondesignsystem.com/components/date-picker/code

## Usage

### Minimal

````html
<cv-time-picker>
</cv-time-picker>```

### .sync
The following properties support the .sync modifier.
```html
<cv-time-picker
  :time.sync="time"
  :ampm.sync="ampm"
  :timezone.sync="timezone"
  :timezones="timezones">
  </cv-time-picker>

<script>
...
data() {
  return {
    time: '12:00',
    ampm: 'AM',
    timezone: 'timezone2',
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
}
...
<script>
````

### All in

```html
<cv-time-picker
  time="11:11"
  ampm="PM"
  timezone="timezone2"
  :timezones="timezones"
  label="Time select label"
  pattern="[01][0-9]:[0-6][0-9]"
  placeholder="hh:mm"
  light
  timezonesSelectLabel="timezone label"
  ampmSelectLabel="ampm label"
  invalidMessage="invalid time"
  disabled
  @update:time="onUpdateTime"
  @update:ampm="onUpdateAmpm"
  @update:timezone="onUpdateTimezone"`
  >
</cv-time-picker>

<script>
...
data() {
  return {
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
  onUpdateTime(val) {...},
  onUpdateAmpm(val) {...},
  onUpdateTimezone(val) {...},
}
...
<script>
```

## Attributes

```javascript
ampm: { type: String, default: 'AM' }, // AM, PM or 24
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

## Slots

invalid-message: Overrides the invalid message property
