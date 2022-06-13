/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';

import { CvButtonSet } from '..';

describe('CvButtonSeet', () => {
  it('renders button set and slot', async () => {
    const slotContent = 'slot content';
    const wrapper = shallowMount(CvButtonSet, {
      slots: {
        default: slotContent,
      },
    });

    const buttonSet = wrapper.find(`.${carbonPrefix}--btn-set`);
    expect(buttonSet).not.toBeUndefined();
    expect(buttonSet.text()).toBe(slotContent);
  });

  it('renders button set stacked and slot', async () => {
    const slotContent = 'slot content';
    const wrapper = shallowMount(CvButtonSet, {
      slots: {
        default: slotContent,
      },
      props: {
        stacked: true,
      },
    });

    const buttonSet = wrapper.find(`.${carbonPrefix}--btn-set`);
    expect(buttonSet).not.toBeUndefined();
    expect(buttonSet.classes()).toContain(`${carbonPrefix}--btn-set--stacked`);
    expect(buttonSet.text()).toBe(slotContent);
  });
});
