import { testComponent, awaitNextTick } from './_helpers';
import { CvFileUploader } from '@/components/cv-file-uploader';

const { shallowMount: shallow, trigger, setProps } = awaitNextTick;

describe('CvFileUploader', () => {
  // ***************
  // FUNCTIONAL TESTS
  // ***************

  it('should accept all file formats if no accept is specified', async () => {
    const wrapper = await shallow(CvFileUploader);

    const dropEvent = {
      dataTransfer: {
        types: ['Files'],
        files: [{ name: 'foo.jpg', type: 'image/jpg' }],
      },
      type: 'drop',
      preventDefault: jest.fn(),
    };
    wrapper.find('[data-file-drop-container]').trigger('drop', dropEvent);
    expect(wrapper.emitted().change[0][0]).toEqual([
      {
        file: {
          name: 'foo.jpg',
          type: 'image/jpg',
        },
        invalidMessage: '',
        invalidMessageTitle: '',
        state: '',
      },
    ]);
  });

  it('should emit when a file is dragged', async () => {
    const propsData = { accept: '.jpg,.png' };
    const wrapper = await shallow(CvFileUploader, { propsData });

    const dropEvent = {
      dataTransfer: {
        types: ['Files'],
        files: [{ name: 'foo.jpg', type: 'image/jpg' }],
      },
      type: 'drop',
      preventDefault: jest.fn(),
    };
    wrapper.find('[data-file-drop-container]').trigger('drop', dropEvent);
    expect(wrapper.emitted().change[0][0]).toEqual([
      {
        file: {
          name: 'foo.jpg',
          type: 'image/jpg',
        },
        invalidMessage: '',
        invalidMessageTitle: '',
        state: '',
      },
    ]);
  });

  it('should not accept wrong file formats', async () => {
    const propsData = { accept: '.jpg,.png' };
    const wrapper = await shallow(CvFileUploader, { propsData });

    const dropEvent = {
      dataTransfer: {
        types: ['Files'],
        files: [{ name: 'foo.mp4', type: 'video/mp4' }],
      },
      type: 'drop',
      preventDefault: jest.fn(),
    };
    wrapper.find('[data-file-drop-container]').trigger('drop', dropEvent);
    expect(wrapper.emitted().change[0][0]).toEqual([
      {
        file: {
          name: 'foo.mp4',
          type: 'video/mp4',
        },
        invalidMessage: '"foo.mp4" does not have a valid file type.',
        invalidMessageTitle: 'Invalid file type',
        state: '',
      },
    ]);
  });
});
