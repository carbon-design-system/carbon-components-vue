import { fireEvent, render } from '@testing-library/vue';
import CvInlineLoading from '../CvInlineLoading.vue';
import { STATES } from '../consts';

describe('CvInlineLoading', () => {
  it('CvInlineLoading - test all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const endingText = 'ABC endingText 123';
    const description = 'ABC description 123';
    const errorText = 'ABC errorText 123';
    const loadingText = 'ABC loadingText 123';
    const loadedText = 'ABC loadedText 123';

    // The render method returns a collection of utilities to query your component.
    const result = render(CvInlineLoading, {
      props: {
        state: STATES.LOADING,
        endingText,
        description,
        errorText,
        loadingText,
        loadedText,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const loader = await result.findByRole('alert');

    expect(loader.classList.contains('ABC-class-123')).toBe(true);
    expect(loader.getAttribute('aria-label')).toBe(ariaLabel);

    await result.findByText(loadingText);
    await result.findByTitle(description);

    await result.rerender({ state: STATES.ENDING });
    await result.findByText(endingText);

    await result.rerender({ state: STATES.LOADED });
    await result.findByText(loadedText);

    await result.rerender({ state: STATES.ERROR });
    await result.findByText(errorText);

    // For the 2 special states we need to transition based on the
    // animation ending
    const animation = result.container.querySelector(
      '.bx--inline-loading__animation'
    );
    const animationend = new Event('animationend');
    Object.assign(animationend, { animationName: 'rotate-end-p2' });

    // Make sure it transitions from ending to loaded
    await result.rerender({ state: STATES.LOADING });
    await result.findByText(loadingText);
    await result.rerender({ state: STATES.ENDING_LOADED });
    await result.findByText(endingText);
    await fireEvent(animation, animationend);
    await result.findByText(loadedText);

    // Make sure it transitions from ending to error
    await result.rerender({ state: STATES.LOADING });
    await result.findByText(loadingText);
    await result.rerender({ state: STATES.ENDING_ERROR });
    await result.findByText(endingText);
    await fireEvent(animation, animationend);
    await result.findByText(errorText);
  });
});
