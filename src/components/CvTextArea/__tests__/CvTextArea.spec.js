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

  it('associates label & native textarea', async () => {
    const dummyLabel = 'Dummy Label';
    const { getByLabelText } = render(CvTextArea, {
      props: { label: dummyLabel },
    });

    const textarea = getByLabelText(dummyLabel);
    expect(textarea).toBeDefined();
  });

  it("'disable' label when attribute disabled is set", () => {
    const { container } = render(CvTextArea, {
      attrs: { disabled: true },
    });

    const label = container.querySelector('label.bx--label--disabled');
    expect(label).toBeTruthy();
  });

  describe('Attribute & event binding', () => {
    it('binds attributes to native textarea', async () => {
      const dummyName = 'dummy-name';
      const { container } = render(CvTextArea, {
        attrs: { name: dummyName },
      });

      const textarea = container.querySelector('textarea');
      expect(textarea.getAttribute('name')).toBe(dummyName);
      expect(container.firstChild.getAttribute('name')).not.toBe(dummyName);
    });

    it('does not overwrite native textarea value if attribute value is set', async () => {
      const dummyValue = 'Dummy Value';
      const { container } = render(CvTextArea, {
        attrs: { value: dummyValue },
      });

      const textarea = container.querySelector('textarea');
      expect(textarea.value).toBe('');
    });
  });

  describe('Invalid state', () => {
    it("displays 'invalid-message' slot content", () => {
      const dummySlottedMessage = 'Slotted invalid message';
      const { getByText } = render(CvTextArea, {
        slots: { 'invalid-message': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(wrapper.classList.contains('bx--form-requirement')).toBeTruthy();
    });

    it("displays 'invalid-message' prop", () => {
      const dummyInvalidMessage = 'Prop invalid message';
      const { getByText } = render(CvTextArea, {
        props: { invalidMessage: dummyInvalidMessage },
      });

      const wrapper = getByText(dummyInvalidMessage);
      expect(wrapper.textContent).toBe(dummyInvalidMessage);
      expect(wrapper.classList.contains('bx--form-requirement')).toBeTruthy();
    });

    it('favors invalid message slot when both prop and slot are set', () => {
      const dummyInvalidMessage = 'Prop invalid message';
      const dummySlottedMessage = 'Slotted invalid message';
      const { getByText } = render(CvTextArea, {
        props: { invalidMessage: dummyInvalidMessage },
        slots: { 'invalid-message': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(wrapper.classList.contains('bx--form-requirement')).toBeTruthy();
    });
  });

  describe('Helper text', () => {
    it("displays 'helper-text' slot content", () => {
      const dummySlottedMessage = 'Slotted helper text';
      const { getByText } = render(CvTextArea, {
        slots: { 'helper-text': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(wrapper.classList.contains('bx--form__helper-text')).toBeTruthy();
    });

    it("displays 'helper-text' prop", () => {
      const dummyHelperText = 'Prop helper text';
      const { getByText } = render(CvTextArea, {
        props: { helperText: dummyHelperText },
      });

      const wrapper = getByText(dummyHelperText);
      expect(wrapper.textContent).toBe(dummyHelperText);
      expect(wrapper.classList.contains('bx--form__helper-text')).toBeTruthy();
    });

    it('favors helper text slot when both prop and slot are set', () => {
      const dummyHelperText = 'Prop helper text';
      const dummySlottedMessage = 'Slotted helper text';
      const { getByText } = render(CvTextArea, {
        props: { helperText: dummyHelperText },
        slots: { 'helper-text': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(wrapper.classList.contains('bx--form__helper-text')).toBeTruthy();
    });

    it('does not display helper text prop when invalid message slot is set', () => {
      const dummyHelperText = 'Prop helper text';
      const dummySlottedMessage = 'Slotted invalid message';
      const { getByText, queryByText } = render(CvTextArea, {
        props: { helperText: dummyHelperText },
        slots: { 'invalid-message': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(queryByText(dummyHelperText)).toBeNull();
    });

    it('does not display helper slot when invalid message slot is set', () => {
      const dummySlottedHelperMessage = 'Slotted helper text';
      const dummySlottedInvalidMessage = 'Slotted invalid message';
      const { getByText, queryByText } = render(CvTextArea, {
        slots: {
          'invalid-message': dummySlottedInvalidMessage,
          'helper-text': dummySlottedHelperMessage,
        },
      });

      const wrapper = getByText(dummySlottedInvalidMessage);
      expect(wrapper.textContent).toBe(dummySlottedInvalidMessage);
      expect(queryByText(dummySlottedHelperMessage)).toBeNull();
    });

    it("'disable' helper text when attribute disabled is set", () => {
      const { container } = render(CvTextArea, {
        attrs: { disabled: true },
        slots: { 'helper-text': 'dummy helper text' },
      });

      const helperTextContainer = container.querySelector(
        '.bx--form__helper-text--disabled'
      );
      expect(helperTextContainer).toBeTruthy();
    });
  });
});
