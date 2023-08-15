import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvTimePicker from '../CvTimePicker.vue';
import {
  TIME_PICKER_24,
  TIME_PICKER_AM,
  TIME_PICKER_PM,
  TIME_PICKER_SIZES,
} from '@/components/CvTimePicker';
import { carbonPrefix } from '@/global/settings';

const timezones = [
  { value: 'America/New_York', label: 'America/New York' },
  { value: 'Europe/Berlin', label: 'Europe/Berlin' },
  { value: 'Asia/Dubai', label: 'Asia/Dubai' },
  { value: 'Asia/Calcutta', label: 'Indian Standard Time' },
  { value: 'Asia/Shanghai', label: 'China Standard Time' },
  { value: 'Moon/Tranquility_Base', label: 'Moon Standard Time' },
];

describe('CvTimePicker', () => {
  it('CvTimePicker - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const xyzAmpmSelectLabel123 = 'XYZ ampmSelectLabel 123';
    const labelText = 'XYZ label 123';
    const placeholderText = 'XYZ placeholder 123';

    const result = render(CvTimePicker, {
      props: {},
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
        ampmSelectLabel: xyzAmpmSelectLabel123,
        label: labelText,
        placeholder: placeholderText,
      },
    });

    const element = result.container.querySelector('.cv-time-picker');
    await result.findByLabelText(xyzAmpmSelectLabel123);
    await result.findByLabelText(labelText);
    const timeInput = await result.findByPlaceholderText(placeholderText);

    // check AM/PM choice
    let selects = await element.querySelectorAll('select');
    expect(selects.length).toBe(1); // am or pm select
    await result.rerender({ ampm: TIME_PICKER_24 });
    selects = await element.querySelectorAll('select');
    expect(selects.length).toBe(0); // no am or pm select

    // Check time zones
    await result.rerender({ ampm: TIME_PICKER_PM, timezones });
    selects = await element.querySelectorAll('select');
    expect(selects.length).toBe(2); // am & timezones

    // Check invalid message
    const invalidMessage = 'XYZ invalidMessage 123';
    await result.rerender({ invalidMessage: invalidMessage });
    await result.findByText(invalidMessage);

    // Check events
    const user = userEvent.setup();
    await user.selectOptions(selects[0], ['AM']);
    expect(result.emitted('change')[0][0]).toStrictEqual({
      type: 'ampm',
      value: 'AM',
    });
    const selectOption = 'Moon/Tranquility_Base';
    await user.selectOptions(selects[1], [selectOption]);
    expect(result.emitted('change')[1][0]).toStrictEqual({
      type: 'timezone',
      value: selectOption,
    });
    await user.type(timeInput, '23:21');
    expect(result.emitted('change')[2][0]).toStrictEqual({
      type: 'time',
      value: '2',
    });
  });
  it('CvTimePicker - test invalid slot', async () => {
    const invalid = 'ABC-invalid-123';
    const invalidSlot = 'ABC-invalid-slot-text-123';
    const slots = {
      'invalid-message': invalidSlot,
    };

    // The render method returns a collection of utilities to query your component.
    let result = render(CvTimePicker, {
      props: {
        invalidMessage: invalid,
      },
      slots: slots,
    });

    result.container.querySelector('.cv-time-picker');

    const it = await result.queryByText(invalid);
    expect(it).toBeFalsy();
    await result.findByText(invalidSlot);
  });
  it('CvTimePicker - v-model', async () => {
    let myTime = '23:35';
    let myHour = 'PM';
    let myZone = timezones[1].value;
    const placeholderText = 'XYZ placeholder 123';

    const options = {
      props: {
        time: myTime,
        'onUpdate:time': e => (myTime = e),
        ampm: myHour,
        'onUpdate:ampm': e => (myHour = e),
        timezone: myZone,
        'onUpdate:timezone': e => (myZone = e),
        timezones,
        placeholder: placeholderText,
      },
    };
    // The render method returns a collection of utilities to query your component.
    const result = render(CvTimePicker, options);
    const selects = await result.container.querySelectorAll('select');
    expect(selects.length).toBe(2); // am & timezones

    const user = userEvent.setup();
    await user.selectOptions(selects[0], [TIME_PICKER_AM]);
    expect(myHour).toBe(TIME_PICKER_AM);

    await user.selectOptions(selects[1], [timezones[2].value]);
    expect(myZone).toBe(timezones[2].value);

    const timeInput = await result.findByPlaceholderText(placeholderText);
    await user.clear(timeInput);
    await user.type(timeInput, '23:21');
    expect(myTime).toBe('23:21');
  });

  test.each(TIME_PICKER_SIZES)('CvTimePicker - with %s size', fieldSize => {
    const result = render(CvTimePicker, {
      props: {
        timezones,
        fieldSize,
      },
    });
    const el = result.container.querySelector('.bx--time-picker');
    const selects = result.container.querySelectorAll('select');

    expect(el.classList).toContain(
      `${carbonPrefix}--time-picker--${fieldSize}`
    );
    selects.forEach(el =>
      expect(el.classList).toContain(
        `${carbonPrefix}--select-input--${fieldSize}`
      )
    );
  });
});
