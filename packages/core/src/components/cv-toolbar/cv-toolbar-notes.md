# CvToolbar

A Vue implementation of a Carbon Components Toolbar (Deprecated).

## Usage

```html
<cv-toolbar>
  <cv-toolbar-search v-model="searchInput" />

  <cv-overflow-menu>
    <template slot="trigger">
      <svg :class="`bx--overflow-menu__icon bx--toolbar-filter-icon`" width="16" height="12" viewBox="0 0 16 12">
        <g fill-rule="nonzero">
          <path
            d="M8.05 2a2.5 2.5 0 0 1 4.9 0H16v1h-3.05a2.5 2.5 0 0 1-4.9 0H0V2h8.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.05 9a2.5 2.5 0 0 1 4.9 0H16v1H7.95a2.5 2.5 0 0 1-4.9 0H0V9h3.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
          ></path>
        </g>
      </svg>
    </template>
    <cv-toolbar-title title="Filter by" />
    <cv-toolbar-option>
      <cv-checkbox value="filter-1" label="Filter option 1" />
    </cv-toolbar-option>
    <cv-toolbar-option>
      <cv-checkbox value="filter-2" label="Filter option 2" />
    </cv-toolbar-option>
    <cv-toolbar-option>
      <cv-checkbox value="filter-3" label="Filter option 3" />
    </cv-toolbar-option>
  </cv-overflow-menu>

  <cv-overflow-menu>
    <cv-overflow-menu-item primary-focus>Refresh table</cv-overflow-menu-item>
    <cv-toolbar-divider></cv-toolbar-divider>
    <cv-toolbar-title title="ROW HEIGHT" />
    <cv-toolbar-option>
      <cv-radio-button name="row-height" label="Short" value="short" />
    </cv-toolbar-option>
    <cv-toolbar-option>
      <cv-radio-button name="row-height" label="Tall" value="tall" />
    </cv-toolbar-option>
  </cv-overflow-menu>
</cv-toolbar>
```

## Slots

- default - Add cv-toolbar-search or cv-overflow-menus here.

NOTE: cv-overflow-menus children should consist of cv-overflow-menu-items (buttons), cv-toolbar-options, cv-toolbar-titles and cv-toolbar-dividers

### Additional

N/A
