import { shallowMount, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { carbonPrefix } from '../../../global/settings';
import CvSlider from '../CvSlider.vue';

const DefaultValue = '7';
const DefaultNewValue = '34';
const DefaultPropsValue = {
  props: {
    value: DefaultValue,
  },
};
const DefaultPropsModelValue = {
  props: {
    modelValue: DefaultValue,
  },
};

const HTMLNodesClasses = {
  track: `.${carbonPrefix}--slider__track`,
  valueInput: `.${carbonPrefix}--text-input`,
  thumb: `.${carbonPrefix}--slider__thumb`,
};

describe('CvSlider', () => {
  it('should match snapshot', async () => {
    const wrapper = shallowMount(CvSlider, {
      props: {
        id: 'abc',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test.each([
    ['keydown.up', '8'],
    ['keydown.down', '6'],
  ])('handles %s press correctly', async (keyCode, expectedValue) => {
    const wrapper = shallowMount(CvSlider, DefaultPropsValue);
    const input = wrapper.find(HTMLNodesClasses.valueInput);
    await input.trigger(keyCode);
    await nextTick();

    expect(wrapper.emitted('change')[0][0]).toEqual(expectedValue);
  });

  it('handles drag correctly', async () => {
    const InitialValue = 1;
    const wrapper = shallowMount(CvSlider, {
      props: {
        value: InitialValue.toString(),
      },
    });
    const thumb = wrapper.find(HTMLNodesClasses.thumb);
    await thumb.trigger('mousedown');
    document.body.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }));
    document.body.dispatchEvent(new MouseEvent('mouseup'));

    await nextTick();
    const emittedValue = wrapper.emitted('change')[0][0];

    // Assert that value has been updated due to drag
    expect(Number.isNaN(emittedValue)).toBe(false);
    expect(Number(emittedValue)).toBeGreaterThan(InitialValue);
  });

  it('emits v-model event when modelValue prop changes', async () => {
    const wrapper = shallowMount(CvSlider, DefaultPropsModelValue);

    await wrapper.setProps({ modelValue: DefaultNewValue });

    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(DefaultNewValue);
  });

  it('emits change event when value prop changes', async () => {
    const wrapper = shallowMount(CvSlider, DefaultPropsValue);

    await wrapper.setProps({ value: DefaultNewValue });

    expect(wrapper.emitted('change')[0][0]).toEqual(DefaultNewValue);
  });

  test.each([
    ['step', '12', DefaultValue],
    ['min', '10', '10'],
    ['max', '6', '6'],
  ])(
    'emits change event when %s prop changes',
    async (propName, propValue, expectedValue) => {
      const wrapper = shallowMount(CvSlider, DefaultPropsValue);

      await wrapper.setProps({ [propName]: propValue });
      await nextTick();

      expect(wrapper.emitted('change')[0][0]).toEqual(expectedValue);
    }
  );

  it('handles value change from input box correctly', async () => {
    const wrapper = shallowMount(CvSlider);
    const inputBox = wrapper.find(HTMLNodesClasses.valueInput);
    await inputBox.setValue(DefaultNewValue);
    await inputBox.trigger('change');

    expect(wrapper.emitted('change')[0][0]).toEqual(DefaultNewValue);
  });

  it('respects stepMultiplier when adjusting value', async () => {
    const wrapper = shallowMount(CvSlider, {
      props: {
        step: '3',
        stepMultiplier: '5',
        value: '1',
      },
    });

    let inputBox = wrapper.find(HTMLNodesClasses.valueInput);

    await inputBox.trigger('keydown.up', { shiftKey: true });
    await nextTick();
    await inputBox.trigger('keydown.down', { shiftKey: true });
    await nextTick();

    expect(wrapper.emitted('change')[0][0]).toEqual('16');
    expect(wrapper.emitted('change')[1][0]).toEqual('1');
  });

  // it.only('updates value when track is clicked', async () => {
  //   const wrapper = shallowMount(CvSlider);

  //   const track = wrapper.find(HTMLNodesClasses.track);
  //   await track.trigger('click', { offsetX: 50 });

  //   // internalValue should be updated based on click position
  //   expect(wrapper.vm.internalValue).toBeGreaterThan(0);
  // });

  // it('handles arrow key press on thumb correctly', async () => {
  //   const wrapper = mount(CvSlider);
  //   const thumb = wrapper.find('.cv-slider__thumb');

  //   await thumb.trigger('keydown.up');
  //   expect(wrapper.vm.internalValue).toBeGreaterThan(0);

  //   await thumb.trigger('keydown.down');
  //   expect(wrapper.vm.internalValue).toBe(0);
  // });
});
