import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import { CvButton, CvIconButton, CvButtonSkeleton } from '@/components/cv-button';
import { settings as carbonSettings } from 'carbon-components';
import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

const carbonPrefix = carbonSettings.prefix;

describe('CvButton', () => {
  // ***************
  // PROP CHECKS
  // ***************
  describe('Has expected properties', () => {
    // Deprecated props not tested
    testComponent.propsHaveDefault(CvButton, ['kind']);
    testComponent.propsAreType(CvButton, ['iconHref', 'kind', 'size'], String);
    testComponent.propsAreType(CvButton, ['icon'], [String, Object]);
    testComponent.propsHaveDefault(CvButton, ['kind']);
    testComponent.propsHaveDefaultOfUndefined(CvButton, ['size', 'icon']);
  });

  // ***************
  // SNAPSHOT TESTS
  // ***************

  describe('Renders as expected field secondary with icon disabled', () => {
    const propsData = { kind: 'secondary', icon: AddFilled16, 'tab-index': 2, disabled: true, size: 'field' };
    const wrapper = shallow(CvButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Renders as expected small primary', () => {
    const propsData = { kind: 'primary', size: 'small' };
    const wrapper = shallow(CvButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Renders as expected default', () => {
    const propsData = {};
    const wrapper = shallow(CvButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('Raises click event when clicked', () => {
    const wrapper = shallow(CvButton);
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
});

describe('CvIconButton', () => {
  // ***************
  // PROP CHECKS
  // ***************
  describe('Has expected properties', () => {
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
  });

  // ***************
  // SNAPSHOT TESTS
  // ***************

  describe('Renders as expected field secondary with icon disabled', () => {
    const propsData = { kind: 'secondary', icon: AddFilled16, 'tab-index': 2, disabled: true, size: 'field' };
    const wrapper = shallow(CvIconButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Renders as expected small primary', () => {
    const propsData = { kind: 'primary', size: 'small' };
    const wrapper = shallow(CvIconButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Renders as expected default', () => {
    const propsData = {};
    const wrapper = shallow(CvIconButton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('Raises click event when clicked', () => {
    const wrapper = shallow(CvIconButton);
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
});

describe('CvButtonSkeleton', () => {
  // ***************
  // PROP CHECKS
  // ***************
  describe('Has expected properties', () => {
    // Deprecated props not tested
    testComponent.propsAreType(CvButtonSkeleton, ['size'], String);
    testComponent.propsHaveDefaultOfUndefined(CvButtonSkeleton, ['size']);
  });

  // ***************
  // SNAPSHOT TESTS
  // ***************

  describe('Renders as expected small primary', () => {
    const propsData = { size: 'field' };
    const wrapper = shallow(CvButtonSkeleton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Renders as expected small primary', () => {
    const propsData = { size: 'small' };
    const wrapper = shallow(CvButtonSkeleton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Renders as expected default', () => {
    const propsData = {};
    const wrapper = shallow(CvButtonSkeleton, { propsData, slots: { default: 'default slot content' } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
