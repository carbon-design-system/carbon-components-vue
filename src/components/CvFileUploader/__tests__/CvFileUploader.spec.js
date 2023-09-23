import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { shallowMount } from '@vue/test-utils';
import { KINDS, STATES } from '../const';
import { carbonPrefix } from '../../../global/settings';
import { buttonKinds, buttonSizes } from '../../CvButton/consts';
import CvFileUploader from '..';

const inputKinds = [KINDS.DRAG_TARGET, KINDS.BUTTON];
const createFileItem = (
  file,
  invalidMessage = '',
  invalidMessageTitle = '',
  state = ''
) => ({
  file,
  invalidMessage,
  invalidMessageTitle,
  state,
});

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

  it(`sets "${STATES.UPLOADING}" state to files when initialStateUploading is set and uploaded file already exists`, async () => {
    const dummyFile = new File([''], 'dummy-file.jpeg', {
      type: 'image/jpeg',
    });
    const dummyId = 'dummy-id';
    const { container, emitted, rerender } = render(CvFileUploader, {
      props: {
        initialStateUploading: true,
        id: dummyId,
      },
    });

    const fileInput = container.querySelector(`#${dummyId}`);
    await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

    await rerender({ initialStateUploading: false });
    await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

    await rerender({ initialStateUploading: true });
    await fireEvent.change(fileInput, { target: { files: [dummyFile] } });

    expect(emitted('update:modelValue').at(2)[0][0].state).toBe(
      STATES.UPLOADING
    );
  });

  describe('Disabled state', () => {
    it('renders label in disabled state', async () => {
      const dummyLabel = 'Dummy File Input';
      const { findByText } = render(CvFileUploader, {
        props: {
          label: dummyLabel,
          disabled: true,
        },
      });

      const label = await findByText(dummyLabel);
      expect(
        label.classList.contains(`${carbonPrefix}--file--label--disabled`)
      ).toBeTruthy();
    });

    it('renders helper text in disable state', async () => {
      const dummyHelperText = 'Dummy Helper Text';
      const { findByText } = render(CvFileUploader, {
        props: {
          helperText: dummyHelperText,
          disabled: true,
        },
      });

      const element = await findByText(dummyHelperText);
      expect(
        element.classList.contains(
          `${carbonPrefix}--label-description--disabled`
        )
      ).toBeTruthy();
    });

    it('renders "button" in disabled state', async () => {
      const dummyId = 'dummy-id';
      const { container } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
          disabled: true,
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      const label = container.querySelector('label');

      expect(fileInput.getAttribute('disabled')).not.toBeNull();
      expect(
        label.classList.contains(`${carbonPrefix}--btn--disabled`)
      ).toBeTruthy();
    });

    it('does not emit changes on click when button is disabled', async () => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          kind: KINDS.BUTTON,
          id: dummyId,
          disabled: true,
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await userEvent.upload(fileInput, dummyFile);

      expect(emitted('update:modelValue')).toBeUndefined();
    });

    it('renders "drag & drop" in disabled state', async () => {
      const dummyId = 'dummy-id';
      const { container } = render(CvFileUploader, {
        props: {
          kind: KINDS.DRAG_TARGET,
          id: dummyId,
          disabled: true,
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      const wrapper = container.querySelector(
        `div.${carbonPrefix}--file-browse-btn`
      );

      expect(fileInput.getAttribute('disabled')).not.toBeNull();
      expect(
        wrapper.classList.contains(`${carbonPrefix}--file-browse-btn--disabled`)
      ).toBeTruthy();
    });

    it("does not emit changes when drag & drop's input is disabled", async () => {
      const dummyFile = new File(['file content'], 'dummy-file.txt', {
        type: 'text/plain',
      });
      const dummyId = 'dummy-id';
      const { container, emitted } = render(CvFileUploader, {
        props: {
          id: dummyId,
          disabled: true,
        },
      });

      const fileInput = container.querySelector(`#${dummyId}`);
      await userEvent.upload(fileInput, dummyFile);

      expect(emitted('update:modelValue')).toBeUndefined();
    });
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

  describe('Exposed methods', () => {
    describe('clear', () => {
      it('should clear files when clear function is called', async () => {
        const wrapper = await shallowMount(CvFileUploader, {
          props: {
            modelValue: [
              createFileItem(
                new File(['content1'], 'dummy-file1.txt', {
                  type: 'text/plain',
                })
              ),
              createFileItem(
                new File(['content2'], 'dummy-file2.txt', {
                  type: 'text/plain',
                })
              ),
            ],
            'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
          },
        });

        wrapper.vm.clear();
        await wrapper.vm.$nextTick();

        expect(wrapper.props('modelValue')).toEqual([]);
      });
    });

    describe('remove', () => {
      it('should remove the second item of files when remove function is called with 1', async () => {
        const wrapper = await shallowMount(CvFileUploader, {
          props: {
            modelValue: [
              createFileItem(
                new File(['content1'], 'dummy-file1.txt', {
                  type: 'text/plain',
                })
              ),
              createFileItem(
                new File(['content2'], 'dummy-file2.txt', {
                  type: 'text/plain',
                })
              ),
            ],
            'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
          },
        });

        wrapper.vm.remove(1);
        await wrapper.vm.$nextTick();

        expect(wrapper.props('modelValue').length).toBe(1);
        expect(wrapper.props('modelValue')[0].file.name).toBe(
          'dummy-file1.txt'
        );
      });
    });

    describe('setInvalidMessage', () => {
      it('should set "ERROR" as invalid message of the first file when calling setInvalidMessage function with 0 and "ERROR"', async () => {
        const wrapper = await shallowMount(CvFileUploader, {
          props: {
            modelValue: [
              createFileItem(
                new File(['content1'], 'dummy-file1.txt', {
                  type: 'text/plain',
                })
              ),
              createFileItem(
                new File(['content2'], 'dummy-file2.txt', {
                  type: 'text/plain',
                })
              ),
            ],
            'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
          },
        });

        wrapper.vm.setInvalidMessage(0, 'ERROR');
        await wrapper.vm.$nextTick();

        expect(wrapper.props('modelValue').length).toBe(2);
        expect(wrapper.props('modelValue')[0].invalidMessage).toBe('ERROR');
      });
    });

    describe('setState', () => {
      it(`should set second file status to 'none' state when calling setState function with 1 and ${STATES.NONE}`, async () => {
        const wrapper = await shallowMount(CvFileUploader, {
          props: {
            modelValue: [
              createFileItem(
                new File(['content1'], 'dummy-file1.txt', {
                  type: 'text/plain',
                }),
                '',
                '',
                STATES.UPLOADING
              ),
              createFileItem(
                new File(['content2'], 'dummy-file2.txt', {
                  type: 'text/plain',
                }),
                '',
                '',
                STATES.COMPLETE
              ),
            ],
            'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
          },
        });

        wrapper.vm.setState(1, STATES.NONE);
        await wrapper.vm.$nextTick();

        expect(wrapper.props('modelValue')[1].state).toBe(STATES.NONE);
      });

      it(`should set first file status to 'uploading' state when calling setState function with 0 and ${STATES.UPLOADING}`, async () => {
        const wrapper = await shallowMount(CvFileUploader, {
          props: {
            modelValue: [
              createFileItem(
                new File(['content1'], 'dummy-file1.txt', {
                  type: 'text/plain',
                }),
                '',
                '',
                STATES.COMPLETE
              ),
              createFileItem(
                new File(['content2'], 'dummy-file2.txt', {
                  type: 'text/plain',
                }),
                '',
                '',
                STATES.COMPLETE
              ),
            ],
            'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
          },
        });

        wrapper.vm.setState(0, STATES.UPLOADING);
        await wrapper.vm.$nextTick();

        expect(wrapper.props('modelValue')[0].state).toBe(STATES.UPLOADING);
      });

      it(`should set second file status to 'complete' state when calling setState function with 1 and ${STATES.COMPLETE}`, async () => {
        const wrapper = await shallowMount(CvFileUploader, {
          props: {
            modelValue: [
              createFileItem(
                new File(['content1'], 'dummy-file1.txt', {
                  type: 'text/plain',
                }),
                '',
                '',
                STATES.UPLOADING
              ),
              createFileItem(
                new File(['content2'], 'dummy-file2.txt', {
                  type: 'text/plain',
                }),
                '',
                '',
                STATES.UPLOADING
              ),
            ],
            'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
          },
        });

        wrapper.vm.setState(1, STATES.COMPLETE);
        await wrapper.vm.$nextTick();

        expect(wrapper.props('modelValue')[1].state).toBe(STATES.COMPLETE);
      });

      it(`should not set first file status to 'random', when calling setState function with 0 and 'random', as 'random' is not a valid state`, async () => {
        const wrapper = await shallowMount(CvFileUploader, {
          props: {
            modelValue: [
              createFileItem(
                new File(['content1'], 'dummy-file1.txt', {
                  type: 'text/plain',
                }),
                '',
                '',
                STATES.NONE
              ),
              createFileItem(
                new File(['content2'], 'dummy-file2.txt', {
                  type: 'text/plain',
                }),
                '',
                '',
                STATES.NONE
              ),
            ],
            'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
          },
        });

        wrapper.vm.setState(0, 'random');
        await wrapper.vm.$nextTick();

        expect(wrapper.props('modelValue')[0].state).toBe(STATES.NONE);
      });
    });
  });
});
