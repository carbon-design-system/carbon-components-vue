import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvSelect from '../CvSelect.vue';
import CvSelectOption from '../CvSelectOption.vue';
import CvSelectOptgroup from '../CvSelectOptgroup.vue';

const SelectOptions = {
  components: { CvSelectOption, CvSelectOptgroup },
  template: `
    <cv-select-option disabled selected hidden value="placeholder-item">Choose an option</cv-select-option>
    <cv-select-option value="so-long">A much longer cv-select-option that is worth having around to check how text flows</cv-select-option>
    <cv-select-optgroup label="Category 1">
      <cv-select-option value="cv-select-option1">cv-select-option 1</cv-select-option>
      <cv-select-option value="cv-select-option2">cv-select-option 2</cv-select-option>
    </cv-select-optgroup>
    <cv-select-optgroup label="Category 2">
      <cv-select-option value="cv-select-option3">cv-select-option 3</cv-select-option>
      <cv-select-option value="cv-select-option4">cv-select-option 4</cv-select-option>
    </cv-select-optgroup>
  `,
};

describe('CvSelect', () => {
  it('CvSelect - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const label = 'ABC-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvSelect, {
      props: {
        label: label,
      },
      slots: {
        default: SelectOptions,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const select = await result.findByLabelText(label);
    await result.findByDisplayValue('Choose an option');

    const user = userEvent.setup();
    await user.selectOptions(select, ['so-long']);

    expect(select.classList.contains('ABC-class-123')).toBe(true);
    expect(select.getAttribute('aria-label')).toBe(ariaLabel);
    expect(result.emitted('change')?.length).toBe(1);
    expect(result.emitted('change')[0][0]).toBe('so-long');
  });

  it('CvSelect - all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const label = 'ABC-label-123';
    const helper = 'ABC-helper-123';
    const warning = 'ABC-warning-123';
    const invalid = 'ABC-invalid-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvSelect, {
      props: {
        label: label,
        size: 'md',
        inline: false,
        invalidMessage: '',
        warningMessage: '',
        helperText: helper,
        hideLabel: false,
        light: false,
        disabled: false,
      },
      slots: {
        default: SelectOptions,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const select = await result.findByLabelText(label);
    await result.findByDisplayValue('Choose an option');

    await result.findByText(helper);
    await result.rerender({ warningMessage: warning });
    await result.findByText(warning);
    await result.rerender({ invalidMessage: invalid });
    await result.findByText(invalid);

    expect(select.classList.contains('bx--select-input--md'));
    await result.rerender({ size: 'sm' });
    expect(select.classList.contains('bx--select-input--sm'));
    await result.rerender({ size: 'lg' });
    expect(select.classList.contains('bx--select-input--lg'));

    const labelElement = await result.findByText(label);
    expect(labelElement.classList.contains('bx--visually-hidden')).toBe(false);
    await result.rerender({ hideLabel: true });
    expect(labelElement.classList.contains('bx--visually-hidden'));

    expect(result.container.classList.contains('bx--select--light')).toBe(
      false
    );
    await result.rerender({ light: true });
    expect(result.container.classList.contains('bx--select--light'));

    expect(result.container.classList.contains('bx--select--inline')).toBe(
      false
    );
    await result.rerender({ inline: true });
    expect(result.container.classList.contains('bx--select--inline'));

    expect(result.container.classList.contains('bx--select--disabled')).toBe(
      false
    );
    await result.rerender({ disabled: true });
    expect(result.container.classList.contains('bx--select--disabled'));
  });

  it('CvSelect - test helper slot', async () => {
    const label = 'ABC-label-123';
    const helper = 'ABC-helper-123';
    const helperSlot = 'ABC-helper-slot-text-123';

    // The render method returns a collection of utilities to query your component.
    const result = render(CvSelect, {
      props: {
        label: label,
        helperText: helper,
      },
      slots: {
        default: SelectOptions,
        'helper-text': helperSlot,
      },
    });

    const select = await result.findByLabelText(label);
    await result.findByText(helperSlot);
  });
  it('CvSelect - test warning slot', async () => {
    const label = 'ABC-label-123';
    const helperSlot = 'ABC-helper-slot-text-123';
    const warning = 'ABC-warning-123';
    const warningSlot = 'ABC-warning-slot-text-123';

    // The render method returns a collection of utilities to query your component.
    const result = render(CvSelect, {
      props: {
        label: label,
        warningMessage: warning,
      },
      slots: {
        default: SelectOptions,
        'helper-text': helperSlot,
        'warning-message': warningSlot,
      },
    });

    await result.findByLabelText(label);
    await result.findByText(warningSlot);
    expect(result.container.classList.contains('bx--select--warning'));
  });
  it('CvSelect - test invalid slot', async () => {
    const label = 'ABC-label-123';
    const helperSlot = 'ABC-helper-slot-text-123';
    const warningSlot = 'ABC-warning-slot-text-123';
    const invalid = 'ABC-invalid-123';
    const invalidSlot = 'ABC-invalid-slot-text-123';

    // The render method returns a collection of utilities to query your component.
    const result = render(CvSelect, {
      props: {
        label: label,
        invalidMessage: invalid,
      },
      slots: {
        default: SelectOptions,
        'helper-text': helperSlot,
        'warning-message': warningSlot,
        'invalid-message': invalidSlot,
      },
    });

    await result.findByLabelText(label);
    await result.findByText(invalidSlot);
    expect(result.container.classList.contains('bx--select--invalid'));
  });
});
