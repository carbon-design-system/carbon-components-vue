# cv-tile

A Vue implementation of a Carbon Components tile

http://www.carbondesignsystem.com/components/tile/code

## Usage

The tile comes in four types selected by the kind attribute.

### standard

```html
<<cv-tile kind="standard"> Tile content </cv-tile>
```

### selectable

```html
<cv-tile cv-type="selectable" cv-selected> Tile content </cv-tile>
```

### Clickable

```html
<cv-tile cv-type="clickable"> Tile content </cv-tile>
```

### Expandable

```HTML
<cv-tile
  cv-type="expandable"
  expanded
  tileCollapsedLabel,
  tileExpandedLabel,
  >
  Tile content
  <template slot="below">Below the fold content</template>
</cv-tile>
```

## Attributes

- kind: 'standard', 'clickable', 'expandable' or 'selectable'
- selected: Selectable kind only sets initial state to selected
- expanded: Expandable kind only sets initial state to expanded
- tileCollapsedLabel: String expandable kind only default: 'Tile collapsed'
- tileExpandedLabel: String expandable kind only default: 'Tile expanded'

### Clickable kind

The clickable kind is intended as a navigation link. Users should supply href or click handling.

### Selectable kind is based on an input. Users should supply name and value if needed.

Has the following unique attribute

- ariaLabel: { type: String, default: 'tile' },

## slots

- default: Content of tile (above fold in expandable)
- below: Content placed below the fold in the expandable version.
