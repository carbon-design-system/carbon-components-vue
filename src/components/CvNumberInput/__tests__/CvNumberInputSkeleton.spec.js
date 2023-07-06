/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';
import CvNumberInputSkeleton from '../CvNumberInputSkeleton.vue';

describe('CvNumberInputSkeleton', () => {
  it('renders number input skeleton', () => {
    const wrapper = shallowMount(CvNumberInputSkeleton);

    const skeletonWrapper = wrapper.find('.cv-number-input');
    const skeletonLabel = skeletonWrapper.find(`.${carbonPrefix}--label`);
    const skeletonInput = skeletonWrapper.find(`.${carbonPrefix}--number`);
    const expectedSkeletonClass = `${carbonPrefix}--skeleton`;

    expect(skeletonLabel.classes()).toContain(expectedSkeletonClass);
    expect(skeletonInput.classes()).toContain(expectedSkeletonClass);
  });
});
