import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent } from './_helpers';
import { CvNumberInput, CvNumberInputSkeleton } from '@/components/cv-number-input';

describe('CvNumberInput', () => {
  // ***************
  // PROP CHECKS
  // ***************

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

  testComponent.propsHaveDefaultOfUndefined(CvNumberInput, ['helperText', 'invalidMessage']);

  // ***************
  // SNAPSHOT TESTS
  // ***************

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

  it('should match snapshot with min, max and step as Strings', () => {
    const formItem = false;
    const id = '1';
    const value = '15';
    const min = '-10';
    const max = '10';
    const step = '2';
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, value, min, max, step } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with optional min, max and step as numbers', () => {
    const formItem = false;
    const id = '1';
    const value = 15;
    const min = -10;
    const max = 10;
    const step = 2;
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, value, min, max, step } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when light theme', () => {
    const formItem = false;
    const id = '1';
    const theme = 'light';
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, theme } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when invalid-message slot is provided', () => {
    const id = '1';
    const value = 5;
    const propsData = { id, value };
    const wrapper = shallow(CvNumberInput, {
      slots: {
        'invalid-message': '<div class="fake-slot">my invalid message</div>',
      },
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when helper-text slot is provided', () => {
    const id = '1';
    const value = 5;
    const propsData = { id, value };
    const wrapper = shallow(CvNumberInput, {
      slots: {
        'helper-text': '<div class="fake-slot">my helper text</div>',
      },
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************

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

  it('should emit String when value prop is String', () => {
    const id = '1';
    const value = '5';
    const wrapper = shallow(CvNumberInput, { propsData: { id, value } });
    wrapper.find('.up-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([(parseInt(value) + 1).toString()]);
  });

  it('should emit value encreased by 1 on doUp', () => {
    const id = '1';
    const value = 2;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value } });
    wrapper.find('.up-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([value + 1]);
  });

  it('should emit value decreased by 1 on doDown', () => {
    const id = '1';
    const value = 10;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value } });
    wrapper.find('.down-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([value - 1]);
  });

  it('should emit value encreased by 0.3 on doUp', () => {
    const id = '1';
    const value = 0;
    const step = 0.3;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value, step } });
    wrapper.find('.up-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([value + 0.3]);
  });

  it('should emit value decreased by 0.3 on doDown', () => {
    const id = '1';
    const value = 1.2;
    const step = 0.3;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value, step } });
    wrapper.find('.down-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([0.9]);
  });

  it('should emit value snapped to next higher value', () => {
    const id = '1';
    const value = 0.5;
    const step = 0.3;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value, step } });
    wrapper.find('.up-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([0.6]);
  });

  it('should emit value snapped to next lower value', () => {
    const id = '1';
    const value = 0.5;
    const step = 0.3;
    const wrapper = shallow(CvNumberInput, { propsData: { id, step, value } });
    wrapper.find('.down-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([0.3]);
  });

  it('should respect max value', () => {
    const id = '1';
    const value = 10;
    const max = 10;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value, max } });
    wrapper.find('.up-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([10]);
  });

  it('should respoect min value', () => {
    const id = '1';
    const value = 0;
    const min = 0;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value, min } });
    wrapper.find('.down-icon').trigger('click');
    expect(wrapper.emitted().input[0]).toEqual([0]);
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
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should match snapshot', () => {
    const wrapper = shallow(CvNumberInputSkeleton);
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
