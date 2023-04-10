import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvTextInput from '..';

describe('CvTextInput', () => {
  it("renders label when 'label' prop is passed", () => {
    const dummyLabel = 'Dummy Label';
    const { getByText } = render(CvTextInput, {
      props: { label: dummyLabel },
    });

    const label = getByText(dummyLabel);
    expect(label.tagName).toBe('LABEL');
    expect(label.textContent).toBe(dummyLabel);
  });

  it('emits model value on native input update', async () => {
    const dummyText = 'Lorem Ipsum';
    const user = userEvent.setup();
    const { container, emitted } = render(CvTextInput);

    const input = container.querySelector('input');
    await user.type(input, dummyText);

    const updateEvent = emitted()['update:modelValue'];
    expect(updateEvent.length).toBe(dummyText.length);
    expect(updateEvent[updateEvent.length - 1]).toEqual([dummyText]);
  });

  it("updates native input with 'value' prop", async () => {
    const dummyInitialText = 'Lorem Ipsum';
    const { container } = render(CvTextInput, {
      props: { modelValue: dummyInitialText },
    });

    const input = container.querySelector('input');
    expect(input.value).toBe(dummyInitialText);
  });
});
