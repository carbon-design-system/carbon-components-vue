import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';

import { CvAspectRatio, CvAspectRatioConsts } from '..';

describe('CvAspectRatio', () => {
  it('CvAspectRatio - default', () => {
    const wrapper = shallowMount(CvAspectRatio);

    const divTag = wrapper.find('div');
    expect(new Set(divTag.classes())).toEqual(
      new Set([
        `${carbonPrefix}--aspect-ratio`,
        `${carbonPrefix}--aspect-ratio--1x1`,
      ])
    );
  });

  it('CvAspectRatio - ratios', async () => {
    const wrapper = shallowMount(CvAspectRatio);

    const divTag = wrapper.find('div');

    for (const ratio of CvAspectRatioConsts.aspectRatios) {
      await wrapper.setProps({ ratio });
      expect(new Set(divTag.classes())).toEqual(
        new Set([
          `${carbonPrefix}--aspect-ratio`,
          `${carbonPrefix}--aspect-ratio--${ratio}`,
        ])
      );
    }
  });

  it('CvAspectRatio - as', async () => {
    const wrapper = shallowMount(CvAspectRatio);
    expect(wrapper.element.tagName.toLowerCase()).toEqual('div');

    await wrapper.setProps({ as: 'p' });
    expect(wrapper.element.tagName.toLowerCase()).toEqual('p');
  });

  it('CvAspectRatio - ratio validator', () => {
    for (const ratio of CvAspectRatioConsts.aspectRatios) {
      expect(CvAspectRatio.props.ratio.validator(ratio)).toEqual(true);
    }

    expect(CvAspectRatio.props.ratio.validator('any other string')).toEqual(
      false
    );
  });
});
