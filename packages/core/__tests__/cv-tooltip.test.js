import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, trigger, setProps } = awaitNextTick;
import { CvTooltip, CvDefinitionTooltip, CvInteractiveTooltip } from '@/components/cv-tooltip';

describe('CvToopltip', () => {
  const alignments = ['start', 'center', 'end'];
  const directions = ['top', 'left', 'right', 'bottom'];

  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvTooltip, ['alignment', 'direction', 'tip'], String);
  testComponent.propsHaveDefault(CvTooltip, ['alignment', 'direction']);
  testComponent.propsAreRequired(CvTooltip, ['tip']);

  it('`alignment` prop validator works as expected', async () => {
    const propsData = { tip: 'this is a tip' };

    const wrapper = await shallow(CvTooltip, { propsData });
    for (const alignment of alignments) {
      expect(
        wrapper.vm.$options.props.alignment.validator && wrapper.vm.$options.props.alignment.validator(alignment)
      ).toBeTruthy();
    }

    // suppress the error message from the kind validator
    const consoleError = console.error;
    console.error = jest.fn();

    expect(
      wrapper.vm.$options.props.alignment.validator && wrapper.vm.$options.props.alignment.validator('TEST')
    ).toBeFalsy();

    // restore
    console.error = consoleError;
  });

  it('`direction` prop validator works as expected', async () => {
    const propsData = { tip: 'this is a tip' };

    const wrapper = await shallow(CvTooltip, { propsData });
    for (const direction of directions) {
      expect(
        wrapper.vm.$options.props.direction.validator && wrapper.vm.$options.props.direction.validator(direction)
      ).toBeTruthy();
    }

    // suppress the error message from the kind validator
    const consoleError = console.error;
    console.error = jest.fn();

    expect(
      wrapper.vm.$options.props.direction.validator && wrapper.vm.$options.props.direction.validator('TEST')
    ).toBeFalsy();

    // restore
    console.error = consoleError;
  });

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render tooltip: minimal as expected', async () => {
    const propsData = { tip: 'this is a tip' };
    const wrapper = await shallow(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with direction set to `top` as expected', async () => {
    const propsData = { tip: 'this is a tip', direction: 'top' };
    const wrapper = await shallow(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with direction set to `left` as expected', async () => {
    const propsData = { tip: 'this is a tip', direction: 'left' };
    const wrapper = await shallow(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with direction set to `right` as expected', async () => {
    const propsData = { tip: 'this is a tip', direction: 'right' };
    const wrapper = await shallow(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with direction set to `bottom` as expected', async () => {
    const propsData = { tip: 'this is a tip', direction: 'bottom' };
    const wrapper = await shallow(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with aligment set to `start` as expected', async () => {
    const propsData = { tip: 'this is a tip', alignment: 'start' };
    const wrapper = await shallow(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with aligment set to `center` as expected', async () => {
    const propsData = { tip: 'this is a tip', alignment: 'center' };
    const wrapper = await shallow(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with aligment set to `end` as expected', async () => {
    const propsData = { tip: 'this is a tip', alignment: 'end' };
    const wrapper = await shallow(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render tooltip with aligment and direction set as expected', async () => {
    const propsData = { tip: 'this is a tip', alignment: 'end', direction: 'right' };
    const wrapper = await shallow(CvTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});

describe('CvDefinitionTooltip', () => {
  const alignments = ['start', 'center', 'end'];
  const directions = ['top', 'bottom'];

  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvDefinitionTooltip, ['alignment', 'direction', 'definition', 'term'], String);
  testComponent.propsHaveDefault(CvDefinitionTooltip, ['alignment', 'direction']);
  testComponent.propsAreRequired(CvDefinitionTooltip, ['definition', 'term']);

  it('`alignment` prop validator works as expected', async () => {
    const propsData = {
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
    };

    const wrapper = await shallow(CvDefinitionTooltip, { propsData });
    for (const alignment of alignments) {
      expect(
        wrapper.vm.$options.props.alignment.validator && wrapper.vm.$options.props.alignment.validator(alignment)
      ).toBeTruthy();
    }

    // suppress the error message from the kind validator
    const consoleError = console.error;
    console.error = jest.fn();

    expect(
      wrapper.vm.$options.props.alignment.validator && wrapper.vm.$options.props.alignment.validator('TEST')
    ).toBeFalsy();

    // restore
    console.error = consoleError;
  });

  it('`direction` prop validator works as expected', async () => {
    const propsData = {
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
    };

    const wrapper = await shallow(CvDefinitionTooltip, { propsData });
    for (const direction of directions) {
      expect(
        wrapper.vm.$options.props.direction.validator && wrapper.vm.$options.props.direction.validator(direction)
      ).toBeTruthy();
    }

    // suppress the error message from the kind validator
    const consoleError = console.error;
    console.error = jest.fn();

    expect(
      wrapper.vm.$options.props.direction.validator && wrapper.vm.$options.props.direction.validator('TEST')
    ).toBeFalsy();

    // restore
    console.error = consoleError;
  });

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render definition tooltip: minimal as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
    };
    const wrapper = await shallow(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render definition tooltip with direction set to `top` as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
      direction: 'top',
    };
    const wrapper = await shallow(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render definition tooltip with direction set to `bottom` as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
      direction: 'bottom',
    };
    const wrapper = await shallow(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render definition tooltip with aligment set to `start` as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
      alignment: 'start',
    };
    const wrapper = await shallow(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render definition tooltip with aligment set to `center` as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
      alignment: 'center',
    };
    const wrapper = await shallow(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render definition tooltip with aligment set to `end` as expected', async () => {
    const propsData = {
      id: 'test-1',
      definition: 'Brief description of the dotted, underlined term',
      term: 'A term needeing definition',
      alignment: 'end',
    };
    const wrapper = await shallow(CvDefinitionTooltip, { propsData });

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
    const wrapper = await shallow(CvDefinitionTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});

describe('CvInteractiveTooltip', () => {
  const directions = ['top', 'bottom', 'left', 'right'];

  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvInteractiveTooltip, ['direction'], String);
  testComponent.propsAreType(CvInteractiveTooltip, ['visible'], Boolean);
  testComponent.propsHaveDefault(CvInteractiveTooltip, ['direction', 'visible']);

  it('`direction` prop validator works as expected', async () => {
    const propsData = {};

    const wrapper = await shallow(CvInteractiveTooltip, { propsData });
    for (const direction of directions) {
      expect(
        wrapper.vm.$options.props.direction.validator && wrapper.vm.$options.props.direction.validator(direction)
      ).toBeTruthy();
    }

    // suppress the error message from the kind validator
    const consoleError = console.error;
    console.error = jest.fn();

    expect(
      wrapper.vm.$options.props.direction.validator && wrapper.vm.$options.props.direction.validator('TEST')
    ).toBeFalsy();

    // restore
    console.error = consoleError;
  });

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render interactive tooltip: minimal as expected', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with direction set to `top` as expected', async () => {
    const propsData = { id: 'test-1', direction: 'top' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with direction set to `left` as expected', async () => {
    const propsData = { id: 'test-1', direction: 'left' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with direction set to `bottom` as expected', async () => {
    const propsData = { id: 'test-1', direction: 'bottom' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with direction set to `right` as expected', async () => {
    const propsData = { id: 'test-1', direction: 'right' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with visible set to `true` as expected', async () => {
    const propsData = { id: 'test-1', visible: true };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with direction and visible set as expected', async () => {
    const propsData = { id: 'test-1', direction: 'left', visible: true };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.$refs.popup).toMatchSnapshot();
  });

  it('should render interactive tooltip with slot `label` as expected', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvInteractiveTooltip, {
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
    const wrapper = await shallow(CvInteractiveTooltip, {
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
    const wrapper = await shallow(CvInteractiveTooltip, {
      slots: {
        content: '<div>Interactive tooptip content<button>Close tooltip</button></div>',
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
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });
    expect(wrapper.vm.dataVisible).toEqual(false);
  });

  it('computed dataVisible should be true when visible prop is true', async () => {
    const propsData = { visible: true };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });
    expect(wrapper.vm.dataVisible).toEqual(true);
  });

  it('computed dataVisible should be toggled on trigger click', async () => {
    const propsData = { visible: false };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });
    expect(wrapper.vm.dataVisible).toEqual(false);

    await trigger(wrapper.find('button'), 'click');
    expect(wrapper.vm.dataVisible).toEqual(true);

    await trigger(wrapper.find('button'), 'click');
    expect(wrapper.vm.dataVisible).toEqual(false);
  });

  it('`visible` prop should be watched', async () => {
    const propsData = { visible: false };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });
    const spyOnShow = jest.spyOn(wrapper.vm, 'show');
    const spyOnHide = jest.spyOn(wrapper.vm, 'hide');

    await setProps(wrapper, {
      visible: true,
    });

    expect(spyOnShow).toBeCalledTimes(1);

    await setProps(wrapper, {
      visible: false,
    });

    expect(spyOnHide).toBeCalledTimes(1);
  });

  it('`position` is recomputed when popup is visible on `direction` prop change', async () => {
    const propsData = { visible: true };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });
    const spy = jest.spyOn(wrapper.vm, 'position');

    await setProps(wrapper, {
      direction: 'left',
    });

    expect(spy).toBeCalledTimes(1);
  });

  it('`position` is not recomputed when popup is not visible on `direction` prop change', async () => {
    const propsData = { visible: false };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });
    const spy = jest.spyOn(wrapper.vm, 'position');

    await setProps(wrapper, {
      direction: 'left',
    });

    expect(spy).toBeCalledTimes(0);
  });

  it('`position` is recomputed on `visible` prop change', async () => {
    const propsData = { visible: false };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });
    const spy = jest.spyOn(wrapper.vm, 'position');

    await setProps(wrapper, {
      visible: true,
    });

    expect(spy).toBeCalledTimes(1);
  });

  it('`left` and `top` are computed correctly when direction is `top`', async () => {
    const propsData = { visible: true, direction: 'top' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.left).toEqual(0.5);
    expect(wrapper.vm.top).toEqual(-15);
  });

  it('`left` and `top` are computed correctly when direction is `bottom`', async () => {
    const propsData = { visible: true, direction: 'bottom' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.left).toEqual(0.5);
    expect(wrapper.vm.top).toEqual(10);
  });

  it('`left` and `top` are computed correctly when direction is `left`', async () => {
    const propsData = { visible: true, direction: 'left' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.left).toEqual(-10);
    expect(wrapper.vm.top).toEqual(-0.25);
  });

  it('`left` and `top` are computed correctly when direction is `right`', async () => {
    const propsData = { visible: true, direction: 'right' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.left).toEqual(15);
    expect(wrapper.vm.top).toEqual(-0.25);
  });

  it('`contentAfter` is computed correctly when direction is `right`', async () => {
    const propsData = { visible: true, direction: 'right' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.contentAfter).toBeTruthy();
  });

  it('`contentAfter` is computed correctly when direction is `bottom`', async () => {
    const propsData = { visible: true, direction: 'bottom' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.contentAfter).toBeTruthy();
  });

  it('`contentAfter` is computed correctly when direction is `left`', async () => {
    const propsData = { visible: true, direction: 'left' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.contentAfter).toBeFalsy();
  });

  it('`contentAfter` is computed correctly when direction is `top`', async () => {
    const propsData = { visible: true, direction: 'top' };
    const wrapper = await shallow(CvInteractiveTooltip, { propsData });

    expect(wrapper.vm.contentAfter).toBeFalsy();
  });

  it('`beforeContent` is focused on tab if `contentAfter` exists', async () => {
    const propsData = { visible: true, direction: 'right' };
    const wrapper = await shallow(CvInteractiveTooltip, {
      propsData,
    });
    await trigger(wrapper.find('button'), 'keydown.tab');

    expect(wrapper.vm.$refs.beforeContent).toBe(document.activeElement);
  });

  it('`afterContent` is focused on shift tab if `contentAfter` does not exist', async () => {
    const propsData = { visible: true, direction: 'top' };
    const wrapper = await shallow(CvInteractiveTooltip, {
      propsData,
    });
    const spy = jest.spyOn(wrapper.vm, 'focusAfterContent');
    await trigger(wrapper.find('button'), 'keydown.tab', { shiftKey: true });
    expect(wrapper.vm.$refs.afterContent).toBe(document.activeElement);
  });

  it('`positionListen` is called with `false` on wrapper destroy', async () => {
    const propsData = { visible: false };
    const wrapper = await shallow(CvInteractiveTooltip, {
      propsData,
    });
    const spy = jest.spyOn(wrapper.vm, 'positionListen');
    wrapper.destroy();
    expect(spy).toBeCalledWith(false);
  });

  it('`preventFocusOut` is called on popup mousedown event', async () => {
    const id = 'test';
    const propsData = { visible: true, id };
    const wrapper = await shallow(CvInteractiveTooltip, {
      propsData,
    });
    const spy = jest.spyOn(wrapper.vm, 'preventFocusOut');
    await trigger(wrapper.find(`#${id}`), 'mousedown.prevent');
    expect(spy).toBeCalled();
  });
});
