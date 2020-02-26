import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent } from './_helpers';
import { CvRadioButton, CvRadioGroup } from '@/components/cv-radio-button/';

describe('CvRadioButton', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvRadioButton, ['labelLeft', 'checked'], Boolean);
  testComponent.propsAreType(CvRadioButton, ['modelValue', 'value', 'label'], String);
  testComponent.propsAreRequired(CvRadioButton, ['value']);

  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches render with right label', async () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        label: 'right label',
        labelLeft: false,
        id: '1',
        value: '',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render with left label', async () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        label: 'left label',
        labelLeft: true,
        id: '1',
        value: '',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when checked', async () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        label: 'test label',
        labelLeft: false,
        id: '1',
        value: '',
        checked: true,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when modelValue is equal to value', async () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        label: 'test label',
        labelLeft: false,
        id: '1',
        value: 'test value',
        modelValue: 'test value',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when modelValue is not equal to value', async () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        label: 'test label',
        labelLeft: false,
        id: '1',
        value: 'test value',
        modelValue: 'not test value',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL CHECKS
  // ***************
  it('is not checked when checked and modelValue props are not set', async () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        labelLeft: false,
        id: '1',
        value: 'test value',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('is checked when checked prop is set to true and modelValue prop is not set', async () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        labelLeft: false,
        id: '1',
        value: 'test value',
        checked: true,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  it('modelValue prop has higher priority than checked prop', async () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        labelLeft: false,
        id: '1',
        value: 'test value',
        checked: true,
        modelValue: 'not test value',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isChecked).toEqual(false);
  });
});

describe('CvRadioGroup', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvRadioGroup, ['vertical'], Boolean);

  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches render when vertical', async () => {
    const wrapper = shallow(CvRadioGroup, {
      propsData: { vertical: true },
      slots: {
        default: '<div class="cv-radio-button-stub">StubbyMcStubFace</div>',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when horizontal', async () => {
    const wrapper = shallow(CvRadioGroup, {
      propsData: { vertical: false },
      slots: {
        default: '<div class="cv-radio-button-stub">StubbyMcStubFace</div>',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL CHECKS
  // ***************
});
