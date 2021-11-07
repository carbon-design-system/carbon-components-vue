import Vue from 'vue';
// import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, events, awaitNextTick } from './_helpers';
const { shallowMount: shallow, mount, trigger } = awaitNextTick;
import { CvTabs, CvTab } from '@/components/cv-tabs';
import { settings as carbonSettings } from 'carbon-components';

const carbonPrefix = carbonSettings.prefix;

const TAB = function(props) {
  return {
    name: 'Tab',
    components: { CvTab },
    template: `<cv-tab ${props}>Some stuff</cv-tab>`,
    created() {
      events.reEmit(this, this.$parent, ['cv:mounted', 'cv:beforeDestory', 'cv:selected', 'cv:disabled', 'cv:enabled']);
    },
  };
};

const Tab = TAB('label="my-label"');
const TabSelected = TAB('label="my-label" selected');

describe('CvTabs', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvTabs, ['noDefaultToFirst'], Boolean);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('matches render', async () => {
    const propsData = { noDefaultToFirst: false };
    const wrapper = await shallow(CvTabs, {
      propsData,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches with slotted content', async () => {
    const wrapper = await shallow(CvTabs, {
      slots: {
        default: [Tab, Tab, Tab],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('tabs to be mounted with first selected', async () => {
    const wrapper = await mount(CvTabs, {
      slots: {
        default: [Tab, Tab, Tab],
      },
    });

    await Vue.nextTick();
    expect(wrapper.vm.tabs.length).toBeGreaterThan(0);
    expect(wrapper.vm.tabs[0].dataSelected).toBeTruthy();
  });

  it('tabs to be mounted with none selected', async () => {
    const propsData = {
      noDefaultToFirst: true,
    };
    const wrapper = await mount(CvTabs, {
      propsData,
      slots: {
        default: [Tab, Tab, Tab],
      },
    });

    expect(wrapper.vm.tabs[0].dataSelected).toBeFalsy();
  });

  it('tabs to be mounted with 2nd selected', async () => {
    const propsData = {
      noDefaultToFirst: false,
    };
    const wrapper = await mount(CvTabs, {
      propsData,
      slots: {
        default: [Tab, TabSelected, Tab],
      },
    });

    expect(wrapper.vm.tabs[1].dataSelected).toBeTruthy();
  });

  it('tabs to be mounted with 2nd selected with no default', async () => {
    const propsData = {
      noDefaultToFirst: true,
    };
    const wrapper = await mount(CvTabs, {
      propsData,
      slots: {
        default: [Tab, TabSelected, Tab],
      },
    });

    expect(wrapper.vm.tabs[1].dataSelected).toBeTruthy();
  });

  it('click to change tab', async () => {
    const wrapper = await mount(CvTabs, {
      slots: {
        default: [Tab, Tab, Tab],
      },
    });

    await Vue.nextTick();
    expect(wrapper.vm.tabs[0].dataSelected).toBeTruthy();
    await trigger(wrapper.findAll(`.${carbonPrefix}--tabs--scrollable__nav-link`).at(2), 'click');

    expect(wrapper.vm.tabs[0].dataSelected).toBeFalsy();
    expect(wrapper.vm.tabs[2].dataSelected).toBeTruthy();
  });
});

describe('CvTab', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvTab, ['label'], String);
  testComponent.propsAreType(CvTab, ['selected', 'disabled'], Boolean);

  testComponent.propsAreRequired(CvTab, ['label']);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('matches with slotted content', async () => {
    const propsData = { label: 'Tab label', disabled: false, selected: false, id: 'an-id' };
    const wrapper = await shallow(CvTab, {
      propsData,
      slots: {
        default: "<div class='stub'></div>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches with disabled and selected', async () => {
    const propsData = { label: 'Tab label', disabled: true, selected: true, id: 'an-id' };
    const wrapper = await shallow(CvTab, {
      propsData,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
