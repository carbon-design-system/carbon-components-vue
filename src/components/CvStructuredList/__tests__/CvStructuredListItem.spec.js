import { shallowMount, mount } from '@vue/test-utils';
import { CvStructuredList, CvStructuredListItem } from '../';

const DefaultId = 'test-2';
const ListItemSelectableSelector = '.cv-structured-list-item--selectable';
const ListItemStandardSelector = '.cv-structured-list-item--standard';

describe('CvStructuredListItem', () => {
  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly when `value` is default', async () => {
    const propsData = { id: DefaultId, modelValue: 'test' };
    const wrapper = shallowMount(CvStructuredListItem, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `value` is set', async () => {
    const propsData = {
      id: DefaultId,
      value: 'strictured list item value test',
      modelValue: 'test',
    };
    const wrapper = shallowMount(CvStructuredListItem, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when slot is specified', async () => {
    const propsData = { id: DefaultId, modelValue: 'test' };
    const wrapper = shallowMount(CvStructuredListItem, {
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
  it('computes `tagType` correctly when selectable is true', async () => {
    const propsData = { selectable: true };
    const wrapper = mount(CvStructuredList, {
      propsData,
      slots: {
        items: CvStructuredListItem,
      },
    });

    const listItemNode = wrapper.find(ListItemSelectableSelector);

    expect(listItemNode.exists()).toBe(true);
  });

  it('computes `tagType` correctly when not selectable', async () => {
    const propsData = { selectable: false, condensed: false };
    const wrapper = mount(CvStructuredList, {
      propsData,
      slots: {
        items: CvStructuredListItem,
      },
    });

    const listItemNode = wrapper.find(ListItemStandardSelector);

    expect(listItemNode.exists()).toBe(true);
  });
});
