/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { carbonPrefix } from '../../../global/settings';

import { CvCodeSnippet } from '..';

describe('CvCodeSnippet', () => {
  describe('oneline', () => {
    it('renders the right way', () => {
      const slotContent = 'slot content';
      const copyFeedback = 'copy feedback string';
      const wrapper = mount(CvCodeSnippet, {
        props: { kind: 'oneline', copyFeedback },
        slots: { default: slotContent },
      });

      const outsideDiv = wrapper.find('div');
      expect(new Set(outsideDiv.classes())).toEqual(
        new Set([
          `${carbonPrefix}--snippet`,
          `${carbonPrefix}--snippet--single`,
        ])
      );

      const buttonTag = wrapper.find('button');
      expect(buttonTag.text()).toContain(copyFeedback);

      const codeTag = wrapper.find('code');
      expect(codeTag.text()).toEqual(slotContent);
    });

    it('handles copying correctly', async () => {
      const wrapper = mount(CvCodeSnippet, {
        props: { kind: 'oneline' },
      });

      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted('copy')).not.toHaveLength(0);
    });
  });

  describe('multiline', () => {
    it('renders the right way', () => {
      const slotContent = 'slot content';
      const copyFeedback = 'copy feedback string';
      const wrapper = mount(CvCodeSnippet, {
        props: { kind: 'multiline', copyFeedback },
        slots: { default: slotContent },
      });

      const outsideDiv = wrapper.find('div');
      expect(new Set(outsideDiv.classes())).toEqual(
        new Set([`${carbonPrefix}--snippet`, `${carbonPrefix}--snippet--multi`])
      );

      const buttonTag = wrapper.find('button');
      expect(buttonTag.text()).toContain(copyFeedback);

      const codeTag = wrapper.find('code');
      expect(codeTag.text()).toEqual(slotContent);
    });

    it('handles copying correctly', async () => {
      const wrapper = mount(CvCodeSnippet, {
        props: { kind: 'multiline' },
      });

      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted('copy')).not.toHaveLength(0);
    });

    it('correctly resizes', async () => {
      jest.useFakeTimers();

      let listener = () => {};
      global.window.ResizeObserver = class MockResizeObserver {
        constructor(callback) {
          listener = callback;
        }

        observe() {}
      };

      const wrapper = mount(CvCodeSnippet, {
        props: {
          kind: 'multiline',
          minCollapsedNumberOfRows: 2,
          maxCollapsedNumberOfRows: 10,
          minExpandedNumberOfRows: 100,
          maxExpandedNumberOfRows: 15,
        },
      });
      await nextTick();

      listener([{ contentRect: { height: 464 } }]);

      await nextTick();

      const divTag = wrapper.find('div');
      const buttonTag = wrapper.find(
        `button.${carbonPrefix}--snippet-btn--expand`
      );

      await buttonTag.trigger('click');

      expect(new Set(divTag.classes())).toEqual(
        new Set([
          `${carbonPrefix}--snippet`,
          `${carbonPrefix}--snippet--multi`,
          `${carbonPrefix}--snippet--expand`,
        ])
      );

      listener([{ contentRect: { height: 200 } }]);

      jest.advanceTimersByTime(100);

      await nextTick();

      expect(new Set(divTag.classes())).toEqual(
        new Set([`${carbonPrefix}--snippet`, `${carbonPrefix}--snippet--multi`])
      );

      await wrapper.setProps({
        minCollapsedNumberOfRows: 0,
        maxCollapsedNumberOfRows: 0,
        minExpandedNumberOfRows: 0,
        maxExpandedNumberOfRows: 0,
      });
    });
  });

  describe('inline', () => {
    it('renders the right way', () => {
      const slotContent = 'slot content';
      const copyFeedback = 'copy feedback string';
      const wrapper = mount(CvCodeSnippet, {
        props: { kind: 'inline', copyFeedback },
        slots: { default: slotContent },
      });

      const buttonTag = wrapper.find('button');
      expect(new Set(buttonTag.classes())).toEqual(
        new Set([
          `${carbonPrefix}--copy`,
          `${carbonPrefix}--snippet`,
          `${carbonPrefix}--snippet--inline`,
        ])
      );

      expect(buttonTag.text()).toContain(copyFeedback);

      const codeTag = buttonTag.find('code');
      expect(buttonTag.attributes()['aria-describedby']).toEqual(
        codeTag.attributes()['id']
      );

      expect(codeTag.text()).toBe(slotContent);
    });

    it('handles copying correctly', async () => {
      const wrapper = mount(CvCodeSnippet, {
        props: { kind: 'inline' },
      });

      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted('copy')).not.toHaveLength(0);
    });
  });
});
