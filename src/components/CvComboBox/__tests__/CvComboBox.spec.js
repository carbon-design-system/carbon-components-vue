import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import CvComboBox from '../CvComboBox.vue';

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Kiwi Fruit',
  'Lemon',
  'Lime',
  'Mango',
  'Orange',
  'Passion Fruit',
  'Raisin',
  'Satsuma',
  'Tangerine',
  'Ugli Fruit',
  'Watermelon',
].map(item => {
  const nameVal = item.replace(/\W/, '_').toLowerCase();
  return {
    name: nameVal,
    label: item,
    value: `val-${nameVal}`,
  };
});

describe('CvComboBox', () => {
  it('CvComboBox - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const handler = jest.fn();
    // The render method returns a collection of utilities to query your component.
    const result = render(CvComboBox, {
      props: {
        title: 'Combo Box title',
        options: fruits,
      },
      attrs: {
        class: 'ABC-class-123',
        onkeydown: handler,
        'aria-label': ariaLabel,
      },
    });

    const combobox = await result.findByRole('combobox');
    const listbox = await result.findByRole('listbox');

    const user = userEvent.setup();
    await user.click(combobox);
    await user.keyboard('foo');
    expect(result.emitted().filter).toBeTruthy();
    expect(listbox.classList.contains('ABC-class-123')).toBe(true);
    expect(listbox.getAttribute('aria-label')).toBe(ariaLabel);
    expect(handler).toHaveBeenCalled();
  });

  it('CvComboBox - test all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const props = {
      title: 'TITLE XYZ123',
      label: 'LABEL XYZ123',
      id: 'ABC-123',
      value: 'val-elderberry',
      helperText: 'HELPER ABC',
      invalidMessage: 'INVALID ABC',
      options: fruits,
    };
    // The render method returns a collection of utilities to query your component.
    const result = render(CvComboBox, {
      props,
      attrs: {
        'aria-label': ariaLabel,
      },
    });

    await result.findByPlaceholderText(props.label);
    await result.findByText(props.title);
    await result.findByText(props.invalidMessage);
    await result.findByDisplayValue('Elderberry');

    const listbox = await result.findByRole('listbox');
    const menu = listbox.querySelector(`#${props.id}`);
    expect(menu).toBeTruthy();

    // check the aria label
    const wrapper = result.container.querySelector('.bx--list-box__wrapper');
    expect(wrapper.getAttribute('aria-label')).toBe(ariaLabel);

    await result.rerender({ invalidMessage: '' });
    await result.findByText(props.helperText);
  });

  it('CvComboBox - v-model', async () => {
    const props = {
      modelValue: 'val-elderberry',
      options: fruits,
    };
    // The render method returns a collection of utilities to query your component.
    const result = render(CvComboBox, {
      props,
    });

    await result.findByDisplayValue('Elderberry');
    await result.rerender({ ...props, modelValue: 'val-tangerine' });
    await result.findByDisplayValue('Tangerine');
  });

  it('CvComboBox - autoFilter', async () => {
    const props = {
      autoFilter: true,
      options: fruits,
    };
    // The render method returns a collection of utilities to query your component.
    const result = render(CvComboBox, {
      props,
    });

    const combobox = await result.findByRole('combobox');

    const user = userEvent.setup();
    await user.click(combobox);
    await user.keyboard('ap');
    const filtered = result.container.querySelectorAll(
      '.bx--list-box__menu-item__option'
    );
    expect(filtered.length).toBe(2);
    await within(filtered.item(0)).findByText('Apple');
    await within(filtered.item(1)).findByText('Grape');
  });

  it('CvComboBox - autoHighlight', async () => {
    const props = {
      autoHighlight: true,
      options: fruits,
    };
    // The render method returns a collection of utilities to query your component.
    const result = render(CvComboBox, {
      props,
    });

    const combobox = await result.findByRole('combobox');

    const user = userEvent.setup();
    await user.click(combobox);
    await user.keyboard('Cher');
    const highlighted = result.container.querySelector(
      '.bx--list-box__menu-item--highlighted'
    );
    expect(highlighted).toBeTruthy();
    await within(highlighted).findByText('Cherry');
  });

  it('CvComboBox - disabled', async () => {
    const props = {
      disabled: true,
      options: fruits,
    };
    // The render method returns a collection of utilities to query your component.
    const result = render(CvComboBox, {
      props,
    });

    const combobox = await result.findByRole('combobox');

    const user = userEvent.setup();
    await user.click(combobox);
    await user.keyboard('Cherry');
    expect(combobox.value).toBe(''); // typing should be ignored

    const disabled = result.container.querySelector('.bx--list-box--disabled');
    expect(disabled).toBeTruthy();
  });

  it('CvComboBox - highlight', async () => {
    const props = {
      highlight: 'val-passion_fruit',
      options: fruits,
    };
    // The render method returns a collection of utilities to query your component.
    const result = render(CvComboBox, {
      props,
    });

    const combobox = await result.findByRole('combobox');

    const highlighted = result.container.querySelector(
      '.bx--list-box__menu-item--highlighted'
    );
    expect(highlighted).toBeTruthy();
    await within(highlighted).findByText('Passion Fruit');

    const user = userEvent.setup();
    await user.click(combobox);
    await user.keyboard('{Enter}');
    await result.findByDisplayValue('Passion Fruit');
  });
});
