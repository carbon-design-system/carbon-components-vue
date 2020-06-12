// import { shallowMount as shallow, mount } from '@vue/test-utils';
import { testComponent, awaitNextTick } from './_helpers';
const { shallowMount: shallow, mount } = awaitNextTick;
import CvWrapper from '@/components/cv-wrapper/_cv-wrapper';
// import { settings as carbonSettings } from 'carbon-components';

// const carbonPrefix = carbonSettings.prefix;

describe('CvWrapper', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvWrapper, ['tagType'], String);

  testComponent.propsHaveDefaultOfUndefined(CvWrapper, ['tagType']);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('matches render with wrapper', async () => {
    const wrapper = await shallow(CvWrapper, {
      propsData: { tagType: 'div' },
      slots: {
        default: '<div class="cv-wrapper-stub">StubbyMcStubFace</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render with no wrapper', async () => {
    const wrapper = await shallow(CvWrapper, {
      slots: {
        default: '<div class="cv-wrapper-stub">StubbyMcStubFace</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('closed to open to closed', async () => {
    const wrapper = await mount(
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
