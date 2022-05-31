import { render, fireEvent } from '@testing-library/vue';
import CvCheckbox from '../CvCheckbox';

describe('CvCheckbox', () => {
  it('CvCheckbox - default', async () => {
    // The render method returns a collection of utilities to query your component.
    const { emitted, getByTestId } = render(CvCheckbox, {
      props: { value: 'checkbox-1' },
    });

    const checkbox = getByTestId('checkbox');

    await fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(emitted().change).toBeTruthy();
  });

  it('CvCheckbox - props', async () => {
    const props = {
      value: 'checkbox-1',
      label: 'CHECKBOX XYZ123',
      id: 'ABC-checkbox-123',
      checked: true,
    };
    // The render method returns a collection of utilities to query your component.
    const { emitted, getByText, getByTestId } = render(CvCheckbox, {
      props,
    });

    const label = getByText(props.label);

    const checkbox = getByTestId('checkbox');
    expect(checkbox.id).toBe(props.id);
    expect(checkbox.value).toBe(props.value);
    expect(checkbox.checked).toBe(true);
  });
});
