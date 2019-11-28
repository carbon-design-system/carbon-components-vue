import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent } from './_helpers';
import { CvToastNotification } from '@/components/cv-toast-notification';
import ErrorFilled20 from '@carbon/icons-vue/es/error--filled/20';
import CheckmarkFilled20 from '@carbon/icons-vue/es/checkmark--filled/20';
import WarningAltFilled20 from '@carbon/icons-vue/es/warning--alt--filled/20';

describe('CvToastNotification', () => {
  const kinds = ['error', 'info', 'warning', 'success'];

  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvToastNotification, ['lowContrast'], Boolean);
  testComponent.propsAreType(CvToastNotification, ['caption', 'closeAriaLabel', 'kind'], String);
  testComponent.propsHaveDefault(CvToastNotification, ['closeAriaLabel', 'kind']);

  it('`kind` prop validator works as expected', () => {
    const propsData = { caption: 'TEST', lowContrast: false };

    const wrapper = shallow(CvToastNotification, { propsData });
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
    const propsData = { caption: 'TEST', lowContrast: false, kind: '' };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = shallow(CvToastNotification, { propsData });
      expect(wrapper.html()).toMatchSnapshot();
    }
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************

  it('`icon` is computed correctly', () => {
    const kindToIconMapping = {
      error: ErrorFilled20,
      warning: WarningAltFilled20,
      success: CheckmarkFilled20,
      info: '',
    };
    const propsData = { caption: 'TEST', lowContrast: false, kind: '' };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = shallow(CvToastNotification, { propsData });
      expect(wrapper.vm.icon).toEqual(kindToIconMapping[kind]);
    }
  });

  it('should emit close event when close button is clicked', () => {
    const propsData = { caption: 'TEST', lowContrast: false };
    const wrapper = shallow(CvToastNotification, { propsData });
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
