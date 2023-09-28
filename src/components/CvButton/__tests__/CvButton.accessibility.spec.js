import { CvButton } from '..';
import { render } from '@testing-library/vue';
describe('CvButton - accessibility', () => {
  it('CvButton - basic', async () => {
    const main = document.createElement('main');
    const result = render(CvButton, {
      container: document.body.appendChild(main),
      slots: { default: 'test button' },
    });
    await expect(result.container).toBeAccessible('cv-button');
  }, 10000);
});
