# Accessibility testing

Jest has been enabled for accessibility testing with the IBM accessibility tester. See
[toBeAccessible.js](./jest/toBeAccessible.js) and
[equal-access on GitHub](https://github.com/IBMa/equal-access/tree/master/accessibility-checker/boilerplates/jest)

## Naming

Accessibility test should be in a separate spec file in a `__tests__` directory with other tests. The file should have
"accessibility" in the name. For example `src/components/CvButton/__tests__/CvButton.accessibility.spec.js`

## Basic test

At least one test should mount the component with the fewest props, slot values, and attributes as possible so that the
test is focused on accessibility and not other aspects of the component.

## Sample

See [CvIconButton.accessibility.spec.js](.src/components/CvButton/__tests__/CvIconButton.accessibility.spec.js)

```js
it('CvIconButton - basic', async () => {
  const main = document.createElement('main');
  const result = render(CvIconButton, {
    container: document.body.appendChild(main),
    props: {
      label: 'label content',
    },
  });
  await expect(result.container).toBeAccessible('cv-icon-button');
}, 10000);
```

- The document needs a "main" element to avoid a false-positive violation message.
- This particular component requires an `label` to be compliant. The end user of the component would be expected to
  provide this. Do not include `label` or any other attribute unless its required.
- The accessibility test can take longer than 5 seconds. The third parameter to the Jest.It is the timeout. Please use
  10 seconds as the timeout as shown here.

## Resolving violations

The original CvIconButton code did not have alt tag for the icon and so the test above initially failed with a message
like this:

```
Error: Scan: cv-icon-button
- Message: The image has neither an alt atttribute nor an ARIA label or title
  Level: violation
  XPath: /html[2]/body[1]/main[1]/button[1]/img[1]
  Snippet: <img class="bx--btn__icon" attrs="[object Object]">
  Help: https://able.ibm.com/rules/archives/2023.09.19/doc/en-US/img_alt_valid.html#%7B%22message%22%3A%22The%20image%20has%20neither%20an%20alt%20atttribute%20nor%20an%20ARIA%20label%20or%20title%22%2C%22snippet%22%3A%22%3Cimg%20class%3D%5C%22bx--btn__icon%5C%22%20attrs%3D%5C%22%5Bobject%20Object%5D%5C%22%3E%22%2C%22value%22%3A%5B%22VIOLATION%22%2C%22FAIL%22%5D%2C%22reasonId%22%3A%22fail_no_alt%22%2C%22ruleId%22%3A%22img_alt_valid%22%2C%22msgArgs%22%3A%5B%5D%7D
```

Following the help link provided guidance on the fix. A `alt=""` was added to the icon to resolve the error. Also, the
`label` property was not marked as required in the component but when it is not provided a different accessibility error
is found. To resolve this the label is now marked as required.

```js
label: { type: String, default: undefined, required: true },
```
