import { render } from '@testing-library/vue';
import { CvFormGroup } from '..';

describe('CvFormGroup', () => {
  it('defines a fieldset as the root element', () => {
    const { container } = render(CvFormGroup);

    const wrapper = container.firstElementChild;
    expect(wrapper.tagName).toBe('FIELDSET');
  });

  it('sets a legend element with a slot space', () => {
    const dummyLabel = 'dummy label';
    const { getByText } = render(CvFormGroup, {
      slots: { label: dummyLabel },
    });

    const legend = getByText(dummyLabel);
    expect(legend).not.toBeNull();
    expect(legend.tagName).toBe('LEGEND');
  });

  it('slots content inside the fieldset', () => {
    const dummyElement = '<input type="text" />';
    const { container } = render(CvFormGroup, {
      slots: { content: dummyElement },
    });

    const fieldset = container.firstElementChild;
    const input = fieldset.querySelector('input');
    expect(input).not.toBeNull();
  });

  it('displays a message if one is passed', () => {
    const dummyMessage = 'some dummy message';
    const { getByText } = render(CvFormGroup, {
      props: { message: dummyMessage },
    });

    const element = getByText(dummyMessage);
    expect(element).not.toBeNull();
  });

  it('styles fieldset with no margin class when noMargin is passed', () => {
    const { container } = render(CvFormGroup, {
      props: { noMargin: true },
    });

    const wrapper = container.firstElementChild;
    expect(wrapper.classList.contains('bx--fieldset--no-margin')).toBeTruthy();
  });

  it('defines "data-invalid" attribute when invalid is passed', () => {
    const { container } = render(CvFormGroup, {
      props: { invalid: true },
    });

    const wrapper = container.firstElementChild;
    expect(wrapper.getAttribute('data-invalid')).toBe('true');
  });
});
