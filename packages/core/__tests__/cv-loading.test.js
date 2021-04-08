// import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, mount, trigger, setProps } = awaitNextTick;
import { CvLoading } from '@/components/cv-loading';

describe('CvLoading', () => {
  const RADIUS_SMALL = '42';
  const RADIUS_NORMAL = '44';

  const loadingOverlayClass = 'bx--loading-overlay';
  const loadingOverlayStopClass = 'bx--loading-overlay--stop';
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvLoading, ['active', 'overlay', 'small'], Boolean);
  testComponent.propsHaveDefault(CvLoading, ['active']);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly when not active, with normal size and not overlayed', async () => {
    const propsData = { active: false, small: false, overlay: false };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when active, with normal size and not overlayed', async () => {
    const propsData = { active: true, small: false, overlay: false };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when not active, small and not overlayed', async () => {
    const propsData = { active: false, small: true, overlay: false };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when active, small and not overlayed', async () => {
    const propsData = { active: true, small: true, overlay: false };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when not active, with normal size and overlayed', async () => {
    const propsData = { active: false, small: false, overlay: true };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when active, with normal size and overlayed', async () => {
    const propsData = { active: true, small: false, overlay: true };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when not active, small and overlayed', async () => {
    const propsData = { active: false, small: true, overlay: true };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when active, small and overlayed', async () => {
    const propsData = { active: true, small: true, overlay: true };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('should compute loading radius correctly', async () => {
    const propsData = { small: false };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.loadingRadius).toEqual(RADIUS_NORMAL);
  });

  it('should compute small loading radius correctly', async () => {
    const propsData = { small: true };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.loadingRadius).toEqual(RADIUS_SMALL);
  });

  it('should compute `overlayClasses` correctly when overlay is not used', async () => {
    const propsData = { overlay: false };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.overlayClasses).toEqual([]);
  });

  it('should compute `overlayClasses` correctly when overlayed and active', async () => {
    const propsData = { overlay: true, active: true };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.overlayClasses).toEqual([loadingOverlayClass]);
  });

  it('should compute `overlayClasses` correctly when overlayed and stopping', async () => {
    const propsData = { overlay: true, active: true };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.overlayClasses).toEqual([loadingOverlayClass]);
  });

  it('should compute `overlayClasses` correctly when overlayed and not active or stopped', async () => {
    const propsData = { overlay: true, active: false };
    const wrapper = await shallow(CvLoading, {
      propsData,
    });
    wrapper.setData({
      stopping: false,
    });
    expect(wrapper.vm.overlayClasses).toEqual([loadingOverlayStopClass]);
  });

  it('animation should be stopped once `active` prop is set to false', async () => {
    const propsData = { active: true };
    const wrapper = await mount(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.stopping).toEqual(false);

    await setProps(wrapper, {
      active: false,
    });
    expect(wrapper.vm.stopping).toEqual(true);
    await trigger(wrapper, 'animationend', { animationName: 'rotate-end-p2' });
    expect(wrapper.vm.stopping).toEqual(false);
  });

  it('animation should be continued once `active` prop is set to true again', async () => {
    const propsData = { active: false };
    const wrapper = await mount(CvLoading, {
      propsData,
    });

    await setProps(wrapper, {
      active: true,
    });
    expect(wrapper.vm.stopping).toEqual(false);
  });

  it('should emit `loading-end` when animation `rotate-end-p2` stops', async () => {
    const propsData = { active: true };
    const wrapper = await mount(CvLoading, {
      propsData,
    });
    await setProps(wrapper, {
      active: false,
    });
    await trigger(wrapper, 'animationend', { animationName: 'rotate-end-p2' });
    expect(wrapper.emitted()['loading-end']).toBeTruthy();
  });

  it('should not emit `loading-end` when animation with the name differed from `rotate-end-p2` stops', async () => {
    const propsData = { active: true };
    const wrapper = await mount(CvLoading, {
      propsData,
    });
    await setProps(wrapper, {
      active: false,
    });
    await trigger(wrapper, 'animationend', { animationName: 'not-rotate-end-p2' });
    expect(wrapper.emitted()['loading-end']).toBeFalsy();
  });
});
