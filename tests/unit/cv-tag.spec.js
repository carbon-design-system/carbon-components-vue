import { shallowMount } from '@vue/test-utils';
import CvTag from '@/components/cv-tag/cv-tag.vue';

describe('CvTag.vue', () => {
  it('renders props.label when passed', () => {
    const label = 'new label';
    const wrapper = shallowMount(CvTag, {
      propsData: { label },
    });
    // console.log(wrapper.html());
    expect(wrapper.props('label')).toBe(label);
    expect(wrapper.text()).toMatch(label);
  });
});

describe('CvTag.vue', () => {
  it('checks props.label is required', () => {
    expect(CvTag.props.label.required).toBe(true);
  });
});
