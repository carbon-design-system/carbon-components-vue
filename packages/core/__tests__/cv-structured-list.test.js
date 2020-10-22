import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, trigger, mount } = awaitNextTick;
import {
  CvStructuredList,
  CvStructuredListItem,
  CvStructuredListHeading,
  CvStructuredListData,
} from '@/components/cv-structured-list';

describe('CvStructuredList', () => {
  const kinds = ['', 'danger'];

  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvStructuredList, ['selectable', 'condensed'], Boolean);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly when not selectable and not condensed', async () => {
    const propsData = { id: 'test-1', selectable: false, condensed: false };
    const wrapper = await shallow(CvStructuredList, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when selectable', async () => {
    const propsData = { id: 'test-1', selectable: true, condensed: false };
    const wrapper = await shallow(CvStructuredList, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when condensed', async () => {
    const propsData = { id: 'test-1', selectable: false, condensed: true };
    const wrapper = await shallow(CvStructuredList, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when selectable and condensed', async () => {
    const propsData = { id: 'test-1', selectable: true, condensed: true };
    const wrapper = await shallow(CvStructuredList, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render `headings` slot correctly', async () => {
    const propsData = { id: 'test-1', selectable: true, condensed: true };
    const wrapper = await shallow(CvStructuredList, {
      propsData,
      slots: {
        headings: '<div class="headings-slot-test">Headings slot test</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render `items` slot correctly', async () => {
    const propsData = { id: 'test-1', selectable: true, condensed: true };
    const wrapper = await shallow(CvStructuredList, {
      propsData,
      slots: {
        items: '<ul class="items-slot-test"><li>Test 1.1</li><li>Test 1.2</li></ul>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('pass on change events', async () => {
    const propsData = { selectable: true, condensed: false };
    const wrapper = await mount(CvStructuredList, {
      propsData,
      slots: {
        items: CvStructuredListItem,
      },
    });
    await trigger(wrapper.find('input'), 'change');
    expect(wrapper.emitted('change')).toBeTruthy();
  });
});

describe('CvStructuredListItem', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvStructuredListItem, ['value', 'modelValue'], String);
  testComponent.propsHaveDefault(CvStructuredListItem, ['value']);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly when `value` is default', async () => {
    const propsData = { id: 'test-1', modelValue: 'test' };
    const wrapper = await shallow(CvStructuredListItem, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `value` is set', async () => {
    const propsData = { id: 'test-1', value: 'strictured list item value test', modelValue: 'test' };
    const wrapper = await shallow(CvStructuredListItem, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when slot is specified', async () => {
    const propsData = { id: 'test-1', modelValue: 'test' };
    const wrapper = await shallow(CvStructuredListItem, {
      propsData,
      slots: {
        default: '<div class="default-slot-test">Default slot test</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('computes `tagType` correctly when selectable', async () => {
    const propsData = { selectable: true, condensed: false };
    const wrapper = await mount(CvStructuredList, {
      propsData,
      slots: {
        items: CvStructuredListItem,
      },
    });
    expect(wrapper.find(CvStructuredListItem).vm.tagType).toEqual('cv-structured-list-item-selectable');
  });

  it('computes `tagType` correctly when not selectable', async () => {
    const propsData = { selectable: false, condensed: false };
    const wrapper = await mount(CvStructuredList, {
      propsData,
      slots: {
        items: CvStructuredListItem,
      },
    });
    expect(wrapper.find(CvStructuredListItem).vm.tagType).toEqual('cv-structured-list-item-standard');
  });

  it('computes `selectable` correctly when selectable', async () => {
    const propsData = { selectable: true, condensed: false };
    const wrapper = await mount(CvStructuredList, {
      propsData,
      slots: {
        items: CvStructuredListItem,
      },
    });
    expect(wrapper.find(CvStructuredListItem).vm.selectable).toBeTruthy();
  });

  it('computes `selectable` correctly when not selectable', async () => {
    const propsData = { selectable: false, condensed: false };
    const wrapper = await mount(CvStructuredList, {
      propsData,
      slots: {
        items: CvStructuredListItem,
      },
    });
    expect(wrapper.find(CvStructuredListItem).vm.selectable).toBeFalsy();
  });
});

describe('CvStructuredListHeading', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvStructuredListHeading, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render with slot correctly', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvStructuredListHeading, {
      propsData,
      slots: {
        default: '<div class="headings-slot-default-test">Headings slot default test</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});

describe('CvStructuredListData', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvStructuredListData, ['noWrap'], Boolean);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly when not wrapped', async () => {
    const propsData = { id: 'test-1', noWrap: true };
    const wrapper = await shallow(CvStructuredListData, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when wrapped', async () => {
    const propsData = { id: 'test-1', noWrap: false };
    const wrapper = await shallow(CvStructuredListData, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
