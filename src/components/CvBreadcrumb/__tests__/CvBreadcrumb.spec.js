import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';

import { CvBreadcrumb, CvBreadcrumbItem } from '@/components/CvBreadcrumb';

describe('CvBreadcrumb', () => {
  it('CvBreadcrumb - default', () => {
    const wrapper = shallowMount(CvBreadcrumb);

    const navTag = wrapper.find('nav');
    expect(navTag.attributes()['aria-label']).toEqual('Breadcrumb');

    const listTag = wrapper.find('ol');
    expect(listTag.classes()).toContain(`${carbonPrefix}--breadcrumb`);
    expect(listTag.classes()).not.toContain(
      `${carbonPrefix}--breadcrumb--no-trailing-slash`
    );
  });

  it('CvBreadcrumb - noTrailingSlash', () => {
    const wrapper = shallowMount(CvBreadcrumb, {
      props: {
        noTrailingSlash: true,
      },
    });

    const listTag = wrapper.find('ol');
    expect(listTag.classes()).toContain(
      `${carbonPrefix}--breadcrumb--no-trailing-slash`
    );
  });
});

describe('CvBreadcrumbItem', () => {
  it('CvBreadcrumbItem - default', () => {
    const wrapper = shallowMount(CvBreadcrumbItem, {
      slots: {
        default: 'Breadcrumb content',
      },
    });

    const tag = wrapper.find('li');
    expect(tag.classes()).toContain(`${carbonPrefix}--breadcrumb-item`);
    expect(tag.classes()).not.toContain(
      `${carbonPrefix}--breadcrumb-item--current`
    );
    expect(tag.text()).toEqual('Breadcrumb content');
  });

  it('CvBreadcrumbItem - current', () => {
    const wrapper = shallowMount(CvBreadcrumbItem, {
      props: {
        isCurrentPage: true,
      },
    });

    const tag = wrapper.find('li');
    expect(tag.classes()).toContain(
      `${carbonPrefix}--breadcrumb-item--current`
    );
  });
});
