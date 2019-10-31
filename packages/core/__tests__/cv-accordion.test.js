import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance, events } from './_helpers';
import { CvAccordion, CvAccordionItem, CvAccordionSkeleton } from '@/components/cv-Accordion';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('CvAccordion', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches render', () => {
    const wrapper = shallow(CvAccordion, {
      slots: {
        default: '<div class="cv-accordion-item-stub">StubbyMcStubFace</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL CHECKS
  // ***************
});

describe('CvAccordionSkeleton', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches render', () => {
    const wrapper = shallow(CvAccordionSkeleton);

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL CHECKS
  // ***************
});

describe('CvAccordionItem', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvAccordionItem, ['open'], Boolean);

  testComponent.propsHaveDefault(CvAccordionItem, ['open']);

  // ***************
  // SNAPSHOT CHECKS
  // ***************
  it('matches render', () => {
    const wrapper = shallow(CvAccordionItem, {
      propsData: { id: '1' },
      slots: {
        default: '<div class="cv-accordion-item-stub">StubbyMcStubFace</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render open', () => {
    const wrapper = shallow(CvAccordionItem, {
      propsData: {
        id: '1',
        open: true,
      },
      slots: {
        default: '<div class="cv-accordion-item-stub">StubbyMcStubFace</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL CHECKS
  // ***************
  it('closed to open to closed', () => {
    const wrapper = shallow(CvAccordionItem, {
      slots: {
        default: '<div class="cv-accordion-item-stub">StubbyMcStubFace</div>',
      },
    });

    const button = wrapper.find('button');

    expect(button.attributes('aria-expanded')).toEqual('false');
    expect(wrapper.classes()).not.toContain(`${prefix}--accordion__item--active`);

    wrapper.find('button').trigger('click');

    expect(button.attributes('aria-expanded')).toEqual('true');
    expect(wrapper.classes()).toContain(`${prefix}--accordion__item--active`);

    wrapper.find('button').trigger('click');

    expect(button.attributes('aria-expanded')).toEqual('false');
    expect(wrapper.classes()).not.toContain(`${prefix}--accordion__item--active`);
  });

  it('topen to closed to open', () => {
    const wrapper = shallow(CvAccordionItem, {
      propsData: {
        open: true,
      },
      slots: {
        default: '<div class="cv-accordion-item-stub">StubbyMcStubFace</div>',
      },
    });

    const button = wrapper.find('button');

    expect(button.attributes('aria-expanded')).toEqual('true');
    expect(wrapper.classes()).toContain(`${prefix}--accordion__item--active`);

    wrapper.find('button').trigger('click');

    expect(button.attributes('aria-expanded')).toEqual('false');
    expect(wrapper.classes()).not.toContain(`${prefix}--accordion__item--active`);

    wrapper.find('button').trigger('click');

    expect(button.attributes('aria-expanded')).toEqual('true');
    expect(wrapper.classes()).toContain(`${prefix}--accordion__item--active`);
  });
});
