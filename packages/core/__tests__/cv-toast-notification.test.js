// import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, trigger } = awaitNextTick;
import { CvToastNotification } from '@/components/cv-toast-notification';
import ErrorFilled20 from '@carbon/icons-vue/es/error--filled/20';
import CheckmarkFilled20 from '@carbon/icons-vue/es/checkmark--filled/20';
import WarningFilled20 from '@carbon/icons-vue/es/warning--filled/20';
import InformationFilled20 from '@carbon/icons-vue/es/information--filled/20';

describe('CvToastNotification', () => {
  const kinds = ['error', 'info', 'warning', 'success'];

  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvToastNotification, ['lowContrast', 'hideCloseButton'], Boolean);
  testComponent.propsAreType(CvToastNotification, ['caption', 'closeAriaLabel', 'kind'], String);
  testComponent.propsHaveDefault(CvToastNotification, ['closeAriaLabel', 'kind']);

  it('`kind` prop validator works as expected', async () => {
    const propsData = { caption: 'TEST', lowContrast: false };

    const wrapper = await shallow(CvToastNotification, { propsData });
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

  it('should render correctly', async () => {
    const propsData = { caption: 'TEST', lowContrast: false, kind: '' };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = await shallow(CvToastNotification, { propsData });
      expect(wrapper.html()).toMatchSnapshot();
    }
  });

  it('should render correctly when low contrast is used', async () => {
    const propsData = { caption: 'TEST', lowContrast: true, kind: '' };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = await shallow(CvToastNotification, { propsData });
      expect(wrapper.html()).toMatchSnapshot();
    }
  });

  it('should not render close button when hideCloseButton is true', async () => {
    const propsData = { lowContrast: false, kind: '', actionLabel: 'test action label', hideCloseButton: true };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = await shallow(CvToastNotification, { propsData });
      expect(wrapper.html()).toMatchSnapshot();
    }
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************

  it('`icon` is computed correctly', async () => {
    const kindToIconMapping = {
      error: ErrorFilled20,
      warning: WarningFilled20,
      success: CheckmarkFilled20,
      info: InformationFilled20,
    };
    const propsData = { caption: 'TEST', lowContrast: false, kind: '' };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = await shallow(CvToastNotification, { propsData });
      expect(wrapper.vm.icon).toEqual(kindToIconMapping[kind]);
    }
  });

  it('should emit close event when close button is clicked', async () => {
    const propsData = { caption: 'TEST', lowContrast: false };
    const wrapper = await shallow(CvToastNotification, { propsData });
    await trigger(wrapper.find('button'), 'click');
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
