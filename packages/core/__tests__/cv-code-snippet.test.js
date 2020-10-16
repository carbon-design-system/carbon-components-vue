import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, trigger, mount } = awaitNextTick;
import { CvCodeSnippet, CvCodeSnippetSkeleton } from '@/components/cv-code-snippet';

describe('CvCodeSnippet', () => {
  const kinds = ['inline', 'multiline', 'oneline'];

  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvCodeSnippet, ['feedbackAriaLabel', 'copyFeedback', 'kind'], String);
  testComponent.propsHaveDefault(CvCodeSnippet, ['feedbackAriaLabel', 'copyFeedback', 'kind']);

  it('`kind` prop validator works as expected', async () => {
    const wrapper = await shallow(CvCodeSnippet);
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
  it('should render with default props correctly', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvCodeSnippet, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render with set `feedbackAriaLabel` and `copyFeedback` props correctly', async () => {
    const propsData = {
      id: 'test-1',
      feedbackAriaLabel: 'feedback aria label test',
      copyFeedback: 'copy feedback test',
    };
    const wrapper = await shallow(CvCodeSnippet, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when it is `inline`', async () => {
    const propsData = { id: 'test-1', kind: 'inline' };
    const wrapper = await shallow(CvCodeSnippet, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when it is `multiline`', async () => {
    const propsData = { id: 'test-1', kind: 'multiline' };
    const wrapper = await shallow(CvCodeSnippet, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly with slot specified', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvCodeSnippet, {
      slots: {
        default: '<div>Cv code snippet slot</div>',
      },
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('should compute `theComponent` correctly when it is `oneline`', async () => {
    const propsData = { id: 'test-1', kind: 'oneline' };
    const wrapper = await shallow(CvCodeSnippet, { propsData });

    expect(wrapper.vm.theComponent).toEqual('CvCodeSnippetOneline');
  });

  it('should compute `theComponent` correctly when it is `inline`', async () => {
    const propsData = { id: 'test-1', kind: 'inline' };
    const wrapper = await shallow(CvCodeSnippet, { propsData });

    expect(wrapper.vm.theComponent).toEqual('CvCodeSnippetInline');
  });

  it('should compute `theComponent` correctly when it is `multiline`', async () => {
    const propsData = { id: 'test-1', kind: 'multiline' };
    const wrapper = await shallow(CvCodeSnippet, { propsData });

    expect(wrapper.vm.theComponent).toEqual('CvCodeSnippetMultiline');
  });

  it('should copy code to the clipboard on `copy-code` event', async () => {
    const execCommand = document.execCommand;
    document.execCommand = jest.fn();

    const propsData = { id: 'test-1', kind: 'multiline' };

    const wrapper = await mount(CvCodeSnippet, {
      slots: {
        default: '<div>Cv code snippet slot</div>',
      },
      propsData,
    });
    await trigger(wrapper.find('button'), 'click');
    expect(document.execCommand).toHaveBeenCalledWith('copy');

    // restore
    document.execCommand = execCommand;
  });
});

describe('CvCodeSnippetSkeleton', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvCodeSnippetSkeleton, ['kind'], String);
  testComponent.propsHaveDefault(CvCodeSnippetSkeleton, ['kind']);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render with default props correctly', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvCodeSnippetSkeleton, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when it is `multiline`', async () => {
    const propsData = { id: 'test-1', kind: 'multiline' };
    const wrapper = await shallow(CvCodeSnippetSkeleton, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('should compute `multi` correctly when it is `oneline`', async () => {
    const propsData = { id: 'test-1', kind: 'oneline' };
    const wrapper = await shallow(CvCodeSnippetSkeleton, { propsData });

    expect(wrapper.vm.multi).toBeFalsy();
  });

  it('should compute `multi` correctly when it is `multiline`', async () => {
    const propsData = { id: 'test-1', kind: 'multiline' };
    const wrapper = await shallow(CvCodeSnippetSkeleton, { propsData });

    expect(wrapper.vm.multi).toBeTruthy();
  });
});
