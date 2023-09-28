import { render } from '@testing-library/vue';
import { carbonPrefix } from '../../../global/settings';
import { CvTagSkeleton } from '../';

describe('CvTagSkeleton', () => {
  it('CvTagSkeleton - default', async () => {
    const { container } = await render(CvTagSkeleton);
    // - verify classes on the root span
    expect(container.querySelector(`.${carbonPrefix}--tag`)).toBeTruthy();
    expect(container.querySelector(`.${carbonPrefix}--skeleton`)).toBeTruthy();
  });

  it('CvTagSkeleton - small', () => {
    const { container } = render(CvTagSkeleton, {
      props: {
        small: true,
      },
    });

    // - verify classes on the root span
    expect(container.querySelector(`.${carbonPrefix}--tag`)).toBeTruthy();
    expect(container.querySelector(`.${carbonPrefix}--skeleton`)).toBeTruthy();
    expect(container.querySelector(`.${carbonPrefix}--tag--sm`)).toBeTruthy();
  });
});
