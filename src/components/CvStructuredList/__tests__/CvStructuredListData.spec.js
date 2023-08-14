import { shallowMount } from '@vue/test-utils';
import { CvStructuredListData } from '../';

const DefaultId = 'test-3';

describe('CvStructuredListData', () => {
  it('should render correctly when not wrapping text', async () => {
    const propsData = { id: DefaultId, noWrap: true };
    const wrapper = shallowMount(CvStructuredListData, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly when wrapping text', async () => {
    const propsData = { id: DefaultId, noWrap: false };
    const wrapper = shallowMount(CvStructuredListData, { propsData });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
