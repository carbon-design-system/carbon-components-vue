# CvCode-snippet

A Vue implementation of a Carbon Components code-snippet

http://www.carbondesignsystem.com/components/code-snippet/code

## Usage

```html
<cv-code-snippet
  @code-snippet-beingshown="actionBeforeShown"
  @code-snippet-shown="actionShown"
  @code-snippet-beinghidden="actionBeforeHidden"
  @code-snippet-hidden="actionHidden"
>
  <template slot="label"
    >label</template
  >
  <template slot="title"
    >A Title</template
  >
  <template slot="content"
    ><p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p></template
  >
  <template slot="secondary-button"
    >Help</template
  >
  <template slot="primary-button"
    >OK</template
  >
</cv-code-snippet>
```

## Attributes

## slots

- label: optional
- title:
- content:
- kind: 'danger' other wise default code-snippet.
- primary-button: optional, no primary button if not specified
- secondary-button: optional, no secondary button if not specified

### NOTE: primary and secondary buttons

1. If no primary or secondary button is specified then no footer is shown.
2. If no listener is created for 'primary-click' or 'secondary-click' the associated event will cause the code-snippet to close

## events

- code-snippet-beingshown
- code-snippet-shown
- code-snippet-beinghidden
- code-snippet-hidden
- primary-click
- secondary-click
