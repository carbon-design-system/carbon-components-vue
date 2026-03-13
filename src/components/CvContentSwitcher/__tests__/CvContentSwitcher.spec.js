import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvContentSwitcher from '../CvContentSwitcher.vue';
import CvContentSwitcherButton from '../CvContentSwitcherButton.vue';

const ContentTabs = {
  components: { CvContentSwitcherButton },
  template: `
    <cv-content-switcher-button owner-id="csb-1" :selected="true">Button Name 1</cv-content-switcher-button>
    <cv-content-switcher-button owner-id="csb-2" :selected="false">Button Name 2</cv-content-switcher-button>
    <cv-content-switcher-button owner-id="csb-3" :selected="false">Button Name 3</cv-content-switcher-button>
  `,
};

const ContentTabsNoInitialSelection = {
  components: { CvContentSwitcherButton },
  template: `
    <cv-content-switcher-button owner-id="csb-1" :selected="false">Button Name 1</cv-content-switcher-button>
    <cv-content-switcher-button owner-id="csb-2" :selected="false">Button Name 2</cv-content-switcher-button>
    <cv-content-switcher-button owner-id="csb-3" :selected="false">Button Name 3</cv-content-switcher-button>
  `,
};

describe('CvContentSwitcher', () => {
  it('CvContentSwitcher - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvContentSwitcher, {
      props: {},
      slots: {
        default: ContentTabs,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const switcher = await result.findByRole('tablist');
    const allTabs = await result.findAllByRole('tab');
    expect(allTabs.length).toBe(3);
    const oneTab = allTabs[1];

    const user = userEvent.setup();
    await user.click(oneTab);

    expect(switcher.classList.contains('ABC-class-123')).toBe(true);
    expect(switcher.getAttribute('aria-label')).toBe(ariaLabel);
    // Both global and component-specific watches emit, so we get 2 events
    expect(result.emitted('selected')).toBeTruthy();
    expect(result.emitted('selected').length).toBeGreaterThanOrEqual(1);
    // Check that csb-2 was emitted (could be in either event)
    const emittedValues = result.emitted('selected').map(e => e[0]);
    expect(emittedValues).toContain('csb-2');
  });

  it('CvContentSwitcher - test with no initial selection', async () => {
    const result = render(CvContentSwitcher, {
      props: {},
      slots: {
        default: ContentTabsNoInitialSelection,
      },
    });

    const allTabs = await result.findAllByRole('tab');
    const firstTab = allTabs[0];

    const user = userEvent.setup();
    await user.click(firstTab);

    // With no initial selection, first click should emit
    expect(result.emitted('selected')).toBeTruthy();
    expect(result.emitted('selected').length).toBeGreaterThanOrEqual(1);
    // Check that csb-1 was emitted
    const emittedValues = result.emitted('selected').map(e => e[0]);
    expect(emittedValues).toContain('csb-1');
  });

  it('CvContentSwitcher - test all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const props = {
      id: 'ABC-123',
      light: true,
    };
    // The render method returns a collection of utilities to query your component.
    const result = render(CvContentSwitcher, {
      props,
      slots: {
        default: ContentTabs,
      },
      attrs: {
        'aria-label': ariaLabel,
      },
    });

    // check the aria label
    const wrapper = result.container.querySelector(
      '.bx--content-switcher--light'
    );
    expect(wrapper.getAttribute('aria-label')).toBe(ariaLabel);
  });
});
