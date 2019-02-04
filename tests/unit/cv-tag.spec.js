import { shallowMount } from '@vue/test-utils';
import CvTag from '@/components/cv-tag/cv-tag.vue';

describe('CvTag.vue', () => {
  it('renders props.label when passed', () => {
    const label = 'new label';
    const wrapper = shallowMount(CvTag, {
      propsData: { label },
    });

    expect(wrapper.props('label')).toBe(label);
    expect(wrapper.text()).toMatch(label);
  });

  it('checks props.label is required', () => {
    expect(CvTag.props.label.required).toBe(true);
  });

  it('checks props.kind has default', () => {
    expect(CvTag.props.kind.default).toBeDefined();
  });

  it('matches snapshot', () => {
    const label = 'I am a tag';
    const kind = 'beta';
    const wrapper = shallowMount(CvTag, {
      propsData: { label, kind },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
