/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { shallowMount } from '@vue/test-utils';

import CvSvg from '../_CvSvg';
import TestIcon from './_TestIcon';

const notAComponent = {};
const fakeComponentVue = { render: 'Vue 2' };
const svgInline = /* html */ `<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="root"> <g fill-rule="evenodd" id="g"> <path id="path" d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/> </g> </svg>`;
const svgSymbol = './test-svg.svg#test-symbol';
const svgFie = './test-svg.svg';

describe('Svg with fake icon', () => {
  it('renders the SVG from an icon component', () => {
    const wrapper = shallowMount(CvSvg, {
      props: { svg: TestIcon },
    });

    expect(wrapper.find('svg')).not.toBeNull();
  });

  it('renders the SVG from an svg file', () => {
    const wrapper = shallowMount(CvSvg, {
      props: { svg: svgFie },
    });

    expect(wrapper.find('svg')).not.toBeNull();
  });

  it('renders the SVG symbol', () => {
    const wrapper = shallowMount(CvSvg, {
      props: { svg: svgSymbol },
    });

    expect(wrapper.find('svg')).not.toBeNull();
  });

  it('renders the SVG inline', () => {
    const wrapper = shallowMount(CvSvg, {
      props: { svg: svgInline },
    });

    expect(wrapper.find('svg')).not.toBeNull();
  });

  it('validates icon', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    const validator = CvSvg.props.svg.validator;
    expect(validator(fakeComponentVue)).toBe(true);
    expect(spy).not.toBeCalled();

    expect(validator(notAComponent)).toBe(false);
    expect(spy).toBeCalledTimes(1);

    spy.mockRestore(); // Remove mock
  });
});
