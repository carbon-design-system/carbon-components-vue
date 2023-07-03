import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { CvToggle } from '..';
import { mount } from '@vue/test-utils';

describe('CvToggle', () => {
  it('CvToggle - test default', async () => {
    const handler = jest.fn();

    // The render method returns a collection of utilities to query your component.

    const wrapper = render(CvToggle, {
      props: { value: 'check-1' },
      attrs: {
        onchange: handler,
      },
    });

    const toggle = await wrapper.getByRole('checkbox');

    const user = userEvent.setup();

    await user.click(toggle);
  });
});
