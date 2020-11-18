// import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, trigger, setProps } = awaitNextTick;
import { CvTextInput } from '@/components/cv-text-input';

describe('CvTextInput', () => {
  const TYPE_PASSWORD = 'password';
  const TYPE_TEXT = 'text';
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(
    CvTextInput,
    ['helperText', 'invalidMessage', 'label', 'passwordHideLabel', 'passwordShowLabel', 'type', 'value', 'id'],
    String
  );
  testComponent.propsAreType(CvTextInput, ['passwordVisible'], Boolean);
  testComponent.propsHaveDefaultOfUndefined(CvTextInput, ['helperText', 'invalidMessage', 'light']);
  testComponent.propsHaveDefault(CvTextInput, ['passwordHideLabel', 'passwordShowLabel']);

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render correctly', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1', type: TYPE_TEXT };
    const wrapper = await shallow(CvTextInput, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when light theme is used', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1', theme: 'light', type: TYPE_TEXT };
    const wrapper = await shallow(CvTextInput, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when invalid message is provided', async () => {
    const propsData = {
      label: 'test label',
      value: 'test value',
      invalidMessage: 'invalid test message',
      id: '1',
      type: TYPE_TEXT,
    };
    const wrapper = await shallow(CvTextInput, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when invalid message slot is provided', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1', type: TYPE_TEXT };
    const wrapper = await shallow(CvTextInput, {
      slots: {
        'invalid-message': '<div class="invalid-message-class">invalid message slot</div>',
      },
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when helper text is provided', async () => {
    const propsData = {
      label: 'test label',
      value: 'test value',
      helperText: 'helper test message',
      id: '1',
      type: TYPE_TEXT,
    };
    const wrapper = await shallow(CvTextInput, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when helper text slot is provided', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1', type: TYPE_TEXT };
    const wrapper = await shallow(CvTextInput, {
      slots: {
        'helper-text': '<div class="helper-text-class">helper text slot</div>',
      },
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when type is password and is visible', async () => {
    const propsData = {
      label: 'test label',
      value: 'test password value',
      id: '1',
      type: TYPE_PASSWORD,
      passwordVisible: true,
    };
    const wrapper = await shallow(CvTextInput, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should render correctly when type is password and is not visible', async () => {
    const propsData = {
      label: 'test label',
      value: 'test password value',
      id: '1',
      type: TYPE_PASSWORD,
      passwordVisible: false,
    };
    const wrapper = await shallow(CvTextInput, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************

  it('`passwordVisible` prop should be watched', async () => {
    const propsData = { value: 'test value', id: '1', type: TYPE_PASSWORD, passwordVisible: false };
    const wrapper = await shallow(CvTextInput, { propsData });
    const spy = jest.spyOn(wrapper.vm, 'togglePasswordVisibility');
    await setProps(wrapper, {
      passwordVisible: true,
    });
    expect(spy).toBeCalledTimes(1);
  });

  it('`type` prop should be watched', async () => {
    const propsData = { value: 'test value', id: '1', type: TYPE_PASSWORD };
    const wrapper = await shallow(CvTextInput, { propsData });
    expect(wrapper.vm.dataType).toEqual(TYPE_PASSWORD);
    await setProps(wrapper, {
      type: TYPE_TEXT,
    });
    expect(wrapper.vm.dataType).toEqual(TYPE_TEXT);
  });

  it('should emit current value on change', async () => {
    const value = 'test value';
    const propsData = { value, id: '1' };
    const wrapper = await shallow(CvTextInput, { propsData });
    await trigger(wrapper.find('input'), 'input');
    expect(wrapper.emitted().input[0]).toEqual([value]);
  });

  it('`isPassword` should be true when type is `password`', async () => {
    const propsData = { value: 'test value', id: '1', type: TYPE_PASSWORD };
    const wrapper = await shallow(CvTextInput, { propsData });
    expect(wrapper.vm.isPassword).toEqual(true);
  });

  it('`isPassword` should be false when type is not `password`', async () => {
    const propsData = { value: 'test value', id: '1', type: TYPE_TEXT };
    const wrapper = await shallow(CvTextInput, { propsData });
    expect(wrapper.vm.isPassword).toEqual(false);
  });

  it('`isPasswordVisible` should be true when type is `password` and password is visible', async () => {
    const propsData = { value: 'test value', id: '1', type: TYPE_PASSWORD, passwordVisible: true };
    const wrapper = await shallow(CvTextInput, { propsData });
    wrapper.setData({
      dataPasswordVisible: true,
    });
    expect(wrapper.vm.isPasswordVisible).toEqual(true);
  });

  it('`isPasswordVisible` should be false when type is `password` but password is not visible', async () => {
    const propsData = { value: 'test value', id: '1', type: TYPE_PASSWORD, passwordVisible: false };
    const wrapper = await shallow(CvTextInput, { propsData });
    wrapper.setData({
      dataPasswordVisible: false,
    });
    expect(wrapper.vm.isPasswordVisible).toEqual(false);
  });

  it('`isPasswordVisible` should be false when type is not `password` even if `passwordVisible` prop is set to true', async () => {
    const propsData = { value: 'test value', id: '1', type: TYPE_TEXT, passwordVisible: true };
    const wrapper = await shallow(CvTextInput, { propsData });
    wrapper.setData({
      dataPasswordVisible: false,
    });
    expect(wrapper.vm.isPasswordVisible).toEqual(false);
  });

  it('`passwordHideShowLabel` should be equal to `passwordHideLabel` prop when password is visible', async () => {
    const passwordHideLabel = ' password hide label test';
    const propsData = { value: 'test value', id: '1', type: TYPE_PASSWORD, passwordVisible: true, passwordHideLabel };
    const wrapper = await shallow(CvTextInput, { propsData });
    wrapper.setData({
      dataPasswordVisible: true,
    });
    expect(wrapper.vm.passwordHideShowLabel).toEqual(passwordHideLabel);
  });

  it('`passwordHideShowLabel` should be equal to `passwordShowLabel` prop when password is visible', async () => {
    const passwordShowLabel = ' password show label test';
    const propsData = { value: 'test value', id: '1', type: TYPE_PASSWORD, passwordVisible: false, passwordShowLabel };
    const wrapper = await shallow(CvTextInput, { propsData });
    expect(wrapper.vm.passwordHideShowLabel).toEqual(passwordShowLabel);
  });

  it('`togglePasswordVisibility` works as expected', async () => {
    const propsData = { value: 'test value', id: '1', type: TYPE_PASSWORD, passwordVisible: false };
    const wrapper = await shallow(CvTextInput, { propsData });
    expect(wrapper.vm.dataType).toEqual(TYPE_PASSWORD);
    wrapper.vm.togglePasswordVisibility();
    expect(wrapper.vm.dataType).toEqual(TYPE_TEXT);
  });
});
