import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent } from './_helpers';
import { CvLoading } from '@/components/cv-loading';

describe('CvLoading', () => {
  const RADIUS_SMALL = '26.8125';
  const RADIUS_NORMAL = '37.5';

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
  it('should render correctly when not active, with normal size and not overlayed', () => {
    const propsData = { active: false, small: false, overlay: false };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when active, with normal size and not overlayed', () => {
    const propsData = { active: true, small: false, overlay: false };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when not active, small and not overlayed', () => {
    const propsData = { active: false, small: true, overlay: false };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when active, small and not overlayed', () => {
    const propsData = { active: true, small: true, overlay: false };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when not active, with normal size and overlayed', () => {
    const propsData = { active: false, small: false, overlay: true };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when active, with normal size and overlayed', () => {
    const propsData = { active: true, small: false, overlay: true };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when not active, small and overlayed', () => {
    const propsData = { active: false, small: true, overlay: true };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when active, small and overlayed', () => {
    const propsData = { active: true, small: true, overlay: true };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('should compute loading radius correctly', () => {
    const propsData = { small: false };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.loadingRadius).toEqual(RADIUS_NORMAL);
  });

  it('should compute small loading radius correctly', () => {
    const propsData = { small: true };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.loadingRadius).toEqual(RADIUS_SMALL);
  });

  it('should compute `overlayClasses` correctly when overlay is not used', () => {
    const propsData = { overlay: false };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.overlayClasses).toEqual([]);
  });

  it('should compute `overlayClasses` correctly when overlayed and active', () => {
    const propsData = { overlay: true, active: true };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.overlayClasses).toEqual([loadingOverlayClass]);
  });

  it('should compute `overlayClasses` correctly when overlayed and stopping', () => {
    const propsData = { overlay: true, active: true };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.overlayClasses).toEqual([loadingOverlayClass]);
  });

  it('should compute `overlayClasses` correctly when overlayed and not active or stopped', () => {
    const propsData = { overlay: true, active: false };
    const wrapper = shallow(CvLoading, {
      propsData,
    });
    wrapper.setData({
      stopping: false,
    });
    expect(wrapper.vm.overlayClasses).toEqual([loadingOverlayStopClass]);
  });

  it('animation should be stopped once `active` prop is set to false', () => {
    const propsData = { active: true };
    const wrapper = mount(CvLoading, {
      propsData,
    });
    expect(wrapper.vm.stopping).toEqual(false);

    wrapper.setProps({
      active: false,
    });
    expect(wrapper.vm.stopping).toEqual(true);
    wrapper.trigger('animationend', { animationName: 'rotate-end-p2' });
    expect(wrapper.vm.stopping).toEqual(false);
  });

  it('animation should be continued once `active` prop is set to true again', () => {
    const propsData = { active: false };
    const wrapper = mount(CvLoading, {
      propsData,
    });

    wrapper.setProps({
      active: true,
    });
    expect(wrapper.vm.stopping).toEqual(false);
  });

  it('should emit `loading-end` when animation `rotate-end-p2` stops', () => {
    const propsData = { active: true };
    const wrapper = mount(CvLoading, {
      propsData,
    });
    wrapper.setProps({
      active: false,
    });
    wrapper.trigger('animationend', { animationName: 'rotate-end-p2' });
    expect(wrapper.emitted()['loading-end']).toBeTruthy();
  });

  it('should not emit `loading-end` when animation with the name differed from `rotate-end-p2` stops', () => {
    const propsData = { active: true };
    const wrapper = mount(CvLoading, {
      propsData,
    });
    wrapper.setProps({
      active: false,
    });
    wrapper.trigger('animationend', { animationName: 'not-rotate-end-p2' });
    expect(wrapper.emitted()['loading-end']).toBeFalsy();
  });
});
