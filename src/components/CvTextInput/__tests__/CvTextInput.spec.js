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

  it('associates label & native input', async () => {
    const dummyLabel = 'Dummy Label';
    const { getByLabelText } = render(CvTextInput, {
      props: { label: dummyLabel },
    });

    const input = getByLabelText(dummyLabel);
    expect(input).toBeDefined();
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

    it('does not overwrite native input type if attribute type is set', async () => {
      const dummyType = 'number';
      const { container } = render(CvTextInput, {
        attrs: { type: dummyType },
      });

      const input = container.querySelector('input');
      expect(input.getAttribute('type')).toBe('text');
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
});
