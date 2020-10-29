import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, trigger, mount } = awaitNextTick;
import { CvToolbar, CvToolbarTitle, CvToolbarSearch, CvToolbarOption, CvToolbarDivider } from '@/components/cv-toolbar';
import { settings as carbonSettings } from 'carbon-components';

const carbonPrefix = carbonSettings.prefix;

describe('CvToolbar', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render without slot correctly', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvToolbar, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render with slot correctly', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvToolbar, {
      slots: {
        default: '<div>default test slot</div>',
      },
      propsData,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});

describe('CvToolbarTitle', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvToolbarTitle, ['title'], String);
  testComponent.propsAreRequired(CvToolbarTitle, ['title']);

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render correctly', async () => {
    const propsData = { id: 'test-1', title: 'Toolbar test title' };
    const wrapper = await shallow(CvToolbarTitle, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});

describe('CvToolbarSearch', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvToolbarSearch, ['value'], String);

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render correctly', async () => {
    const propsData = { id: 'test-1', value: 'check-1' };
    const wrapper = await shallow(CvToolbarSearch, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('should add active css class on focus and remove on blur', async () => {
    const propsData = { id: 'test-1', value: 'check-1' };
    const wrapper = await mount(CvToolbarSearch, { propsData });

    await trigger(wrapper.find(`.${carbonPrefix}--toolbar-search__btn`), 'click');
    expect(wrapper.classes()).toContain(`${carbonPrefix}--toolbar-search--active`);

    await trigger(wrapper.find(`.${carbonPrefix}--toolbar-search__btn`), 'blur');
    expect(wrapper.classes()).not.toContain(`${carbonPrefix}--toolbar-search--active`);
  });
});

describe('CvToolbarOption', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render without slot correctly', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvToolbarOption, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render with slot correctly', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvToolbarOption, {
      slots: {
        default: '<div>default test slot</div>',
      },
      propsData,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('parent should emit event on esc keydown', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await mount(CvToolbar, {
      slots: {
        default: CvToolbarOption,
      },
      propsData,
    });

    await trigger(wrapper.find(CvToolbarOption), 'keydown.esc');
    expect(wrapper.emitted('cv:close')).toBeTruthy();
  });
});

describe('CvToolbarDivider', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('should render correctly', async () => {
    const propsData = { id: 'test-1' };
    const wrapper = await shallow(CvToolbarDivider, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});
