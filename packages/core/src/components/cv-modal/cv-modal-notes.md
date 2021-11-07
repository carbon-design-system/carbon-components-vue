# cv-modal

A Vue implementation of a Carbon Components modal

http://www.carbondesignsystem.com/components/modal/code

## Usage

```html
<cv-modal @modal-shown="actionShown" @modal-hidden="actionHidden">
  <template slot="label">label</template>
  <template slot="title">A Title</template>
  <template slot="content"
    ><p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
    </p></template
  >
  <template slot="secondary-button">Help</template>
  <template slot="primary-button">OK</template>
</cv-modal>
```

### Initial focus

When the modal dialog is shown focus is set to the first interactive element found in the following list:

1. To the first element with a 'data-modal-primary-focus' attribute.
2. To the primary button if shown
3. To the secondary button if shown
4. To the other button if shown
5. To the close button

This is done after the modal transitions into its visible state, which is triggered by either changing the visible property to true or mounting with the visible property set to true.

## Attributes

- closeAriaLabel: optional label for close button, default 'Close modal'
- auto-hide-off: boolean value if true the component user is expected to close the modal via visible property or hide method.
- kind: 'danger' other wise default modal.
- visible: visibility of modal dialog
- primaryButtonDisabled: boolean value used to enable/disable the primary button
- size: xs (extra small), small, default and large
- hasFormContent: Adds styling specific to modals with form content

## slots

- alert: used with kind danger sets the dialog role to 'alert' or 'alertdialog'
- aria-label
- label: optional
- title:
- content: optional
- primary-button: optional, no primary button if not specified
- secondary-button: optional, no secondary button if not specified
- other-button: optional, not shown if not specified

### NOTE: primary and secondary buttons

1. If no primary, secondary or other button is specified then no footer is shown.
2. If no listener is created for 'primary-click', 'secondary-click' or 'other-btn-click' the associated event will cause the modal to close

## Methods

- show
- hide

## events

- modal-shown
- modal-hidden
- modal-hide-request - emitted when 'auto-hide-off' is set to true. Raw event with the additional attribute 'cv:reason' set to 'primary-click', 'secondary-click', 'other-btn-click', 'escape-press', 'external-click' or 'close-click'
- after-modal-hidden - emitted only after the modal hide transition is finished. It will NOT fire if the modal is hidden when it's not visible
- primary-click
- secondary-click
- other-btn-click
