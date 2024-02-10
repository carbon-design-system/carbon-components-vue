import { CvCheckbox } from '..';
import { render } from '@testing-library/vue';

describe('CvCheckbox - accessibility', () => {
  it('CvCheckbox - basic', async () => {
    const main = document.createElement('main');

    const result = render(CvCheckbox, {
      container: document.body.appendChild(main),
      props: {
        value: 'checkboxValue',
        label: 'checkboxLabel',
      },
    });

    await expect(result.container).toBeAccessible('cv-checkbox');
  }, 10000);

  it('CvCheckbox - with hidden label', async () => {
    const main = document.createElement('main');

    const result = render(CvCheckbox, {
      container: document.body.appendChild(main),
      props: {
        value: 'checkboxValue',
        label: 'checkboxLabel',
        hideLabel: true,
      },
    });

    await expect(result.container).toBeAccessible('cv-checkbox');
  }, 10000);

  it('CvCheckbox - checked', async () => {
    const main = document.createElement('main');

    const result = render(CvCheckbox, {
      container: document.body.appendChild(main),
      props: {
        checked: true,
        value: 'checkboxValue',
        label: 'checkboxLabel',
      },
    });

    await expect(result.container).toBeAccessible('cv-checkbox');
  }, 10000);
});
