export const alignConsts = ['', 'start', 'end'];
alignConsts.$labels = {
  'Default (end)': 0,
  'Start (start)': 1,
  'End (end)': 2,
};
export const sizeConsts = ['', 'sm', 'md', 'xl'];
sizeConsts.$labels = {
  'Default (md)': 0,
  'Small (sm)': 1,
  'Medium (md)': 2,
  'Extra large (xl)': 3,
};

const CvAccordionConsts = { alignConsts, sizeConsts };
export default CvAccordionConsts;
