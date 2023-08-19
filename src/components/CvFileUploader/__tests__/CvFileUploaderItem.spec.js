import { render } from '@testing-library/vue';
import { STATES } from '../const';
import { carbonPrefix } from '../../../global/settings';
import CvFileUploaderItem from '../CvFileUploaderItem.vue';

describe('CvFileUploaderItem', () => {
  it('renders file name', async () => {
    const dummyFileName = 'abc.txt';
    const { findByText } = render(CvFileUploaderItem, {
      props: {
        item: { file: { name: dummyFileName } },
      },
    });

    const element = await findByText(dummyFileName);
    expect(element.tagName).toBeDefined;
  });

  it('defines a title to file name element', async () => {
    const dummyFileName = 'def.txt';
    const { findByText } = render(CvFileUploaderItem, {
      props: {
        item: { file: { name: dummyFileName } },
      },
    });

    const element = await findByText(dummyFileName);
    expect(element.getAttribute('title')).toBe(dummyFileName);
  });

  it('displays a loading spinner representing the uploading state', async () => {
    const { container } = render(CvFileUploaderItem, {
      props: {
        item: {
          file: { name: 'dummyName.txt' },
          state: STATES.UPLOADING,
        },
      },
    });

    const element = await container.getElementsByClassName(
      `${carbonPrefix}--loading`
    );
    expect(element).toBeDefined();
  });

  it('displays complete mark representing the complete state', async () => {
    const { container } = render(CvFileUploaderItem, {
      props: {
        item: {
          file: { name: 'dummyName.txt' },
          state: STATES.COMPLETE,
        },
      },
    });

    const element = await container.getElementsByClassName(
      `${carbonPrefix}---file-complete`
    );
    expect(element).toBeDefined();
  });

  it('displays warning icon representing the invalid state', async () => {
    const { container } = render(CvFileUploaderItem, {
      props: {
        item: {
          file: { name: 'dummyName.txt' },
          invalidMessage: 'invalid dummy file',
        },
      },
    });

    const element = await container.getElementsByClassName(
      `${carbonPrefix}---file-invalid`
    );
    expect(element).toBeDefined();
  });

  it('displays a invalid message if one is passed', async () => {
    const dummyInvalidMessage = 'random invalid message';
    const { getByText } = render(CvFileUploaderItem, {
      props: {
        item: {
          invalidMessage: dummyInvalidMessage,
        },
      },
    });

    const element = await getByText(dummyInvalidMessage);
    expect(element).toBeDefined();
  });

  it('displays the default invalid title if a invalid message is defined without a invalid title', async () => {
    const dummyInvalidMessage = 'random invalid message';
    const { getByText } = render(CvFileUploaderItem, {
      props: {
        item: {
          invalidMessage: dummyInvalidMessage,
        },
      },
    });

    const element = await getByText('Invalid file');
    expect(element).toBeDefined();
  });

  it('displays the passed invalid title if a invalid message is also defined', async () => {
    const dummyInvalidTitle = 'random invalid title';
    const dummyInvalidMessage = 'random invalid message';
    const { getByText } = render(CvFileUploaderItem, {
      props: {
        item: {
          invalidMessageTitle: dummyInvalidTitle,
          invalidMessage: dummyInvalidMessage,
        },
      },
    });

    const titleElement = await getByText(dummyInvalidTitle);
    const messageElement = await getByText(dummyInvalidMessage);
    expect(titleElement).toBeDefined();
    expect(messageElement).toBeDefined();
  });

  it('hides "remove" button if removable is not passed', async () => {
    const { container } = render(CvFileUploaderItem, {
      props: { item: {} },
    });

    const removableButton = await container.querySelector(
      `button.${carbonPrefix}--file-close`
    );
    expect(removableButton).toBeNull();
  });

  it('hides "remove" button if removable is false', async () => {
    const { container } = render(CvFileUploaderItem, {
      props: {
        item: {},
        removable: false,
      },
    });

    const removableButton = await container.querySelector(
      `button.${carbonPrefix}--file-close`
    );
    expect(removableButton).toBeNull();
  });

  it('displays "remove" button if removable is passed', async () => {
    const { container } = render(CvFileUploaderItem, {
      props: {
        item: {},
        removable: true,
      },
    });

    const removableButton = await container.querySelector(
      `button.${carbonPrefix}--file-close`
    );
    expect(removableButton).toBeDefined();
  });
});
