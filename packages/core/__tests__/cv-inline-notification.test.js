import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent } from './_helpers';
import { CvInlineNotification } from '@/components/cv-inline-notification';
import ErrorFilled20 from '@carbon/icons-vue/es/error--filled/20';
import CheckmarkFilled20 from '@carbon/icons-vue/es/checkmark--filled/20';
import WarningAltFilled20 from '@carbon/icons-vue/es/warning--alt--filled/20';

describe('CvInlineNotification', () => {
  const kinds = ['error', 'info', 'warning', 'success'];

  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvInlineNotification, ['lowContrast'], Boolean);
  testComponent.propsAreType(CvInlineNotification, ['actionLabel', 'closeAriaLabel', 'kind'], String);
  testComponent.propsHaveDefault(CvInlineNotification, ['closeAriaLabel', 'kind', 'actionLabel']);

  it('`kind` prop validator works as expected', () => {
    const propsData = { lowContrast: false };

    const wrapper = shallow(CvInlineNotification, { propsData });
    for (const kind of kinds) {
      expect(wrapper.vm.$options.props.kind.validator && wrapper.vm.$options.props.kind.validator(kind)).toBeTruthy();
    }

    // suppress the error message from the kind validator
    const consoleError = console.error;
    console.error = jest.fn();

    expect(wrapper.vm.$options.props.kind.validator && wrapper.vm.$options.props.kind.validator('TEST')).toBeFalsy();

    // restore
    console.error = consoleError;
  });

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly', () => {
    const propsData = { lowContrast: false, kind: '', actionLabel: 'test action label' };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = shallow(CvInlineNotification, { propsData });
      expect(wrapper.html()).toMatchSnapshot();
    }
  });

  it('should render correctly when low contrast is used', () => {
    const propsData = { lowContrast: true, kind: '', actionLabel: 'test action label' };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = shallow(CvInlineNotification, { propsData });
      expect(wrapper.html()).toMatchSnapshot();
    }
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************

  // it('`icon` is computed correctly', () => {
  //   const kindToIconMapping = {
  //     error: ErrorFilled20,
  //     warning: WarningAltFilled20,
  //     success: CheckmarkFilled20,
  //     info: '',
  //   };
  //   const propsData = { actionLabel: 'test action label', lowContrast: false, kind: '' };
  //   for (const kind of kinds) {
  //     propsData.kind = kind;
  //     const wrapper = shallow(CvInlineNotification, { propsData });
  //     expect(wrapper.vm.icon).toEqual(kindToIconMapping[kind]);
  //   }
  // });

  it('should emit close event when close button is clicked', () => {
    const propsData = { actionLabel: 'test action label', lowContrast: false };
    const wrapper = shallow(CvInlineNotification, { propsData });
    wrapper.find('.bx--inline-notification__close-button').trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('should emit action event when action button is clicked', () => {
    const propsData = { actionLabel: 'test action label', lowContrast: false };
    const wrapper = shallow(CvInlineNotification, { propsData });
    wrapper.find('.bx--inline-notification__action-button').trigger('click');
    expect(wrapper.emitted().action).toBeTruthy();
  });
});
