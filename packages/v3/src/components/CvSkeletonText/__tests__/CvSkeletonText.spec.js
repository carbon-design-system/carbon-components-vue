import { shallowMount } from '@vue/test-utils';

import { CvSkeletonText } from '..';
import { carbonPrefix } from '../../../global/settings';

describe('CvSkeletonText', () => {
  it('CvSkeletonText - default', () => {
    const wrapper = shallowMount(CvSkeletonText);

    expect(wrapper.find('div').exists()).toEqual(false);

    const pTag = wrapper.find('p');
    expect(new Set([...pTag.classes()])).toEqual(
      new Set([`${carbonPrefix}--skeleton__text`])
    );
    expect(pTag.element.children.length).toEqual(0);
    expect(pTag.attributes().style).toEqual('width: 100%;');
  });

  it('CvSkeletonText - heading', () => {
    const wrapper = shallowMount(CvSkeletonText, {
      props: {
        heading: true,
      },
    });

    const pTag = wrapper.find('p');
    expect(new Set([...pTag.classes()])).toEqual(
      new Set([
        `${carbonPrefix}--skeleton__text`,
        `${carbonPrefix}--skeleton__heading`,
      ])
    );
  });

  it('CvSkeleton - width with one line', () => {
    const wrapper = shallowMount(CvSkeletonText, {
      props: {
        width: '42px',
      },
    });

    const pTag = wrapper.find('p');
    expect(pTag.attributes().style).toEqual('width: 42px;');
  });

  it('CvSkeleton - multiple lines', async () => {
    const wrapper = shallowMount(CvSkeletonText, {
      props: {
        width: '100%',
        lineCount: 7,
      },
    });

    const divTag = wrapper.find('div');
    expect(divTag.element.children.length).toEqual(7);

    const pTags = wrapper.findAll('p');
    expect(pTags[0].attributes().style).toEqual('width: calc(100% - 64px);');
    expect(pTags[1].attributes().style).toEqual('width: calc(100% - 2px);');
    expect(pTags[2].attributes().style).toEqual('width: calc(100% - 32px);');
    expect(pTags[3].attributes().style).toEqual('width: calc(100% - 64px);');

    await wrapper.setProps({ width: '250px' });
    expect(pTags[0].attributes().style).toEqual('width: calc(250px - 64px);');
    expect(pTags[1].attributes().style).toEqual('width: calc(250px - 2px);');
    expect(pTags[2].attributes().style).toEqual('width: calc(250px - 32px);');
    expect(pTags[3].attributes().style).toEqual('width: calc(250px - 64px);');
  });
});
