const validSmall = Array(5)
  .fill(0)
  .map((val, index) => index);
const validMedium = Array(9)
  .fill(0)
  .map((val, index) => index);
const validLarge = Array(17)
  .fill(0)
  .map((val, index) => index);

/**
 * Check the breakpoint property
 * @param {string} breakPoint - valid breakpoint
 * @param value - property value
 * @returns {boolean}
 */
function columnValidator(breakPoint, value) {
  if (typeof value === 'number') {
    switch (breakPoint) {
      case 'sm':
        return validSmall.includes(value);
      case 'md':
        return validMedium.includes(value);
      case 'lg':
      case 'xlg':
      case 'max':
        return validLarge.includes(value);
      default:
        console.warn(`breakpoint "${breakPoint}" not recognized`);
        return false;
    }
  } else if (typeof value === 'boolean') {
    return true;
  } else if (typeof value === 'object') {
    return (
      'span' in value &&
      typeof value.span === 'number' &&
      validLarge.includes(value.span) &&
      'offset' in value &&
      typeof value.offset === 'number' &&
      validLarge.includes(value.offset)
    );
  }

  return false;
}

export { columnValidator };
