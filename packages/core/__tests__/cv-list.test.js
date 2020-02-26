import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent } from './_helpers';
import { CvList, CvListItem } from '@/components/cv-list';

describe('CvList', () => {
  const CvListItemWrapper = {
    render() {
      return (
        <CvList nested={true}>
          <CvListItem>test item</CvListItem>
        </CvList>
      );
    },
  };
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvList, ['ordered', 'nested'], Boolean);
  testComponent.propsHaveDefaultOfUndefined(CvList, ['ordered']);

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render correctly when nested and parent is ordered', async () => {
    const propsData = { nested: false, ordered: true };
    const wrapper = mount(CvList, {
      slots: {
        default: CvListItemWrapper,
      },
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when nested and parent is unordered', async () => {
    const propsData = { nested: false, ordered: false };
    const wrapper = mount(CvList, {
      slots: {
        default: CvListItemWrapper,
      },
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when ordered', async () => {
    const propsData = { ordered: true, nested: false };
    const wrapper = shallow(CvList, {
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should render correctly when unordered', async () => {
    const propsData = { ordered: false, nested: false };
    const wrapper = shallow(CvList, {
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly with slots', async () => {
    const wrapper = shallow(CvList, {
      slots: {
        default: CvListItem,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('`internalOrdered` should be computed correctly when ordered', async () => {
    const propsData = { ordered: true, nested: true };
    const wrapper = shallow(CvList, {
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.internalOrdered).toEqual(true);
  });
  it('`internalOrdered` should be computed correctly when unordered', async () => {
    const propsData = { ordered: false, nested: true };
    const wrapper = shallow(CvList, {
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.internalOrdered).toEqual(false);
  });

  it('`internalOrdered` should be computed correctly when nested and parent is ordered', async () => {
    const propsData = { nested: false, ordered: true };
    const wrapper = mount(CvList, {
      slots: {
        default: CvListItemWrapper,
      },
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(CvList).at(1).vm.internalOrdered).toEqual(true);
    expect(wrapper.findAll(CvList).at(0).vm.internalOrdered).toEqual(true);
  });

  it('`internalOrdered` should be computed correctly when nested and parent is unordered', async () => {
    const propsData = { nested: false, ordered: false };
    const wrapper = mount(CvList, {
      slots: {
        default: CvListItemWrapper,
      },
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(CvList).at(1).vm.internalOrdered).toEqual(false);
    expect(wrapper.findAll(CvList).at(0).vm.internalOrdered).toEqual(false);
  });

  it('`tagType` should be computed correctly when ordered', async () => {
    const propsData = { ordered: true };
    const wrapper = shallow(CvList, {
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.tagType).toEqual('ol');
  });
  it('`tagType` should be computed correctly when unordered', async () => {
    const propsData = { ordered: false };
    const wrapper = shallow(CvList, {
      propsData,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.tagType).toEqual('ul');
  });
});

describe('CvListItem', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly without slots', async () => {
    const wrapper = shallow(CvListItem);
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly with slots', async () => {
    const wrapper = shallow(CvListItem, {
      slots: {
        default: '<div class="slot class">slot content</div>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
