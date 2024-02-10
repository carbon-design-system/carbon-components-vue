import { CvRadioButton, CvRadioGroup } from '..';
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

describe('CvRadioGroup - accessibility', () => {
  it('CvRadioGroup - basic', async () => {
    const main = document.createElement('main');

    const result = render(
      {
        components: { CvRadioGroup, CvRadioButton },
        template: /* html */ `<cv-radio-group legendText="radioButtonGroupLegend">
        <cv-radio-button
          label="radioButtonLabel1"
          value="radioButtonValue1"
        />
        <cv-radio-button
          label="radioButtonLabel2"
          value="radioButtonValue2"
        />
        <cv-radio-button
          label="radioButtonLabel3"
          value="radioButtonValue3"
        />
      </cv-radio-group>`,
      },
      {
        container: document.body.appendChild(main),
      }
    );

    await expect(result.container).toBeAccessible('cv-radio-group');
  }, 10000);

  it('CvRadioGroup - with hidden legend', async () => {
    const main = document.createElement('main');

    const result = render(
      {
        components: { CvRadioGroup, CvRadioButton },
        template: /* html */ `<cv-radio-group legendText="radioButtonGroupLegend" hide-legend>
        <cv-radio-button
          label="radioButtonLabel1"
          value="radioButtonValue1"
        />
        <cv-radio-button
          label="radioButtonLabel2"
          value="radioButtonValue2"
        />
        <cv-radio-button
          label="radioButtonLabel3"
          value="radioButtonValue3"
        />
      </cv-radio-group>`,
      },
      {
        container: document.body.appendChild(main),
      }
    );

    await expect(result.container).toBeAccessible('cv-radio-group');
  }, 10000);
});
