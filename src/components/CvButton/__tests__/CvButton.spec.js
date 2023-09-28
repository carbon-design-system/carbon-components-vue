/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';

import { CvButton } from '..';

describe('CvButton', () => {
  it('renders button and slot', async () => {
    const slotContent = 'slot content';
    const wrapper = shallowMount(CvButton, {
      slots: {
        default: slotContent,
      },
      props: {
        'aria-label': 'default button',
      },
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain(`${carbonPrefix}--btn`);
    expect(button.classes()).toContain(`${carbonPrefix}--btn--primary`);

    expect(button.text()).toBe(slotContent);
  });

  it('Raises click event when clicked', async () => {
    const wrapper = shallowMount(CvButton, {
      slots: {
        default: 'slot content',
      },
      props: {
        'aria-label': 'default button',
      },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
