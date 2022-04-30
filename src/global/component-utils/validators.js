const error = message => console.error(`[@carbon/vue] ${message}`);

export const includesOrError = (
  haystack,
  componentName,
  propName
) => needle => {
  if (!haystack.includes(needle)) {
    error(
      `Invalid ${componentName} ${propName} specified "${needle}". Valid values are: ${JSON.stringify(
        haystack
      )}`
    );
  }

  return true;
};
