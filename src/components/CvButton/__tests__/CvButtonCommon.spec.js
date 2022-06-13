/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { carbonPrefix } from '../../../global/settings';
import { props, useCvButtonCommon } from '../CvButtonCommon';
import { CvButtonConsts } from '..';

describe('CvButtonCommon.props', () => {
  it('has no default icon', () => {
    expect(props.icon.default).not.toBeDefined();
  });

  it('has a default kind of primary', () => {
    expect(props.kind.default === 'primary').toBe(true);
  });

  it('validates kind', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const validator = props.kind.validator;
    CvButtonConsts.buttonKinds.forEach(kind => {
      expect(validator(kind)).toBe(true);
    });
    expect(spy).not.toBeCalled();

    expect(validator('banana is not a valid kind')).toBe(false);
    expect(spy).toBeCalled();

    spy.mockRestore(); // Remove mock
  });

  it('validates size', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const validator = props.size.validator;
    CvButtonConsts.buttonSizes.forEach(size => {
      expect(validator(size)).toBe(true);
    });
    expect(spy).not.toBeCalled();

    expect(validator('banana is not a valid size')).toBe(false);
    expect(spy).toBeCalled();

    spy.mockRestore(); // Remove mock
  });
});

describe('CvButtonCommon.useCvButtonCommon', () => {
  let { buttonClasses } = useCvButtonCommon('primary', 'sm', false, true);
  expect(buttonClasses.value).toEqual([
    `${carbonPrefix}--btn`,
    `${carbonPrefix}--btn--icon-only`,
    `${carbonPrefix}--btn--primary`,
    `${carbonPrefix}--btn--sm`,
  ]);

  buttonClasses = useCvButtonCommon('wibble', 'sm', true, true).buttonClasses;
  expect(buttonClasses.value).toEqual([
    `${carbonPrefix}--btn`,
    `${carbonPrefix}--skeleton`,
    `${carbonPrefix}--btn--icon-only`,
    `${carbonPrefix}--btn--sm`,
  ]);

  buttonClasses = useCvButtonCommon('secondary', 'small').buttonClasses;
  expect(buttonClasses.value).toEqual([
    `${carbonPrefix}--btn`,
    `${carbonPrefix}--btn--secondary`,
    `${carbonPrefix}--btn--sm`,
  ]);
});
