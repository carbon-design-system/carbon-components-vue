# cv-toggle

A Vue implementation of a Carbon Components inline-notification

http://www.carbondesignsystem.com/components/notification/code

## Usage

```html
<cv-inline-notification
  kind="error"
  title="notification title"
  sub-title="a subtitle"
  @close="actionClose"
></cv-inline-notification>
```

## Attributes

- kind: 'error', 'info', 'success', 'warning'
- title: 'title'
- sub-title: 'subtitle'
- actionLabel: optional action button label, without it no action button is displayed.
- closeAriaLabel: { type: String, default: 'Clear filter' },
- lowContrast: Boolean to use a lower contrast version of the notification

## Events

As per carbon-components
