import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import { CvButton } from '@/components/cv-button';
import { settings } from 'carbon-components';
import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

const { prefix } = settings;

describe('CvButton', () => {
  testComponent.propsHaveDefault(CvButton, ['kind']);
  testComponent.propsAreType(CvButton, ['iconHref', 'kind'], String);
  testComponent.propsAreType(CvButton, ['icon'], [String, Object]);

  it('should render with the appropriate kind', () => {
    const propsData = { kind: 'primary', icon: AddFilled16 };
    const component = shallow(CvButton, propsData);
    expect(component.classes(`${prefix}--btn`)).toEqual(true);
    expect(component.classes(`${prefix}--btn--primary`)).toEqual(true);
  });

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
