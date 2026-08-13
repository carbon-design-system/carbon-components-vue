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

  it('does not emit change when numberOfItems changes on its own', async () => {
    const result = render(CvPagination, {
      props: { numberOfItems: 10 },
    });

    await result.findByText(`of 1 pages`);
    expect(result.emitted('change')?.length).toBe(1); // mount emit only

    await result.rerender({ numberOfItems: 100 });
    await result.findByText(`of 10 pages`);
    expect(result.emitted('change')?.length).toBe(1);
  });

  it('emits exactly one change for a user action followed by a later numberOfItems change', async () => {
    const result = render(CvPagination, {
      props: { numberOfItems: 30 },
    });
    const [, forward] = await result.findAllByRole('button');

    const user = userEvent.setup();
    await user.click(forward);
    expect(result.emitted('change')?.length).toBe(2);

    await result.rerender({ numberOfItems: 100 });
    await result.findByText(`of 10 pages`);
    expect(result.emitted('change')?.length).toBe(2);
  });

  it('reports the new page size, not the abandoned one, when numberOfItems changes afterwards', async () => {
    const result = render(CvPagination, {
      props: {
        numberOfItems: 200,
        page: 5,
        pageSizes: [10, 20],
      },
    });
    const select = await result.findByLabelText('Items per page:');

    const user = userEvent.setup();
    await user.selectOptions(select, ['20']);
    expect(result.emitted('change')?.length).toBe(2);
    expect(result.emitted('change')[1][0].length).toBe(20);

    await result.rerender({ numberOfItems: 100 });
    expect(result.emitted('change')?.length).toBe(2);
    expect(result.emitted('change')[1][0].length).toBe(20);
  });

  it('with v-model:page (onUpdate:page listener present), clicking forward emits update:page and only moves once the prop updates', async () => {
    const result = render(CvPagination, {
      props: {
        numberOfItems: 30,
        page: 1,
        'onUpdate:page': val => result.rerender({ page: val }),
      },
    });
    const [, forward] = await result.findAllByRole('button');

    const user = userEvent.setup();
    await user.click(forward);

    expect(result.emitted('update:page')?.length).toBe(1);
    expect(result.emitted('update:page')[0]).toEqual([2]);

    const pageSelect = await result.findByLabelText('Page number:');
    expect(pageSelect.value).toBe('2');
  });

  it('with v-model:page and a parent that ignores the event, the rendered page does not drift and does not get stuck', async () => {
    const result = render(CvPagination, {
      props: {
        numberOfItems: 30,
        page: 1,
        'onUpdate:page': () => {},
      },
    });
    const [, forward] = await result.findAllByRole('button');

    const user = userEvent.setup();
    await user.click(forward);
    expect(result.emitted('update:page')?.length).toBe(1);

    // parent ignored the request; re-asserting the same page value must not
    // leave the component stuck unable to propose page 2 again.
    await result.rerender({ page: 1 });
    await user.click(forward);
    expect(result.emitted('update:page')?.length).toBe(2);
    expect(result.emitted('update:page')[1]).toEqual([2]);
  });

  it('with both v-model:page and v-model:pageSize, mounting emits no change', async () => {
    const result = render(CvPagination, {
      props: {
        numberOfItems: 30,
        page: 1,
        pageSize: 10,
        'onUpdate:page': () => {},
        'onUpdate:pageSize': () => {},
      },
    });

    await result.findByText('of 3 pages');
    expect(result.emitted('change')).toBeUndefined();
  });

  it('uncontrolled usage (plain :page, no listener) behaves identically to today, including the mount emit', async () => {
    const result = render(CvPagination, {
      props: { numberOfItems: 30, page: 1 },
    });

    await result.findByText('of 3 pages');
    expect(result.emitted('change')?.length).toBe(1);
  });
});
