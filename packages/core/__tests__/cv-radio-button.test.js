// import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow } = awaitNextTick;
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
    const wrapper = await shallow(CvRadioButton, {
      propsData: {
        label: 'right label',
        labelLeft: false,
        id: '1',
        value: '',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render with left label', async () => {
    const wrapper = await shallow(CvRadioButton, {
      propsData: {
        label: 'left label',
        labelLeft: true,
        id: '1',
        value: '',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when checked', async () => {
    const wrapper = await shallow(CvRadioButton, {
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

  it('matches render when modelValue is equal to value', async () => {
    const wrapper = await shallow(CvRadioButton, {
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

  it('matches render when modelValue is not equal to value', async () => {
    const wrapper = await shallow(CvRadioButton, {
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
  it('is not checked when checked and modelValue props are not set', async () => {
    const wrapper = await shallow(CvRadioButton, {
      propsData: {
        labelLeft: false,
        id: '1',
        value: 'test value',
      },
    });
    expect(wrapper.vm.isChecked).toEqual(false);
  });

  it('is checked when checked prop is set to true and modelValue prop is not set', async () => {
    const wrapper = await shallow(CvRadioButton, {
      propsData: {
        labelLeft: false,
        id: '1',
        value: 'test value',
        checked: true,
      },
    });
    expect(wrapper.vm.isChecked).toEqual(true);
  });

  it('modelValue prop has higher priority than checked prop', async () => {
    const wrapper = await shallow(CvRadioButton, {
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
  it('matches render when vertical', async () => {
    const wrapper = await shallow(CvRadioGroup, {
      propsData: { vertical: true },
      slots: {
        default: '<div class="cv-radio-button-stub">StubbyMcStubFace</div>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render when horizontal', async () => {
    const wrapper = await shallow(CvRadioGroup, {
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
