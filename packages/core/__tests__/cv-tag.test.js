import { shallowMount } from '@vue/test-utils';
import { testComponent, testInstance } from './_helpers';
import CvTag from '@/components/cv-tag/cv-tag.vue';

describe('CvTag', () => {
  testComponent.propsAreRequired(CvTag, ['label']);
  testComponent.propsHaveDefault(CvTag, ['kind']);
  testComponent.propsAreString(CvTag, ['label', 'kind']);

  testInstance.propStringIsRendered(CvTag, 'label', 'span');

  it('matches snapshot', () => {
    const label = 'I am a tag';
    const kind = 'beta';
    const wrapper = shallowMount(CvTag, {
      propsData: { label, kind },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
