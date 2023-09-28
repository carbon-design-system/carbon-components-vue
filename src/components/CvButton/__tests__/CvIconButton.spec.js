/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';

import { CvIconButton } from '..';

describe('CvIconButton', () => {
  it('renders button and slot', () => {
    const labelContent = 'label content';
    const wrapper = shallowMount(CvIconButton, {
      props: {
        label: labelContent,
      },
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain(`${carbonPrefix}--btn`);
    expect(button.classes()).toContain(`${carbonPrefix}--btn--primary`);

    const assistiveText = button.find(`.${carbonPrefix}--assistive-text`);
    expect(assistiveText.text()).toBe(labelContent);
  });

  it('Raises click event when clicked', async () => {
    const labelContent = 'label content';
    const wrapper = shallowMount(CvIconButton, {
      props: {
        label: labelContent,
      },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
