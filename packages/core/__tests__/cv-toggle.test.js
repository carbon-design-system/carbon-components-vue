import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import { CvToggle } from '@/components/cv-toggle';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('CvToggle', () => {
  it('should render with the appropriate kind', () => {
    const propsData = { label: 'test', value: 'check-1' };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.find('input').classes(`${prefix}--toggle-input`)).toEqual(true);
    expect(wrapper.find('label').classes(`${prefix}--toggle-input__label`)).toEqual(true);
    expect(
      wrapper
        .findAll('div')
        .at(0)
        .classes(`${prefix}--form-item`)
    ).toEqual(true);
    expect(wrapper.find(`${prefix}--toggle__text--off`)).toBeDefined();
    expect(wrapper.find(`${prefix}--toggle__text--on`)).toBeDefined();
  });

  it('should render with the appropriate label when label is set', () => {
    const propsData = { label: 'test', value: 'check-1' };
    const wrapper = shallow(CvToggle, { propsData });
    const label = wrapper.find('label');
    expect(label.classes(`${prefix}--toggle-input__label`)).toEqual(true);
    expect(label.html()).toContain('test');
  });

  it('should render aria-label when label is set and hideLabel is true', () => {
    const propsData = { label: 'test', value: 'check-1', hideLabel: true };
    const wrapper = shallow(CvToggle, { propsData });
    const label = wrapper.find('label');
    expect(label.classes(`${prefix}--toggle-input__label`)).toEqual(true);
    expect(label.attributes('aria-label')).toBe('test');
  });

  it('should render with the appropriate kind when small is true', () => {
    const propsData = { label: 'test', small: true, value: 'check-1' };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.find('input').classes(`${prefix}--toggle-input--small`)).toEqual(true);
    expect(wrapper.find('svg').classes(`${prefix}--toggle__check`)).toEqual(true);
  });

  it('computed isChecked should be false when checked prop is false', () => {
    const propsData = { value: 'check-1', checked: false };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('computed isChecked should be true when checked prop is true', () => {
    const propsData = { value: 'check-1', checked: true };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Changes to checked property affect the computed value isChecked (wrapper.vm.isChecked)
  it('computed isChecked should be true when checked prop was changed to true', () => {
    const propsData = { value: 'check-1', checked: false };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
    wrapper.setProps({ checked: true });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Changes to checked property affect the computed value isChecked (wrapper.vm.isChecked)
  it('computed isChecked should be false when checked prop was changed to false', () => {
    const propsData = { formItem: true, value: 'check-1', checked: true };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
    wrapper.setProps({ checked: false });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('should emit change event on click', () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvToggle, { propsData });
    wrapper.find('input').trigger('click');
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it('should emit modelEvent event on click', () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvToggle, { propsData });
    wrapper.find('input').trigger('click');
    expect(wrapper.emitted().modelEvent).toBeTruthy();
  });

  // Clicking updates the value isChecked (wrapper.vm.isChecked)
  it('clicking updates the value isChecked from false to true', () => {
    const propsData = { formItem: true, value: 'check-1', checked: false };
    const wrapper = shallow(CvToggle, { propsData });
    wrapper.find('input').trigger('click');
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Clicking updates the value isChecked (wrapper.vm.isChecked)
  it('clicking updates the value isChecked from true to false', () => {
    const propsData = { formItem: true, value: 'check-1', checked: true };
    const wrapper = shallow(CvToggle, { propsData });
    wrapper.find('input').trigger('click');
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('input should have checkbox type', () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.find('input').element.type).toBe('checkbox');
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be false when modelValue array is empty', () => {
    const propsData = { value: 'check-1', modelValue: [] };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be false when modelValue array does not contain the value', () => {
    const propsData = { value: 'check-1', modelValue: ['check-2', 'check-3'] };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  // Using an array with modelValue functions as expected.
  it('computed isChecked should be true when modelValue array contains the value', () => {
    const propsData = { value: 'check-1', modelValue: ['check-2', 'check-3', 'check-1'] };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Using modelValue property overrides checked.
  it('computed isChecked should be true when checked prop is false and modelValue is true', () => {
    const propsData = { value: 'check-1', modelValue: true, checked: false };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  // Using modelValue property overrides checked.
  it('computed isChecked should be false when checked prop is true and modelValue is false', () => {
    const propsData = { value: 'check-1', modelValue: false, checked: true };
    const wrapper = shallow(CvToggle, { propsData });
    expect(wrapper.vm.isChecked).toEqual(false);
  });
});
