import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent } from './_helpers';
import { CvBreadcrumb, CvBreadcrumbSkeleton, CvBreadcrumbItem } from '@/components/cv-breadcrumb';
// import { settings as carbonSettings } from 'carbon-components';

// const carbonPrefix = carbonSettings.prefix;

describe('CvBreadcrumb', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvBreadcrumb, ['ariaLabel'], String);
  testComponent.propsAreType(CvBreadcrumb, ['noTrailingSlash'], Boolean);

  testComponent.propsHaveDefault(CvBreadcrumb, ['ariaLabel']);
  testComponent.propsHaveDefault(CvBreadcrumbSkeleton, ['ariaLabel']);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('matches breadcrumb with trailing slash', async () => {
    const propsData = { noTrailingSlash: false };
    const wrapper = shallow(CvBreadcrumb, { propsData });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches breadcrumb without trailing slash', async () => {
    const propsData = { noTrailingSlash: true };
    const wrapper = shallow(CvBreadcrumb, { propsData });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches breadcrumb with slotted content', async () => {
    const wrapper = shallow(CvBreadcrumb, {
      slots: {
        default: CvBreadcrumbItem,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});

describe('CvBreadcrumbItem', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('matches breadcrumb item with slotted content', async () => {
    const wrapper = shallow(CvBreadcrumbItem);
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });
  // ***************
  // FUNCTIONAL TESTS
  // ***************
});

describe('CvBreadcrumbSkeleton', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('matches breadcrumb item with slotted content', async () => {
    const wrapper = shallow(CvBreadcrumbSkeleton);
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });
  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
