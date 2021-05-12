# cv-interactive-tooltip

A Vue implementation of a Carbon Components tooltip

http://www.carbondesignsystem.com/components/tooltip/code

## Usage

```html
<cv-interactive-tooltip alignment="center" direction="bottom">
  <template slot="label">Tooltip label</template>
  <template slot="trigger">
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6" />
    </svg>
  </template>
  <template slot="content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
    </p>
  </template>
</cv-interactive-tooltip>
```

## Attributes

- alignment: start, center or end.
- direction: 'top', 'left', 'right', 'bottom'

### Events

- tooltip-shown
- tooltip-hidden

## slots

- label - hover does not display tooltip.
  - Optional
  - default: ''
- trigger
  - Optional
  - default: SVG i in a circle
- content
  - Content of the tooltip can be interactive content.

# cv-definition-tooltip

A Vue implementation of a Carbon Components tooltip

http://www.carbondesignsystem.com/components/tooltip/code

## Usage

```html
<cv-definition-tooltip
  alignment="center"
  direction="bottom"
  term="thing to be defined"
  definition="definition of term"
/>
```

## Attributes

- alignment: start, center or end.
- direction: 'top', 'left', 'right', 'bottom'
- term: to be defined
- definition: of the term

# cv-tooltip

A Vue implementation of a Carbon Components tooltip

http://www.carbondesignsystem.com/components/tooltip/code

## Usage

```html
<cv-definition-tooltip alignment="center" direction="bottom" tip="tip text" />
```

## Attributes

- alignment: start, center or end.
- direction: 'top', 'left', 'right', 'bottom'
- tip: text displayed on tip
