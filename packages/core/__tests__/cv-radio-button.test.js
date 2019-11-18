import { shallowMount as shallow, mount } from '@vue/test-utils';
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
  it('matches render with right label', () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        label: 'right label',
        labelLeft: false,
        id: '1',
        value: '',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render with left label', () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        label: 'left label',
        labelLeft: true,
        id: '1',
        value: '',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when checked', () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        label: 'test label',
        labelLeft: false,
        id: '1',
        value: '',
        checked: true,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when modelValue is equal to value', () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        label: 'test label',
        labelLeft: false,
        id: '1',
        value: 'test value',
        modelValue: 'test value',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when modelValue is not equal to value', () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
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
  it('is not checked when checked and modelValue props are not set', () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        labelLeft: false,
        id: '1',
        value: 'test value',
      },
    });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('is checked when checked prop is set to true and modelValue prop is not set', () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
        labelLeft: false,
        id: '1',
        value: 'test value',
        checked: true,
      },
    });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  it('modelValue prop has higher priority than checked prop', () => {
    const wrapper = shallow(CvRadioButton, {
      propsData: {
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
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvRadioGroup, ['vertical'], Boolean);

  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches render when vertical', () => {
    const wrapper = shallow(CvRadioGroup, {
      propsData: { vertical: true },
      slots: {
        default: '<div class="cv-radio-button-stub">StubbyMcStubFace</div>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when horizontal', () => {
    const wrapper = shallow(CvRadioGroup, {
      propsData: { vertical: false },
      slots: {
        default: '<div class="cv-radio-button-stub">StubbyMcStubFace</div>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL CHECKS
  // ***************
});
