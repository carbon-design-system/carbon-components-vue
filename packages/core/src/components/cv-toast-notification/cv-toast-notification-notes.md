# cv-toast-notification

A Vue implementation of a Carbon Components toast-notification

http://www.carbondesignsystem.com/components/notification/code

## Usage

```html
<cv-toast-notification
  kind="success"
  title="notification title"
  sub-title="a <a href="#">subtitle</a>"
  caption="Time stamp [00:00:00]"
  @close="actionClose"
></cv-toast-notification>
```

## Attributes

- kind: 'error', 'info', 'success', 'warning'
- title: 'title'
- subtitle: 'subtitle' inputs as an `v-html` so any markup is rendered.
- caption: 'caption' inputs as an `v-html` so any markup is rendered.
- closeAriaLabel: { type: String, default: 'Clear filter' },
- lowContrast: Boolean to use a lower contrast version of the notification
- hideCloseButton: Boolean removes close button

## Events

As per carbon-components
