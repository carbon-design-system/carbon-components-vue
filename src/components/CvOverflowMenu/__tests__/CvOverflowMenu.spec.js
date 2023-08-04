import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvOverflowMenu from '../CvOverflowMenu.vue';
import CvOverflowMenuItem from '../CvOverflowMenuItem.vue';

const menuItems = {
  components: { CvOverflowMenuItem },
  template: `
    <cv-overflow-menu-item value="item 1" primary-focus>list item 1</cv-overflow-menu-item>
    <cv-overflow-menu-item value="item 2" disabled>list item 2</cv-overflow-menu-item>
    <cv-overflow-menu-item value="item 3" danger>list item 3</cv-overflow-menu-item>
  `,
};

describe('CvOverflowMenu', () => {
  it('CvOverflowMenu - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const label = 'ABC-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvOverflowMenu, {
      props: {
        label: label,
      },
      slots: {
        default: menuItems,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    await result.findByLabelText(label);
    const menu = result.container.querySelector('[data-overflow-menu]');
    const buttons = await result.findAllByRole('button');

    const user = userEvent.setup();
    await user.click(buttons[0]); // activate menu
    await user.click(buttons[3]); // select the 3rd item

    expect(menu.classList.contains('ABC-class-123')).toBe(true);
    expect(menu.getAttribute('aria-label')).toBe(ariaLabel);
    expect(result.emitted('change')?.length).toBe(1);
    expect(result.emitted('change')[0][0]).toBe('item 3');
  });

  it('CvOverflowMenu - all props', async () => {
    const label = 'ABC-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvOverflowMenu, {
      props: {
        label: label,
        up: undefined,
        offset: undefined,
        tipPosition: undefined,
        tipAlignment: undefined,
      },
      slots: {
        default: menuItems,
      },
    });

    const select = await result.findByLabelText(label);
    result.container.querySelector('[data-overflow-menu]');
    const buttons = await result.findAllByRole('button');

    const user = userEvent.setup();
    await user.click(buttons[0]); // activate menu
    await user.click(buttons[0]); // deactivate menu

    await result.rerender({ offset: { top: -32, left: -48 } });
    await user.click(buttons[0]); // activate menu
    expect(select.style.top).toBe('-48px');
    expect(select.style.left).toBe('-48px');
    await user.click(buttons[0]); // deactivate menu

    await result.rerender({ up: true });
    await user.click(buttons[0]); // activate menu
    expect(select.style.top).toBe('-32px');
    await user.click(buttons[0]); // deactivate menu

    expect(buttons[0].classList.contains('bx--tooltip--right')).toBe(true);
    expect(buttons[0].classList.contains('bx--tooltip--align-center')).toBe(
      true
    );

    await result.rerender({ tipPosition: 'left', tipAlignment: 'end' });
    expect(buttons[0].classList.contains('bx--tooltip--left')).toBe(true);
    expect(buttons[0].classList.contains('bx--tooltip--align-end')).toBe(true);
  });

  it('CvOverflowMenu - test trigger slot', async () => {
    const label = 'ABC-label-123';
    const trigger = 'ABC-trigger-slot-text-123';

    // The render method returns a collection of utilities to query your component.
    const result = render(CvOverflowMenu, {
      props: {
        label: label,
      },
      slots: {
        default: menuItems,
        trigger: trigger,
      },
    });

    await result.findByText(label);
    await result.findByText(trigger);
  });
});
