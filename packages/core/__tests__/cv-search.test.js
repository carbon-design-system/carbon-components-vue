import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, mount, trigger, setProps } = awaitNextTick;
import { CvSearch } from '@/components/cv-search';
import Search16 from '@carbon/icons-vue/es/search/16';
import Search20 from '@carbon/icons-vue/es/search/20';

describe('CvSearch', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(
    CvSearch,
    ['clearAriaLabel', 'kind', 'label', 'size', 'value', 'placeholder', 'toolbarAriaLabel'],
    String
  );
  testComponent.propsAreType(CvSearch, ['formItem', 'small', 'large'], Boolean);

  testComponent.propsHaveDefault(CvSearch, ['clearAriaLabel', 'formItem', 'placeholder', 'toolbarAriaLabel']);
  testComponent.propsHaveDefaultOfUndefined(CvSearch, ['kind', 'size', 'small', 'large']);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly with only `value` prop set', async () => {
    const propsData = { id: 'test-1', value: 'check-1' };
    const wrapper = await mount(CvSearch, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `size` is small', async () => {
    const propsData = { id: 'test-1', value: 'check-1', size: 'small' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `size` is large', async () => {
    const propsData = { id: 'test-1', value: 'check-1', size: 'large' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `size` is xl', async () => {
    const propsData = { id: 'test-1', value: 'check-1', size: 'xl' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `clearAriaLabel` is set', async () => {
    const propsData = { id: 'test-1', value: 'check-1', clearAriaLabel: 'test clear aria label' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `formItem` is false', async () => {
    const propsData = { id: 'test-1', value: 'check-1', formItem: false };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `kind` is toolbar', async () => {
    const propsData = { id: 'test-1', value: 'check-1', kind: 'toolbar' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `placeholder` is set', async () => {
    const propsData = { id: 'test-1', value: 'check-1', placeholder: 'test placeholder' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `toolbarAriaLabel` is set', async () => {
    const propsData = { id: 'test-1', value: 'check-1', toolbarAriaLabel: 'test toolbar aria label', kind: 'toolbar' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************

  it('`clearVisible` is computed correctly', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.clearVisible).toEqual(value.length);
  });

  it('`internalValue` is computed correctly', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.internalValue).toEqual(value);
  });

  it('`toolbarActive` is initially set correctly', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.toolbarActive).toBeFalsy();
  });

  it('`value` prop should be watched', async () => {
    const propsData = { value: 'test value', id: '1' };
    const wrapper = await shallow(CvSearch, { propsData });

    const newValue = 'qwerty';
    await setProps(wrapper, {
      value: newValue,
    });
    expect(wrapper.vm.internalValue).toEqual(newValue);
    expect(wrapper.vm.clearVisible).toEqual(newValue.length);
  });

  it('`isToolbarKind` is computed correctly, falsy', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value, kind: 'not toolbar' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.isToolbarKind).toBeFalsy();
  });

  it('`isToolbarKind` is computed correctly, truthy', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value, kind: 'toolbar' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.isToolbarKind).toBeTruthy();
  });

  it('`icon` is computed correctly when `size` is xl', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value, size: 'xl' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.icon).toBe(Search20);
  });

  it('`icon` is computed correctly when `size` is small', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value, size: 'small' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.icon).toBe(Search16);
  });

  it('`icon` is computed correctly when `size` is large', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value, size: 'large' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.icon).toBe(Search16);
  });

  it('`internalSize` is computed correctly when `size` is not set and `small` is true', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value, small: true };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.internalSize).toBe('sm');
  });

  it('`internalSize` is computed correctly when `size` is not set and `small` is false', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value, small: false };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.internalSize).toBe('xl');
  });

  it('`internalSize` is computed correctly when `size` is set and `small` is true', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value, small: true, size: 'large' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.internalSize).toBe('lg');
  });

  it('`internalSize` is computed correctly when `size` is set and `small` is false', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value, small: true, size: 'small' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.internalSize).toBe('sm');
  });

  it('`internalSize` is computed correctly when `size` is not correctly and `small` is false', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value, small: true, size: 'sdcdsc' };
    const wrapper = await shallow(CvSearch, { propsData });

    expect(wrapper.vm.internalSize).toBe('xl');
  });

  it('clear button click works as expected', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value };
    const wrapper = await shallow(CvSearch, { propsData });

    await trigger(wrapper.find('button'), 'click');

    expect(wrapper.vm.internalValue).toBe('');
    expect(wrapper.vm.clearVisible).toBeFalsy();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual(['']);
  });

  it('on input event  works as expected', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value };
    const wrapper = await shallow(CvSearch, { propsData });

    const newValue = 'qwerty';
    wrapper.find('input').setValue(newValue);

    expect(wrapper.vm.clearVisible).toBeTruthy();
    expect(wrapper.vm.internalValue).toBe(newValue);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual([newValue]);
  });

  it('`toggleActive` is called with `true` on toolbar button click', async () => {
    const value = 'check-1';
    const propsData = { id: 'test-1', value, kind: 'toolbar' };
    const wrapper = await shallow(CvSearch, { propsData });
    const spy = jest.spyOn(wrapper.vm, 'toggleActive');

    await trigger(wrapper.find('button'), 'click');

    expect(spy).toBeCalledWith(true);
  });
});
