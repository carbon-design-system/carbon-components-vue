# cv-content-switcher

A Vue implementation of a Carbon Components content switcher.

http://www.carbondesignsystem.com/components/content-switcher/code

## Usage

```html
<cv-content-switcher>
  <cv-content-switcher-button content-selector=".content-1" selected>Button Name 1</cv-content-switcher-button>
  <cv-content-switcher-button content-selector=".content-2">Button Name 2</cv-content-switcher-button>
  <cv-content-switcher-button content-selector=".content-3">Button Name 3</cv-content-switcher-button>
</cv-content-switcher>

<section>
  <div class="content-1">
    <p>This is the content for option 1</p>
  </div>
  <div class="content-2" hidden>
    <p>This is the content for option 2</p>
  </div>
  <div class="content-2" hidden>
    <p>This is more content for option 2</p>
  </div>
  <div class="content-3" hidden>
    <p>This is the content for option 3</p>
  </div>
</section>
```

## Attributes

N/A

### Additional

N/A
