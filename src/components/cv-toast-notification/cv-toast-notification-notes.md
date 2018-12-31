# cv-toggle

A Vue implementation of a Carbon Components toast-notification

http://www.carbondesignsystem.com/components/notification/code

## Usage

```html
<cv-toast-notification
  kind="success"
  title="notification title"
  sub-title="a subtitle"
  caption="Time stamp [00:00:00]"
  @notification-before-delete="actionBeforeDelete"
  @notification-after-delete="actionAfterDelete"
></cv-toast-notification>
```

## Attributes

- kind: 'error', 'info', 'success', 'warning'
- title: 'title'
- subtitle: 'subtitle'
- caption: 'caption'

## Events

As per carbon-components
