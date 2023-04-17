import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvTile from '../CvTile.vue';

describe('CvTile', () => {
  it('CvTile - all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const className = 'ABC-class-123';
    const result = render(CvTile, {
      props: {
        kind: '',
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
    const tile = result.container.querySelector('.cv-tile');
    expect(tile.classList.contains(className)).toBe(true);
    expect(tile.getAttribute('aria-label')).toBe(ariaLabel);
    expect(tile.tagName).toBe('DIV');
  });
  it('CvTileClickable - all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const className = 'ABC-class-123';
    const href = 'http://something.example.com';
    const result = render(CvTile, {
      props: {
        kind: 'clickable',
        href: href,
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
    const tile = result.container.querySelector('.cv-tile');
    expect(tile.classList.contains(className)).toBe(true);
    expect(tile.getAttribute('aria-label')).toBe(ariaLabel);
    expect(tile.getAttribute('href')).toBe(href);
    expect(tile.tagName).toBe('A');
  });
  it('CvTileClickable - router link', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const className = 'ABC-class-123';
    const result = render(CvTile, {
      props: {
        kind: 'clickable',
        to: { name: 'some-route' },
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
    const tile = result.container.querySelector('.cv-tile');
    expect(tile.classList.contains(className)).toBe(true);
    expect(tile.getAttribute('aria-label')).toBe(ariaLabel);
    expect(tile.tagName).toBe('ROUTER-LINK');
  });
  it('CvTileExpandable - all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const className = 'ABC-class-123';
    const result = render(CvTile, {
      props: {
        kind: 'expandable',
      },
      slots: {
        default: `<div role="doc-bibliography"/>`,
        below: `<div role="doc-abstract"/>`,
      },
      attrs: {
        class: className,
        'aria-label': ariaLabel,
      },
    });
    await result.findByRole('doc-bibliography');
    const tile = result.container.querySelector('.cv-tile');

    // the below the fold content should be seen until we click
    const below = await result.queryByRole('doc-abstract');
    expect(below).toBe(null);

    const user = userEvent.setup();
    await user.click(tile);

    await result.findByRole('doc-abstract');
    expect(tile.classList.contains(className)).toBe(true);
    expect(tile.getAttribute('aria-label')).toBe(ariaLabel);
    expect(tile.tagName).toBe('BUTTON');
  });
  it('CvTileExpandable - initial expanded', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const className = 'ABC-class-123';
    const result = render(CvTile, {
      props: {
        kind: 'expandable',
        expanded: true,
      },
      slots: {
        default: `<div role="doc-bibliography"/>`,
        below: `<div role="doc-abstract"/>`,
      },
      attrs: {
        class: className,
        'aria-label': ariaLabel,
      },
    });
    await result.findByRole('doc-bibliography');
    const tile = result.container.querySelector('.cv-tile');

    // the below the fold content should be seen initially
    await result.findByRole('doc-abstract');
    expect(tile.classList.contains(className)).toBe(true);
    expect(tile.getAttribute('aria-label')).toBe(ariaLabel);
    expect(tile.tagName).toBe('BUTTON');
  });
  it('CvTileSelectable - all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const className = 'ABC-class-123';
    const result = render(CvTile, {
      props: {
        kind: 'selectable',
        value: 'ABC-value-123',
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

    // click the tile
    const checkbox = await result.findByRole('checkbox');
    expect(checkbox.checked).toBe(false);
    const user = userEvent.setup();
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);

    const tile = result.container.querySelector('.cv-tile');
    expect(tile.classList.contains(className)).toBe(true);
    expect(tile.getAttribute('aria-label')).toBe(ariaLabel);
    expect(tile.tagName).toBe('LABEL');
  });
});
