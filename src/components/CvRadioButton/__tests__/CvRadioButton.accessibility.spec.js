import { CvRadioButton } from '..';
import { render } from '@testing-library/vue';

describe('CvRadioButton - accessibility', () => {
  it('CvRadioButton - basic', async () => {
    const main = document.createElement('main');

    const result = render(CvRadioButton, {
      container: document.body.appendChild(main),
      attrs: {
        value: 'radioButtonValue',
        label: 'radioButtonLabel',
      },
    });

    await expect(result.container).toBeAccessible('cv-radio-button');
  }, 10000);

  it('CvRadioButton - with hidden label', async () => {
    const main = document.createElement('main');

    const result = render(CvRadioButton, {
      container: document.body.appendChild(main),
      attrs: {
        value: 'radioButtonValue',
        label: 'radioButtonLabel',
        hideLabel: true,
      },
    });

    await expect(result.container).toBeAccessible('cv-radio-button');
  }, 10000);

  it('CvRadioButton - checked', async () => {
    const main = document.createElement('main');

    const result = render(CvRadioButton, {
      container: document.body.appendChild(main),
      attrs: {
        checked: true,
        value: 'radioButtonValue',
        label: 'radioButtonLabel',
      },
    });

    await expect(result.container).toBeAccessible('cv-radio-button');
  }, 10000);
});
