import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvModal from '../CvModal.vue';
import { MODAL_KIND_DANGER, MODAL_SIZE_LARGE } from '@/components/CvModal';

describe('CvModal', () => {
  it('CvModal - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const contentString = 'XYZ modal content';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvModal, {
      props: {
        visible: false,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
        disableTeleport: true,
      },
      slots: {
        label: `<div>XYZ modal label</div>`,
        title: 'XYZ modal title',
        content: `<p>${contentString}</p>`,
      },
    });

    const dialog = result.container.querySelector('.cv-modal');
    expect(dialog.classList.contains('is-visible')).toBe(false);
    expect(dialog.classList.contains('ABC-class-123')).toBe(true);

    await result.findByLabelText(ariaLabel);
    await result.findByText(contentString);
    await result.rerender({ visible: true });
    expect(dialog.classList.contains('is-visible')).toBe(true);
  });

  it('CvModal - test all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const closeAriaLabel = 'ABC-close-aria-label-123';
    const contentString = 'XYZ modal content';

    // The render method returns a collection of utilities to query your component.
    const result = render(CvModal, {
      props: {
        visible: false,
        alert: true,
        closeAriaLabel: closeAriaLabel,
        autoHideOff: true,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
        disableTeleport: true,
      },
      slots: {
        label: `<div>XYZ modal label</div>`,
        title: 'XYZ modal title',
        content: `<p>XYZ modal content</p>`,
        'primary-button': 'primary',
        'secondary-button': 'secondary',
        'other-button': 'other',
      },
    });

    const dialog = result.container.querySelector('.cv-modal');
    const dlgContent = dialog.querySelector('.bx--modal-content');
    expect(dialog.classList.contains('is-visible')).toBe(false);
    expect(dialog.classList.contains('bx--modal--danger')).toBe(false);
    expect(dialog.classList.contains('ABC-class-123')).toBe(true);

    await result.findByLabelText(ariaLabel);
    await result.findByLabelText(closeAriaLabel);
    await result.findByText(contentString);
    const dlgContainer = await result.findByRole('alertdialog');
    const buttons = await result.findAllByRole('button');

    expect(dlgContainer.classList.contains('bx--modal-container--lg')).toBe(
      false
    );
    expect(dlgContainer.classList.contains('bx--modal--danger')).toBe(false);
    expect(dlgContent.classList.contains('bx--modal--danger')).toBe(false);
    expect(dlgContent.classList.contains('bx--modal-content--with-form')).toBe(
      false
    );
    expect(buttons.length).toBe(4);
    expect(buttons[3].getAttribute('disabled')).toBe(null);

    await result.rerender({
      visible: true,
      kind: MODAL_KIND_DANGER,
      primaryButtonDisabled: true,
      size: MODAL_SIZE_LARGE,
      hasFormContent: true,
    });

    expect(dialog.classList.contains('is-visible')).toBe(true);
    expect(dialog.classList.contains('bx--modal--danger')).toBe(true);
    expect(dlgContainer.classList.contains('bx--modal-container--lg')).toBe(
      true
    );
    expect(dlgContent.classList.contains('bx--modal-content--with-form')).toBe(
      true
    );
    expect(buttons[3]).toHaveProperty('disabled');

    await result.rerender({
      primaryButtonDisabled: false,
    });

    const user = userEvent.setup();
    await user.click(buttons[0]); // close button
    await user.click(buttons[1]); // other button
    await user.click(buttons[2]); // secondary button
    await user.click(buttons[3]); // primary button
    await user.keyboard('{Esc}'); // close
    expect(result.emitted('primary-click')?.length).toBe(1);
    expect(result.emitted('secondary-click')?.length).toBe(1);
    expect(result.emitted('other-btn-click')?.length).toBe(1);
    expect(result.emitted('modal-hide-request')?.length).toBe(5);
  });
});
