import { shallowMount as shallow, createLocalVue } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import { CvNumberInput, CvNumberInputSkeleton } from '@/components/cv-number-input';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('CvNumberInput', () => {
  testComponent.propsHaveDefault(CvNumberInput, [
    'formItem',
    'ariaLabelForUpButton',
    'ariaLabelForDownButton',
    'label',
    'value',
  ]);
  testComponent.propsAreType(CvNumberInput, ['value'], [String, Number]);
  testComponent.propsAreType(CvNumberInput, ['formItem', 'invalid'], Boolean);
  testComponent.propsAreType(
    CvNumberInput,
    ['helperText', 'invalidMessage', 'label', 'ariaLabelForUpButton', 'ariaLabelForDownButton'],
    String
  );

  testComponent.prosHaveDefaultOfUndefined(CvNumberInput, ['helperText', 'invalidMessage']);

  it('should match snapshot when all props are default', () => {
    const id = '1';
    const wrapper = shallow(CvNumberInput, { propsData: { id } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when it is not a formItem', () => {
    const formItem = false;
    const id = '1';

    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when all props are provided', () => {
    const formItem = false;
    const id = '1';
    const helperText = 'helperText';
    const invalidMessage = 'invalidMessage';
    const label = 'label';
    const value = 5;
    const ariaLabelForDownButton = 'ariaLabelForDownButton';
    const ariaLabelForUpButton = 'ariaLabelForUpButton';
    const wrapper = shallow(CvNumberInput, {
      propsData: {
        formItem,
        id,
        helperText,
        invalidMessage,
        label,
        value,
        ariaLabelForDownButton,
        ariaLabelForUpButton,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when value is String', () => {
    const formItem = false;
    const id = '1';
    const value = '15';
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, value } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when value is Number', () => {
    const formItem = false;
    const id = '1';
    const value = 5;
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, value } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when light theme', () => {
    const formItem = false;
    const id = '1';
    const theme = 'light';
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, theme } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when value is invalid', () => {
    const formItem = false;
    const id = '1';
    const value = 'not a number';
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, value } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit input on doDown', () => {
    const id = '1';
    const wrapper = shallow(CvNumberInput, { propsData: { id } });
    wrapper.find('.down-icon').trigger('click');
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('should emit input on doUp', () => {
    const id = '1';
    const wrapper = shallow(CvNumberInput, { propsData: { id } });
    wrapper.find('.up-icon').trigger('click');
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('should emit input on change', () => {
    const id = '1';
    const wrapper = shallow(CvNumberInput, { propsData: { id } });
    wrapper.find('input').trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('should emit Number when value prop is Number', () => {
    const id = '1';
    const value = 5;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value } });
    wrapper.find('.up-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([value + 1]);
  });

  it('should emit String when value prop is String', () => {
    const id = '1';
    const value = '5';
    const wrapper = shallow(CvNumberInput, { propsData: { id, value } });
    wrapper.find('.up-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([(parseInt(value) + 1).toString()]);
  });

  it('should increase value by 1 when doUp', () => {
    const id = '1';
    const value = 2;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value } });
    wrapper.find('.up-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([value + 1]);
  });

  it('should emit the correct value on input', () => {
    const id = '1';
    const value = 2;
    const inputValue = 100;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value } });
    wrapper.find('input').setValue(inputValue);
    wrapper.find('input').trigger('input');
    expect(wrapper.emitted().input[0]).toEqual([inputValue]);
  });

  it('should watch value', () => {
    const id = '1';
    const value1 = 2;
    const value2 = 80;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value: value1 } });
    expect(wrapper.vm.value).toEqual(value1);
    wrapper.setProps({ value: value2 });
    expect(wrapper.vm.value).toEqual(value2);
  });
});

describe('CvNumberInputSkeleton', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(CvNumberInputSkeleton);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
