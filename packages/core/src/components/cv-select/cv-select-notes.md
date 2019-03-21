# cv-select

A Vue implementation of a Carbon Components select

http://www.carbondesignsystem.com/components/select/code

## Usage

### Default

```html
<cv-select label="test-label" @change="actionChange">
  <cv-select-option disabled selected hidden>Choose an option</cv-select-option>
  <cv-select-option value="solong"
    >A much longer cv-select-option that is worth having around to check how text flows</cv-select-option
  >
  <cv-select-optgroup label="Category 1">
    <cv-select-option value="cv-select-option1">cv-select-option 1</cv-select-option>
    <cv-select-option value="cv-select-option2">cv-select-option 2</cv-select-option>
  </cv-select-optgroup>
  <cv-select-optgroup label="Category 2">
    <cv-select-option value="cv-select-option3">cv-select-option 3</cv-select-option>
    <cv-select-option value="cv-select-option4">cv-select-option 4</cv-select-option>
  </cv-select-optgroup>
</cv-select>
```

### With v-model

```html
<cv-select label="test-label" @change="actionChange" v-model="selectValue">
  <cv-select-option disabled hidden>Choose an option</cv-select-option>
  <cv-select-option value="solong"
    >A much longer cv-select-option that is worth having around to check how text flows</cv-select-option
  >
  <cv-select-optgroup label="Category 1">
    <cv-select-option value="cv-select-option1">cv-select-option 1</cv-select-option>
    <cv-select-option value="cv-select-option2">cv-select-option 2</cv-select-option>
  </cv-select-optgroup>
  <cv-select-optgroup label="Category 2">
    <cv-select-option value="cv-select-option3">cv-select-option 3</cv-select-option>
    <cv-select-option value="cv-select-option4">cv-select-option 4</cv-select-option>
  </cv-select-optgroup>
</cv-select>
```

NOTE: Any use of v-model causes selected to be ignored

```javascript
  data() {
    return {
      selectValue: 'Choose an option',
    },
  }
  //...
```

## Slots

### cv-select

- default contains cv-select-options and cv-select-optgroups

### cv-select-option

- default contents to label option

### cv-select-optgroup

- default: contains cv-select options

## Attributes

### cv-select

- label

### cv-select-optgroup

- label
