import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import { CvBreadcrumb, CvBreadcrumbSkeleton, CvBreadcrumbItem } from '@/components/cv-breadcrumb';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('CvBreadcrumb', () => {
  testComponent.propsHaveDefault(CvBreadcrumb, ['ariaLabel']);
  testComponent.propsHaveDefault(CvBreadcrumbSkeleton, ['ariaLabel']);

  it('should render with the appropriate kind without trailing slash', () => {
    const propsData = { noTrailingSlash: false };
    const wrapper = shallow(CvBreadcrumb, { propsData });
    expect(wrapper.classes(`${prefix}--breadcrumb`)).toEqual(true);
    expect(wrapper.classes(`${prefix}--breadcrumb--no-trailing-slash`)).toEqual(false);
  });

  it('should render with the appropriate kind with trailing slash', () => {
    const propsData = { noTrailingSlash: true };
    const wrapper = shallow(CvBreadcrumb, { propsData });
    expect(wrapper.classes(`${prefix}--breadcrumb`)).toEqual(true);
    expect(wrapper.classes(`${prefix}--breadcrumb--no-trailing-slash`)).toEqual(true);
  });

  it('has the expected attributes', () => {
    const ariaLabel = 'test';
    const propsData = { noTrailingSlash: true, ariaLabel };
    const wrapper = shallow(CvBreadcrumb, { propsData });
    expect(wrapper.attributes('aria-label')).toEqual(ariaLabel);
  });
  it('is the expected HTML element', () => {
    const propsData = { noTrailingSlash: true };
    const wrapper = shallow(CvBreadcrumb, { propsData });
    expect(wrapper.is('nav')).toBe(true);
  });

  it('has slot element that works as expected', () => {
    const wrapper = shallow(CvBreadcrumb, {
      slots: {
        default: CvBreadcrumbItem,
      },
    });
    expect(wrapper.find(CvBreadcrumbItem).isVueInstance()).toBe(true);
  });
});

describe('CvBreadcrumbItem', () => {
  const wrapper = shallow(CvBreadcrumbItem);

  it('Has the expected classes', () => {
    expect(wrapper.classes(`${prefix}--breadcrumb-item`)).toEqual(true);
  });

  it('is the expected HTML element', () => {
    expect(wrapper.is('div')).toBe(true);
  });
});

describe('CvBreadcrumbSkeleton', () => {
  it('has the expected classes', () => {
    const wrapper = shallow(CvBreadcrumbSkeleton);
    expect(wrapper.classes(`${prefix}--breadcrumb`)).toEqual(true);
    expect(wrapper.classes(`${prefix}--skeleton`)).toEqual(true);
  });

  it('has the expected attributes', () => {
    const ariaLabel = 'test';
    const propsData = { ariaLabel };
    const wrapper = shallow(CvBreadcrumbSkeleton, { propsData });
    expect(wrapper.attributes('aria-label')).toEqual(ariaLabel);
  });

  it('is the expected HTML element', () => {
    const wrapper = shallow(CvBreadcrumbSkeleton);
    expect(wrapper.is('nav')).toBe(true);
  });

  it('has three CvBreadcrumbItemSkeleton components', () => {
    const wrapper = shallow(CvBreadcrumbSkeleton, {
      stubs: {
        CvBreadcrumbItemSkeleton: "<div class='stub'></div>",
      },
    });
    expect(wrapper.findAll('.stub').length).toEqual(3);
  });
});
