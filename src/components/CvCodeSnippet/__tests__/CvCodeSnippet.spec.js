/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';

import { CvCodeSnippetSkeleton } from '..';

describe('CvCodeSnippetSkeleton', () => {
  it('renders oneline', () => {
    const wrapper = shallowMount(CvCodeSnippetSkeleton, {
      props: { kind: 'oneline' },
    });
    expect(wrapper.findAll('span')).toHaveLength(1);
    expect(new Set(wrapper.find('div').classes())).toEqual(
      new Set([
        `${carbonPrefix}--snippet`,
        `${carbonPrefix}--skeleton`,
        `${carbonPrefix}--snippet--single`,
      ])
    );
  });

  it('renders multiline', () => {
    const wrapper = shallowMount(CvCodeSnippetSkeleton, {
      props: { kind: 'multiline' },
    });
    expect(wrapper.findAll('span')).toHaveLength(3);
    expect(new Set(wrapper.find('div').classes())).toEqual(
      new Set([
        `${carbonPrefix}--snippet`,
        `${carbonPrefix}--skeleton`,
        `${carbonPrefix}--snippet--multi`,
      ])
    );
  });
});
