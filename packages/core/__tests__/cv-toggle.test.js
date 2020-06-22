// import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, trigger, setProps } = awaitNextTick;
import { CvToggle } from '@/components/cv-toggle';
// import { settings as carbonSettings } from 'carbon-components';

// const carbonPrefix = carbonSettings.prefix;

describe('CvToggle', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvToggle, ['label', 'name', 'value'], String);
  testComponent.propsAreType(CvToggle, ['formItem', 'checked', 'small', 'hideLabel'], Boolean);
  testComponent.propsAreType(CvToggle, ['modelValue'], [Array, Boolean]);

  testComponent.propsHaveDefault(CvToggle, ['formItem']);
  testComponent.propsHaveDefaultOfUndefined(CvToggle, ['modelValue', 'checked']);

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render formItem: default', async () => {
    const propsData = { id: 'test-1', value: 'check-1' };
    const wrapper = await shallow(CvToggle, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render when formItem: true && disabled', async () => {
    const propsData = { id: 'test-1', formItem: true, value: 'check-1', disabled: true };
    const wrapper = await shallow(CvToggle, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render when formItem: false && small && hideLabel', async () => {
    const propsData = { id: 'test-1', formItem: false, value: 'check-1', small: true, hideLabel: true };
    const wrapper = await shallow(CvToggle, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('computed isChecked should be false when checked prop is false', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: false };
    const wrapper = await shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('computed isChecked should be true when checked prop is true', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: true };
    const wrapper = await shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Changes to checked property affect the computed value isChecked (wrapper.vm.isChecked)
  it('computed isChecked should be true when checked prop was changed to true', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: false };
    const wrapper = await shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
    await setProps(wrapper, { checked: true });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Changes to checked property affect the computed value isChecked (wrapper.vm.isChecked)
  it('computed isChecked should be false when checked prop was changed to false', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: true };
    const wrapper = await shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
    await setProps(wrapper, { checked: false });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using modelValue property overrides checked.
  it('computed isChecked should be true when checked prop is false and modelValue is true', async () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: true, checked: false };
    const wrapper = await shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Using modelValue property overrides checked.
  it('computed isChecked should be false when checked prop is true and modelValue is false', async () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: false, checked: true };
    const wrapper = await shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be false when modelValue array is empty', async () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: [] };
    const wrapper = await shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be false when modelValue array does not contain the value', async () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: ['check-2', 'check-3'] };
    const wrapper = await shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be true when modelValue array contains the value', async () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: ['check-2', 'check-3', 'check-1'] };
    const wrapper = await shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  it('input should have toggle type', async () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = await shallow(CvToggle, { propsData });
    expect(wrapper.find('input').element.type).toBe('checkbox');
  });

  it('should emit change event on click', async () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = await shallow(CvToggle, { propsData });
    await trigger(wrapper.find('input'), 'click');
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it('should emit modelEvent event on click', async () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = await shallow(CvToggle, { propsData });
    await trigger(wrapper.find('input'), 'click');
    expect(wrapper.emitted().modelEvent).toBeTruthy();
  });

  // Clicking updates the value isChecked (wrapper.vm.isChecked)
  it('clicking updates the value isChecked from false to true', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: false };
    const wrapper = await shallow(CvToggle, { propsData });
    await trigger(wrapper.find('input'), 'click');
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Clicking updates the value isChecked (wrapper.vm.isChecked)
  it('clicking updates the value isChecked from true to false', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: true };
    const wrapper = await shallow(CvToggle, { propsData });
    await trigger(wrapper.find('input'), 'click');
    expect(wrapper.vm.isChecked).toEqual(false);
  });
});

// describe('CvToggleSkeleton', () => {
//   // ***************
//   // PROP CHECKS
//   // ***************

//   // ***************
//   // SNAPSHOT TESTS
//   // ***************
//   describe('Renders as expected', () => {
//     const wrapper = await shallow(CvToggleSkeleton);

//     expect(wrapper.html()).toMatchSnapshot();
//   });

//   // ***************
//   // FUNCTIONAL TESTS
//   // ***************
// });
