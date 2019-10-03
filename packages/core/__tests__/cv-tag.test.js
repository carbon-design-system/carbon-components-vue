import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import { CvTag, CvTagSkeleton } from '@/components/cv-tag';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('CvTag', () => {
  testComponent.propsAreRequired(CvTag, ['label']);
  testComponent.propsHaveDefault(CvTag, ['kind']);
  testComponent.propsAreType(CvTag, ['label', 'kind'], String);

  testInstance.propStringIsRendered(CvTag, 'label', 'span');

  it('should render with the appropriate kind', () => {
    const propsData = { kind: 'red', label: 'test' };
    const wrapper = shallow(CvTag, { propsData });
    expect(wrapper.classes(`${prefix}--tag`)).toEqual(true);
    expect(wrapper.classes(`${prefix}--tag--red`)).toEqual(true);
  });

  it('click on close icon emits remove', () => {
    const propsData = { kind: 'filter', label: 'test' };
    const wrapper = mount(CvTag, { propsData });

    wrapper.find('svg').trigger('click');
    expect(wrapper.emitted().remove).toBeTruthy();
  });

  it('matches tag snapshot', () => {
    const label = 'I am a tag';
    const kind = 'red';
    const wrapper = shallow(CvTag, {
      propsData: { label, kind },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches tag filter snapshot', () => {
    const label = 'I am a filter tag';
    const kind = 'filter';
    const wrapper = shallow(CvTag, {
      propsData: { label, kind },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('CvTagSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(CvTagSkeleton);

    it('Has the expected classes', () => {
      expect(wrapper.classes(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.classes(`${prefix}--tag`)).toEqual(true);
    });
  });
});
