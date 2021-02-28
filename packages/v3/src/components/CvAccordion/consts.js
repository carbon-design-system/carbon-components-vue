export const alignConsts = [null, 'start', 'end', ''];
alignConsts.$labels = {
  'Not supplied': 0,
  Start: 1,
  End: 2,
  'Empty string': 3,
};
export const sizeConsts = [null, 'sm', 'xl', ''];
sizeConsts.$labels = {
  'Not supplied': 0,
  'Small (sm)': 1,
  'Large (xl)': 2,
  'Empty string': 3,
};

const CvAccordionConsts = { alignConsts, sizeConsts };
export default CvAccordionConsts;
