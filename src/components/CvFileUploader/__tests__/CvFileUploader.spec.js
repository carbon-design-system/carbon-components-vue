import { render } from '@testing-library/vue';
import CvFileUploader from '..';

describe('CvFileUploader', () => {
  it('renders label', async () => {
    const dummyLabel = 'Dummy File Input';
    const { findByText } = render(CvFileUploader, {
      props: {
        label: dummyLabel,
      },
    });

    const label = await findByText(dummyLabel);
    expect(label).toBeDefined();
  });

  it('renders helper text', async () => {
    const dummyHelperText = 'Dummy Helper Text';
    const { findByText } = render(CvFileUploader, {
      props: {
        label: dummyHelperText,
      },
    });

    const label = await findByText(dummyHelperText);
    expect(label).toBeDefined();
  });
});
