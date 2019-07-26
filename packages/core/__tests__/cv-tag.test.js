import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import CvTag from '@/components/cv-tag/cv-tag.vue';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('CvTag', () => {
  testComponent.propsAreRequired(CvTag, ['label']);
  testComponent.propsHaveDefault(CvTag, ['kind']);
  testComponent.propsAreType(CvTag, ['label', 'kind'], String);

  testInstance.propStringIsRendered(CvTag, 'label', 'span');

  it('should render with the appropriate kind', () => {
    const propsData = { kind: 'red', label: 'test' };
    const tag = shallow(CvTag, { propsData });
    expect(tag.classes(`${prefix}--tag`)).toEqual(true);
    expect(tag.classes(`${prefix}--tag--red`)).toEqual(true);
  });

  it('should support extra class names', () => {
    const propsData = { kind: 'red', label: 'test', class: 'extra-class or-two' };
    const tag = shallow(CvTag, { propsData });
    expect(tag.classes('extra-class')).toEqual(true);
    expect(tag.classes('or-two')).toEqual(true);
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
