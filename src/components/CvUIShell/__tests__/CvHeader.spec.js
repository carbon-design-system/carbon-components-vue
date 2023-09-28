import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvHeader from '../CvHeader.vue';
import CvHeaderGlobalAction from '../CvHeaderGlobalAction.vue';
import CvHeaderMenuButton from '../CvHeaderMenuButton.vue';
import CvHeaderPanel from '../CvHeaderPanel.vue';
import CvSideNav from '../CvSideNav.vue';
import CvSideNavItems from '../CvSideNavItems.vue';
import CvSideNavMenu from '../CvSideNavMenu.vue';
import CvSideNavMenuItem from '../CvSideNavMenuItem.vue';
import CvSideNavLink from '../CvSideNavLink.vue';

const globalHeader = {
  components: { CvHeaderGlobalAction },
  template: `
    <cv-header-global-action aria-controls="test-panel" label="test label">
    Test
    </cv-header-global-action>
  `,
};
const onResize = jest.fn();
const rightPanel = {
  components: { CvHeaderPanel },
  template: `
    <cv-header-panel  id="test-panel" @panel-resize="onResize">
      <div role="doc-example">Test Panel</div>
    </cv-header-panel>`,
  data: () => {
    return { onResize };
  },
};
const onSideNav = jest.fn();
const leftSideNavRail = {
  components: {
    CvSideNav,
    CvSideNavItems,
    CvSideNavMenu,
    CvSideNavMenuItem,
    CvSideNavLink,
  },
  template: `
    <cv-side-nav id="side-nav" @panel-resize="onSideNav" :rail="true">
      <cv-side-nav-items>
        <cv-side-nav-menu title="Home">
          <template v-slot:nav-icon><div role="doc-abstract"/></template>
          <cv-side-nav-menu-item href="javascript:void(0)" active>Lawn care</cv-side-nav-menu-item>
        </cv-side-nav-menu>
        <cv-side-nav-link href="javascript:void(0)">
          <template v-slot:nav-icon><div role="doc-afterword"/></template>
          Connection
        </cv-side-nav-link>
      </cv-side-nav-items>
    </cv-side-nav>
  `,
  data: () => {
    return { onSideNav };
  },
};
const defaultSlot = {
  components: { CvHeaderMenuButton },
  template: `<cv-header-menu-button aria-controls="side-nav"/>`,
};
describe('CvHeader', () => {
  it('CvHeader - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const result = render(CvHeader, {
      slots: {
        default: `<div role="doc-bibliography">Header Content</div>`,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    await result.findByRole('doc-bibliography');
    const header = result.container.querySelector('.cv-header');
    expect(header.classList.contains('ABC-class-123')).toBe(true);
    expect(header.getAttribute('aria-label')).toBe(ariaLabel);
  });

  it('CvHeader - buttons and panels', async () => {
    const result = render(CvHeader, {
      slots: {
        default: `<div role="doc-bibliography">Header Content</div>`,
        'header-global': globalHeader,
        'right-panels': rightPanel,
      },
    });

    await result.findByRole('doc-bibliography');
    const testButton = await result.findByRole('button');

    const user = userEvent.setup();
    await user.click(testButton); // open panel

    await result.findByRole('doc-example'); // find panel content

    await user.click(testButton); // close panel

    expect(onResize.mock.calls.length).toBe(2);
  });

  it('CvHeader - side nav rail', async () => {
    const result = render(CvHeader, {
      slots: {
        default: defaultSlot,
        'left-panels': leftSideNavRail,
      },
    });

    const testButton = await result.findByRole('button');

    const user = userEvent.setup();
    await user.click(testButton); // open panel

    await result.findByRole('doc-abstract'); // verify icon slots
    await result.findByRole('doc-afterword');

    const menuItems = await result.findAllByRole('menuitem'); // find panel content
    expect(menuItems.length).toBe(2);
    const links = await result.findAllByRole('link');
    expect(links.length).toBe(1);

    await user.click(testButton); // close panel

    expect(onSideNav.mock.calls.length).toBe(2);
  });
});
