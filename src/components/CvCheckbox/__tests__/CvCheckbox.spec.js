import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvCheckbox from '../CvCheckbox';

describe('CvCheckbox', () => {
  it('CvCheckbox - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const handler = jest.fn();
    // The render method returns a collection of utilities to query your component.
    const { emitted, getByRole } = render(CvCheckbox, {
      props: { value: 'checkbox-1', class: 'ABC-class-123' },
      attrs: {
        onkeydown: handler,
        'aria-label': ariaLabel,
      },
    });

    const checkbox = await getByRole('checkbox');

    const user = userEvent.setup();
    await user.click(checkbox);
    await user.keyboard('foo');
    expect(checkbox.checked).toBe(true);
    expect(emitted().change).toBeTruthy();
    expect(checkbox.classList.contains('ABC-class-123')).toBe(true);
    expect(checkbox.getAttribute('aria-label')).toBe(ariaLabel);
    expect(handler).toHaveBeenCalled();
  });

  it('CvCheckbox - test all props', async () => {
    const props = {
      value: 'checkbox-1',
      label: 'CHECKBOX XYZ123',
      id: 'ABC-checkbox-123',
      checked: true,
    };
    // The render method returns a collection of utilities to query your component.
    const { getByText, getByRole } = render(CvCheckbox, {
      props,
    });

    getByText(props.label);

    const checkbox = await getByRole('checkbox');
    expect(checkbox.id).toBe(props.id);
    expect(checkbox.value).toBe(props.value);
    expect(checkbox.checked).toBe(true);
  });
});
