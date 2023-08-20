import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';
import { CvTextAreaSkeleton } from '../';

describe('CvTextAreaSkeleton', () => {
  it('should match snapshot', async () => {
    const wrapper = await shallowMount(CvTextAreaSkeleton);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders text area skeleton', () => {
    const wrapper = shallowMount(CvTextAreaSkeleton);

    const skeletonLabel = wrapper.find(`.${carbonPrefix}--label`);
    const skeletonInput = wrapper.find(`.${carbonPrefix}--text-area`);
    const expectedSkeletonClass = `${carbonPrefix}--skeleton`;

    expect(skeletonLabel.classes()).toContain(expectedSkeletonClass);
    expect(skeletonInput.classes()).toContain(expectedSkeletonClass);
  });
});
