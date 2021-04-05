export const storySourceCode = (
  templateSource,
  args,
  replacing = 'v-bind="args"'
) => {
  const propToSource = (key, val) => {
    if (key.startsWith('slotArgs.')) return '';

    const type = typeof val;
    switch (type) {
      case 'boolean':
        return val ? key : '';
      case 'string':
        return `${key}="${val}"`;
      default:
        return `:${key}="${val}"`;
    }
  };

  const argsKeys = args ? Object.keys(args) : [];
  return templateSource.replace(
    replacing,
    argsKeys
      .map(key => propToSource(key, args[key]))
      .filter(item => item !== '')
      .join(' ')
  );
};

export const storyParametersObject = (
  parameters,
  templateSource,
  args,
  replacing = 'v-bind="args"'
) => {
  const code = storySourceCode(templateSource, args, replacing);

  if (!parameters) {
    parameters = { docs: { source: { code } } };
  } else {
    if (!parameters.docs) {
      parameters.docs = { source: { code } };
    } else {
      if (!parameters.docs.source) {
        parameters.docs.source = { code };
      } else {
        parameters.docs.source.code = code;
      }
    }
  }
  return parameters;
};
