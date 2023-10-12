import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { CvTextInput, CvTextInputSkeleton } from '..';

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

  it('associates label & native input', async () => {
    const dummyLabel = 'Dummy Label';
    const { getByLabelText } = render(CvTextInput, {
      props: { label: dummyLabel },
    });

    const input = getByLabelText(dummyLabel);
    expect(input).toBeDefined();
  });

  it("'disable' label when attribute disabled is set", () => {
    const { container } = render(CvTextInput, {
      attrs: { disabled: true },
    });

    const label = container.querySelector('label.bx--label--disabled');
    expect(label).toBeTruthy();
  });

  it('visually hide label when hideLabel is set', () => {
    const { container } = render(CvTextInput, {
      props: { hideLabel: true },
    });

    const label = container.querySelector('label.bx--visually-hidden');
    expect(label).toBeTruthy();
  });

  describe('Attribute & event binding', () => {
    it('binds attributes to native input', async () => {
      const dummyName = 'dummy-name';
      const { container } = render(CvTextInput, {
        attrs: { name: dummyName },
      });
      const input = container.querySelector('input');
      expect(input.getAttribute('name')).toBe(dummyName);
      expect(container.firstChild.getAttribute('name')).not.toBe(dummyName);
    });

    it('does not overwrite native input value if attribute value is set', async () => {
      const dummyValue = 'Dummy Value';
      const { container } = render(CvTextInput, {
        attrs: { value: dummyValue },
      });

      const input = container.querySelector('input');
      expect(input.value).toBe('');
    });
  });

  describe('Invalid state', () => {
    it("displays 'invalid-message' slot content", () => {
      const dummySlottedMessage = 'Slotted invalid message';
      const { getByText } = render(CvTextInput, {
        slots: { 'invalid-message': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(wrapper.classList.contains('bx--form-requirement')).toBeTruthy();
    });

    it("displays 'invalid-message' prop", () => {
      const dummyInvalidMessage = 'Prop invalid message';
      const { getByText } = render(CvTextInput, {
        props: { invalidMessage: dummyInvalidMessage },
      });

      const wrapper = getByText(dummyInvalidMessage);
      expect(wrapper.textContent).toBe(dummyInvalidMessage);
      expect(wrapper.classList.contains('bx--form-requirement')).toBeTruthy();
    });

    it('favors invalid message slot when both prop and slot are set', () => {
      const dummyInvalidMessage = 'Prop invalid message';
      const dummySlottedMessage = 'Slotted invalid message';
      const { getByText } = render(CvTextInput, {
        props: { invalidMessage: dummyInvalidMessage },
        slots: { 'invalid-message': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(wrapper.classList.contains('bx--form-requirement')).toBeTruthy();
    });
  });

  describe('Warn state', () => {
    it("displays 'warn-text' slot content", () => {
      const dummySlottedMessage = 'Slotted warn text';
      const { getByText } = render(CvTextInput, {
        slots: { 'warn-text': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(wrapper.classList.contains('bx--form__requirement')).toBeTruthy();
    });

    it("displays 'warn-text' prop", () => {
      const dummyWarnText = 'Prop warn text';
      const { getByText } = render(CvTextInput, {
        props: { warnText: dummyWarnText },
      });

      const wrapper = getByText(dummyWarnText);
      expect(wrapper.textContent).toBe(dummyWarnText);
      expect(wrapper.classList.contains('bx--form__requirement')).toBeTruthy();
    });

    it('favors warn text slot when both prop and slot are set', () => {
      const dummyWarnText = 'Prop warn text';
      const dummySlottedMessage = 'Slotted warn text';
      const { getByText } = render(CvTextInput, {
        props: { warnText: dummyWarnText },
        slots: { 'warn-text': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(wrapper.classList.contains('bx--form__requirement')).toBeTruthy();
    });

    it('does not display warn text prop when invalid message prop is set', () => {
      const dummyWarnText = 'Prop warn text';
      const dummyInvalidMessage = 'Prop invalid message';
      const { getByText, queryByText } = render(CvTextInput, {
        props: {
          warnText: dummyWarnText,
          invalidMessage: dummyInvalidMessage,
        },
      });

      const wrapper = getByText(dummyInvalidMessage);
      expect(wrapper.textContent).toBe(dummyInvalidMessage);
      expect(queryByText(dummyWarnText)).toBeNull();
    });

    it('does not display warn text prop when invalid message slot is set', () => {
      const dummyWarnText = 'Prop warn text';
      const dummySlottedMessage = 'Slotted invalid message';
      const { getByText, queryByText } = render(CvTextInput, {
        props: { warnText: dummyWarnText },
        slots: { 'invalid-message': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(queryByText(dummyWarnText)).toBeNull();
    });

    it('does not display warn slot when invalid message prop is set', () => {
      const dummyInvalidMessage = 'Prop invalid message';
      const dummySlottedMessage = 'Slotted warn message';
      const { getByText, queryByText } = render(CvTextInput, {
        props: { invalidMessage: dummyInvalidMessage },
        slots: { 'warn-text': dummySlottedMessage },
      });

      const wrapper = getByText(dummyInvalidMessage);
      expect(wrapper.textContent).toBe(dummyInvalidMessage);
      expect(queryByText(dummySlottedMessage)).toBeNull();
    });

    it('does not display warn slot when invalid message slot is set', () => {
      const dummySlottedWarnMessage = 'Slotted warn text';
      const dummySlottedInvalidMessage = 'Slotted invalid message';
      const { getByText, queryByText } = render(CvTextInput, {
        slots: {
          'invalid-message': dummySlottedInvalidMessage,
          'warn-text': dummySlottedWarnMessage,
        },
      });

      const wrapper = getByText(dummySlottedInvalidMessage);
      expect(wrapper.textContent).toBe(dummySlottedInvalidMessage);
      expect(queryByText(dummySlottedWarnMessage)).toBeNull();
    });
  });

  describe('Helper text', () => {
    it("displays 'helper-text' slot content", () => {
      const dummySlottedMessage = 'Slotted helper text';
      const { getByText } = render(CvTextInput, {
        slots: { 'helper-text': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(wrapper.classList.contains('bx--form__helper-text')).toBeTruthy();
    });

    it("displays 'helper-text' prop", () => {
      const dummyHelperText = 'Prop helper text';
      const { getByText } = render(CvTextInput, {
        props: { helperText: dummyHelperText },
      });

      const wrapper = getByText(dummyHelperText);
      expect(wrapper.textContent).toBe(dummyHelperText);
      expect(wrapper.classList.contains('bx--form__helper-text')).toBeTruthy();
    });

    it('favors helper text slot when both prop and slot are set', () => {
      const dummyHelperText = 'Prop helper text';
      const dummySlottedMessage = 'Slotted helper text';
      const { getByText } = render(CvTextInput, {
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
      const { getByText, queryByText } = render(CvTextInput, {
        props: { helperText: dummyHelperText },
        slots: { 'invalid-message': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(queryByText(dummyHelperText)).toBeNull();
    });

    it('does not display helper text prop when warn text slot is set', () => {
      const dummyHelperText = 'Prop helper text';
      const dummySlottedMessage = 'Slotted warn text';
      const { getByText, queryByText } = render(CvTextInput, {
        props: { helperText: dummyHelperText },
        slots: { 'warn-text': dummySlottedMessage },
      });

      const wrapper = getByText(dummySlottedMessage);
      expect(wrapper.textContent).toBe(dummySlottedMessage);
      expect(queryByText(dummyHelperText)).toBeNull();
    });

    it('does not display helper slot when invalid message slot is set', () => {
      const dummySlottedHelperMessage = 'Slotted helper text';
      const dummySlottedInvalidMessage = 'Slotted invalid message';
      const { getByText, queryByText } = render(CvTextInput, {
        slots: {
          'invalid-message': dummySlottedInvalidMessage,
          'helper-text': dummySlottedHelperMessage,
        },
      });

      const wrapper = getByText(dummySlottedInvalidMessage);
      expect(wrapper.textContent).toBe(dummySlottedInvalidMessage);
      expect(queryByText(dummySlottedHelperMessage)).toBeNull();
    });

    it('does not display helper slot when warn text slot is set', () => {
      const dummySlottedHelperMessage = 'Slotted helper text';
      const dummySlottedWarnMessage = 'Slotted warn text';
      const { getByText, queryByText } = render(CvTextInput, {
        slots: {
          'warn-text': dummySlottedWarnMessage,
          'helper-text': dummySlottedHelperMessage,
        },
      });

      const wrapper = getByText(dummySlottedWarnMessage);
      expect(wrapper.textContent).toBe(dummySlottedWarnMessage);
      expect(queryByText(dummySlottedHelperMessage)).toBeNull();
    });

    it("'disable' helper text when attribute disabled is set", () => {
      const { container } = render(CvTextInput, {
        attrs: { disabled: true },
        slots: { 'helper-text': 'dummy helper text' },
      });

      const helperTextContainer = container.querySelector(
        '.bx--form__helper-text--disabled'
      );
      expect(helperTextContainer).toBeTruthy();
    });
  });

  describe('Password', () => {
    it('updates native input type to password when type is password', () => {
      const { container } = render(CvTextInput, {
        props: { type: 'password' },
      });

      const input = container.querySelector('input[type="password"]');
      expect(input).not.toBeNull();
    });

    it('displays password visibility toggle button when type is password', () => {
      const { container } = render(CvTextInput, {
        props: { type: 'password' },
      });

      const button = container.querySelector('button.bx--btn');
      expect(button).toBeTruthy();
    });

    it('retains input value when password visibility is open', async () => {
      const dummyText = '123456';
      const user = userEvent.setup();
      const { container } = render(CvTextInput, {
        props: { type: 'password' },
      });

      const input = container.querySelector('input');
      const toggleButton = container.querySelector('button');
      await user.type(input, dummyText);
      await user.click(toggleButton);

      expect(input.value).toBe(dummyText);
    });

    it('retains input value when password visibility is closed after opened', async () => {
      const dummyText = '123456';
      const user = userEvent.setup();
      const { container } = render(CvTextInput, {
        props: { type: 'password' },
      });

      const input = container.querySelector('input');
      const toggleButton = container.querySelector('button');
      await user.type(input, dummyText);
      await user.click(toggleButton);
      await user.click(toggleButton);

      expect(input.value).toBe(dummyText);
    });

    it("sets 'show password' as assistive text when password is hidden", async () => {
      const dummySupportText = 'show password';
      const { findByText } = render(CvTextInput, {
        props: { type: 'password', passwordShowLabel: dummySupportText },
      });

      const element = await findByText(dummySupportText);
      expect(element.textContent).toBe(dummySupportText);
      expect(element.classList.contains('bx--assistive-text')).toBeTruthy();
    });

    it("sets 'hide password' as assistive text when password is hidden", async () => {
      const initialDummySupportText = 'show password';
      const dummySupportText = 'hide password';
      const user = userEvent.setup();
      const { findByText } = render(CvTextInput, {
        props: {
          type: 'password',
          passwordShowLabel: initialDummySupportText,
          passwordHideLabel: dummySupportText,
        },
      });

      let element = await findByText(initialDummySupportText);
      await user.click(element);

      element = await findByText(dummySupportText);
      expect(element.textContent).toBe(dummySupportText);
      expect(element.classList.contains('bx--assistive-text')).toBeTruthy();
    });

    it("toggles visibility when 'passwordVisible' changes and doesn't match internal state (true)", async () => {
      const { findByText, rerender } = render(CvTextInput, {
        props: { type: 'password' },
      });

      const element = await findByText('Show password');

      await rerender({ passwordVisible: true });

      expect(element.textContent).toBe('Hide password');
    });

    it("toggles visibility when 'passwordVisible' changes and doesn't match internal state (false)", async () => {
      const user = userEvent.setup();
      const { findByText, rerender } = render(CvTextInput, {
        props: { type: 'password' },
      });

      const element = await findByText('Show password');

      await user.click(element);
      await rerender({ passwordVisible: false });

      expect(element.textContent).toBe('Show password');
    });

    it("retains value when visibility changes through 'passwordVisible'", async () => {
      const dummyText = '123456';
      const user = userEvent.setup();
      const { rerender, container } = render(CvTextInput, {
        props: { type: 'password' },
      });

      let input = container.querySelector('input');

      await user.type(input, dummyText);
      await rerender({ passwordVisible: true });
      // input value is reinserted on the nextTick, we need to wait that to fetch the input value
      await rerender({});

      expect(input.value).toBe(dummyText);
    });

    it("enables password visibility when component bootstraps with 'passwordVisible' true", async () => {
      const { container, findByText } = render(CvTextInput, {
        props: { type: 'password', passwordVisible: true },
      });

      const input = container.querySelector('input[type="text"]');
      const button = await findByText('Hide password');

      expect(input).not.toBeNull();
      expect(button).not.toBeNull();
    });
  });
});

describe('CvTextInputSkeleton', () => {
  it("renders label when 'hideLabel' prop is omitted", async () => {
    const skeleton = render(CvTextInputSkeleton);
    const label = skeleton.container.querySelector(
      'label.bx--label.bx--skeleton'
    );
    expect(label).toBeTruthy();
  });
  it("renders label when 'hideLabel' prop is false", async () => {
    const skeleton = render(CvTextInputSkeleton, {
      props: { hideLabel: false },
    });
    const label = skeleton.container.querySelector(
      'label.bx--label.bx--skeleton'
    );
    expect(label).toBeTruthy();
  });
  it("does not render label when 'hideLabel' prop is true", async () => {
    const skeleton = render(CvTextInputSkeleton, {
      props: { hideLabel: true },
    });
    const label = skeleton.container.querySelector(
      'label.bx--label.bx--skeleton'
    );
    expect(label).toBeFalsy();
  });
  it('renders div with correct class', async () => {
    const skeleton = render(CvTextInputSkeleton);
    const div = skeleton.container.querySelector(
      'div.bx--text-input.bx--skeleton'
    );
    expect(div).toBeTruthy();
  });
});
