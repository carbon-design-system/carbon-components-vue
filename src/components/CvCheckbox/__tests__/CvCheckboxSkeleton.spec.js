import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';
import CvCheckboxSkeleton from '../CvCheckboxSkeleton.vue';

describe('CvCheckboxSkeleton', () => {
  it('renders checkbox skeleton', async () => {
    const wrapper = shallowMount(CvCheckboxSkeleton);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders checkbox skeleton with required visual elements', () => {
    const wrapper = shallowMount(CvCheckboxSkeleton);

    const skeletonWrapper = wrapper.find('.cv-checkbox');
    const skeletonLabel = skeletonWrapper.find(
      `.${carbonPrefix}--checkbox-label`
    );
    const skeletonText = skeletonWrapper.find(
      `.${carbonPrefix}--checkbox-label-text`
    );
    const expectedSkeletonClass = `${carbonPrefix}--skeleton`;

    expect(skeletonLabel.classes()).toContain(expectedSkeletonClass);
    expect(skeletonText.classes()).toContain(expectedSkeletonClass);
  });
});
