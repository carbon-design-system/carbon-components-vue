import { shallowMount } from '@vue/test-utils';
import { CvStructuredListHeading } from '../';

describe('CvStructuredListHeading', () => {
  it('should render correctly', async () => {
    const wrapper = shallowMount(CvStructuredListHeading);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render with slot correctly', async () => {
    const wrapper = shallowMount(CvStructuredListHeading, {
      slots: {
        default:
          '<div class="headings-slot-default-test">Headings slot default test</div>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
