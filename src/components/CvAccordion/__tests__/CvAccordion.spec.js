import { shallowMount, mount } from '@vue/test-utils';
import { ref } from 'vue';

import { CvAccordion, CvAccordionItem } from '../';
import { carbonPrefix } from '../../../global/settings';

const dummyContent = 'Dummy content';
const AccordionWithItemContent = {
  emits: ['change'],
  components: { CvAccordion, CvAccordionItem },
  template: /* html */ `<cv-accordion @change="handleChange">
    <cv-accordion-item v-for="n in numbers" :key="\`acc-item-\${n}\`" :id="\`acc-item-\${n}\`" :data-id="\`acc-item-\${n}\`">
      <template v-slot:title>Section {{n}} title </template>
      <template v-slot:content>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </cv-accordion-item>
  </cv-accordion>`,
  setup(props, { emit }) {
    const numbers = ref([1, 2, 3, 4]);
    const oneLess = () => numbers.value.pop();
    const handleChange = changeValue => {
      emit('change', changeValue);
    };
    return { handleChange, numbers, oneLess };
  },
};

describe('CvAccordion', () => {
  it('Renders an accordion with slotted content', () => {
    const wrapper = shallowMount(CvAccordion, {
      slots: { default: dummyContent },
    });
    expect(wrapper.classes()).toContain(`${carbonPrefix}--accordion`);
    expect(wrapper.text()).toBe(dummyContent);
  });

  it('Validates align property', () => {
    const validator = CvAccordion.props.align.validator;
    expect(validator('start')).toBe(true);

    expect(validator('banana')).toBe(false);
  });

  it('Validates size property', () => {
    const validator = CvAccordion.props.size.validator;
    expect(validator('sm')).toBe(true);

    expect(validator('banana')).toBe(false);
  });

  it('Renders with item children and behaves well', async () => {
    const wrapper = mount(AccordionWithItemContent);

    const acc = wrapper.findComponent(`.${carbonPrefix}--accordion`);
    const expectedState = [
      {
        id: 'acc-item-1',
        open: false,
      },
      {
        id: 'acc-item-2',
        open: false,
      },
      {
        id: 'acc-item-3',
        open: false,
      },
      {
        id: 'acc-item-4',
        open: false,
      },
    ];

    expect(acc.vm.state).toEqual(expectedState);

    const item1 = wrapper.find('[data-id="acc-item-1"]');
    const item1Button = wrapper.find('button[aria-controls="acc-item-1"]');
    const item2Button = wrapper.find('button[aria-controls="acc-item-2"]');

    // Click item[0] and see change in state and classes
    // also confirms registration
    const classes1b4 = item1.classes();
    expect(classes1b4).not.toContain(
      `${carbonPrefix}--accordion__item--active`
    );
    expect(classes1b4).not.toContain(
      `${carbonPrefix}--accordion__item--expanding`
    );
    await item1Button.trigger('click');
    expectedState[0].open = true; // 0 open
    expect(acc.vm.state).toEqual(expectedState);
    const classes1 = item1.classes();
    expect(classes1).toContain(`${carbonPrefix}--accordion__item--active`);
    expect(classes1).toContain(`${carbonPrefix}--accordion__item--expanding`);
    // >> check animation completes
    await item1.trigger('animationend');
    expect(item1.classes()).not.toContain(
      `${carbonPrefix}--accordion__item--expanding`
    );
    // >> emitted correct change
    expect(wrapper.emitted().change[0]).toEqual([
      {
        change: { id: expectedState[0].id, open: true },
        state: expectedState,
      },
    ]);

    // Click item[1] and see change in state
    await item2Button.trigger('click');
    expectedState[1].open = true; // 0 and 1 open
    expect(acc.vm.state).toEqual(expectedState);

    // Click item[0] and see change in state and animation classes
    await item1Button.trigger('click');
    expectedState[0].open = false; // 1 open
    expect(acc.vm.state).toEqual(expectedState);
    expect(item1.classes()).toContain(
      `${carbonPrefix}--accordion__item--collapsing`
    );
    await item1.trigger('animationend');
    expect(item1.classes()).not.toContain(
      `${carbonPrefix}--accordion__item--expanding`
    );

    // Click remove an item and see change registration (confirms deregister)
    await wrapper.vm.oneLess();
    expectedState.pop();
    expect(acc.vm.state).toEqual(expectedState); // 1 open still

    // Change item 2 view setting state
    expectedState[2].open = true;
    acc.vm.state = expectedState;
    expect(acc.vm.state).toEqual(expectedState); // nothing open

    // check state still updating via click after being set
    await item1Button.trigger('click');
    expectedState[0].open = true; // 0 open
    expect(acc.vm.state).toEqual(expectedState);
  });

  // it('Register, deregister, onActionItemClick work to produced state', () => {
  //   const emit = jest.fn();
  //   const instance = CvAccordion.setup({}, { emit });

  //   console.dir(instance);

  //   instance.onAccItemChagne(1, true);

  //   emit('wibble');

  //   expect(emit).toBeCalledWith('fish');
  // });

  // it('Provides for item registration', () => {
  //   const wrapper = shallowMount(CvAccordion, {
  //     slots: dummyContent,
  //   });

  //   // console.dir(wrapper.__app);

  //   const acc = wrapper.find(`${carbonPrefix}--accordion`);
  //   expect(acc).not.toBeNull();
  //   expect(wrapper.text()).toBe(dummyContent);
  // });

  // it('', () => {

  // });
  // it('', () => {

  // });
  // it('', () => {

  // });
});
