// import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, mount, trigger } = awaitNextTick;
import { CvTextArea } from '@/components/cv-text-area';

describe('CvTextArea', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvTextArea, ['helperText', 'invalidMessage', 'label', 'value', 'id'], String);
  testComponent.propsHaveDefaultOfUndefined(CvTextArea, ['helperText', 'invalidMessage', 'light']);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1' };
    const wrapper = await shallow(CvTextArea, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when light theme is used', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1', theme: 'light' };
    const wrapper = await shallow(CvTextArea, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when invalid message is provided', async () => {
    const propsData = { label: 'test label', value: 'test value', invalidMessage: 'invalid test message', id: '1' };
    const wrapper = await shallow(CvTextArea, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when invalid message slot is provided', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1' };
    const wrapper = await shallow(CvTextArea, {
      slots: {
        'invalid-message': '<div class="invalid-message-class">invalid message slot</div>',
      },
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when helper text is provided', async () => {
    const propsData = { label: 'test label', value: 'test value', helperText: 'helper test message', id: '1' };
    const wrapper = await shallow(CvTextArea, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when helper text slot is provided', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1' };
    const wrapper = await shallow(CvTextArea, {
      slots: {
        'helper-text': '<div class="helper-text-class">helper text slot</div>',
      },
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************

  it('inValid should be true when invalid message is provided', async () => {
    const propsData = { label: 'test label', value: 'test value', invalidMessage: 'invalid test message', id: '1' };
    const wrapper = await shallow(CvTextArea, { propsData });
    expect(wrapper.vm.isInvalid).toEqual(true);
  });

  it('inValid should be true when invalid message slot is provided', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1' };
    const wrapper = await mount(CvTextArea, {
      slots: {
        'invalid-message': '<div class="invalid-message-class">invalid message slot</div>',
      },
      propsData,
    });
    expect(wrapper.vm.isInvalid).toEqual(true);
  });

  it('inValid should be false when invalid message slot and invalid message are not provided', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1' };
    const wrapper = await shallow(CvTextArea, { propsData });
    expect(wrapper.vm.isInvalid).toEqual(false);
  });

  it('isHelper should be true when helper text is provided', async () => {
    const propsData = { label: 'test label', value: 'test value', helperText: 'helper text test message', id: '1' };
    const wrapper = await shallow(CvTextArea, { propsData });
    expect(wrapper.vm.isHelper).toEqual(true);
  });

  it('isHelper should be true when helper text slot is provided', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1' };
    const wrapper = await shallow(CvTextArea, {
      slots: {
        'helper-text': '<div class="helper-text-class">helper text slot</div>',
      },
      propsData,
    });
    expect(wrapper.vm.isHelper).toEqual(true);
  });

  it('isHelper should be false when helper text slot and helper text are not provided', async () => {
    const propsData = { label: 'test label', value: 'test value', id: '1' };
    const wrapper = await shallow(CvTextArea, { propsData });
    expect(wrapper.vm.isHelper).toEqual(false);
  });

  it('should emit current value on change', async () => {
    const value = 'test value';
    const propsData = { label: 'test label', value, id: '1' };
    const wrapper = await shallow(CvTextArea, { propsData });
    await trigger(wrapper.find('textarea'), 'input');
    expect(wrapper.emitted().input[0]).toEqual([value]);
  });
});
