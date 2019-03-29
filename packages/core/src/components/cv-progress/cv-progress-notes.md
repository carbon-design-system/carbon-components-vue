# cv-progress

A Vue implementation of a Carbon Components Progress Indicator

http://www.carbondesignsystem.com/components/progress-indicator/code

## Carbon 10

Includes carbon 9 functionality and adds new features using slotted cv-progress-step.

### Usage

```html
<cv-progress>
  <cv-progress-step label="Step 1" complete additional-info="Optional info" />
  <cv-progress-step label="Step 2" complete />
  <cv-progress-step label="Step 3" />
  <cv-progress-step label="Step 4" invalid />
  <cv-progress-step label="Step 4" disabled />
</cv-progress>
```

NOTE: The current step is deemed to be the first incomplete step.

### Attributes - cv-progress

Ignored if slotted content is provided.

### Attributes - cv-progress-step

- complete: Boolean
- invalid: Boolean
- disabled: Boolean
- additional-info: optional additional info for step.

## Carbon 9

### Usage

```html
<cv-progress :steps="steps" :initial-step="1"></cv-progress>
```

NOTE: steps is an array of strings declared elsewhere.

### Attributes

- steps : An array of steaps e.g. ['Step 1', 'Step 2', 'Step 3', 'Step 4']
- initial-step : index of initial step
