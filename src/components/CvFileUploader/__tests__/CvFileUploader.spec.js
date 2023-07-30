import { render, fireEvent } from '@testing-library/vue';
import { KINDS } from '../const';
import { carbonPrefix } from '../../../global/settings';
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

  describe('kind: button', () => {
    it('renders button configuration when kind is button', async () => {
      const { container } = render(CvFileUploader, {
        props: { kind: KINDS.BUTTON },
      });

      const label = container.querySelector(`label.${carbonPrefix}--btn`);
      const fileInput = label.querySelector('input[type:file]');
      expect(label).toBeDefined();
      expect(fileInput).toBeDefined();
    });

    it('binds attributes to inner input element', async () => {
      const dummyId = 'dummy-id';
      const { container } = render(CvFileUploader, {
        props: { kind: KINDS.BUTTON, id: dummyId },
        attrs: { 'random-attr': 'dummy' },
      });

      const input = container.querySelector(`#${dummyId}`);
      expect(input.getAttribute('random-attr')).toBe('dummy');
      expect(input.tagName).toBe('INPUT');
    });

    it('triggers file input when pressing enter on label', async () => {
      const dummyId = 'dummy-id';
      const { container } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
        },
      });

      const label = container.querySelector(`label.${carbonPrefix}--btn`);
      const fileInput = container.querySelector(`#${dummyId}`);
      const clickSpy = jest.spyOn(fileInput, 'click');
      await label.focus();
      await fireEvent.keyDown(label, { key: 'Enter', code: 13, charCode: 13 });

      expect(clickSpy).toHaveBeenCalled();
    });

    it('triggers file input when pressing space on label', async () => {
      const dummyId = 'dummy-id';
      const { container } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
        },
      });

      const label = container.querySelector(`label.${carbonPrefix}--btn`);
      const fileInput = container.querySelector(`#${dummyId}`);
      const clickSpy = jest.spyOn(fileInput, 'click');
      await label.focus();
      await fireEvent.keyDown(label, { key: 'Space', code: 32, charCode: 32 });

      expect(clickSpy).toHaveBeenCalled();
    });

    it('emits change when native input change', async () => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

      const emitResult = emitted('update:modelValue').at(0);
      expect(emitResult[0]).toHaveLength(1);
      expect(emitResult[0][0].file.name).toBe(dummyFile.name);
    });

    it('resets current file list when clearOnReselect is passed', async () => {
      const dummyFile1 = new File(['file content1'], 'dummy-file1.txt', {
        type: 'text/plain',
      });
      const dummyFile2 = new File(['file content2'], 'dummy-file2.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
          clearOnReselect: true,
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile1] } });
      await fireEvent.change(fileInput, { target: { files: [dummyFile2] } });

      const emitResult = emitted('update:modelValue').at(1);
      expect(emitResult[0]).toHaveLength(1);
      expect(emitResult[0][0].file.name).toBe(dummyFile2.name);
    });

    it('accumulate files when clearOnReselect is not passed or false', async () => {
      const dummyFile1 = new File(['file content1'], 'dummy-file1.txt', {
        type: 'text/plain',
      });
      const dummyFile2 = new File(['file content2'], 'dummy-file2.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
          clearOnReselect: false,
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile1] } });
      await fireEvent.change(fileInput, { target: { files: [dummyFile2] } });

      const emitResult = emitted('update:modelValue').at(1);
      expect(emitResult[0]).toHaveLength(2);
      expect(emitResult[0][0].file.name).toBe(dummyFile1.name);
      expect(emitResult[0][1].file.name).toBe(dummyFile2.name);
    });

    it('correctly identifies a valid file by its type', async () => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
          accept: 'text/plain',
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

      const emitResult = emitted('update:modelValue').at(0);
      expect(emitResult[0][0].invalidMessageTitle).toBe('');
      expect(emitResult[0][0].invalidMessage).toBe('');
    });

    it('correctly identifies an invalid file by its type', async () => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
          accept: 'image/png',
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

      const emitResult = emitted('update:modelValue').at(0);
      expect(emitResult[0][0].invalidMessageTitle).toBe('Invalid file type');
      expect(emitResult[0][0].invalidMessage).toBe(
        `"${dummyFile.name}" does not have a valid file type.`
      );
    });

    it('correctly identifies a valid file by its extension', async () => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
          accept: '.txt',
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

      const emitResult = emitted('update:modelValue').at(0);
      expect(emitResult[0][0].invalidMessageTitle).toBe('');
      expect(emitResult[0][0].invalidMessage).toBe('');
    });

    it('correctly identifies an invalid file by its extension', async () => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
          accept: '.png',
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

      const emitResult = emitted('update:modelValue').at(0);
      expect(emitResult[0][0].invalidMessageTitle).toBe('Invalid file type');
      expect(emitResult[0][0].invalidMessage).toBe(
        `"${dummyFile.name}" does not have a valid file type.`
      );
    });

    it('considers .jpeg when accepting .jpg files', async () => {
      const dummyFile = new File([''], 'dummy-file.jpeg', {
        type: 'image/jpeg',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
          accept: '.jpg',
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

      const emitResult = emitted('update:modelValue').at(0);
      expect(emitResult[0][0].invalidMessageTitle).toBe('');
      expect(emitResult[0][0].invalidMessage).toBe('');
    });

    describe('Drop target label', () => {
      it('renders drop target label when dropTargetLabel is passed', async () => {
        const dummyDropTargetLabel = 'Dummy Label';
        const { findByText } = render(CvFileUploader, {
          props: {
            kind: KINDS.BUTTON,
            dropTargetLabel: dummyDropTargetLabel,
          },
        });

        const label = await findByText(dummyDropTargetLabel);
        expect(label.tagName).toBeDefined();
      });

      it('renders drop target label when buttonLabel is passed', async () => {
        const dummyDropTargetLabel = 'Dummy Button Label';
        const { findByText } = render(CvFileUploader, {
          props: {
            kind: KINDS.BUTTON,
            dropTargetLabel: dummyDropTargetLabel,
          },
        });

        const label = await findByText(dummyDropTargetLabel);
        expect(label.tagName).toBeDefined();
      });

      it('renders default drop target label when neither dropTargetLabel and buttonLabel is passed', async () => {
        const dummyDropTargetLabel = 'Drag and drop files here or upload';
        const { findByText } = render(CvFileUploader, {
          props: {
            kind: KINDS.BUTTON,
          },
        });

        const label = await findByText(dummyDropTargetLabel);
        expect(label.tagName).toBeDefined();
      });
    });
  });
});
