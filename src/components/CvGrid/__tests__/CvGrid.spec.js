import { render } from '@testing-library/vue';
import CvGrid from '../CvGrid.vue';
import CvRow from '../CvRow.vue';
import CvColumn from '../CvColumn.vue';

describe('CvGrid', () => {
  it('CvGrid - all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const className = 'ABC-class-123';
    const result = render(CvGrid, {
      props: {
        fullWidth: false,
      },
      slots: {
        default: `<div role="doc-bibliography"/>`,
      },
      attrs: {
        class: className,
        'aria-label': ariaLabel,
      },
    });
    await result.findByRole('doc-bibliography');
    const grid = result.container.querySelector('.cv-grid');
    expect(grid.classList.contains(className)).toBe(true);
    expect(grid.getAttribute('aria-label')).toBe(ariaLabel);

    expect(grid.classList.contains('bx--grid--full-width')).toBe(false);
    await result.rerender({ fullWidth: true });
    expect(grid.classList.contains('bx--grid--full-width')).toBe(true);

    expect(grid.classList.contains('bx--grid--condensed')).toBe(false);
    await result.rerender({ kind: 'condensed' });
    expect(grid.classList.contains('bx--grid--condensed')).toBe(true);

    expect(grid.classList.contains('bx--grid--narrow')).toBe(false);
    await result.rerender({ kind: 'narrow' });
    expect(grid.classList.contains('bx--grid--narrow')).toBe(true);
    expect(grid.classList.contains('bx--grid--condensed')).toBe(false);

    await result.rerender({ kind: 'wide' });
    expect(grid.classList.contains('bx--grid--condensed')).toBe(false);
    expect(grid.classList.contains('bx--grid--narrow')).toBe(false);
  });
  it('CvRow - all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const className = 'ABC-class-123';
    const result = render(CvRow, {
      props: {
        kind: undefined,
      },
      slots: {
        default: `<div role="doc-bibliography"/>`,
      },
      attrs: {
        class: className,
        'aria-label': ariaLabel,
      },
    });
    await result.findByRole('doc-bibliography');
    const row = result.container.querySelector('.cv-row');
    expect(row.classList.contains(className)).toBe(true);
    expect(row.getAttribute('aria-label')).toBe(ariaLabel);

    expect(row.classList.contains('bx--row--condensed')).toBe(false);
    await result.rerender({ kind: 'condensed' });
    expect(row.classList.contains('bx--row--condensed')).toBe(true);

    expect(row.classList.contains('bx--row--narrow')).toBe(false);
    await result.rerender({ kind: 'narrow' });
    expect(row.classList.contains('bx--row--narrow')).toBe(true);
    expect(row.classList.contains('bx--row--condensed')).toBe(false);

    await result.rerender({ kind: 'wide' });
    expect(row.classList.contains('bx--row--condensed')).toBe(false);
    expect(row.classList.contains('bx--row--narrow')).toBe(false);
  });
  it('CvColumn - all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const className = 'ABC-class-123';
    const result = render(CvColumn, {
      props: {
        sm: 1,
        md: 2,
        lg: 3,
        xlg: 5,
        max: 8,
      },
      slots: {
        default: `<div role="doc-bibliography"/>`,
      },
      attrs: {
        class: className,
        'aria-label': ariaLabel,
      },
    });
    await result.findByRole('doc-bibliography');
    const column = result.container.querySelector('.cv-column');
    expect(column.classList.contains(className)).toBe(true);
    expect(column.getAttribute('aria-label')).toBe(ariaLabel);

    expect(column.classList.contains('bx--col--sm-1'));
    expect(column.classList.contains('bx--col--md-2'));
    expect(column.classList.contains('bx--col--lg-3'));
    expect(column.classList.contains('bx--col--xlg-5'));
    expect(column.classList.contains('bx--col--max-8'));

    await result.rerender({ sm: true });
    expect(column.classList.contains('bx--col--sm'));

    await result.rerender({ md: true });
    expect(column.classList.contains('bx--col--md'));

    await result.rerender({ lg: true });
    expect(column.classList.contains('bx--col--lg'));

    await result.rerender({ xlg: true });
    expect(column.classList.contains('bx--col--xlg'));

    await result.rerender({ max: true });
    expect(column.classList.contains('bx--col--max'));

    expect(column.classList.length).toBe(7);

    await result.rerender({ sm: false });
    expect(column.classList.length).toBe(6);
    const foundSm = Array.from(column.classList.values()).find(n =>
      n.startsWith('bx--col--sm')
    );
    expect(!foundSm);

    await result.rerender({ max: false });
    expect(column.classList.length).toBe(5);
    const foundMax = Array.from(column.classList.values()).find(n =>
      n.startsWith('bx--col--max')
    );
    expect(!foundMax);

    await result.rerender({ lg: false });
    expect(column.classList.length).toBe(4);
    const foundLg = Array.from(column.classList.values()).find(n =>
      n.startsWith('bx--col--lg')
    );
    expect(!foundLg);

    await result.rerender({ xlg: false });
    expect(column.classList.length).toBe(3);
    const foundXlg = Array.from(column.classList.values()).find(n =>
      n.startsWith('bx--col--xlg')
    );
    expect(!foundXlg);

    await result.rerender({ md: false });
    expect(column.classList.length).toBe(3);
    const foundMd = Array.from(column.classList.values()).find(n =>
      n.startsWith('bx--col--md')
    );
    expect(!foundMd);

    expect(column.classList.contains('bx--col'));
  });
});
