/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';
import CvButtonSkeleton from '../CvButtonSkeleton.vue';

describe('CvButtonSkeleton', () => {
  test.each([[undefined], [''], ['default']])(
    'renders default button skeleton',
    buttonSize => {
      const wrapper = shallowMount(CvButtonSkeleton, {
        props: {
          size: buttonSize,
        },
      });

      const button = wrapper.find('button');
      expect(button.classes()).toContain(`${carbonPrefix}--btn`);
      expect(button.classes()).toContain(`${carbonPrefix}--skeleton`);
    }
  );

  test.each([
    ['field', 'field'],
    ['small', 'sm'],
    ['sm', 'sm'],
    ['lg', 'lg'],
    ['xl', 'xl'],
  ])('Renders button skeleton with %s size', (buttonSize, expectedSize) => {
    const wrapper = shallowMount(CvButtonSkeleton, {
      props: {
        size: buttonSize,
      },
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain(`${carbonPrefix}--btn`);
    expect(button.classes()).toContain(`${carbonPrefix}--skeleton`);
    expect(button.classes()).toContain(`${carbonPrefix}--btn--${expectedSize}`);
  });
});
