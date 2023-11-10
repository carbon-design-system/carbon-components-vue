import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvMultiSelect from '../CvMultiSelect.vue';
const pkdCharacters = [
  'Rick Deckard',
  'Garland',
  'Rachael Rosen',
  'Roy Batty',
  'Harry Bryant',
  'Hannibal Chew',
  'Dave Holden',
  'Leon Kowalski',
  'Taffey Lewis',
  'Pris Stratton',
  'J.F. Sebastian',
  'Dr. Eldon Rosen',
  'Zhora Salome',
  'John "J.R." Isidore',
  'Iran Deckard',
  'Wilbur Mercer',
  'Buster Friendly',
  'Phil Resch',
];
const pkdOptions = pkdCharacters.map(item => {
  const nameVal = item.replace(/\W+/g, '_').toLowerCase();
  return {
    name: nameVal,
    label: item,
    value: nameVal,
    disabled: false,
  };
});
const pkdValues = pkdOptions.map(item => item.value);
describe('CvMultiSelect', () => {
  it('CvMultiSelect - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvMultiSelect, {
      props: {
        options: pkdOptions,
        modelValue: pkdValues.slice(3, 6), // select 3 items
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const ms = result.container.querySelector('.cv-multi-select');
    expect(ms.classList.contains('bx--multi-select__wrapper--inline')).toBe(
      false
    );

    const cb = await result.findByLabelText(ariaLabel);
    expect(cb.classList.contains('ABC-class-123')).toBe(true);
    await result.findByText('3');
  });
  it('CvMultiSelect - test selections', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const initiallySelected = pkdValues.slice(3, 6); // select 3 items
    const initiallySelectedLabels = pkdCharacters.slice(3, 6); // select 3 items
    // The render method returns a collection of utilities to query your component.
    const result = render(CvMultiSelect, {
      props: {
        options: pkdOptions,
        modelValue: initiallySelected,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const ms = result.container.querySelector('.cv-multi-select');
    expect(ms.classList.contains('bx--multi-select__wrapper--inline')).toBe(
      false
    );

    const cb = await result.findByLabelText(ariaLabel);
    expect(cb.classList.contains('ABC-class-123')).toBe(true);
    await result.findByText('3');

    // select an additional item for a total of 4 items
    const buttons = await result.findAllByRole('button');
    let button;
    for (const htmlNode of buttons.values()) {
      if (htmlNode.nodeName === 'BUTTON') {
        button = htmlNode;
        break;
      }
    }
    expect(button).not.toBeUndefined();
    const user = userEvent.setup();
    await user.click(button);
    const closeButton = await result.findByLabelText('close menu');
    let menuItems = await result.findAllByRole('menuitem');

    // Verify selected items are at the top by default
    for (let i = 0; i < initiallySelectedLabels.length; i++) {
      const item = menuItems[i];
      const label = item.querySelector('label').textContent;
      expect(label).toBe(initiallySelectedLabels[i]);
    }

    expect(menuItems.length).toBe(pkdValues.length);
    await user.click(menuItems[9]);
    await result.findByText('4');

    // click one that is already selected
    await user.click(closeButton);
    await user.click(button);
    menuItems = await result.findAllByRole('menuitem');
    await user.click(menuItems[0]);
    await result.findByText('3');

    // click one that is already selected
    await user.click(closeButton);
    await user.click(button);
    menuItems = await result.findAllByRole('menuitem');
    await user.click(menuItems[0]);
    await result.findByText('2');

    // click one that is already selected
    await user.click(closeButton);
    await user.click(button);
    menuItems = await result.findAllByRole('menuitem');
    await user.click(menuItems[0]);
    let tags = await result.queryByRole('listitem');
    expect(tags).toBeDefined();
    await result.findByText('1');

    // click one that is already selected
    await user.click(closeButton);
    await user.click(button);
    menuItems = await result.findAllByRole('menuitem');
    await user.click(menuItems[0]);
    tags = await result.queryByRole('listitem');
    expect(tags).toBeFalsy();
  });
  it('CvMultiSelect - test helper slot', async () => {
    const label = 'ABC-label-123';
    const helper = 'ABC-helper-123';
    const helperSlot = 'ABC-helper-slot-text-123';
    const slots = {
      'helper-text': helperSlot,
    };

    // The render method returns a collection of utilities to query your component.
    let result = render(CvMultiSelect, {
      props: {
        title: label,
        helperText: helper,
        options: pkdOptions,
      },
      attrs: {
        'aria-label': label,
      },
      slots: slots,
    });

    const labels = await result.findAllByLabelText(label);
    expect(labels.length).toBe(2);
    await result.findByText(helperSlot);
    const ht = await result.queryByText(helper);
    expect(ht).toBeFalsy();
  });
  it('CvMultiSelect - test warning slot', async () => {
    const label = 'ABC-label-123';
    const helper = 'ABC-helper-123';
    const helperSlot = 'ABC-helper-slot-text-123';
    const warning = 'ABC-warning-123';
    const warningSlot = 'ABC-warning-slot-text-123';
    const slots = {
      'helper-text': helperSlot,
      'warning-message': warningSlot,
    };

    // The render method returns a collection of utilities to query your component.
    let result = render(CvMultiSelect, {
      props: {
        options: pkdOptions,
        title: label,
        helperText: helper,
        warningMessage: warning,
      },
      attrs: {
        'aria-label': label,
      },
      slots: slots,
    });

    const labels = await result.findAllByLabelText(label);
    expect(labels.length).toBe(2);
    const ht = await result.queryByText(helper);
    expect(ht).toBeFalsy();
    const hs = await result.queryByText(helperSlot);
    expect(hs).toBeFalsy();
    const wt = await result.queryByText(warning);
    expect(wt).toBeFalsy();
    await result.findByText(warningSlot);
  });
  it('CvMultiSelect - test invalid slot', async () => {
    const label = 'ABC-label-123';
    const helper = 'ABC-helper-123';
    const helperSlot = 'ABC-helper-slot-text-123';
    const warning = 'ABC-warning-123';
    const warningSlot = 'ABC-warning-slot-text-123';
    const invalid = 'ABC-invalid-123';
    const invalidSlot = 'ABC-invalid-slot-text-123';
    const slots = {
      'helper-text': helperSlot,
      'warning-message': warningSlot,
      'invalid-message': invalidSlot,
    };

    // The render method returns a collection of utilities to query your component.
    let result = render(CvMultiSelect, {
      props: {
        options: pkdOptions,
        title: label,
        helperText: helper,
        warningMessage: warning,
        invalidMessage: invalid,
      },
      slots: slots,
    });

    const labels = await result.findAllByLabelText(label);
    expect(labels.length).toBe(2);

    const ht = await result.queryByText(helper);
    expect(ht).toBeFalsy();
    const hs = await result.queryByText(helperSlot);
    expect(hs).toBeFalsy();
    const wt = await result.queryByText(warning);
    expect(wt).toBeFalsy();
    const ws = await result.queryByText(warningSlot);
    expect(ws).toBeFalsy();
    const it = await result.queryByText(invalid);
    expect(it).toBeFalsy();
    await result.findByText(invalidSlot);
  });
  it('CvMultiSelect - v-model', async () => {
    const initiallySelectedLabels = pkdCharacters.slice(3, 6); // select 3 items
    let myValue = pkdValues.slice(3, 6);
    const options = {
      props: {
        options: pkdOptions,
        modelValue: myValue,
        'onUpdate:modelValue': e => {
          myValue = e;
        },
      },
    };
    // The render method returns a collection of utilities to query your component.
    const result = render(CvMultiSelect, options);

    // select an additional item for a total of 4 items
    const buttons = await result.findAllByRole('button');
    let button;
    for (const htmlNode of buttons.values()) {
      if (htmlNode.nodeName === 'BUTTON') {
        button = htmlNode;
        break;
      }
    }
    expect(button).not.toBeUndefined();
    const user = userEvent.setup();
    await user.click(button);
    await result.findByLabelText('close menu');
    let menuItems = await result.findAllByRole('menuitem');

    // Verify selected items are at the top by default
    for (let i = 0; i < myValue.length; i++) {
      const item = menuItems[i];
      const label = item.querySelector('label').textContent;
      expect(label).toBe(initiallySelectedLabels[i]);
    }

    expect(menuItems.length).toBe(pkdValues.length);
    await user.click(menuItems[9]);
    await result.findByText('4');
    expect(myValue.length).toBe(4);

    await user.click(menuItems[10]);
    await result.findByText('5');
    expect(myValue.length).toBe(5);
  });
});
