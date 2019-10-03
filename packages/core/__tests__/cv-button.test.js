import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import { CvButton } from '@/components/cv-button';
import { settings } from 'carbon-components';
import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

const { prefix } = settings;

describe('CvButton', () => {
  describe('Has expected properties', () => {
    testComponent.propsHaveDefault(CvButton, ['kind']);
    testComponent.propsAreType(CvButton, ['iconHref', 'kind'], String);
    testComponent.propsAreType(CvButton, ['icon'], [String, Object]);
  });

  describe('Renders as expected', () => {
    const propsData = { kind: 'secondary', icon: AddFilled16, href: '/home', 'tab-index': 2 };
    const wrapper = shallow(CvButton, { propsData, slots: { default: 'default slot content' } });

    it('should render with the appropriate kind', () => {
      expect(wrapper.classes(`${prefix}--btn`)).toEqual(true);
      expect(wrapper.classes(`${prefix}--btn--secondary`)).toEqual(true);
    });

    it('should render href and tab-index', () => {
      expect(wrapper.attributes('href')).toBe('/home');
      expect(wrapper.attributes('tab-index')).toBe('2');
    });

    it('should render icon', () => {
      const icon = wrapper.find('AddFilled16-stub');
      expect(icon.is('AddFilled16-stub')).toBe(true);
    });

    it('should render default slot content', () => {
      expect(wrapper.html().indexOf('default slot content')).toBeGreaterThan(-1);
    });
  });

  it('Renders a default button as primary', () => {
    const wrapper = shallow(CvButton);
    expect(wrapper.classes(`${prefix}--btn--primary`)).toEqual(true);
  });

  it('Renders a secondary kind button as secondary', () => {
    const wrapper = shallow(CvButton, { propsData: { kind: 'secondary' } });
    expect(wrapper.classes(`${prefix}--btn--secondary`)).toEqual(true);
  });

  it('Renders a tertiary kind button as tertiary', () => {
    const wrapper = shallow(CvButton, { propsData: { kind: 'tertiary' } });
    expect(wrapper.classes(`${prefix}--btn--tertiary`)).toEqual(true);
  });

  it('Renders a ghost kind button as ghost', () => {
    const wrapper = shallow(CvButton, { propsData: { kind: 'ghost' } });
    expect(wrapper.classes(`${prefix}--btn--ghost`)).toEqual(true);
  });

  it('Renders a danger kind button as danger', () => {
    const wrapper = shallow(CvButton, { propsData: { kind: 'danger' } });
    expect(wrapper.classes(`${prefix}--btn--danger`)).toEqual(true);
  });

  it('Renders a danger--primary kind button as danger--primary', () => {
    const wrapper = shallow(CvButton, { propsData: { kind: 'danger--primary' } });
    expect(wrapper.classes(`${prefix}--btn--danger--primary`)).toEqual(true);
  });

  // it('Raises click event when clicked', () => {
  //   const wrapper = shallow(CvButton, {
  //     listeners: {
  //       click: () => {},
  //     },
  //   });
  //   wrapper.find('button').trigger('click');
  //   console.dir(wrapper.emitted());
  //   expect(wrapper.emitted().click).toBeTruthy();

  //   // const button = wrapper.find('button');
  //   // console.dir(button);
  //   // console.log(wrapper.emitted());
  //   // button.trigger('click');
  //   // console.log(wrapper.emitted());
  //   // // expect(button.emitted().click).toBeTruthy();
  //   // expect(wrapper.emitted().click).toBeTruthy();
  // });
});
