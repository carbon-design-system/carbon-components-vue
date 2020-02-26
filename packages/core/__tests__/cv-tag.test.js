import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import { CvTag, CvTagSkeleton } from '@/components/cv-tag';
// import { settings as carbonSettings } from 'carbon-components';

// const carbonPrefix = carbonSettings.prefix;

describe('CvTag', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreRequired(CvTag, ['label']);
  testComponent.propsHaveDefault(CvTag, ['kind', 'clearAriaLabel']);

  testComponent.propsAreType(CvTag, ['label', 'kind', 'clearAriaLabel'], String);
  testComponent.propsAreType(CvTag, ['disabled'], Boolean);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('should render', async () => {
    const propsData = { kind: '', label: 'test' };
    const kinds = [
      'filter',
      'red',
      'magenta',
      'purple',
      'blue',
      'cyan',
      'teal',
      'green',
      'gray',
      'cool-gray',
      'warm-gray',
    ];

    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = shallow(CvTag, { propsData });
      await wrapper.vm.$nextTick();

      expect(wrapper.html()).toMatchSnapshot();
    }
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  testInstance.propStringIsRendered(CvTag, 'label', 'span');

  it('click on close icon emits remove', async () => {
    const propsData = { kind: 'filter', label: 'test' };
    const wrapper = mount(CvTag, { propsData });
    await wrapper.vm.$nextTick();

    wrapper.find('svg').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().remove).toBeTruthy();
  });
});

describe('CvTagSkeleton', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('Renders as expected', async () => {
    const wrapper = shallow(CvTagSkeleton);
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });
  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
