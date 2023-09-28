import { CvIconButton } from '..';
import { render } from '@testing-library/vue';
describe('CvIconButton - accessibility', () => {
  it('CvIconButton - basic', async () => {
    const main = document.createElement('main');
    const result = render(CvIconButton, {
      container: document.body.appendChild(main),
      props: {
        label: 'label content',
      },
    });
    await expect(result.container).toBeAccessible('cv-icon-button');
  }, 10000);
});
