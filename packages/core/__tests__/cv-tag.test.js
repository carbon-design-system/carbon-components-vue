// import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance, awaitNextTick } from './_helpers';
const { shallowMount: shallow, mount, trigger } = awaitNextTick;
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
      'high-contrast',
    ];

    for (const kind of kinds) {
      propsData.kind = kind;
      const wrapper = await shallow(CvTag, { propsData });

      expect(wrapper.html()).toMatchSnapshot();
    }
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  testInstance.propStringIsRendered(CvTag, 'label', 'span');

  it('click on close icon emits remove', async () => {
    const propsData = { filter: true, label: 'test' };
    const wrapper = await mount(CvTag, { propsData });

    await trigger(wrapper.find('svg'), 'click');
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
    const wrapper = await shallow(CvTagSkeleton);

    expect(wrapper.html()).toMatchSnapshot();
  });
  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
