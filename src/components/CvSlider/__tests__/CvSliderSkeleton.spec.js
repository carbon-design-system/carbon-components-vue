/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';
import CvSliderSkeleton from '../CvSliderSkeleton.vue';

describe('CvSliderSkeleton', () => {
  it('should match snapshot', async () => {
    const wrapper = await shallowMount(CvSliderSkeleton);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders slider skeleton', () => {
    const wrapper = shallowMount(CvSliderSkeleton);

    const skeletonWrapper = wrapper.find('.cv-slider');
    const skeletonLabel = skeletonWrapper.find(`.${carbonPrefix}--label`);
    const sliderTrack = skeletonWrapper.find(`.${carbonPrefix}--slider__track`);
    const sliderFilledTrack = skeletonWrapper.find(
      `.${carbonPrefix}--filled-track`
    );
    const sliderThumb = skeletonWrapper.find(`.${carbonPrefix}--slider__thumb`);

    expect(skeletonLabel).toBeTruthy();
    expect(sliderTrack).toBeTruthy();
    expect(sliderThumb).toBeTruthy();
    expect(sliderFilledTrack).toBeTruthy();
  });
});
