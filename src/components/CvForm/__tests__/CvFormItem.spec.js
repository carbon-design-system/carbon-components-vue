import { render } from '@testing-library/vue';
import { CvFormItem } from '..';

describe('CvForm', () => {
  it('defines a div with corresponding form item classes as the root element', () => {
    const { container } = render(CvFormItem);

    const wrapper = container.firstElementChild;
    expect(wrapper.tagName).toBe('DIV');
    expect(wrapper.classList.contains('cv-form-item')).toBeTruthy();
    expect(wrapper.classList.contains('bx--form-item')).toBeTruthy();
  });

  it('slots content inside the form item wrapper', () => {
    const dummyElement = '<input type="text" />';
    const { container } = render(CvFormItem, {
      slots: { default: dummyElement },
    });

    const form = container.firstElementChild;
    const input = form.querySelector('input');
    expect(input).not.toBeNull();
  });

  it('sets attributes at the form item wrapper element', () => {
    const dummyId = 'dummy-id';
    const { getByTestId } = render(CvFormItem, {
      attrs: { 'data-testid': dummyId },
    });

    const element = getByTestId('dummy-id');
    expect(element).not.toBeNull();
  });
});
