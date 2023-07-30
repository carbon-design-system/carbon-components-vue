import { shallowMount, mount } from '@vue/test-utils';
import CvNumberInput from '../CvNumberInput.vue';

describe('CvNumberInput', () => {
  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should match snapshot when all props are default', async () => {
    const wrapper = await shallowMount(CvNumberInput);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when it is not a formItem', async () => {
    const formItem = false;
    const wrapper = await shallowMount(CvNumberInput, { props: { formItem } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when all props are provided', async () => {
    const formItem = false;
    const helperText = 'helperText';
    const invalidMessage = 'invalidMessage';
    const label = 'label';
    const value = 5;
    const ariaLabelForDownButton = 'ariaLabelForDownButton';
    const ariaLabelForUpButton = 'ariaLabelForUpButton';
    const wrapper = await shallowMount(CvNumberInput, {
      props: {
        formItem,
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

  it('should match snapshot when value is String', async () => {
    const formItem = false;
    const value = '15';
    const wrapper = await shallowMount(CvNumberInput, {
      props: { formItem, value },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when value is Number', async () => {
    const formItem = false;
    const value = 5;
    const wrapper = await shallowMount(CvNumberInput, {
      props: { formItem, value },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with min, max and step as Strings', async () => {
    const formItem = false;
    const value = '15';
    const min = '-10';
    const max = '10';
    const step = '2';
    const wrapper = await shallowMount(CvNumberInput, {
      props: { formItem, value, min, max, step },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with optional min, max and step as numbers', async () => {
    const formItem = false;
    const value = 15;
    const min = -10;
    const max = 10;
    const step = 2;
    const wrapper = await shallowMount(CvNumberInput, {
      props: { formItem, value, min, max, step },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when light theme', async () => {
    const formItem = false;
    const theme = 'light';
    const wrapper = await shallowMount(CvNumberInput, {
      props: { formItem, theme },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when invalid-message slot is provided', async () => {
    const value = 5;
    const props = { value };
    const wrapper = await shallowMount(CvNumberInput, {
      slots: {
        'invalid-message': '<div class="fake-slot">my invalid message</div>',
      },
      props,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot when helper-text slot is provided', async () => {
    const value = 5;
    const props = { value };
    const wrapper = await shallowMount(CvNumberInput, {
      slots: {
        'helper-text': '<div class="fake-slot">my helper text</div>',
      },
      props,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  const EmittedModelValueEvent = 'update:modelValue';
  const DefaultModelValue = 2;

  const testEmittedModelValue = async (wrapper, expectedValue) => {
    const modelValueEvent = wrapper.emitted(EmittedModelValueEvent);
    await expect(modelValueEvent).toBeTruthy();
    await expect(modelValueEvent[0][0]).toEqual(expectedValue);
  };

  const mountDefaultSetup = (modelValue = DefaultModelValue) => {
    return mount(CvNumberInput, { props: { modelValue } });
  };

  it('should emit input on doDown', async () => {
    const expectedValue = 1;

    const wrapper = mountDefaultSetup();
    const downButtonNode = wrapper.find('.down-icon');
    await downButtonNode.trigger('click');

    await testEmittedModelValue(wrapper, expectedValue);
  });

  it('should emit input on doUp', async () => {
    const expectedValue = 3;

    const wrapper = mountDefaultSetup();
    const upButtonNode = wrapper.find('.up-icon');
    await upButtonNode.trigger('click');

    await testEmittedModelValue(wrapper, expectedValue);
  });

  it('should emit input on change', async () => {
    const inputValue = 5;
    const expectedValue = inputValue;

    const wrapper = mountDefaultSetup();
    wrapper.find('input').setValue(inputValue);
    await wrapper.find('input').trigger('input');

    await testEmittedModelValue(wrapper, expectedValue);
  });

  it('should emit String when value prop is String', async () => {
    const modelValue = '555';
    const expectedValue = '556';

    const wrapper = mount(CvNumberInput, { props: { modelValue } });
    const upButtonNode = wrapper.find('.up-icon');
    await upButtonNode.trigger('click');

    await testEmittedModelValue(wrapper, expectedValue);
  });

  it('should emit value increased by 1 on doUp', async () => {
    const modelValue = 555;
    const expectedValue = 556;

    const wrapper = mount(CvNumberInput, { props: { modelValue } });
    const upButtonNode = wrapper.find('.up-icon');
    await upButtonNode.trigger('click');

    await testEmittedModelValue(wrapper, expectedValue);
  });

  it('should emit value decreased by 1 on doDown', async () => {
    const modelValue = 555;
    const expectedValue = 554;

    const wrapper = mount(CvNumberInput, { props: { modelValue } });
    const upButtonNode = wrapper.find('.down-icon');
    await upButtonNode.trigger('click');

    await testEmittedModelValue(wrapper, expectedValue);
  });

  it('should respect max value', async () => {
    const modelValue = 9;
    const step = 2;
    const max = 10;
    const expectedValue = max;

    const wrapper = mount(CvNumberInput, { props: { step, modelValue, max } });
    await wrapper.find('.up-icon').trigger('click');
    await wrapper.find('.up-icon').trigger('click');
    const modelValueEvent = wrapper.emitted(EmittedModelValueEvent);

    await expect(modelValueEvent[0][0]).toEqual(expectedValue);
    await expect(modelValueEvent[1][0]).toEqual(expectedValue);
  });

  it('should respect min value', async () => {
    const modelValue = 2;
    const step = 2;
    const min = 1;
    const expectedValue = min;

    const wrapper = await mount(CvNumberInput, {
      props: { step, modelValue, min },
    });
    await wrapper.find('.down-icon').trigger('click');
    await wrapper.find('.down-icon').trigger('click');
    const modelValueEvent = wrapper.emitted(EmittedModelValueEvent);

    await expect(modelValueEvent[0][0]).toEqual(expectedValue);
    await expect(modelValueEvent[1][0]).toEqual(expectedValue);
  });

  it('should emit the correct value on input', async () => {
    const modelValue = 2;
    const inputValue = 100;
    const expectedValue = inputValue;

    const wrapper = await mount(CvNumberInput, { props: { modelValue } });
    wrapper.find('input').setValue(inputValue);
    await wrapper.find('input').trigger('input');
    testEmittedModelValue(wrapper, expectedValue);
  });

  it('should watch modelValue', async () => {
    const modelValue = 2;
    const inputValue = 80;
    const expectedValue = inputValue;

    const wrapper = await mount(CvNumberInput, { props: { modelValue } });
    await wrapper.setProps({ modelValue: inputValue });

    expect(wrapper.vm.modelValue).toEqual(expectedValue);
  });
});
