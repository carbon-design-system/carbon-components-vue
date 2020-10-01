import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow } = awaitNextTick;
import { CvInlineLoading, STATES } from '@/components/cv-inline-loading';

describe('CvInlineLoading', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvInlineLoading, ['active'], Boolean);
  testComponent.propsAreType(
    CvInlineLoading,
    ['endingText', 'errorText', 'loadingText', 'loadedText', 'state'],
    String
  );
  testComponent.propsHaveDefault(CvInlineLoading, ['endingText', 'errorText', 'loadingText', 'loadedText']);
  testComponent.propsHaveDefaultOfUndefined(CvInlineLoading, ['active', 'state']);

  it('`state` prop validator works as expected', async () => {
    const wrapper = await shallow(CvInlineLoading);
    expect(
      wrapper.vm.$options.props.state.validator && wrapper.vm.$options.props.state.validator(STATES.LOADED)
    ).toBeTruthy();
    expect(
      wrapper.vm.$options.props.state.validator && wrapper.vm.$options.props.state.validator(STATES.ERROR)
    ).toBeTruthy();
    expect(
      wrapper.vm.$options.props.state.validator && wrapper.vm.$options.props.state.validator(STATES.LOADING)
    ).toBeTruthy();
    expect(
      wrapper.vm.$options.props.state.validator && wrapper.vm.$options.props.state.validator(STATES.ENDING)
    ).toBeTruthy();

    // accept lower case
    expect(
      wrapper.vm.$options.props.state.validator &&
        wrapper.vm.$options.props.state.validator(STATES.LOADED.toUpperCase())
    ).toBeTruthy();
    expect(
      wrapper.vm.$options.props.state.validator && wrapper.vm.$options.props.state.validator(STATES.ERROR.toUpperCase())
    ).toBeTruthy();
    expect(
      wrapper.vm.$options.props.state.validator &&
        wrapper.vm.$options.props.state.validator(STATES.LOADING.toUpperCase())
    ).toBeTruthy();
    expect(
      wrapper.vm.$options.props.state.validator &&
        wrapper.vm.$options.props.state.validator(STATES.LOADED.toUpperCase())
    ).toBeTruthy();

    // suppress the error message from the state validator
    const consoleError = console.error;
    console.error = jest.fn();

    expect(wrapper.vm.$options.props.state.validator && wrapper.vm.$options.props.state.validator('TEST')).toBeFalsy();

    // restore
    console.error = consoleError;
  });

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render correctly when state is LOADED`', async () => {
    const propsData = { state: STATES.LOADED, loadedText: 'loaded text test' };
    const wrapper = await shallow(CvInlineLoading, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when state is LOADING`', async () => {
    const propsData = { state: STATES.LOADING, loadingText: 'loading text test' };
    const wrapper = await shallow(CvInlineLoading, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when state is ERROR`', async () => {
    const propsData = { state: STATES.ERROR, errorText: 'error text test' };
    const wrapper = await shallow(CvInlineLoading, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when state is ENDING`', async () => {
    const propsData = { state: STATES.ENDING, errorText: 'ending text test' };
    const wrapper = await shallow(CvInlineLoading, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('`state` prop overrides `active` prop', async () => {
    const propsData = { state: STATES.ERROR, active: true };
    const wrapper = await shallow(CvInlineLoading, { propsData });
    expect(wrapper.vm.internalState).toEqual(STATES.ERROR);
  });

  it('`active` truthy prop results in LOADING `internalState`', async () => {
    const propsData = { active: true };
    const wrapper = await shallow(CvInlineLoading, { propsData });
    expect(wrapper.vm.internalState).toEqual(STATES.LOADING);
  });

  it('`active` falsy prop results in LOADED `internalState`', async () => {
    const propsData = { active: false };
    const wrapper = await shallow(CvInlineLoading, { propsData });
    expect(wrapper.vm.internalState).toEqual(STATES.LOADED);
  });

  it('`stateText` should be equal to `loadedText` prop when state is LOADED', async () => {
    const loadedText = 'loaded text test';
    const propsData = { state: STATES.LOADED, loadedText };
    const wrapper = await shallow(CvInlineLoading, { propsData });
    expect(wrapper.vm.stateText).toEqual(loadedText);
  });

  it('`stateText` should be equal to `errorText` prop when state is ERROR', async () => {
    const errorText = 'error text test';
    const propsData = { state: STATES.ERROR, errorText };
    const wrapper = await shallow(CvInlineLoading, { propsData });
    expect(wrapper.vm.stateText).toEqual(errorText);
  });

  it('`stateText` should be equal to `ending` prop when state is ENDING', async () => {
    const endingText = 'ending text test';
    const propsData = { state: STATES.ENDING, endingText };
    const wrapper = await shallow(CvInlineLoading, { propsData });
    expect(wrapper.vm.stateText).toEqual(endingText);
  });

  it('`stateText` should be equal to `ending` prop when state is LOADING', async () => {
    const loadingText = 'loading text test';
    const propsData = { state: STATES.LOADING, loadingText };
    const wrapper = await shallow(CvInlineLoading, { propsData });
    expect(wrapper.vm.stateText).toEqual(loadingText);
  });
});
