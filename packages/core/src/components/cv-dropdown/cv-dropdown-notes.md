# CV Dropdown

A Vue implementation of a Carbon Components dropdown

https://www.carbondesignsystem.com/components/dropdown/code

## Usage

```html
<cv-dropdown class="cv-dropdown" placeholder="Choose an option">
  <cv-dropdown-item value="10">Option 1</cv-dropdown-item>
  <cv-dropdown-item value="20">Option 2</cv-dropdown-item>
  <cv-dropdown-item value="30">Option 3</cv-dropdown-item>
  <cv-dropdown-item value="40">Option 4</cv-dropdown-item>
  <cv-dropdown-item value="50">Option 5</cv-dropdown-item>
</cv-dropdown>
```

## Attributes

### cv-dropdown

- placeholder - The descriptive text appearing at the top of the dropdown
- up - diretction of dropdown
- value - string matching value of one of the options or ''

## Methods

Focus - sets focus to the text dropdown

### cv-dropdown-item

- value - The value that will be returned upon selection of the dropdown item by users

## Slots

- cv-dropdown - Takes a list of cv-dropdown-item as children
- cv-dropdown-item - Takes the text to display as child

## Events

- @change sends the value as it changes.
