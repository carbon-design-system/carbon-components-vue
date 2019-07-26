import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import CvButton from '@/components/cv-button/cv-button.vue';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('CvButton', () => {
  testComponent.propsHaveDefault(CvButton, ['kind']);
  testComponent.propsAreType(CvButton, ['iconHref', 'kind'], String);
  testComponent.propsAreType(CvButton, ['icon'], [String, Object]);

  // testInstance.propStringIsRendered(CvButton, 'label', 'span');

  // it('should render with the appropriate kind', () => {
  //   const propsData = { kind: 'red', label: 'test' };
  //   const tag = shallow(CvButton, { propsData });
  //   expect(tag.classes(`${prefix}--tag`)).toEqual(true);
  //   expect(tag.classes(`${prefix}--tag--red`)).toEqual(true);
  // });

  // it('should support extra class names', () => {
  //   const propsData = { kind: 'red', label: 'test', class: 'extra-class or-two-x' };
  //   const tag = shallow(CvButton, { propsData });
  //   expect(tag.classes('extra-class')).toEqual(true);
  //   expect(tag.classes('or-two-x')).toEqual(true);
  // });

  // it('click on close icon emits remove', () => {
  //   const propsData = { kind: 'filter', label: 'test' };
  //   const wrapper = mount(CvButton, { propsData });

  //   wrapper.find('svg').trigger('click');
  //   expect(wrapper.emitted().remove).toBeTruthy();
  // });

  // it('matches tag snapshot', () => {
  //   const label = 'I am a tag';
  //   const kind = 'red';
  //   const wrapper = shallow(CvButton, {
  //     propsData: { label, kind },
  //   });

  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it('matches tag filter snapshot', () => {
  //   const label = 'I am a filter tag';
  //   const kind = 'filter';
  //   const wrapper = shallow(CvButton, {
  //     propsData: { label, kind },
  //   });

  //   expect(wrapper.html()).toMatchSnapshot();
  // });
});
