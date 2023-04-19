import { render } from '@testing-library/vue';
import { CvForm } from '..';

describe('CvForm', () => {
  it('defines a form as the root element', () => {
    const { container } = render(CvForm);

    const wrapper = container.firstElementChild;
    expect(wrapper.tagName).toBe('FORM');
  });

  it('slots content inside the form', () => {
    const dummyElement = '<button>OK</button>';
    const { container } = render(CvForm, {
      slots: { default: dummyElement },
    });

    const form = container.firstElementChild;
    const button = form.querySelector('button');
    expect(button).not.toBeNull();
  });

  it('sets attributes at the form element', () => {
    const dummyId = 'dummy-id';
    const { getByTestId } = render(CvForm, {
      attrs: { 'data-testid': dummyId },
    });

    const form = getByTestId('dummy-id');
    expect(form).not.toBeNull();
  });
});
