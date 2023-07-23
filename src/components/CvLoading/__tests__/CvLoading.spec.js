import { render } from '@testing-library/vue';
import CvLoading from '../CvLoading.vue';
import { carbonPrefix } from '../../../global/settings';

test('CvLoading - test all props and attrs', async () => {
  const RADIUS_SMALL = '42';
  const RADIUS_NORMAL = '44';

  const propDescription = 'ABC-loading-123';
  const propClass = 'ABC-class-123';
  const { getByRole, getByTitle, getByLabelText, rerender } = render(
    CvLoading,
    {
      props: { description: propDescription, active: false },
      attrs: { class: propClass },
    }
  );

  await getByTitle(propDescription);
  await getByLabelText(propDescription);
  const loading = await getByRole('progressbar');
  expect(loading.classList.contains(propClass)).toBe(true);
  const circle = loading.querySelector('circle');
  expect(circle.getAttribute('r')).toBe(RADIUS_NORMAL);

  // make sure the active class is added
  await rerender({
    active: true,
  });
  expect(loading.classList.contains(`${carbonPrefix}--loading`)).toBe(true);

  // make sure the radius changes
  await rerender({
    small: true,
  });
  expect(circle.getAttribute('r')).toBe(RADIUS_SMALL);
});

test('CvLoading - overlay', async () => {
  const { getByRole, rerender } = render(CvLoading, {
    props: { overlay: true, active: false },
  });

  const loading = await getByRole('progressbar');

  // make sure the active class is added
  await rerender({
    active: true,
  });
  expect(loading.classList.contains(`${carbonPrefix}--loading`)).toBe(true);

  const overlay = loading.parentElement;
  expect(overlay.classList.contains(`${carbonPrefix}--loading-overlay`)).toBe(
    true
  );

  // make sure the overlay is disabled
  await rerender({
    overlay: false,
  });
  const nonOverlayLoading = await getByRole('progressbar');
  const nonOverlay = nonOverlayLoading.parentElement;

  expect(
    nonOverlay.classList.contains(`${carbonPrefix}--loading-overlay`)
  ).toBe(false);
});
