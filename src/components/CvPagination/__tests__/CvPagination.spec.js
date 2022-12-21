import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvPagination from '../CvPagination.vue';

describe('CvPagination', () => {
  it('CvPagination - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const label = 'ABC-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvPagination, {
      props: {
        label: label,
        numberOfItems: 2731,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const pagination = result.container.querySelector('.cv-pagination');
    const select = await result.findByLabelText('Items per page:');
    await result.findByLabelText('Page number:');

    const user = userEvent.setup();
    await user.selectOptions(select, ['30']);

    expect(pagination.classList.contains('ABC-class-123')).toBe(true);
    expect(pagination.getAttribute('aria-label')).toBe(ariaLabel);
    expect(result.emitted('change')?.length).toBe(2);
    expect(result.emitted('change')[1][0]).toStrictEqual({
      start: 1,
      page: 1,
      length: 30,
    });
  });

  it('CvPagination - all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const backwardText = 'ABC-backward-text-123';
    const forwardText = 'ABC-forward-text-123';
    const pageNumberLabel = 'ABC-page-number-Label-123';
    const pageSizesLabel = 'ABC-page-sizes-label-123';
    const numberOfItems = 1223;
    const page = 2;
    const pageSizes = [1, 2, 3, 5, 8, 13, 21, 34];
    // The render method returns a collection of utilities to query your component.
    const result = render(CvPagination, {
      props: {
        backwardText: backwardText,
        forwardText: forwardText,
        pageNumberLabel: pageNumberLabel,
        pageSizesLabel: pageSizesLabel,
        numberOfItems: numberOfItems,
        page: page,
        pageSizes: pageSizes,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const pagination = result.container.querySelector('.cv-pagination');
    const select = await result.findByLabelText(pageSizesLabel);
    await result.findByLabelText(pageNumberLabel);
    const [backward, forward] = await result.findAllByRole('button');
    expect(forward.getAttribute('aria-label')).toBe(forwardText);
    expect(backward.getAttribute('aria-label')).toBe(backwardText);

    await result.findByText(`2-2 of ${numberOfItems} items`);

    const user = userEvent.setup();
    await user.selectOptions(select, ['8']);

    await result.findByText(`1-8 of ${numberOfItems} items`);

    expect(pagination.classList.contains('ABC-class-123')).toBe(true);
    expect(pagination.getAttribute('aria-label')).toBe(ariaLabel);
    expect(result.emitted('change')?.length).toBe(2);
    expect(result.emitted('change')[1][0]).toStrictEqual({
      start: 1,
      page: 1,
      length: 8,
    });

    await user.click(forward);
    expect(forward.getAttribute('disabled')).toBeNull();
    await result.rerender({ backwardsButtonDisabled: true });
    expect(backward.getAttribute('disabled'));

    expect(forward.getAttribute('disabled')).toBeNull();
    await result.rerender({ forwardsButtonDisabled: true });
    expect(forward.getAttribute('disabled'));

    await result.rerender({ actualItemsOnPage: 5 });
    await result.findByText(`9-13 of ${numberOfItems} items`);
  });

  it('CvPagination - test slots', async () => {
    const numberOfItems = 1223;
    // The render method returns a collection of utilities to query your component.
    const result = render(CvPagination, {
      props: {
        numberOfItems: numberOfItems,
      },
      slots: {
        'range-text': `<template v-slot:range-text="{scope}">
                       <span>From {{scope.start}} to {{scope.end}} out of {{scope.items}}</span>
                       </template>`,
        'of-n-pages': `<template v-slot:of-n-pages="{scope}">
                       <span> out of {{scope.pages}} pages</span>
                       </template>`,
      },
    });

    await result.findByText(`From 1 to 10 out of ${numberOfItems}`);
    await result.findByText(`out of 123 pages`);
  });
});
