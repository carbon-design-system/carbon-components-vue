// import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow } = awaitNextTick;
import { CvLink } from '@/components/cv-link';

describe('CvLink', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvLink, ['inline', 'disabled'], Boolean);
  testComponent.propsAreType(CvLink, ['href'], String);
  testComponent.propsAreType(CvLink, ['to'], [String, Object]);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render correctly when it is not `inline`', async () => {
    const propsData = { inline: false };
    const wrapper = await shallow(CvLink, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when it is `inline`', async () => {
    const propsData = { inline: true };
    const wrapper = await shallow(CvLink, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when `disabled`', async () => {
    const propsData = { disabled: true };
    const wrapper = await shallow(CvLink, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // The test below gives the following warning:
  // [Vue warn]: Unknown custom element: <router-link> - did you register the component correctly?
  // Could not get rid of it using localVue and vue-router or stubs. That's why it is commented out.
  // it('should render correctly when `router-link` is used', async () => {
  //   const propsData = { to: '/test' };
  //   const wrapper = await shallow(
  //     CvLink,
  //     { propsData },
  //     {
  //       stubs: ['router-link'],
  //     }
  //   );
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  it('should render correctly when `<a>` is used', async () => {
    const propsData = { href: '/test' };
    const wrapper = await shallow(CvLink, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************

  it('`linkProps` should be computed correctly when `disabled`', async () => {
    const propsData = { href: '/test', to: '/test', disabled: true };
    const wrapper = await shallow(CvLink, { propsData });
    expect(wrapper.vm.linkProps).toEqual({ 'aria-disabled': true });
  });

  // The test below gives the following warning:
  // [Vue warn]: Unknown custom element: <router-link> - did you register the component correctly?
  // Could not get rid of it using localVue and vue-router or stubs. That's why it is commented out
  // it('`linkProps` should be computed correctly when `to` is specified and `href` not', async () => {
  //   const to = '/test';
  //   const propsData = { to };
  //   const wrapper = await shallow(CvLink, { propsData });
  //   expect(wrapper.vm.linkProps).toEqual({ to });
  // });

  it('`linkProps` should be computed correctly when `href` and `to` are specified', async () => {
    const to = '/test';
    const href = '/nottest';
    const propsData = { to, href };
    const wrapper = await shallow(CvLink, { propsData });
    expect(wrapper.vm.linkProps).toEqual({ href });
  });

  it('`tagType` should be computed correctly when `href` and `to` are specified', async () => {
    const to = '/test';
    const href = '/nottest';
    const propsData = { to, href };
    const wrapper = await shallow(CvLink, { propsData });
    expect(wrapper.vm.tagType).toEqual('a');
  });

  // The test below gives the following warning:
  // [Vue warn]: Unknown custom element: <router-link> - did you register the component correctly?
  // Could not get rid of it using localVue and vue-router or stubs. That's why it is commented out
  // it('`tagType` should be computed correctly when `to` is specified and `href` not', async () => {
  //   const to = '/test';
  //   const propsData = { to };
  //   const wrapper = await shallow(CvLink, { propsData });
  //   expect(wrapper.vm.tagType).toEqual('router-link');
  // });
});
