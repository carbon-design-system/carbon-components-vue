// import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, trigger } = awaitNextTick;
import { CvInlineNotification } from '@/components/cv-inline-notification';
import ErrorFilled20 from '@carbon/icons-vue/es/error--filled/20';
import CheckmarkFilled20 from '@carbon/icons-vue/es/checkmark--filled/20';
import WarningFilled20 from '@carbon/icons-vue/es/warning--filled/20';
import InformationFilled20 from '@carbon/icons-vue/es/information--filled/20';

describe('CvInlineNotification', () => {
  const kinds = ['error', 'info', 'warning', 'success'];

  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvInlineNotification, ['lowContrast', 'hideCloseButton'], Boolean);
  testComponent.propsAreType(CvInlineNotification, ['actionLabel', 'closeAriaLabel', 'kind'], String);
  testComponent.propsHaveDefault(CvInlineNotification, ['closeAriaLabel', 'kind', 'actionLabel']);

  it('`kind` prop validator works as expected', async () => {
    const propsData = { lowContrast: false };

    const wrapper = await shallow(CvInlineNotification, { propsData });
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
    const propsData = { lowContrast: false, kind: '', actionLabel: 'test action label' };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = await shallow(CvInlineNotification, { propsData });
      expect(wrapper.html()).toMatchSnapshot();
    }
  });

  it('should render correctly when low contrast is used', async () => {
    const propsData = { lowContrast: true, kind: '', actionLabel: 'test action label' };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = await shallow(CvInlineNotification, { propsData });
      expect(wrapper.html()).toMatchSnapshot();
    }
  });

  it('should not render close button when hideCloseButton is true', async () => {
    const propsData = { lowContrast: false, kind: '', actionLabel: 'test action label', hideCloseButton: true };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = await shallow(CvInlineNotification, { propsData });
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
    const propsData = { actionLabel: 'test action label', lowContrast: false, kind: '' };
    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = await shallow(CvInlineNotification, { propsData });
      expect(wrapper.vm.icon).toEqual(kindToIconMapping[kind]);
    }
  });

  it('should emit close event when close button is clicked', async () => {
    const propsData = { actionLabel: 'test action label', lowContrast: false };
    const wrapper = await shallow(CvInlineNotification, { propsData });
    await trigger(wrapper.find('.bx--inline-notification__close-button'), 'click');
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('should emit action event when action button is clicked', async () => {
    const propsData = { actionLabel: 'test action label', lowContrast: false };
    const wrapper = await shallow(CvInlineNotification, { propsData });
    await trigger(wrapper.find('.bx--inline-notification__action-button'), 'click');
    expect(wrapper.emitted().action).toBeTruthy();
  });
});
