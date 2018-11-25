# cv-toggle

A Vue implementation of a Carbon Components inline-notification

http://www.carbondesignsystem.com/components/notification/code

## Usage

```html
<cv-inline-notification
  kind="error"
  title="notification title"
  sub-title="a subtitle"
  @notification-before-delete="actionBeforeDelete"
  @notification-after-delete="actionAfterDelete"
  ></cv-inline-notification>
```

## Attributes

- kind: 'error', 'info', 'success', 'warning'
- title: 'title'
- sub-title: 'subtitle'

## Events

As per carbon-components
