import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import { CvTabs, CvTab } from '@/components/cv-tabs';
import { settings } from 'carbon-components';

const { prefix } = settings;

const Tab = {
  name: 'Tab',
  components: { CvTab },
  template: '<cv-tab label="my-label">Some stuff</cv-tab>',
};

describe('CvTabs', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvTabs, ['noDefaultToFirst'], Boolean);

  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches render', () => {
    const propsData = { noDefaultToFirst: false };
    const wrapper = shallow(CvTabs, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches with slotted content', () => {
    const wrapper = shallow(CvTabs, {
      slots: {
        default: [Tab, Tab, Tab],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL CHECKS
  // ***************
  // it('selects the first item by default', () => {
  //   const wrapper = mount(CvTabs, {
  //     slots: {
  //       default: '<cv-tab label="test">test content</cv-tab>',
  //     },
  //   });

  //   expect(wrapper.vm.tabs.length).toBeGreaterThan(0);
  // });
});

describe('CvTab', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvTab, ['label'], String);
  testComponent.propsAreType(CvTab, ['selected', 'disabled'], Boolean);

  testComponent.propsAreRequired(CvTab, ['label']);

  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches with slotted content', () => {
    const propsData = { label: 'Tab label', disabled: false, selected: false, id: 'an-id' };
    const wrapper = shallow(CvTab, {
      propsData,
      slots: {
        default: "<div class='stub'></div>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches with disabled and selected', () => {
    const propsData = { label: 'Tab label', disabled: true, selected: true, id: 'an-id' };
    const wrapper = shallow(CvTab, {
      propsData,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL CHECKS
  // ***************
});
