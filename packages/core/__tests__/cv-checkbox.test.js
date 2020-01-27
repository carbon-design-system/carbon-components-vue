import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent } from './_helpers';
import { CvCheckbox, CvCheckboxSkeleton } from '@/components/cv-checkbox';
// import { settings as carbonSettings } from 'carbon-components';

// const carbonPrefix = carbonSettings.prefix;

describe('CvCheckbox', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvCheckbox, ['label', 'name', 'value'], String);
  testComponent.propsAreType(CvCheckbox, ['mixed', 'formItem', 'checked'], Boolean);
  testComponent.propsAreType(CvCheckbox, ['modelValue'], [Array, Boolean]);

  testComponent.propsHaveDefault(CvCheckbox, ['formItem']);
  testComponent.propsHaveDefaultOfUndefined(CvCheckbox, ['modelValue', 'checked']);

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render', () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvCheckbox, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render when disabled', () => {
    const propsData = { formItem: true, value: 'check-1', disabled: true };
    const wrapper = shallow(CvCheckbox, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('should be unchecked when mixed is true and checked is false', () => {
    const propsData = { formItem: true, value: 'check-1', mixed: true, checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.find('input').element.checked).toEqual(false);
  });

  it('should be checked when mixed is true and checked is true', () => {
    const propsData = { formItem: true, value: 'check-1', mixed: true, checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.find('input').element.checked).toEqual(true);
  });

  it('computed isChecked should be false when checked prop is false', () => {
    const propsData = { formItem: true, value: 'check-1', checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('computed isChecked should be true when checked prop is true', () => {
    const propsData = { formItem: true, value: 'check-1', checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  it('computed isChecked should be "mixed" when checked prop is false and mixed it true', () => {
    const propsData = { formItem: true, value: 'check-1', mixed: true, checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.vm.isChecked).toEqual('mixed');
  });

  // Changes to checked property affect the computed value isChecked (wrapper.vm.isChecked)
  it('computed isChecked should be true when checked prop was changed to true', () => {
    const propsData = { formItem: true, value: 'check-1', checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
    wrapper.setProps({ checked: true });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Changes to checked property affect the computed value isChecked (wrapper.vm.isChecked)
  it('computed isChecked should be false when checked prop was changed to false', () => {
    const propsData = { formItem: true, value: 'check-1', checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
    wrapper.setProps({ checked: false });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('computed isChecked should be true when checked prop is true and mixed it true', () => {
    const propsData = { formItem: true, value: 'check-1', mixed: true, checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
  });
  // Using modelValue property overrides checked.
  it('computed isChecked should be true when checked prop is false and modelValue is true', () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: true, checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Using modelValue property overrides checked.
  it('computed isChecked should be false when checked prop is true and modelValue is false', () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: false, checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be false when modelValue array is empty', () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: [] };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be false when modelValue array does not contain the value', () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: ['check-2', 'check-3'] };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be true when modelValue array contains the value', () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: ['check-2', 'check-3', 'check-1'] };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  it('input should have checkbox type', () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.find('input').element.type).toBe('checkbox');
  });

  it('should emit change event on click', () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvCheckbox, { propsData });
    wrapper.find('input').trigger('click');
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it('should emit modelEvent event on click', () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvCheckbox, { propsData });
    wrapper.find('input').trigger('click');
    expect(wrapper.emitted().modelEvent).toBeTruthy();
  });

  // Clicking updates the value isChecked (wrapper.vm.isChecked)
  it('clicking updates the value isChecked from false to true', () => {
    const propsData = { formItem: true, value: 'check-1', checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    wrapper.find('input').trigger('click');
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Clicking updates the value isChecked (wrapper.vm.isChecked)
  it('clicking updates the value isChecked from true to false', () => {
    const propsData = { formItem: true, value: 'check-1', checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    wrapper.find('input').trigger('click');
    expect(wrapper.vm.isChecked).toEqual(false);
  });
});

describe('CvCheckboxSkeleton', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************
  describe('Renders as expected', () => {
    const wrapper = shallow(CvCheckboxSkeleton);

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
