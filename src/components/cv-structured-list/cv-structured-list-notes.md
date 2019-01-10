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
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
        magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem
        vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate
        nisl a porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
    <cv-structured-list-item>
      <cv-structured-list-data>Item_2</cv-structured-list-data>
      <cv-structured-list-data>Item_2</cv-structured-list-data>
      <cv-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
        magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem
        vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate
        nisl a porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
    <cv-structured-list-item>
      <cv-structured-list-data>Item_3</cv-structured-list-data>
      <cv-structured-list-data>Item_3</cv-structured-list-data>
      <cv-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
        magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem
        vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate
        nisl a porttitor interdum.</cv-structured-list-data
      >
    </cv-structured-list-item>
  </template>
</cv-structured-list>
```

## Attributes

- checked: true | false
- disabled: standard HTML structured-list property
- small: if true small version of structured-list with no labels
