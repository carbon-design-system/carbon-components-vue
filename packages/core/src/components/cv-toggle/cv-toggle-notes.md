# cv-toggle

A Vue implementation of a Carbon Components toggle

http://www.carbondesignsystem.com/components/toggle/code

## Usage

### Default

```html
<cv-toggle checked disabled small @change="actionChanged">
  <template slot="text-left">Off</template>
  <template slot="text-right">On</template>
</cv-toggle>
```

### With v-model

```
html
<cv-toggle
  v-model="checked"
  >
</cv-toggle>
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
<cv-toggle value="check-1" v-model="checks"></cv-toggle>
<cv-toggle value="check-2" v-model="checks"></cv-toggle>
<cv-toggle value="check-3" v-model="checks"></cv-toggle>
```

```javascript
  data() {
    return {
      checks: ['check-3'], // check-3 initially checked
    },
  }
  //...
```

## Attributes

- checked: true | false
- disabled: standard HTML toggle property
- small: if true small version of toggle with no labels
- formItem: { type: Boolean, default: true }
- hideLabel: Boolean - label becomes an aria-label
