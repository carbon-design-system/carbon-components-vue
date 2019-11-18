import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent } from './_helpers';
import { CvLink } from '@/components/cv-link';

describe('CvLink', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvLink, ['inline', 'disabled'], Boolean);
  testComponent.propsAreType(CvLink, ['to', 'href'], String);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly when it is not `inline`', () => {
    const propsData = { inline: false };
    const wrapper = shallow(CvLink, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when it is `inline`', () => {
    const propsData = { inline: true };
    const wrapper = shallow(CvLink, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `disabled`', () => {
    const propsData = { disabled: true };
    const wrapper = shallow(CvLink, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // The test below gives the following warning:
  // [Vue warn]: Unknown custom element: <router-link> - did you register the component correctly?
  // Could not get rid of it using localVue and vue-router or stubs. That's why it is commented out.
  // it('should render correctly when `router-link` is used', () => {
  //   const propsData = { to: '/test' };
  //   const wrapper = shallow(
  //     CvLink,
  //     { propsData },
  //     {
  //       stubs: ['router-link'],
  //     }
  //   );
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  it('should render correctly when `<a>` is used', () => {
    const propsData = { href: '/test' };
    const wrapper = shallow(CvLink, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************

  it('`linkProps` should be computed correctly when `disabled`', () => {
    const propsData = { href: '/test', to: '/test', disabled: true };
    const wrapper = shallow(CvLink, { propsData });
    expect(wrapper.vm.linkProps).toEqual({ 'aria-disabled': true });
  });

  // The test below gives the following warning:
  // [Vue warn]: Unknown custom element: <router-link> - did you register the component correctly?
  // Could not get rid of it using localVue and vue-router or stubs. That's why it is commented out
  // it('`linkProps` should be computed correctly when `to` is specified and `href` not', () => {
  //   const to = '/test';
  //   const propsData = { to };
  //   const wrapper = shallow(CvLink, { propsData });
  //   expect(wrapper.vm.linkProps).toEqual({ to });
  // });

  it('`linkProps` should be computed correctly when `href` and `to` are specified', () => {
    const to = '/test';
    const href = '/nottest';
    const propsData = { to, href };
    const wrapper = shallow(CvLink, { propsData });
    expect(wrapper.vm.linkProps).toEqual({ href });
  });

  it('`tagType` should be computed correctly when `href` and `to` are specified', () => {
    const to = '/test';
    const href = '/nottest';
    const propsData = { to, href };
    const wrapper = shallow(CvLink, { propsData });
    expect(wrapper.vm.tagType).toEqual('a');
  });

  // The test below gives the following warning:
  // [Vue warn]: Unknown custom element: <router-link> - did you register the component correctly?
  // Could not get rid of it using localVue and vue-router or stubs. That's why it is commented out
  // it('`tagType` should be computed correctly when `to` is specified and `href` not', () => {
  //   const to = '/test';
  //   const propsData = { to };
  //   const wrapper = shallow(CvLink, { propsData });
  //   expect(wrapper.vm.tagType).toEqual('router-link');
  // });
});
