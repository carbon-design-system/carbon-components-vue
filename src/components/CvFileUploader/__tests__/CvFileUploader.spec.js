import { render, fireEvent } from '@testing-library/vue';
import { KINDS, STATES } from '../const';
import { carbonPrefix } from '../../../global/settings';
import { buttonKinds, buttonSizes } from '../../CvButton/consts';
import CvFileUploader from '..';

const inputKinds = [KINDS.DRAG_TARGET];

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

  it.each(inputKinds)(
    'binds attributes to inner input element (kind: %s)',
    async inputKind => {
      const dummyId = 'dummy-id';
      const { container } = render(CvFileUploader, {
        props: { kind: inputKind, id: dummyId },
        attrs: { 'random-attr': 'dummy' },
      });

      const input = container.querySelector(`#${dummyId}`);
      expect(input.getAttribute('random-attr')).toBe('dummy');
      expect(input.tagName).toBe('INPUT');
    }
  );

  it.each(inputKinds)(
    'triggers file input when pressing enter on label/drop zone (kind: %s)',
    async inputKind => {
      const dummyId = 'dummy-id';
      const { container } = render(CvFileUploader, {
        props: {
          kind: inputKind,
          id: dummyId,
        },
      });

      const wrapper = container.querySelector(
        inputKind === KINDS.BUTTON
          ? 'label'
          : `div.${carbonPrefix}--file-browse-btn`
      );
      const fileInput = container.querySelector(`#${dummyId}`);
      const clickSpy = jest.spyOn(fileInput, 'click');
      await wrapper.focus();
      await fireEvent.keyDown(wrapper, {
        key: 'Enter',
        code: 13,
        charCode: 13,
      });

      expect(clickSpy).toHaveBeenCalled();
    }
  );

  it.each(inputKinds)(
    'triggers file input when pressing space on label/drop zone (kind: %s)',
    async inputKind => {
      const dummyId = 'dummy-id';
      const { container } = render(CvFileUploader, {
        props: {
          kind: inputKind,
          id: dummyId,
        },
      });

      const wrapper = container.querySelector(
        inputKind === KINDS.BUTTON
          ? 'label'
          : `div.${carbonPrefix}--file-browse-btn`
      );
      const fileInput = container.querySelector(`#${dummyId}`);
      const clickSpy = jest.spyOn(fileInput, 'click');
      await wrapper.focus();
      await fireEvent.keyDown(wrapper, {
        key: ' ',
        code: 32,
        keyCode: 32,
        charCode: 32,
      });

      expect(clickSpy).toHaveBeenCalled();
    }
  );

  it.each(inputKinds)(
    'emits change when native input change (kind: %s)',
    async inputKind => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: inputKind,
          id: dummyId,
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

      const emitResult = emitted('update:modelValue').at(0);
      expect(emitResult[0]).toHaveLength(1);
      expect(emitResult[0][0].file.name).toBe(dummyFile.name);
    }
  );

  it.each(inputKinds)(
    'resets current file list when clearOnReselect is passed (kind: %s)',
    async inputKind => {
      const dummyFile1 = new File(['file content1'], 'dummy-file1.txt', {
        type: 'text/plain',
      });
      const dummyFile2 = new File(['file content2'], 'dummy-file2.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: inputKind,
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
    }
  );

  it.each(inputKinds)(
    'accumulate files when clearOnReselect is not passed or false (kind: %s)',
    async inputKind => {
      const dummyFile1 = new File(['file content1'], 'dummy-file1.txt', {
        type: 'text/plain',
      });
      const dummyFile2 = new File(['file content2'], 'dummy-file2.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: inputKind,
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
    }
  );

  it.each(inputKinds)(
    'correctly identifies a valid file by its type (kind: %s)',
    async inputKind => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: inputKind,
          id: dummyId,
          accept: 'text/plain',
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

      const emitResult = emitted('update:modelValue').at(0);
      expect(emitResult[0][0].invalidMessageTitle).toBe('');
      expect(emitResult[0][0].invalidMessage).toBe('');
    }
  );

  it.each(inputKinds)(
    'correctly identifies an invalid file by its type (kind: %s)',
    async inputKind => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: inputKind,
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
    }
  );

  it.each(inputKinds)(
    'correctly identifies a valid file by its extension (kind: %s)',
    async inputKind => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: inputKind,
          id: dummyId,
          accept: '.txt',
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

      const emitResult = emitted('update:modelValue').at(0);
      expect(emitResult[0][0].invalidMessageTitle).toBe('');
      expect(emitResult[0][0].invalidMessage).toBe('');
    }
  );

  it.each(inputKinds)(
    'correctly identifies an invalid file by its extension (kind: %s)',
    async inputKind => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: inputKind,
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
    }
  );

  it.each(inputKinds)(
    'considers .jpeg when accepting .jpg files (kind: %s)',
    async inputKind => {
      const dummyFile = new File([''], 'dummy-file.jpeg', {
        type: 'image/jpeg',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: inputKind,
          id: dummyId,
          accept: '.jpg',
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

      const emitResult = emitted('update:modelValue').at(0);
      expect(emitResult[0][0].invalidMessageTitle).toBe('');
      expect(emitResult[0][0].invalidMessage).toBe('');
    }
  );

  it.each(inputKinds)(
    'renders drop-target slot content (kind: %s)',
    async inputKind => {
      const { getByText } = render(CvFileUploader, {
        props: {
          kind: inputKind,
        },
        slots: {
          'drop-target': '<p>dummy slot content</p>',
        },
      });

      const slotContent = getByText('dummy slot content');
      expect(slotContent).toBeDefined;
    }
  );

  it(`sets "${STATES.UPLOADING}" state to new files when initialStateUploading is true`, async () => {
    const dummyFile = new File([''], 'dummy-file.jpeg', {
      type: 'image/jpeg',
    });
    const dummyId = 'dummy-id';
    const { container, emitted } = render(CvFileUploader, {
      props: {
        initialStateUploading: true,
        id: dummyId,
      },
    });

    const fileInput = container.querySelector(`#${dummyId}`);
    await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

    const emitResult = emitted('update:modelValue').at(0);
    expect(emitResult[0][0].state).toBe(STATES.UPLOADING);
  });

  it(`sets "${STATES.NONE}" state to new files when initialStateUploading is false`, async () => {
    const dummyFile = new File([''], 'dummy-file.jpeg', {
      type: 'image/jpeg',
    });
    const dummyId = 'dummy-id';
    const { container, emitted } = render(CvFileUploader, {
      props: {
        initialStateUploading: false,
        id: dummyId,
      },
    });

    const fileInput = container.querySelector(`#${dummyId}`);
    await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

    const emitResult = emitted('update:modelValue').at(0);
    expect(emitResult[0][0].state).toBe(STATES.NONE);
  });

  it(`sets "${STATES.NONE}" state to new files when initialStateUploading is not set`, async () => {
    const dummyFile = new File([''], 'dummy-file.jpeg', {
      type: 'image/jpeg',
    });
    const dummyId = 'dummy-id';
    const { container, emitted } = render(CvFileUploader, {
      props: {
        id: dummyId,
      },
    });

    const fileInput = container.querySelector(`#${dummyId}`);
    await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

    const emitResult = emitted('update:modelValue').at(0);
    expect(emitResult[0][0].state).toBe(STATES.NONE);
  });

  describe('Drop target label', () => {
    it.each(inputKinds)(
      'renders drop target label when dropTargetLabel is passed (kind: %s)',
      async inputKind => {
        const dummyDropTargetLabel = 'Dummy Label';
        const { findByText } = render(CvFileUploader, {
          props: {
            kind: inputKind,
            dropTargetLabel: dummyDropTargetLabel,
          },
        });

        const label = await findByText(dummyDropTargetLabel);
        expect(label.tagName).toBeDefined();
      }
    );

    it.each(inputKinds)(
      'renders drop target label when buttonLabel is passed (kind: %s)',
      async inputKind => {
        const dummyDropTargetLabel = 'Dummy Button Label';
        const { findByText } = render(CvFileUploader, {
          props: {
            kind: inputKind,
            dropTargetLabel: dummyDropTargetLabel,
          },
        });

        const label = await findByText(dummyDropTargetLabel);
        expect(label.tagName).toBeDefined();
      }
    );

    it.each(inputKinds)(
      'renders default drop target label when neither dropTargetLabel and buttonLabel is passed  (kind: %s)',
      async inputKind => {
        const dummyDropTargetLabel = 'Drag and drop files here or upload';
        const { findByText } = render(CvFileUploader, {
          props: {
            kind: inputKind,
          },
        });

        const label = await findByText(dummyDropTargetLabel);
        expect(label.tagName).toBeDefined();
      }
    );
  });

  describe('Drag & Drop', () => {
    it('emits change when native input change', async () => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const { container, emitted } = render(CvFileUploader);

      const dropZone = container.querySelector(
        `div.${carbonPrefix}--file-browse-btn`
      );
      await fireEvent.drop(dropZone, {
        dataTransfer: {
          files: [dummyFile],
          types: ['Files'],
        },
      });

      const emitResult = emitted('update:modelValue').at(0);
      expect(emitResult[0]).toHaveLength(1);
      expect(emitResult[0][0].file.name).toBe(dummyFile.name);
    });
  });

  describe('File listing', () => {
    it('list files when they are inputted', async () => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const { container, getAllByText } = render(CvFileUploader);

      const dropZone = container.querySelector(
        `div.${carbonPrefix}--file-browse-btn`
      );
      await fireEvent.drop(dropZone, {
        dataTransfer: {
          files: [dummyFile],
          types: ['Files'],
        },
      });

      expect(getAllByText(dummyFile.name)).toBeDefined();
    });

    it("removes a file from the file list when clicking on 'Remove Item' button", async () => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const { container, emitted } = render(CvFileUploader, {
        props: { removable: true },
      });

      const dropZone = container.querySelector(
        `div.${carbonPrefix}--file-browse-btn`
      );
      await fireEvent.drop(dropZone, {
        dataTransfer: {
          files: [dummyFile],
          types: ['Files'],
        },
      });

      const removeButton = container.querySelector(
        `button.${carbonPrefix}--file-close`
      );
      await fireEvent.click(removeButton, new MouseEvent('click'));

      const emitResult = emitted('update:modelValue').at(1);
      expect(emitResult[0]).toHaveLength(0);
    });
  });

  describe('Button kind', () => {
    it.each(buttonKinds)(
      'changes "button kind" based on buttonKind prop (button kind: "%s")',
      async kind => {
        const kindClass = kind ? `.${carbonPrefix}--btn--${kind}` : '';
        const { container } = render(CvFileUploader, {
          props: { buttonKind: kind, kind: KINDS.BUTTON },
        });
        const wrapper = container.querySelector(`label${kindClass}`);

        expect(wrapper).not.toBeNull();
      }
    );
  });

  describe('Button size', () => {
    it.each(buttonSizes)(
      'changes "button size" based on buttonSize prop (button size: "%s")',
      async size => {
        const classSuffix = size === 'small' ? 'sm' : size;
        const sizeClassSuffix = classSuffix
          ? `.${carbonPrefix}--btn--${classSuffix}`
          : '';
        const { container } = render(CvFileUploader, {
          props: { buttonSize: size, kind: KINDS.BUTTON },
        });
        const wrapper = container.querySelector(`label${sizeClassSuffix}`);

        expect(wrapper).not.toBeNull();
      }
    );
  });
});
