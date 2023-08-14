import { shallowMount, mount } from '@vue/test-utils';
import { CvStructuredList, CvStructuredListItem } from '../';

const DefaultId = 'test-1';

describe('CvStructuredList', () => {
  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly when not selectable and not condensed', async () => {
    const propsData = { DefaultId, selectable: false, condensed: false };
    const wrapper = shallowMount(CvStructuredList, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when selectable', async () => {
    const propsData = { DefaultId, selectable: true, condensed: false };
    const wrapper = shallowMount(CvStructuredList, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when condensed', async () => {
    const propsData = { DefaultId, selectable: false, condensed: true };
    const wrapper = shallowMount(CvStructuredList, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when selectable and condensed', async () => {
    const propsData = { DefaultId, selectable: true, condensed: true };
    const wrapper = shallowMount(CvStructuredList, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render `headings` slot correctly', async () => {
    const propsData = { DefaultId, selectable: true, condensed: true };
    const wrapper = shallowMount(CvStructuredList, {
      propsData,
      slots: {
        headings: '<div class="headings-slot-test">Headings slot test</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render `items` slot correctly', async () => {
    const propsData = { DefaultId, selectable: true, condensed: true };
    const wrapper = shallowMount(CvStructuredList, {
      propsData,
      slots: {
        items:
          '<ul class="items-slot-test"><li>Test 1.1</li><li>Test 1.2</li></ul>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('pass on change events', async () => {
    const propsData = { selectable: true, condensed: false };
    const wrapper = mount(CvStructuredList, {
      propsData,
      slots: {
        items: CvStructuredListItem,
      },
    });
    const inputNode = wrapper.find('input');
    await inputNode.trigger('change');

    expect(wrapper.emitted('change')).toBeTruthy();
  });
});
