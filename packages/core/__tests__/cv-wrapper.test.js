import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, testInstance, events } from './_helpers';
import CvWrapper from '@/components/cv-wrapper/_cv-wrapper';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('CvWrapper', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvWrapper, ['tagType'], String);

  testComponent.propsHaveDefaultOfUndefined(CvWrapper, ['tagType']);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('matches render with wrapper', () => {
    const wrapper = shallow(CvWrapper, {
      propsData: { tagType: 'div' },
      slots: {
        default: '<div class="cv-wrapper-stub">StubbyMcStubFace</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render with no wrapper', () => {
    const wrapper = shallow(CvWrapper, {
      slots: {
        default: '<div class="cv-wrapper-stub">StubbyMcStubFace</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('closed to open to closed', () => {
    const wrapper = mount(
      {
        name: 'Wrap',
        components: { CvWrapper },
        template: `<cv-wrapper tagType="button" test-attr="testAttr" class="testClass" :class="'other-class'" style="outline: none;" :style="{zIndex: 99}"><slot /></cv-wrapper>`,
      },
      {
        slots: {
          default: '<div class="cv-wrapper-stub">StubbyMcStubFace</div>',
        },
      }
    );

    expect(wrapper.attributes('test-attr')).toEqual('testAttr');
    expect(wrapper.attributes('style')).toContain('z-index: 99');
    expect(wrapper.attributes('style')).toContain('outline: none');
    expect(wrapper.classes()).toContain(`testClass`);
    expect(wrapper.classes()).toContain(`other-class`);
  });
});
