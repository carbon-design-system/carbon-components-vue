# cv-structured-list

A Vue implementation of a Carbon Components structured-list

http://www.carbondesignsystem.com/components/structured-list/code

## Usage

### Default

```html
<cv-structured-list>
  <template slot="headings">
    <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
    <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
    <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
  </template>
  <template slot="items">
    <cv-structured-list-item>
      <cv-structured-list-data>Item_1</cv-structured-list-data>
      <cv-structured-list-data>Item_1</cv-structured-list-data>
      <cv-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
    <cv-structured-list-item>
      <cv-structured-list-data>Item_2</cv-structured-list-data>
      <cv-structured-list-data>Item_2</cv-structured-list-data>
      <cv-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
    <cv-structured-list-item>
      <cv-structured-list-data>Item_3</cv-structured-list-data>
      <cv-structured-list-data>Item_3</cv-structured-list-data>
      <cv-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
  </template>
</cv-structured-list>
```

### Selectable with events

```html
<cv-structured-list selectable @change="actionChange">
  <template slot="headings">
    <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
    <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
    <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
  </template>
  <template slot="items">
    <cv-structured-list-item name="group-1" value="value-1" checked>
      <cv-structured-list-data>Item_1</cv-structured-list-data>
      <cv-structured-list-data>Item_1</cv-structured-list-data>
      <cv-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
    <cv-structured-list-item name="group-1" value="value-2">
      <cv-structured-list-data>Item_2</cv-structured-list-data>
      <cv-structured-list-data>Item_2</cv-structured-list-data>
      <cv-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
    <cv-structured-list-item name="group-1" value="value-3">
      <cv-structured-list-data>Item_3</cv-structured-list-data>
      <cv-structured-list-data>Item_3</cv-structured-list-data>
      <cv-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
  </template>
</cv-structured-list>
```

### Selectable with v-model

```html
<cv-structured-list selectable>
  <template slot="headings">
    <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
    <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
    <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
  </template>
  <template slot="items">
    <cv-structured-list-item name="group-1" value="value-1" v-model="listVal">
      <cv-structured-list-data>Item_1</cv-structured-list-data>
      <cv-structured-list-data>Item_1</cv-structured-list-data>
      <cv-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
    <cv-structured-list-item name="group-1" value="value-2" v-model="listVal">
      <cv-structured-list-data>Item_2</cv-structured-list-data>
      <cv-structured-list-data>Item_2</cv-structured-list-data>
      <cv-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
    <cv-structured-list-item name="group-1" value="value-3" v-model="listVal">
      <cv-structured-list-data>Item_3</cv-structured-list-data>
      <cv-structured-list-data>Item_3</cv-structured-list-data>
      <cv-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
  </template>
</cv-structured-list>
```

## Attributes

- selectable - makes cv-structured-list-item selectable
- condensed

## Events

- change - Reports value of child structured list item selection on change.

# cv-structured-list-item

## Attributes

- value - required for selectable
- checked - sets selected

## Events

- change - value of selected item

## v-model

V-model can be attached cv-structured-list-item
