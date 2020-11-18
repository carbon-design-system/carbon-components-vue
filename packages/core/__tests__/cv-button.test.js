// import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, trigger } = awaitNextTick;
import { CvButton, CvIconButton, CvButtonSkeleton } from '@/components/cv-button';
import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';
// import { settings as carbonSettings } from 'carbon-components';

// const carbonPrefix = carbonSettings.prefix;

describe('CvButton', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // Deprecated props not tested
  testComponent.propsHaveDefault(CvButton, ['kind']);
  testComponent.propsAreType(CvButton, ['iconHref', 'kind', 'size'], String);
  testComponent.propsAreType(CvButton, ['icon'], [String, Object]);
  testComponent.propsHaveDefaultOfUndefined(CvButton, ['size', 'icon']);

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('Renders as expected field secondary with icon disabled', async () => {
    const propsData = { kind: 'secondary', icon: AddFilled16, 'tab-index': 2, disabled: true, size: 'field' };
    const wrapper = await shallow(CvButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Renders as expected small primary', async () => {
    const propsData = { kind: 'primary', size: 'small' };
    const wrapper = await shallow(CvButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Renders as expected default', async () => {
    const propsData = {};
    const wrapper = await shallow(CvButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('Raises click event when clicked', async () => {
    const wrapper = await shallow(CvButton);
    await trigger(wrapper.find('button'), 'click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
});

describe('CvIconButton', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // Deprecated props not tested
  testComponent.propsHaveDefault(CvIconButton, ['kind']);
  testComponent.propsAreType(
    CvIconButton,
    ['iconHref', 'kind', 'size', 'label', 'tipPosition', 'tipAlignment'],
    String
  );
  testComponent.propsAreType(CvIconButton, ['icon'], [String, Object]);
  testComponent.propsHaveDefault(CvIconButton, ['kind']);
  testComponent.propsHaveDefaultOfUndefined(CvIconButton, ['size', 'icon']);

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('Renders as expected field secondary with icon disabled', async () => {
    const propsData = { kind: 'secondary', icon: AddFilled16, 'tab-index': 2, disabled: true, size: 'field' };
    const wrapper = await shallow(CvIconButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Renders as expected small primary', async () => {
    const propsData = { kind: 'primary', size: 'small' };
    const wrapper = await shallow(CvIconButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Renders size (sm) as expected small primary', async () => {
    const propsData = { kind: 'primary', size: 'sm' };
    const wrapper = await shallow(CvIconButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Renders as expected lg primary', async () => {
    const propsData = { kind: 'primary', size: 'lg' };
    const wrapper = await shallow(CvIconButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Renders as expected lg primary', async () => {
    const propsData = { kind: 'primary', size: 'xl' };
    const wrapper = await shallow(CvIconButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Renders as expected default', async () => {
    const propsData = {};
    const wrapper = await shallow(CvIconButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('Raises click event when clicked', async () => {
    const wrapper = await shallow(CvIconButton);
    await trigger(wrapper.find('button'), 'click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
});

describe('CvButtonSkeleton', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // Deprecated props not tested
  testComponent.propsAreType(CvButtonSkeleton, ['size'], String);
  testComponent.propsHaveDefaultOfUndefined(CvButtonSkeleton, ['size']);

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('Renders as expected field primary', async () => {
    const propsData = { size: 'field' };
    const wrapper = await shallow(CvButtonSkeleton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Renders as expected small primary', async () => {
    const propsData = { size: 'small' };
    const wrapper = await shallow(CvButtonSkeleton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Renders as expected default', async () => {
    const propsData = {};
    const wrapper = await shallow(CvButtonSkeleton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
