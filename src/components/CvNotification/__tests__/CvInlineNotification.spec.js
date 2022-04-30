import { mount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';

import { CvInlineNotification, CvNotificationConsts } from '..';

describe('CvInlineNotification', () => {
  it('CvInlineNotification - default', () => {
    const wrapper = mount(CvInlineNotification);

    expect(new Set(wrapper.classes())).toEqual(
      new Set([
        `${carbonPrefix}--inline-notification`,
        `${carbonPrefix}--inline-notification--info`,
      ])
    );
  });

  it('CvInlineNotification - kind', async () => {
    const wrapper = mount(CvInlineNotification);

    const divTag = wrapper.find('div');
    for (const kind of CvNotificationConsts.notificationKinds) {
      await wrapper.setProps({ kind });
      expect(new Set(divTag.classes())).toEqual(
        new Set([
          `${carbonPrefix}--inline-notification`,
          `${carbonPrefix}--inline-notification--${kind}`,
        ])
      );
    }
  });

  it('CvInlineNotification - kind validator', () => {
    for (const kind of CvNotificationConsts.notificationKinds) {
      expect(CvInlineNotification.props.kind.validator(kind)).toEqual(true);
    }

    expect(
      CvInlineNotification.props.kind.validator('any other string')
    ).toEqual(false);
  });

  it('CvInlineNotification - icon', async () => {
    const wrapper = mount(CvInlineNotification);

    for (const kind of CvNotificationConsts.notificationKinds) {
      await wrapper.setProps({ kind });
      expect(wrapper.vm.icon).toEqual(
        CvNotificationConsts.notificationIcons[kind]
      );
    }
  });

  it('CvInlineNotification - low contrast', () => {
    const wrapper = mount(CvInlineNotification, {
      props: { lowContrast: true },
    });

    const divTag = wrapper.find('div');
    expect(divTag.classes()).toContain(
      `${carbonPrefix}--inline-notification--low-contrast`
    );
  });

  it('CvInlineNotification - title and subtitle', () => {
    const TITLE = 'Some kind of unique title';
    const SUBTITLE = 'And an equally unique sub title!';

    const wrapper = mount(CvInlineNotification, {
      props: {
        title: TITLE,
        subTitle: SUBTITLE,
      },
    });

    expect(wrapper.text()).toContain(TITLE);
    expect(wrapper.text()).toContain(SUBTITLE);
  });

  it('CvInlineNotification - action button only if label is not empty', async () => {
    const wrapper = mount(CvInlineNotification, { props: { actionLabel: '' } });

    expect(wrapper.findAll('button').length).toEqual(1);

    await wrapper.setProps({ actionLabel: 'Action' });

    expect(wrapper.findAll('button').length).toEqual(2);
  });

  it('CvInlineNotification - action event', async () => {
    const wrapper = mount(CvInlineNotification, {
      props: { actionLabel: 'Action' },
    });
    const actionButton = wrapper.find(`button.${carbonPrefix}--btn`);
    await actionButton.trigger('click');
    expect(wrapper.emitted().action).toBeTruthy();
  });

  it('CvInlineNotification - close event', async () => {
    const wrapper = mount(CvInlineNotification);

    const closeButton = wrapper.find(
      `button.${carbonPrefix}--inline-notification__close-button`
    );
    await closeButton.trigger('click');

    expect(wrapper.emitted().close).toBeTruthy();
  });
});
