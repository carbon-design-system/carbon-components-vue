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

  it('should render', async () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render when disabled', async () => {
    const propsData = { formItem: true, value: 'check-1', disabled: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('should be unchecked when mixed is true and checked is false', async () => {
    const propsData = { formItem: true, value: 'check-1', mixed: true, checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').element.checked).toEqual(false);
  });

  it('should be checked when mixed is true and checked is true', async () => {
    const propsData = { formItem: true, value: 'check-1', mixed: true, checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').element.checked).toEqual(true);
  });

  it('computed isChecked should be false when checked prop is false', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('computed isChecked should be true when checked prop is true', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  it('computed isChecked should be "mixed" when checked prop is false and mixed it true', async () => {
    const propsData = { formItem: true, value: 'check-1', mixed: true, checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual('mixed');
  });

  // Changes to checked property affect the computed value isChecked (wrapper.vm.isChecked)
  it('computed isChecked should be true when checked prop was changed to true', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(false);
    wrapper.setProps({ checked: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Changes to checked property affect the computed value isChecked (wrapper.vm.isChecked)
  it('computed isChecked should be false when checked prop was changed to false', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(true);
    wrapper.setProps({ checked: false });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('computed isChecked should be true when checked prop is true and mixed it true', async () => {
    const propsData = { formItem: true, value: 'check-1', mixed: true, checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(true);
  });
  // Using modelValue property overrides checked.
  it('computed isChecked should be true when checked prop is false and modelValue is true', async () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: true, checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Using modelValue property overrides checked.
  it('computed isChecked should be false when checked prop is true and modelValue is false', async () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: false, checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be false when modelValue array is empty', async () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: [] };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be false when modelValue array does not contain the value', async () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: ['check-2', 'check-3'] };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be true when modelValue array contains the value', async () => {
    const propsData = { formItem: true, value: 'check-1', modelValue: ['check-2', 'check-3', 'check-1'] };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  it('input should have checkbox type', async () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').element.type).toBe('checkbox');
  });

  it('should emit change event on click', async () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it('should emit modelEvent event on click', async () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().modelEvent).toBeTruthy();
  });

  // Clicking updates the value isChecked (wrapper.vm.isChecked)
  it('clicking updates the value isChecked from false to true', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Clicking updates the value isChecked (wrapper.vm.isChecked)
  it('clicking updates the value isChecked from true to false', async () => {
    const propsData = { formItem: true, value: 'check-1', checked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    await wrapper.vm.$nextTick();
    wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
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
  it('Renders as expected', async () => {
    const wrapper = shallow(CvCheckboxSkeleton);
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
