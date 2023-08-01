import { shallowMount } from '@vue/test-utils';
import { render, cleanup } from '@testing-library/vue';
import { CvTooltip, CvDefinitionTooltip, CvInteractiveTooltip } from '../index';
import { carbonPrefix } from '../../../global/settings';

describe('CvToopltip', () => {
  afterEach(() => {
    cleanup();
  });
  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render tooltip: minimal as expected', async () => {
    const propsData = { tip: 'this is a tip' };
    const wrapper = shallowMount(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with direction set to `top` as expected', async () => {
    const propsData = { tip: 'this is a tip', direction: 'top' };
    const wrapper = shallowMount(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with direction set to `left` as expected', async () => {
    const propsData = { tip: 'this is a tip', direction: 'left' };
    const wrapper = shallowMount(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with direction set to `right` as expected', async () => {
    const propsData = { tip: 'this is a tip', direction: 'right' };
    const wrapper = shallowMount(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with direction set to `bottom` as expected', async () => {
    const propsData = { tip: 'this is a tip', direction: 'bottom' };
    const wrapper = shallowMount(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with aligment set to `start` as expected', async () => {
    const propsData = { tip: 'this is a tip', alignment: 'start' };
    const wrapper = shallowMount(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with aligment set to `center` as expected', async () => {
    const propsData = { tip: 'this is a tip', alignment: 'center' };
    const wrapper = shallowMount(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with aligment set to `end` as expected', async () => {
    const propsData = { tip: 'this is a tip', alignment: 'end' };
    const wrapper = shallowMount(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with aligment and direction set as expected', async () => {
    const propsData = {
      tip: 'this is a tip',
      alignment: 'end',
      direction: 'right',
    };
    const wrapper = shallowMount(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});

describe('CvDefinitionTooltip', () => {
  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render definition tooltip: minimal as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
    };
    const wrapper = shallowMount(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render definition tooltip with direction set to `top` as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
      direction: 'top',
    };
    const wrapper = shallowMount(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render definition tooltip with direction set to `bottom` as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
      direction: 'bottom',
    };
    const wrapper = shallowMount(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render definition tooltip with aligment set to `start` as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
      alignment: 'start',
    };
    const wrapper = shallowMount(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render definition tooltip with aligment set to `center` as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
      alignment: 'center',
    };
    const wrapper = shallowMount(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render definition tooltip with aligment set to `end` as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
      alignment: 'end',
    };
    const wrapper = shallowMount(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render definition tooltip with aligment and direction set as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
      alignment: 'end',
      direction: 'bottom',
    };
    const wrapper = shallowMount(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});

describe('CvInteractiveTooltip', () => {
  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render interactive tooltip: minimal as expected', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with direction set to `top` as expected', async () => {
    const propsData = { id: 'test-1', direction: 'top' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with direction set to `left` as expected', async () => {
    const propsData = { id: 'test-1', direction: 'left' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with direction set to `bottom` as expected', async () => {
    const propsData = { id: 'test-1', direction: 'bottom' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with direction set to `right` as expected', async () => {
    const propsData = { id: 'test-1', direction: 'right' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with visible set to `true` as expected', async () => {
    const propsData = { id: 'test-1', visible: true };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with direction and visible set as expected', async () => {
    const propsData = { id: 'test-1', direction: 'left', visible: true };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with slot `label` as expected', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = shallowMount(CvInteractiveTooltip, {
      slots: {
        label: '<div>Interactive tooptip label</div>',
      },
      propsData,
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with slot `trigger` as expected', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = shallowMount(CvInteractiveTooltip, {
      slots: {
        trigger: '<div>Interactive tooptip trigger</div>',
      },
      propsData,
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with slot `content` as expected', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = shallowMount(CvInteractiveTooltip, {
      slots: {
        content:
          '<div>Interactive tooptip content<button>Close tooltip</button></div>',
      },
      propsData,
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('computed dataVisible should be false when visible prop is false', async () => {
    const propsData = { visible: false };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });
    expect(wrapper.vm.dataVisible).toEqual(false);
  });

  it('computed dataVisible should be true when visible prop is true', async () => {
    const propsData = { visible: true };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });
    expect(wrapper.vm.dataVisible).toEqual(true);
  });

  it('computed dataVisible should be toggled on trigger click', async () => {
    const propsData = { visible: false };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });
    expect(wrapper.vm.dataVisible).toEqual(false);

    await wrapper.find('button')?.trigger('click');
    expect(wrapper.vm.dataVisible).toEqual(true);

    await wrapper.find('button')?.trigger('click');
    expect(wrapper.vm.dataVisible).toEqual(false);
  });

  const testTooltipNodeVisibility = async isVisible => {
    const tooltipNode = document.querySelector(`.${carbonPrefix}--tooltip`);
    const hasVisibleClass = tooltipNode.classList.contains(
      `${carbonPrefix}--tooltip--shown`
    );
    await expect(hasVisibleClass).toBe(isVisible);
  };
  it('`visible` prop toggles tooltip', async () => {
    const { rerender } = await render(CvInteractiveTooltip, {
      componentProperties: { visible: false },
    });

    await testTooltipNodeVisibility(false);

    await rerender({ visible: true });
    await testTooltipNodeVisibility(true);
  });

  it('`position` is recomputed when popup is visible on `direction` prop change', async () => {
    const propsData = { visible: true };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });
    const spy = jest.spyOn(wrapper.vm, 'position');

    await wrapper.setProps({
      direction: 'left',
    });

    expect(spy).toBeCalledTimes(1);
  });

  it('`position` is not recomputed when popup is not visible on `direction` prop change', async () => {
    const propsData = { visible: false };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });
    const spy = jest.spyOn(wrapper.vm, 'position');

    await wrapper.setProps({
      direction: 'left',
    });

    expect(spy).toBeCalledTimes(0);
  });

  it('`position` is recomputed on `visible` prop change', async () => {
    const propsData = { visible: false };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });
    const spy = jest.spyOn(wrapper.vm, 'position');

    await wrapper.setProps({
      visible: true,
    });

    expect(spy).toBeCalledTimes(1);
  });

  it('`left` and `top` are computed correctly when direction is `top`', async () => {
    const propsData = { visible: true, direction: 'top' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.left).toEqual(0.5);
    expect(wrapper.vm.top).toEqual(-15);
  });

  it('`left` and `top` are computed correctly when direction is `bottom`', async () => {
    const propsData = { visible: true, direction: 'bottom' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.left).toEqual(0.5);
    expect(wrapper.vm.top).toEqual(10);
  });

  it('`left` and `top` are computed correctly when direction is `left`', async () => {
    const propsData = { visible: true, direction: 'left' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.left).toEqual(-10);
    expect(wrapper.vm.top).toEqual(-0.25);
  });

  it('`left` and `top` are computed correctly when direction is `right`', async () => {
    const propsData = { visible: true, direction: 'right' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.left).toEqual(15);
    expect(wrapper.vm.top).toEqual(-0.25);
  });

  it('`contentAfter` is computed correctly when direction is `right`', async () => {
    const propsData = { visible: true, direction: 'right' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.contentAfter).toBeTruthy();
  });

  it('`contentAfter` is computed correctly when direction is `bottom`', async () => {
    const propsData = { visible: true, direction: 'bottom' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.contentAfter).toBeTruthy();
  });

  it('`contentAfter` is computed correctly when direction is `left`', async () => {
    const propsData = { visible: true, direction: 'left' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.contentAfter).toBeFalsy();
  });

  it('`contentAfter` is computed correctly when direction is `top`', async () => {
    const propsData = { visible: true, direction: 'top' };
    const wrapper = shallowMount(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.contentAfter).toBeFalsy();
  });

  it('`beforeContent` is focused on tab if `contentAfter` exists', async () => {
    const propsData = { visible: true, direction: 'right' };
    const wrapper = shallowMount(CvInteractiveTooltip, {
      propsData,
    });
    await wrapper.find('button')?.trigger('keydown.tab');

    expect(wrapper.vm.$refs.beforeContent).toBe(document.activeElement);
  });

  it('`afterContent` is focused on shift tab if `contentAfter` does not exist', async () => {
    const propsData = { visible: true, direction: 'top' };
    const wrapper = shallowMount(CvInteractiveTooltip, {
      propsData,
    });
    jest.spyOn(wrapper.vm, 'focusAfterContent');
    await wrapper.find('button')?.trigger('keydown.tab', { shiftKey: true });
    expect(wrapper.vm.$refs.afterContent).toBe(document.activeElement);
  });

  it('`positionListen` is called with `false` on wrapper destroy', async () => {
    const propsData = { visible: false };
    const wrapper = shallowMount(CvInteractiveTooltip, {
      propsData,
    });
    const spy = jest.spyOn(wrapper.vm, 'positionListen');
    wrapper.destroy();
    expect(spy).toBeCalledWith(false);
  });

  it('`preventFocusOut` is called on popup mousedown event', async () => {
    const id = 'test';
    const propsData = { visible: true, id };
    const wrapper = shallowMount(CvInteractiveTooltip, {
      propsData,
    });
    const spy = jest.spyOn(wrapper.vm, 'preventFocusOut');
    await wrapper.find(`#${id}`)?.trigger('mousedown.prevent');
    expect(spy).toBeCalled();
  });
});
