import { render } from '@testing-library/vue';
import CvModal from '../CvModal.vue';

describe('CvModal accessibility', () => {
  it('CvModal - basic', async () => {
    const main = document.createElement('main');
    const result = render(CvModal, {
      container: document.body.appendChild(main),
      props: { visible: true, disableTeleport: true },
      slots: { title: 'Title', content: '<p>Content</p>' },
    });
    await expect(result.container).toBeAccessible('cv-modal');
  }, 10000);
});
