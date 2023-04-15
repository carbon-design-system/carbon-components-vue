import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvTextArea from '..';

describe('CvTextArea', () => {
  it("renders label when 'label' prop is passed", () => {
    const dummyLabel = 'Dummy Label';
    const { getByText } = render(CvTextArea, {
      props: { label: dummyLabel },
    });

    const label = getByText(dummyLabel);
    expect(label.tagName).toBe('LABEL');
    expect(label.textContent).toBe(dummyLabel);
  });

  it('emits model value on native textarea update', async () => {
    const dummyText = 'Lorem Ipsum';
    const user = userEvent.setup();
    const { container, emitted } = render(CvTextArea);

    const textarea = container.querySelector('textarea');
    await user.type(textarea, dummyText);

    const updateEvent = emitted()['update:modelValue'];
    expect(updateEvent.length).toBe(dummyText.length);
    expect(updateEvent[updateEvent.length - 1]).toEqual([dummyText]);
  });

  it("updates native textarea with 'value' prop", async () => {
    const dummyInitialText = 'Lorem Ipsum';
    const { container } = render(CvTextArea, {
      props: { modelValue: dummyInitialText },
    });

    const textarea = container.querySelector('textarea');
    expect(textarea.value).toBe(dummyInitialText);
  });
});
