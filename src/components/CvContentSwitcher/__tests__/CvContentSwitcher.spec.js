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
    expect(result.emitted('selected').length).toBe(1);
    expect(result.emitted('selected')[0][0]).toBe('csb-2');
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
