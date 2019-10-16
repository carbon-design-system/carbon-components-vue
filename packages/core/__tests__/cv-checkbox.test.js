import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import { CvCheckbox, CvCheckboxSkeleton } from '@/components/cv-checkbox';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('CvCheckbox', () => {
  testComponent.propsHaveDefault(CvCheckbox, ['formItem']);

  it('should render with the appropriate kind', () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.classes(`${prefix}--form-item`)).toEqual(true);
    expect(wrapper.classes(`${prefix}--checkbox-wrapper`)).toEqual(true);
    expect(wrapper.find('label').classes(`${prefix}--checkbox-label`)).toEqual(true);
    expect(wrapper.find('label').classes(`${prefix}--label--disabled`)).toEqual(false);
    expect(wrapper.find('label').classes(`${prefix}--checkbox-label__focus`)).toEqual(false);
    expect(wrapper.find('input').classes(`${prefix}--checkbox`)).toEqual(true);
  });

  it('should render with the appropriate kind when disabled', () => {
    const propsData = { formItem: true, value: 'check-1', disabled: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.find('label').classes(`${prefix}--label--disabled`)).toEqual(true);
  });

  it('should be unchecked when mixed (was unchecked before)', () => {
    const propsData = { formItem: true, value: 'check-1', mixed: true, isChecked: false };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.find('input').element.checked).toBe(false);
  });

  it('should be unchecked when mixed (was checked before)', () => {
    const propsData = { formItem: true, value: 'check-1', mixed: true, isChecked: true };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.find('input').element.checked).toBe(false);
  });

  it('input should have checkbox type', () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(CvCheckbox, { propsData });
    expect(wrapper.find('input').element.type).toBe('checkbox');
  });

  it('should emit change event on click', () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(
      CvCheckbox,
      { propsData },
      {
        listeners: {
          change: () => {},
        },
      }
    );
    wrapper.find('input').trigger('click');
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it('should emit modelEvent event on click', () => {
    const propsData = { formItem: true, value: 'check-1' };
    const wrapper = shallow(
      CvCheckbox,
      { propsData },
      {
        listeners: {
          change: () => {},
        },
      }
    );
    wrapper.find('input').trigger('click');
    expect(wrapper.emitted().modelEvent).toBeTruthy();
  });
});

describe('CvCheckboxSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(CvCheckboxSkeleton);

    it('Has the expected classes', () => {
      expect(wrapper.find('label').classes(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.find('label').classes(`${prefix}--checkbox-label`)).toEqual(true);
    });
  });
});
