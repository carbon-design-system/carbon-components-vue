import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { CvToggle } from '..';

describe('CvToggle', () => {
  it('CvToggle - test default', async () => {
    const handler = jest.fn();

    // The render method returns a collection of utilities to query your component.

    const wrapper = render(CvToggle, {
      props: {
        id: 'test-1',
        value: 'check-1',
      },
      attrs: {
        onchange: handler,
      },
    });

    const toggle = await wrapper.getByRole('toggle');
    const user = userEvent.setup();

    await user.click(toggle);
    expect(toggle.checked).toBe(true);

    await user.click(toggle);
    expect(toggle.checked).toBe(false);

    await user.tripleClick(toggle);
    expect(toggle.checked).toBe(true);
  });
  // ***************
  // SNAPSHOT TESTS
  // ***************

  it('CvToggle - should render formItem: default', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        id: 'test-1',
        value: 'check-1',
      },
      attrs: {
        onchange: handler,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('CvToggle - should render when formItem: true && disabled', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        id: 'test-1',
        value: 'check-1',
        formItem: true,
        disabled: true,
      },
      attrs: {
        onchange: handler,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('CvToggle - should render when formItem: false && small && hideLabel', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        id: 'test-1',
        value: 'check-1',
        formItem: false,
        disabled: true,
        small: true,
        hideLabel: true,
      },
      attrs: {
        onchange: handler,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('CvToggle - computed checked should be false when checked prop is false', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
        label: 'label-1',
        checked: false,
      },
      attrs: {
        onchange: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    expect(toggle.checked).toBe(false);
  });

  it('CvToggle - computed checked should be true when checked prop is true', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
        label: 'label-1',
        checked: true,
      },
      attrs: {
        onchange: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    expect(toggle.checked).toBe(true);
  });

  // Changes to checked property affect the computed value checked
  it('CvToggle - computed checked should be true when checked prop was changed to true', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
        label: 'label-1',
        checked: false,
      },
      attrs: {
        onchange: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    expect(toggle.checked).toBe(false);
    await wrapper.rerender({ checked: true });
    expect(toggle.checked).toBe(true);
  });

  it('CvToggle - computed checked should be false when checked prop was changed to false', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
        label: 'label-1',
        checked: true,
      },
      attrs: {
        onchange: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    expect(toggle.checked).toBe(true);
    await wrapper.rerender({ checked: false });
    expect(toggle.checked).toBe(false);
  });

  it('CvToggle - computed checked should be true when checked prop is false and modelValue is true', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
        label: 'label-1',
        modelValue: true,
        checked: false,
      },
      attrs: {
        onchange: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    expect(toggle.checked).toBe(true);
  });

  it('CvToggle - computed checked should be false when checked prop is true and modelValue is false', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
        label: 'label-1',
        modelValue: false,
        checked: true,
      },
      attrs: {
        onchange: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    expect(toggle.checked).toBe(false);
  });

  it('CvToggle - computed checked should be false when modelValue array is empty', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
        label: 'label-1',
        modelValue: [],
        checked: false,
      },
      attrs: {
        onchange: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    expect(toggle.checked).toBe(false);
  });

  it('CvToggle - computed checked should be false when modelValue array does not contain the value', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
        label: 'label-1',
        modelValue: ['check-2', 'check-3'],
      },
      attrs: {
        onchange: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    expect(toggle.checked).toBe(false);
  });

  it('CvToggle - computed checked should be true when modelValue array contains the value', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
        label: 'label-1',
        modelValue: ['check-2', 'check-3', 'check-1'],
      },
      attrs: {
        onchange: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    expect(toggle.checked).toBe(true);
  });

  it('CvToggle - input should have toggle type', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
      },
      attrs: {
        onchange: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    expect(toggle.type).toBe('checkbox');
  });

  it('CvToggle - should emit change event on click', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
      },
      attrs: {
        change: handler,
      },
    });
    expect(wrapper.emitted()).toBeTruthy();
  });

  it('CvToggle - clicking updates the value checked from false to true', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
        checked: false,
      },
      attrs: {
        change: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    const user = userEvent.setup();
    await user.click(toggle);
    expect(toggle.checked).toBe(true);
  });

  it('CvToggle - clicking updates the value isChecked from true to false', async () => {
    const handler = jest.fn();
    const wrapper = render(CvToggle, {
      props: {
        formItem: true,
        value: 'check-1',
        checked: true,
      },
      attrs: {
        change: handler,
      },
    });
    const toggle = await wrapper.getByRole('toggle');
    const user = userEvent.setup();
    await user.click(toggle);
    expect(toggle.checked).toBe(false);
  });
});
