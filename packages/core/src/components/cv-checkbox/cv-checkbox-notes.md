# cv-checkbox

A Vue implementation of a Carbon Components checkbox

http://www.carbondesignsystem.com/components/checkbox/code

## Usage

### Default

```html
<cv-checkbox label="checkbox" @change="actionChange"> </cv-checkbox>
```

### mixed

```html
<cv-checkbox label="checkbox" mixed @change="actionChange"> </cv-checkbox>
```

### With v-model

```html
<cv-checkbox label="checkbox" v-model="checked" @change="actionChange"> </cv-checkbox>
```

```javascript
  data() {
    return {
      checked: Boolean,
    },
  }
  //...
```

### With v-model Array

```
html
<cv-checkbox v-model="checks" name="check-1" value="check-1" @change="actionChange" label="check-1"></cv-checkbox>
<cv-checkbox v-model="checks" name="check-2" value="check-2" @change="actionChange" label="check-2" mixed></cv-checkbox>
<cv-checkbox v-model="checks" name="check-3" value="check-3" @change="actionChange" label="check-3"></cv-checkbox>
<cv-checkbox v-model="checks" name="check-4" value="check-4" @change="actionChange" label="check-4" mixed></cv-checkbox>
```

```javascript
  data() {
    return {
      checks: ['check-3', 'check-4'], // check-3 and check-4 initially checked
    },
  }
  //...
```

## Attributes

- checked: true | false
- disabled: standard HTML checkbox property
- hideLabel: makes the label visually hidden but still labels the checkbox
- label: checkbox label
- mixed: if true aria-checkbox set to mixed if checked is false
