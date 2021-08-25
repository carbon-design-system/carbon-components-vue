# cv-toggle

A Vue implementation of a Carbon Components inline-notification

http://www.carbondesignsystem.com/components/notification/code

## Usage

```html
<cv-inline-notification
  kind="error"
  title="notification title"
  sub-title="a <a href="#">subtitle</a>"
  @close="actionClose"
></cv-inline-notification>
```

## Attributes

- kind: 'error', 'info', 'success', 'warning'
- title: 'title'
- sub-title: 'subtitle' inputs as an `v-html` so any markup is rendered.
- actionLabel: optional action button label, without it no action button is displayed.
- closeAriaLabel: { type: String, default: 'Clear filter' },
- lowContrast: Boolean to use a lower contrast version of the notification
- hideCloseButton: Boolean removes close button

## Events

As per carbon-components
