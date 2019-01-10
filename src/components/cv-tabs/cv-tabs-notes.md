# cv-tabs

A Vue implementation of a Carbon Components content switcher.

http://www.carbondesignsystem.com/components/tabs/code

## Usage

```html
<cv-tabs
  @tab-selected="actionSelected"
  @tab-beingselected="actionBeingSelected"
>
  <cv-tabs-button
    id="tabs-button-1"
    content-selector="#tabs-panel-1"
    tabs-panel-id="tabs-panel-5"
    selected
  >
    Tab label 1
  </cv-tabs-button>
  <cv-tabs-button
    id="tabs-button-2"
    content-selector="#tabs-panel-2"
    tabs-panel-id="tabs-panel-2"
  >
    Tab label 2
  </cv-tabs-button>
  <cv-tabs-button
    id="tabs-button-3"
    content-selector="#tabs-panel-3"
    tabs-panel-id="tabs-panel-3"
  >
    Tab label 3
  </cv-tabs-button>
  <cv-tabs-button
    id="tabs-button-4"
    content-selector="#tabs-panel-4"
    tabs-panel-id="tabs-panel-4"
  >
    Tab label 4
  </cv-tabs-button>
  <cv-tabs-button
    id="tabs-button-5"
    content-selector="#tabs-panel-5"
    tabs-panel-id="tabs-panel-5"
  >
    Tab label 5
  </cv-tabs-button>
</cv-tabs>

<section>
  <cv-tabs-panel id="tabs-panel-1" tabs-button-id="tabs-button-1" selected>
    Sample tab panel content 1
  </cv-tabs-panel>
  <cv-tabs-panel id="tabs-panel-2" tabs-button-id="tabs-button-2">
    Sample tab panel content 2
  </cv-tabs-panel>
  <cv-tabs-panel id="tabs-panel-3" tabs-button-id="tabs-button-3">
    Sample tab panel content 3
  </cv-tabs-panel>
  <cv-tabs-panel id="tabs-panel-4" tabs-button-id="tabs-button-4">
    Sample tab panel content 4
  </cv-tabs-panel>
  <cv-tabs-panel id="tabs-panel-5" tabs-button-id="tabs-button-5">
    Sample tab panel content 5
  </cv-tabs-panel>
</section>
```

## CvTab

### Slots

- default: Location for CvTabButtons

### Events

- tab-selected
- tab-beingselected : cancellable

## CvTabButton

### Attributes

- id: used for aria controlled by
- content-selector: tab panel associated with CvTabButton
- selected: tab button initially selected.
- tabs-panel-id: Used for aria controls

### Slots

- default: content of button

## CvTabPanel

### Attributes

- id: used for aria controls
- selected: visible when first displayed
- tabs-panel-id: used for aria controlled by
