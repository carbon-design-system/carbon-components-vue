import { CvLink } from '..';
import { render } from '@testing-library/vue';

describe('CvLink - accessibility', () => {
  it('CvLink - basic', async () => {
    const main = document.createElement('main');
    const result = render(CvLink, {
      container: document.body.appendChild(main),
      slots: { default: 'test link' },
    });
    await expect(result.container).toBeAccessible('cv-link');
  }, 10000);

  it('CvLink - disabled', async () => {
    const main = document.createElement('main');
    const result = render(CvLink, {
      container: document.body.appendChild(main),
      slots: { default: 'test link' },
      props: { disabled: true },
    });

    await expect(result.container).toBeAccessible('cv-link');
  }, 10000);

  it('CvLink - with icon', async () => {
    const main = document.createElement('main');
    const result = render(CvLink, {
      container: document.body.appendChild(main),
      slots: { default: 'test link' },
      props: { icon: 'Bee20' },
    });
    await expect(result.container).toBeAccessible('cv-link');
  }, 10000);
});
