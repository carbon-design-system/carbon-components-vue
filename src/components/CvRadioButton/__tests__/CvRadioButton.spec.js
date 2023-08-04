import { shallowMount } from '@vue/test-utils';
import { CvRadioButton, CvRadioGroup } from '../index';

describe('CvRadioButton', () => {
  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches render with right label', async () => {
    const wrapper = shallowMount(CvRadioButton, {
      props: {
        label: 'right label',
        labelLeft: false,
        id: '1',
        value: '',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render with left label', async () => {
    const wrapper = shallowMount(CvRadioButton, {
      props: {
        label: 'left label',
        labelLeft: true,
        id: '1',
        value: '',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when checked', async () => {
    const wrapper = shallowMount(CvRadioButton, {
      props: {
        label: 'test label',
        labelLeft: false,
        id: '1',
        value: '',
        checked: true,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when modelValue is equal to value', async () => {
    const wrapper = shallowMount(CvRadioButton, {
      props: {
        label: 'test label',
        labelLeft: false,
        id: '1',
        value: 'test value',
        modelValue: 'test value',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when modelValue is not equal to value', async () => {
    const wrapper = shallowMount(CvRadioButton, {
      props: {
        label: 'test label',
        labelLeft: false,
        id: '1',
        value: 'test value',
        modelValue: 'not test value',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL CHECKS
  // ***************
  it('is not checked when checked and modelValue props are not set', async () => {
    const wrapper = shallowMount(CvRadioButton, {
      props: {
        labelLeft: false,
        id: '1',
        value: 'test value',
      },
    });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('is checked when checked prop is set to true and modelValue prop is not set', async () => {
    const wrapper = shallowMount(CvRadioButton, {
      props: {
        labelLeft: false,
        id: '1',
        value: 'test value',
        checked: true,
      },
    });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  it('modelValue prop has higher priority than checked prop', async () => {
    const wrapper = shallowMount(CvRadioButton, {
      props: {
        labelLeft: false,
        id: '1',
        value: 'test value',
        checked: true,
        modelValue: 'not test value',
      },
    });
    expect(wrapper.vm.isChecked).toEqual(false);
  });
});

describe('CvRadioGroup', () => {
  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches render when vertical', async () => {
    const wrapper = shallowMount(CvRadioGroup, {
      props: { vertical: true },
      slots: {
        default: '<div class="cv-radio-button-stub">RadioButtonStub</div>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when horizontal', async () => {
    const wrapper = shallowMount(CvRadioGroup, {
      props: { vertical: false },
      slots: {
        default: '<div class="cv-radio-button-stub">RadioButtonStub</div>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL CHECKS
  // ***************

  it('CvRadioButton renders slot content', async () => {
    const stubId = 'radioBtn';
    const radioButtonStub = `<cvradiobutton id="${stubId}"></cvradiobutton>`;
    const wrapper = shallowMount(CvRadioGroup, {
      slots: {
        default: radioButtonStub,
      },
    });

    const slotNode = wrapper.find('#radioBtn');

    expect(slotNode.html()).toBe(radioButtonStub);
  });
});
