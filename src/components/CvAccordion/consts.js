export const alignConsts = [null, 'start', 'end', ''];
alignConsts.$labels = {
  'Not supplied (end)': 0,
  'Start (start)': 1,
  'End (end)': 2,
  'Empty string (end)': 3,
};
export const sizeConsts = [null, 'sm', 'xl', ''];
sizeConsts.$labels = {
  'Not supplied (md)': 0,
  'Small (sm)': 1,
  'Large (xl)': 2,
  'Empty string (md)': 3,
};

const CvAccordionConsts = { alignConsts, sizeConsts };
export default CvAccordionConsts;
