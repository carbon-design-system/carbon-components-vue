import { CvList, CvListItem } from '..';
import { render } from '@testing-library/vue';

describe('CvList - accessibility', () => {
  it('CvList - empty', async () => {
    const main = document.createElement('main');
    const result = render(CvList, {
      container: document.body.appendChild(main),
    });
    await expect(result.container).toBeAccessible('cv-list');
  }, 10000);

  it('CvList - with content', async () => {
    const main = document.createElement('main');

    const result = render(
      {
        components: { CvList, CvListItem },
        template: /* html */ `<cv-list>
          <cv-list-item>List item 1</cv-list-item>
          <cv-list-item>List item 2</cv-list-item>
          <cv-list-item>List item 3</cv-list-item>
        </cv-list>`,
      },
      {
        container: document.body.appendChild(main),
      }
    );

    await expect(result.container).toBeAccessible('cv-list');
  }, 10000);
});
