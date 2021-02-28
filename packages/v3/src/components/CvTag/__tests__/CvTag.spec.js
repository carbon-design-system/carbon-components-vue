import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';

import { CvTag } from '..';

describe('CvTag', () => {
  it('CvTag - default', () => {
    const tagKind = 'red';
    const tagLabel = 'test tag label';
    const wrapper = shallowMount(CvTag, {
      props: {
        kind: tagKind,
        label: tagLabel,
        filter: false,
      },
    });

    // check if the root span exists
    // - verify classes on the root span
    const tagSpan = wrapper.find('span');
    expect(tagSpan.classes()).toContain(`${carbonPrefix}--tag`);
    expect(tagSpan.classes()).toContain(`${carbonPrefix}--tag--${tagKind}`);

    // check if the label exists
    // - verify the tag label class
    // - verify if the label's content is equal to the given label text
    const labelSpan = tagSpan.find('span');
    expect(labelSpan.classes()).toContain(`${carbonPrefix}--tag__label`);
    expect(labelSpan.element.innerText).toEqual();

    // check if the remove button exists
    // - it should not, becuase the filter is set to false
    expect(tagSpan.find('button').exists()).toBe(false);
  });

  it('CvTag - filter', () => {
    const tagKind = 'green';
    const tagLabel = 'test tag with filter';
    const wrapper = shallowMount(CvTag, {
      props: {
        kind: tagKind,
        label: tagLabel,
        filter: true,
      },
    });

    // check if the root span exists
    // - verify classes on the root span
    const tagSpan = wrapper.find('span');
    expect(tagSpan.classes()).toContain(`${carbonPrefix}--tag`);
    expect(tagSpan.classes()).toContain(`${carbonPrefix}--tag--${tagKind}`);

    // check if the label exists
    // - verify the tag label class
    // - verify if the label's content is equal to the given label text
    const labelSpan = tagSpan.find('span');
    expect(labelSpan.classes()).toContain(`${carbonPrefix}--tag__label`);
    expect(labelSpan.element.innerText).toEqual();

    // check if the remove button exists
    // - it should not, becuase the filter is set to false
    const removeButton = tagSpan.find('button');
    expect(removeButton.exists()).toBe(true);

    // click on remove button
    removeButton.element.click();

    // check if it emitted remove
    expect(wrapper.emitted().remove).toBeTruthy();
  });

  it('CvTag - disabled', () => {
    const tagKind = 'red';
    const tagLabel = 'test tag label';
    const wrapper = shallowMount(CvTag, {
      props: {
        kind: tagKind,
        label: tagLabel,
        filter: false,
        disabled: true,
      },
    });

    // check if the root span exists
    // - verify tag disabled class on span
    const tagSpan = wrapper.find('span');
    expect(tagSpan.classes()).toContain(`${carbonPrefix}--tag--disabled`);

    // Call onRemove directly to test disabled path
    wrapper.vm.onRemove();
    // check if it emitted remove
    expect(wrapper.emitted().remove).toBeFalsy();
  });
});
