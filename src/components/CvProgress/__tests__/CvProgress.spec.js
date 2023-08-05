// noinspection DuplicatedCode,JSCheckFunctionSignatures

import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CvProgress from '../CvProgress.vue';
import CvProgressStep from '../CvProgressStep.vue';

const TestSteps = {
  components: { CvProgressStep },
  template: `
    <cv-progress-step id="step-0" :label="'ABC-STEP-0'" :complete="false"></cv-progress-step>
    <cv-progress-step id="step-1" :label="'ABC-STEP-1'" :complete="true"></cv-progress-step>
    <cv-progress-step id="step-2" :label="'ABC-STEP-2'" :complete="false"></cv-progress-step>
    <cv-progress-step id="step-3" :label="'ABC-STEP-3'" :invalid="true"></cv-progress-step>
    <cv-progress-step id="step-4" :label="'ABC-STEP-4'" :disabled="true"></cv-progress-step>
    <cv-progress-step id="step-5" :label="'ABC-STEP-5'" :complete="true"></cv-progress-step>
  `,
};

describe('CvProgress', () => {
  it('CvProgress - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    let initialStep = 1;
    // The render method returns a collection of utilities to query your component.
    const result = render(CvProgress, {
      props: {
        initialStep: initialStep,
        steps: [
          'ABC-STEP-0',
          'ABC-STEP-1',
          'ABC-STEP-2',
          'ABC-STEP-3',
          'ABC-STEP-4',
          'ABC-STEP-5',
        ],
        vertical: false,
        spaceEqually: false,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const comp = result.container.querySelector('.cv-progress');
    expect(comp.classList.contains('bx--multi-select__wrapper--inline')).toBe(
      false
    );

    const el = await result.findByLabelText(ariaLabel);
    expect(el.classList.contains('ABC-class-123')).toBe(true);
    await result.findByText('ABC-STEP-1');

    // some steps should be complete, one should be current, and the rest complete
    let elSteps = result.container.querySelectorAll('.cv-progress-step');
    expect(elSteps.length).toBe(6);
    for (let i = 0; i < elSteps.length; i++) {
      const step = elSteps.item(i);
      if (i < initialStep)
        expect(step.classList.contains('bx--progress-step--complete')).toBe(
          true
        );
      else if (i > initialStep)
        expect(step.classList.contains('bx--progress-step--incomplete')).toBe(
          true
        );
      else
        expect(step.classList.contains('bx--progress-step--current')).toBe(
          true
        );
    }

    // set all to incomplete
    await result.rerender({ initialStep: -1 });
    elSteps = result.container.querySelectorAll('.cv-progress-step');
    expect(elSteps.length).toBe(6);
    for (let i = 0; i < elSteps.length; i++) {
      const step = elSteps.item(i);
      expect(step.classList.contains('bx--progress-step--incomplete')).toBe(
        true
      );
    }

    // set all to complete
    await result.rerender({ initialStep: 7 });
    elSteps = result.container.querySelectorAll('.cv-progress-step');
    expect(elSteps.length).toBe(6);
    for (let i = 0; i < elSteps.length; i++) {
      const step = elSteps.item(i);
      expect(step.classList.contains('bx--progress-step--complete')).toBe(true);
    }

    const buttons = await result.findAllByRole('button');
    expect(buttons.length).toBe(6);
    const user = userEvent.setup();
    await user.click(buttons[3]);
    expect(result.emitted('step-clicked')[0][0]?.index).toEqual(3);

    expect(comp.classList.contains('bx--progress--vertical')).toBe(false);
    await result.rerender({ vertical: true });
    expect(comp.classList.contains('bx--progress--vertical')).toBe(true);

    expect(comp.classList.contains('bx--progress--space-equal')).toBe(false);
    await result.rerender({ vertical: false, spaceEqually: true });
    expect(comp.classList.contains('bx--progress--vertical')).toBe(false);
    expect(comp.classList.contains('bx--progress--space-equal')).toBe(true);
  });
  it('CvProgress - test slots', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvProgress, {
      props: {
        initialStep: -1,
      },
      slots: {
        default: TestSteps,
      },
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const comp = result.container.querySelector('.cv-progress');
    expect(comp.classList.contains('bx--multi-select__wrapper--inline')).toBe(
      false
    );

    const el = await result.findByLabelText(ariaLabel);
    expect(el.classList.contains('ABC-class-123')).toBe(true);
    await result.findByText('ABC-STEP-1');

    let elSteps = result.container.querySelectorAll('.cv-progress-step');
    expect(elSteps.length).toBe(6);

    // See TestTabs above for expected state
    expect(elSteps[0].classList.contains('bx--progress-step--incomplete')).toBe(
      true
    );
    expect(elSteps[1].classList.contains('bx--progress-step--complete')).toBe(
      true
    );
    expect(elSteps[2].classList.contains('bx--progress-step--incomplete')).toBe(
      true
    );
    expect(elSteps[3].classList.contains('bx--progress-step--incomplete')).toBe(
      true
    );
    const invalid = elSteps[3].querySelector('.bx--progress__warning');
    expect(invalid).toBeTruthy();
    expect(elSteps[4].classList.contains('bx--progress-step--disabled')).toBe(
      true
    );
    expect(elSteps[5].classList.contains('bx--progress-step--complete')).toBe(
      true
    );
  });
});
