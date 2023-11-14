import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvDropdown from '../CvDropdown.vue';
import CvDropdownItem from '../CvDropdownItem.vue';

const slotItems = {
  components: { CvDropdownItem },
  template: `
    <cv-dropdown-item value="mando"><span>Din Djarin</span></cv-dropdown-item>
    <cv-dropdown-item value="nite-owl">Bo-Katan Kryze</cv-dropdown-item>
    <cv-dropdown-item value="baby-yoda">Din Grogu</cv-dropdown-item>
    <cv-dropdown-item value="mysterious">The Armorer</cv-dropdown-item>
    <cv-dropdown-item value="bounty-hunter">Greef Karga</cv-dropdown-item>
  `,
};

describe('CvDropdown', () => {
  it('CvDropdown - test default and attrs', async () => {
    window.focus = () => {}; // provide an empty implementation for window.focus
    const ariaLabel = 'ABC-aria-label-123';
    const label = 'ABC-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvDropdown, {
      props: {
        label: label,
      },
      slots: {
        default: slotItems,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const dd = await result.findByLabelText(ariaLabel);
    await result.findByText('Choose an option');
    const button = await result.findByRole('button');

    const user = userEvent.setup();
    await user.click(button);

    const menuItems = await result.findAllByRole('menuitemradio');
    expect(menuItems.length).toBe(5);
    await user.click(menuItems[2]);

    expect(dd.classList.contains('ABC-class-123')).toBe(true);
    expect(dd.getAttribute('aria-label')).toBe(ariaLabel);
    expect(result.emitted('change')?.length).toBe(1);
    expect(result.emitted('change')[0][0]).toBe('baby-yoda');
  });
  it('CvDropdown - all props', async () => {
    window.focus = () => {}; // provide an empty implementation for window.focus
    const ariaLabel = 'ABC-aria-label-123';
    const label = 'ABC-label-123';
    const helper = 'ABC-helper-123';
    const warning = 'ABC-warning-123';
    const invalid = 'ABC-invalid-123';
    const placeholder = 'ABC-placeholder-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvDropdown, {
      props: {
        ariaLabel: ariaLabel,
        disabled: false,
        formItem: true,
        helperText: helper,
        inline: false,
        invalidMessage: '',
        label: label,
        placeholder: placeholder,
        size: 'md',
        up: false,
        modelValue: undefined,
        warningMessage: '',
        light: false,
      },
      slots: {
        default: slotItems,
      },
      attrs: {
        class: 'ABC-class-123',
      },
    });

    const dd = await result.findByLabelText(ariaLabel);
    await result.findByText(placeholder);
    await result.findByText(label);

    let mysteriousLabels = await result.findAllByText('The Armorer');
    expect(mysteriousLabels.length).toBe(1);
    await result.rerender({ modelValue: 'mysterious' });
    mysteriousLabels = await result.findAllByText('The Armorer');
    expect(mysteriousLabels.length).toBe(2);

    await result.findByText(helper);
    await result.rerender({ warningMessage: warning });
    await result.findByText(warning);
    await result.rerender({ invalidMessage: invalid });
    await result.findByText(invalid);

    expect(dd.classList.contains('bx--dropdown--md')).toBe(true);
    await result.rerender({ size: 'sm' });
    expect(dd.classList.contains('bx--dropdown--sm')).toBe(true);
    await result.rerender({ size: 'lg' });
    expect(dd.classList.contains('bx--dropdown--lg')).toBe(true);

    expect(dd.classList.contains('bx--dropdown--light')).toBe(false);
    await result.rerender({ light: true });
    expect(dd.classList.contains('bx--dropdown--light')).toBe(true);

    expect(dd.classList.contains('bx--dropdown--inline')).toBe(false);
    await result.rerender({ inline: true });
    expect(dd.classList.contains('bx--dropdown--inline')).toBe(true);

    expect(dd.classList.contains('bx--list-box--up')).toBe(false);
    await result.rerender({ up: true });
    expect(dd.classList.contains('bx--list-box--up')).toBe(true);

    expect(dd.classList.contains('bx--dropdown--disabled')).toBe(false);
    await result.rerender({ disabled: true });
    expect(dd.classList.contains('bx--dropdown--disabled')).toBe(true);
  });
  it('CvDropdown - slots', async () => {
    window.focus = () => {}; // provide an empty implementation for window.focus
    const ariaLabel = 'ABC-aria-label-123';
    const label = 'ABC-label-123';
    const helperSlot = 'ABC-helper-slot-text-123';
    const warningSlot = 'ABC-warning-slot-text-123';
    const invalidSlot = 'ABC-invalid-slot-text-123';
    const placeholder = 'ABC-placeholder-123';
    const options = {
      props: {
        ariaLabel: ariaLabel,
        inline: false,
        label: label,
        placeholder: placeholder,
      },
      slots: {
        default: slotItems,
        'helper-text': helperSlot,
      },
      attrs: {
        class: 'ABC-class-123',
      },
    };
    // The render method returns a collection of utilities to query your component.
    let result = render(CvDropdown, options);

    await result.findByLabelText(ariaLabel);
    await result.findByText(placeholder);
    await result.findByText(label);

    await result.findByText(helperSlot);

    options.slots['warning-message'] = warningSlot;
    result = render(CvDropdown, options);
    await result.findByText(warningSlot);

    options.slots['invalid-message'] = invalidSlot;
    result = render(CvDropdown, options);
    await result.findByText(invalidSlot);
  });
  it('CvDropdown - items array', async () => {
    window.focus = () => {}; // provide an empty implementation for window.focus
    const ariaLabel = 'ABC-aria-label-123';
    const label = 'ABC-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvDropdown, {
      props: {
        label: label,
        items: [
          'Dune',
          'Frankenstein',
          "The Ultimate Hitchhiker's Guide",
          'Foundation',
          "Ender's Game",
          'Do Androids Dream of Electric Sheep?',
        ],
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const dd = await result.findByLabelText(ariaLabel);
    await result.findByText('Choose an option');
    const button = await result.findByRole('button');

    const user = userEvent.setup();
    await user.click(button);

    const menuItems = await result.findAllByRole('menuitemradio');
    expect(menuItems.length).toBe(6);
    await user.click(menuItems[3]);

    expect(dd.classList.contains('ABC-class-123')).toBe(true);
    expect(dd.getAttribute('aria-label')).toBe(ariaLabel);
    expect(result.emitted('change')?.length).toBe(1);
    expect(result.emitted('change')[0][0]).toBe('Foundation');
  });
});
