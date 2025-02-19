import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvDatePicker from '../CvDatePicker.vue';
import { nextTick } from 'vue';

describe('CvDatePicker', () => {
  it('CvDatePicker - test default', async () => {
    const handler = jest.fn();

    // The render method returns a collection of utilities to query your component.
    const result = render(CvDatePicker, {
      attrs: {
        onchange: handler,
      },
      props: {
        dateLabel: 'XYZ-ABC-Label',
      },
    });

    const datepicker = await result.findByTestId('datepicker');

    const user = userEvent.setup();

    await user.click(datepicker);
    await user.keyboard('01/07/2023');
    await user.tab();

    expect(datepicker.value).toBe('01/07/2023');
    expect(handler).toHaveBeenCalled();
  });

  it('CvDatePicker - invalid message', async () => {
    // The render method returns a collection of utilities to query your component.
    const result = render(CvDatePicker, {
      props: {
        invalidMessage: 'Invalid date',
      },
    });

    const message = result.getByText('Invalid date');

    expect(message).toBeTruthy();
  });

  it('CvDatePicker - test single with datepicker', async () => {
    const handler = jest.fn();

    // The render method returns a collection of utilities to query your component.
    const result = render(CvDatePicker, {
      props: {
        kind: 'single',
        dateLabel: 'XYZ-ABC-Label',
      },
      attrs: {
        onchange: handler,
      },
    });

    const datepicker = await result.findByTestId('datepicker');

    const user = userEvent.setup();

    await user.click(datepicker);
    await nextTick();

    const datePickerDay = result.getByText('15');
    const flatpickrContainer =
      datePickerDay.parentNode.parentNode.parentNode.parentNode.parentNode;

    expect(flatpickrContainer.classList.contains('open')).toBeTruthy();

    await user.click(datePickerDay);
    await nextTick();

    const now = new Date();
    now.setDate(15);

    const selectedDate = new Date(datepicker.value);

    expect(selectedDate.toLocaleDateString('en')).toBe(
      now.toLocaleDateString('en')
    );
    expect(handler).toHaveBeenCalled();

    // Verify label state
    result.getByLabelText('XYZ-ABC-Label');
    const carbonContainer = result.container.querySelector(
      '.bx--date-picker-container'
    );
    expect(
      carbonContainer.classList.contains('bx--date-picker-container')
    ).toBeTruthy();
    expect(
      carbonContainer.classList.contains('bx--date-picker--nolabel')
    ).toBeFalsy();

    await result.rerender({ dateLabel: '' });
    expect(
      carbonContainer.classList.contains('bx--date-picker--nolabel')
    ).toBeTruthy();

    await result.rerender({ dateLabel: undefined });
    expect(
      carbonContainer.classList.contains('bx--date-picker--nolabel')
    ).toBeFalsy();
  });

  it('CvDatePicker - test range with datepicker', async () => {
    const handler = jest.fn();

    // The render method returns a collection of utilities to query your component.
    const result = render(CvDatePicker, {
      props: {
        kind: 'range',
      },
      attrs: {
        onchange: handler,
      },
    });

    const datepicker = await result.findByTestId('datepicker');
    const todatepicker = await result.findByTestId('todatepicker');

    const user = userEvent.setup();

    await user.click(datepicker);
    await nextTick();
    const datePickerStartDate = result.getByText('15');
    const flatpickrContainer =
      datePickerStartDate.parentNode.parentNode.parentNode.parentNode
        .parentNode;
    expect(flatpickrContainer.classList.contains('open')).toBeTruthy();
    await user.click(datePickerStartDate);
    await nextTick();

    await user.click(todatepicker);
    await nextTick();
    await user.click(result.getByText('16'));
    await nextTick();

    const startDate = new Date();
    startDate.setDate(15);
    const endDate = new Date();
    endDate.setDate(16);

    const selectedStartDate = new Date(datepicker.value);
    const selectedEndDate = new Date(todatepicker.value);

    expect(selectedStartDate.toLocaleDateString('en')).toBe(
      startDate.toLocaleDateString('en')
    );
    expect(selectedEndDate.toLocaleDateString('en')).toBe(
      endDate.toLocaleDateString('en')
    );
    expect(handler).toHaveBeenCalled();
  });
});
