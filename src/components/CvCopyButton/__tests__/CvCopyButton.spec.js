import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { carbonPrefix } from '../../../global/settings';

import { CvCopyButton } from '..';

describe('CvCopyButton', () => {
  it('raises copy event when clicked', async () => {
    const wrapper = mount(CvCopyButton);
    await wrapper.find('button').trigger('click');
    // `copy` will have been triggered twice because the inner element triggers it
    // and is technically on the same wrapper
    expect(wrapper.emitted('copy')).toHaveLength(2);
  });

  it('fades a feedback element in and out', async () => {
    jest.useFakeTimers();
    const wrapper = mount(CvCopyButton);

    const buttonTag = wrapper.find('button');
    expect(new Set(buttonTag.classes())).toEqual(
      new Set([`${carbonPrefix}--copy`, `${carbonPrefix}--copy-btn`])
    );

    await buttonTag.trigger('click');

    expect(new Set(buttonTag.classes())).toEqual(
      new Set([
        `${carbonPrefix}--copy`,
        `${carbonPrefix}--copy-btn`,
        `${carbonPrefix}--copy-btn--animating`,
        `${carbonPrefix}--copy-btn--fade-in`,
      ])
    );

    jest.advanceTimersByTime(CvCopyButton.props.feedbackTimeout.default);
    await nextTick();

    expect(new Set(buttonTag.classes())).toEqual(
      new Set([
        `${carbonPrefix}--copy`,
        `${carbonPrefix}--copy-btn`,
        `${carbonPrefix}--copy-btn--animating`,
        `${carbonPrefix}--copy-btn--fade-out`,
      ])
    );

    await wrapper.trigger('animationend', {
      animationName: 'not-hide-feedback',
    });

    expect(new Set(buttonTag.classes())).toEqual(
      new Set([
        `${carbonPrefix}--copy`,
        `${carbonPrefix}--copy-btn`,
        `${carbonPrefix}--copy-btn--animating`,
        `${carbonPrefix}--copy-btn--fade-out`,
      ])
    );

    await wrapper.trigger('animationend', { animationName: 'hide-feedback' });

    expect(new Set(buttonTag.classes())).toEqual(
      new Set([`${carbonPrefix}--copy`, `${carbonPrefix}--copy-btn`])
    );
  });
});
