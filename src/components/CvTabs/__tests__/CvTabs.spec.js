import { render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import userEvent from '@testing-library/user-event';
import CvTabs from '../CvTabs.vue';
import CvTab from '../CvTab.vue';

const Tab1Label = 'Tab 1 label';
const Tab2Label = 'Tab 2 label';
const ariaLabel = 'ABC-aria-label-123';

const ContentTabs = {
  components: { CvTab },
  template: `
    <cv-tab  id="tab-1" label="${Tab1Label}">Tab 1 content</cv-tab>
    <cv-tab  id="tab-2" label="${Tab2Label}">Tab 2 content</cv-tab>
    <cv-tab  id="tab-3" label="Tab 3 label">Tab 3 content</cv-tab>
  `,
};

describe('CvTabs', () => {
  it('CvTabs - test default and attrs', async () => {
    // The render method returns a collection of utilities to query your component.
    const result = render(CvTabs, {
      props: {},
      slots: {
        default: ContentTabs,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });
    const user = userEvent.setup();

    const tabNav = await result.findByRole('navigation');
    const allTabs = await result.findAllByRole('tab');
    expect(allTabs.length).toBe(3);

    // check content
    const content1 = await result.findByText('Tab 1 content');
    const content2 = await result.findByText('Tab 2 content');
    const content3 = await result.findByText('Tab 3 content');
    expect(content1.getAttribute('aria-hidden')).toBe('false');
    expect(content2.getAttribute('aria-hidden')).toBe('true');
    expect(content3.getAttribute('aria-hidden')).toBe('true');

    await user.click(allTabs[1]);
    expect(content1.getAttribute('aria-hidden')).toBe('true');
    expect(content2.getAttribute('aria-hidden')).toBe('false');
    expect(content3.getAttribute('aria-hidden')).toBe('true');

    await user.click(allTabs[2]);
    expect(content1.getAttribute('aria-hidden')).toBe('true');
    expect(content2.getAttribute('aria-hidden')).toBe('true');
    expect(content3.getAttribute('aria-hidden')).toBe('false');

    expect(tabNav.classList.contains('ABC-class-123')).toBe(true);
    expect(tabNav.getAttribute('aria-label')).toBe(ariaLabel);
    expect(result.emitted('tab-selected').length).toBe(2);
    expect(result.emitted('tab-selected')[0][0]).toBe(1);
    expect(result.emitted('tab-selected-id').length).toBe(2);
    expect(result.emitted('tab-selected-id')[0][0]).toBe('tab-2');
  });

  it('CvTabs - test all props', async () => {
    const props = {
      id: 'ABC-123',
      container: false,
    };
    // The render method returns a collection of utilities to query your component.
    const result = render(CvTabs, {
      props,
      slots: {
        default: ContentTabs,
      },
      attrs: {
        'aria-label': ariaLabel,
      },
    });

    const tabNav = await result.findByRole('navigation');
    expect(tabNav.classList.contains('bx--tabs--container')).toBe(false);
    expect(tabNav.classList.contains('bx--tabs--scrollable--container')).toBe(
      false
    );
    await result.rerender({ container: true });
    expect(tabNav.classList.contains('bx--tabs--container')).toBe(true);
    expect(tabNav.classList.contains('bx--tabs--scrollable--container')).toBe(
      true
    );
  });

  it('CvTabs - test slotted tab buttons to match snapshot', async () => {
    const wrapper = await mount(CvTabs, {
      props: {},
      slots: {
        default: ContentTabs,
        [Tab1Label]: 'Hello <strong style="color: red;">(*)</strong>',
        [Tab2Label]: 'Origin<strong style="color: orange;">(!)</strong>',
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
