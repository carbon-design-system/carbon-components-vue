import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';

import { CvButton } from '..';

describe('CvButton', () => {
  it('renders button and slot', () => {
    const slotContent = 'slot content';
    const wrapper = shallowMount(CvButton, {
      slots: {
        default: slotContent,
      },
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain(`${carbonPrefix}--btn`);
    expect(button.classes()).toContain(`${carbonPrefix}--btn--primary`);

    console.dir(button.innerHTML);
    // expect(button.find(slotContent)).toBe(true);
  });
});
