/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { shallowMount, mount } from '@vue/test-utils';
import { h } from 'vue';
import { carbonPrefix } from '../../../global/settings';

import { CvList, CvListItem } from '..';

describe('CvList', () => {
  it('CvList - unordered', () => {
    const wrapper = shallowMount(CvList);

    const listTag = wrapper.find('ul');
    expect(new Set(listTag.classes())).toEqual(
      new Set(['cv-list', `${carbonPrefix}--list--unordered`])
    );
  });

  it('CvList - ordered', () => {
    const wrapper = shallowMount(CvList, {
      props: {
        ordered: true,
      },
    });

    const listTag = wrapper.find('ol');
    expect(new Set(listTag.classes())).toEqual(
      new Set(['cv-list', `${carbonPrefix}--list--ordered`])
    );
  });

  it('CvList - nested', () => {
    const wrapper = shallowMount(CvList, {
      props: {
        nested: true,
      },
    });

    const listTag = wrapper.find('ul');
    expect(new Set(listTag.classes())).toEqual(
      new Set([
        'cv-list',
        `${carbonPrefix}--list--unordered`,
        `${carbonPrefix}--list--nested`,
      ])
    );
  });

  it('CvList - nested unordered', async () => {
    const wrapper = mount(CvList, {
      props: {
        ordered: false,
      },
      slots: {
        default: {
          render: () =>
            h(CvListItem, {}, () => h(CvList, { nested: true }, () => '')),
        },
      },
    });

    const unorderedChildListTag = wrapper.find('ul ul');
    expect(new Set(unorderedChildListTag.classes())).toEqual(
      new Set([
        'cv-list',
        `${carbonPrefix}--list--nested`,
        `${carbonPrefix}--list--unordered`,
      ])
    );
  });

  it('CvList - nested ordered', async () => {
    const wrapper = mount(CvList, {
      props: {
        ordered: true,
      },
      slots: {
        default: {
          render: () =>
            h(CvListItem, {}, () =>
              h(CvList, { nested: true, ordered: true }, () => '')
            ),
        },
      },
    });

    const orderedChildListTag = wrapper.find('ol ol');
    expect(new Set(orderedChildListTag.classes())).toEqual(
      new Set([
        'cv-list',
        `${carbonPrefix}--list--nested`,
        `${carbonPrefix}--list--ordered`,
      ])
    );
  });

  it('CvList - nested does not take parent ordering if set on itself', () => {
    const unorderedWrapper = mount(CvList, {
      slots: {
        default: {
          render: () =>
            h(CvListItem, {}, () =>
              h(CvList, { ordered: false, nested: true })
            ),
        },
      },
    });

    const unorderedListChildListTag = unorderedWrapper.find('ul ul');
    expect(new Set(unorderedListChildListTag.classes())).toEqual(
      new Set([
        'cv-list',
        `${carbonPrefix}--list--nested`,
        `${carbonPrefix}--list--unordered`,
      ])
    );

    const orderedWrapper = mount(CvList, {
      props: {
        ordered: true,
      },
      slots: {
        default: {
          render: () =>
            h(CvListItem, {}, () =>
              h(CvList, { ordered: false, nested: true })
            ),
        },
      },
    });

    const orderedListChildListTag = orderedWrapper.find('ol ul');
    expect(new Set(orderedListChildListTag.classes())).toEqual(
      new Set([
        'cv-list',
        `${carbonPrefix}--list--nested`,
        `${carbonPrefix}--list--unordered`,
      ])
    );
  });
});
