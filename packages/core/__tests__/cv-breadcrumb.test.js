// import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow } = awaitNextTick;
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
    const wrapper = await shallow(CvBreadcrumb, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches breadcrumb without trailing slash', async () => {
    const propsData = { noTrailingSlash: true };
    const wrapper = await shallow(CvBreadcrumb, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches breadcrumb with slotted content', async () => {
    const wrapper = await shallow(CvBreadcrumb, {
      slots: {
        default: CvBreadcrumbItem,
      },
    });

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
    const wrapper = await shallow(CvBreadcrumbItem);

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
    const wrapper = await shallow(CvBreadcrumbSkeleton);

    expect(wrapper.html()).toMatchSnapshot();
  });
  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
