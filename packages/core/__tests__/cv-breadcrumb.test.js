import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import { CvBreadcrumb, CvBreadcrumbSkeleton, CvBreadcrumbItem } from '@/components/cv-breadcrumb';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('CvBreadcrumb', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvBreadcrumb, ['ariaLabel'], String);
  testComponent.propsAreType(CvBreadcrumb, ['noTrailingSlash'], Boolean);

  testComponent.propsHaveDefault(CvBreadcrumb, ['ariaLabel']);
  testComponent.propsHaveDefault(CvBreadcrumbSkeleton, ['ariaLabel']);

  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches breadcrumb with trailing slash', () => {
    const propsData = { noTrailingSlash: false };
    const wrapper = shallow(CvBreadcrumb, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches breadcrumb without trailing slash', () => {
    const propsData = { noTrailingSlash: true };
    const wrapper = shallow(CvBreadcrumb, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches breadcrumb with slotted content', () => {
    const wrapper = shallow(CvBreadcrumb, {
      slots: {
        default: CvBreadcrumbItem,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL CHECKS
  // ***************
});

describe('CvBreadcrumbItem', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches breadcrumb item with slotted content', () => {
    const wrapper = shallow(CvBreadcrumbItem, {
      stubs: {
        CvBreadcrumbItem: "<div class='stub'></div>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
  // ***************
  // FUNCTIONAL CHECKS
  // ***************
});

describe('CvBreadcrumbSkeleton', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches breadcrumb item with slotted content', () => {
    const wrapper = shallow(CvBreadcrumbSkeleton);

    expect(wrapper.html()).toMatchSnapshot();
  });
  // ***************
  // FUNCTIONAL CHECKS
  // ***************
});
