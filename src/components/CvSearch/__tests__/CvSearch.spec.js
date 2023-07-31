// noinspection JSCheckFunctionSignatures

import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvSearch from '../CvSearch.vue';
import { carbonPrefix } from '@/global/settings';
import { SEARCH_SIZES } from '..';

describe('CvSearch', () => {
  it('CvSearch - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const label = 'ABC-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvSearch, {
      props: {
        formItem: false,
        label,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const user = userEvent.setup();
    const input = await result.findByRole('searchbox');
    const clearBtn = await result.findByRole('button');
    await user.click(input);
    await user.keyboard('foo');
    await user.click(clearBtn);
    await user.click(input);
    await user.keyboard('foo{esc}');

    expect(input.classList.contains('ABC-class-123')).toBe(true);
    expect(input.getAttribute('aria-labelledby')).toBeTruthy();
    expect(result.emitted('input')?.length).toBe(8);
    expect(result.emitted('input')[0]).toStrictEqual(['f']);
    expect(result.emitted('input')[1]).toStrictEqual(['fo']);
    expect(result.emitted('input')[2]).toStrictEqual(['foo']);
    expect(result.emitted('input')[3]).toStrictEqual(['']);
    expect(result.emitted('input')[4]).toStrictEqual(['f']);
    expect(result.emitted('input')[5]).toStrictEqual(['fo']);
    expect(result.emitted('input')[6]).toStrictEqual(['foo']);
    expect(result.emitted('input')[7]).toStrictEqual(['']);

    await result.rerender({ expandable: true });
    const element = await result.findByRole('search');
    expect(element.classList).toContain(`${carbonPrefix}--search--expandable`);
    expect(element.classList).not.toContain(
      `${carbonPrefix}--search--expanded`
    );
    await user.click(input);
    await user.keyboard('foo');
    expect(element.classList).toContain(`${carbonPrefix}--search--expanded`);
    await user.click(clearBtn);
    expect(element.classList).toContain(`${carbonPrefix}--search--expanded`);
    await user.click(element);
    expect(element.classList).not.toContain(
      `${carbonPrefix}--search--expanded`
    );

    await result.rerender({ expandable: false, light: true });
    expect(element.classList).not.toContain(
      `${carbonPrefix}--search--expandable`
    );
    expect(element.classList).toContain(`${carbonPrefix}--search--light`);

    await result.rerender({ light: false, disabled: true });
    expect(element.classList).not.toContain(`${carbonPrefix}--search--light`);
    expect(element.classList).toContain(`${carbonPrefix}--search--disabled`);
  });

  test.each(SEARCH_SIZES)('CvSearch - %s size', async searchSize => {
    const result = render(CvSearch, {
      props: {
        size: searchSize,
      },
    });

    const element = await result.findByRole('search');
    expect(element.classList).toContain(`${carbonPrefix}--search`);
    expect(element.classList).toContain(
      `${carbonPrefix}--search--${searchSize}`
    );
  });
});
