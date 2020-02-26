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

  it('should match snapshot when all props are default', async () => {
    const id = '1';
    const wrapper = shallow(CvNumberInput, { propsData: { id } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when it is not a formItem', async () => {
    const formItem = false;
    const id = '1';
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when all props are provided', async () => {
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
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when value is String', async () => {
    const formItem = false;
    const id = '1';
    const value = '15';
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, value } });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when value is Number', async () => {
    const formItem = false;
    const id = '1';
    const value = 5;
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, value } });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with min, max and step as Strings', async () => {
    const formItem = false;
    const id = '1';
    const value = '15';
    const min = '-10';
    const max = '10';
    const step = '2';
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, value, min, max, step } });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with optional min, max and step as numbers', async () => {
    const formItem = false;
    const id = '1';
    const value = 15;
    const min = -10;
    const max = 10;
    const step = 2;
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, value, min, max, step } });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when light theme', async () => {
    const formItem = false;
    const id = '1';
    const theme = 'light';
    const wrapper = shallow(CvNumberInput, { propsData: { formItem, id, theme } });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when invalid-message slot is provided', async () => {
    const id = '1';
    const value = 5;
    const propsData = { id, value };
    const wrapper = shallow(CvNumberInput, {
      slots: {
        'invalid-message': '<div class="fake-slot">my invalid message</div>',
      },
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when helper-text slot is provided', async () => {
    const id = '1';
    const value = 5;
    const propsData = { id, value };
    const wrapper = shallow(CvNumberInput, {
      slots: {
        'helper-text': '<div class="fake-slot">my helper text</div>',
      },
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when mobile variant requested', async () => {
    const id = '1';
    const value = 5;
    const mobile = true;
    const propsData = { id, value, mobile };
    const wrapper = shallow(CvNumberInput, {
      slots: {
        'helper-text': '<div class="fake-slot">my helper text</div>',
      },
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************

  it('should emit input on doDown', async () => {
    const id = '1';
    const wrapper = shallow(CvNumberInput, { propsData: { id } });
    await wrapper.vm.$nextTick();
    wrapper.find('.down-icon').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('should emit input on doUp', async () => {
    const id = '1';
    const wrapper = shallow(CvNumberInput, { propsData: { id } });
    await wrapper.vm.$nextTick();
    wrapper.find('.up-icon').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('should emit input on change', async () => {
    const id = '1';
    const wrapper = shallow(CvNumberInput, { propsData: { id } });
    await wrapper.vm.$nextTick();
    wrapper.find('input').trigger('input');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('should emit String when value prop is String', async () => {
    const id = '1';
    const value = '555';
    const wrapper = shallow(CvNumberInput, { propsData: { id, value } });
    await wrapper.vm.$nextTick();
    wrapper.find('.up-icon').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input[0]).toEqual([(parseInt(value) + 1).toString()]);
  });

  it('should emit value increased by 1 on doUp', async () => {
    const id = '1';
    const value = 2;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value } });
    await wrapper.vm.$nextTick();
    wrapper.find('.up-icon').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input[0]).toEqual([value + 1]);
  });

  it('should emit value decreased by 1 on doDown', async () => {
    const id = '1';
    const value = 10;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value } });
    await wrapper.vm.$nextTick();
    wrapper.find('.down-icon').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input[0]).toEqual([value - 1]);
  });

  // the next four tests are commented out until JSDOM correctly
  // implements decimal floating point for <input> elements
  // see https://github.com/jsdom/jsdom/issues/2823

  // it('should emit value increased by 0.3 on doUp', async () => {
  //   const id = '1';
  //   const value = 0;
  //   const step = 0.3;
  //   const wrapper = shallow(CvNumberInput, { propsData: { id, value, step } });
  //   wrapper.find('.up-icon').trigger('click');
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.emitted().input[0]).toEqual([value + 0.3]);
  // });

  // it('should emit value decreased by 0.3 on doDown', async () => {
  //   const id = '1';
  //   const value = 1.2;
  //   const step = 0.3;
  //   const wrapper = shallow(CvNumberInput, { propsData: { id, value, step } });
  //   wrapper.find('.down-icon').trigger('click');
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.emitted().input[0]).toEqual([0.9]);
  // });

  // it('should emit value snapped to next higher value', async () => {
  //   const id = '1';
  //   const value = 0.5;
  //   const step = 0.3;
  //   const wrapper = shallow(CvNumberInput, { propsData: { id, value, step } });
  //   wrapper.find('.up-icon').trigger('click');
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.emitted().input[0]).toEqual([0.6]);
  // });

  // it('should emit value snapped to next lower value', async () => {
  //   const id = '1';
  //   const value = 0.5;
  //   const step = 0.3;
  //   const wrapper = shallow(CvNumberInput, { propsData: { id, step, value } });
  //   wrapper.find('.down-icon').trigger('click');
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.emitted().input[0]).toEqual([0.3]);
  // });

  it('should respect max value', async () => {
    const id = '1';
    const value = 9;
    const step = 2;
    const max = 10;
    const wrapper = shallow(CvNumberInput, { propsData: { id, step, value, max } });
    await wrapper.vm.$nextTick();
    wrapper.find('.up-icon').trigger('click');
    wrapper.find('.up-icon').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input[0]).toEqual([10]);
    expect(wrapper.emitted().input[1]).toEqual([10]);
  });

  it('should respect min value', async () => {
    const id = '1';
    const value = 1;
    const step = 2;
    const min = 0;
    const wrapper = shallow(CvNumberInput, { propsData: { id, step, value, min } });
    await wrapper.vm.$nextTick();
    wrapper.find('.down-icon').trigger('click');
    wrapper.find('.down-icon').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input[0]).toEqual([0]);
    expect(wrapper.emitted().input[1]).toEqual([0]);
  });

  it('should emit the correct value on input', async () => {
    const id = '1';
    const value = 2;
    const inputValue = 100;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value } });
    await wrapper.vm.$nextTick();
    wrapper.find('input').setValue(inputValue);
    wrapper.find('input').trigger('input');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input[0]).toEqual([inputValue]);
  });

  it('should watch value', async () => {
    const id = '1';
    const value1 = 2;
    const value2 = 80;
    const wrapper = shallow(CvNumberInput, { propsData: { id, value: value1 } });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.value).toEqual(value1);
    wrapper.setProps({ value: value2 });
    await wrapper.vm.$nextTick();
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

  it('should match snapshot', async () => {
    const wrapper = shallow(CvNumberInputSkeleton);
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // **********
});
