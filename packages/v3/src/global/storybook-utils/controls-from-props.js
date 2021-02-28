const storybookType = prop => {
  const typeOfProp = typeof prop;

  const functionToControlType = fProp => {
    if (fProp === Boolean) {
      return 'boolean';
    } else if (fProp === String) {
      return 'text';
    } else if (fProp === Number) {
      return 'number';
    } else {
      return 'text';
    }
  };

  const baseTypeToControlType = type => {
    if (type === 'string') {
      return 'text';
    } else {
      return type;
    }
  };

  let control = {};
  let defaultValue;
  if (typeOfProp === 'object') {
    if (prop.type) {
      control.type = functionToControlType(prop.type);
    } else {
      control.type = baseTypeToControlType(typeof prop.default);
    }
    if (prop.default) {
      defaultValue = prop.default;
    } else {
      defaultValue = prop.type();
    }
  } else {
    if (typeOfProp === 'function') {
      control.type = functionToControlType(prop);
      defaultValue = prop();
    } else {
      // base type
      control.type = baseTypeToControlType(typeOfProp);
      defaultValue = prop;
    }
  }

  return { control, defaultValue };
};

/**
 * When declaring props in another file storybook/docgen does not understand the type.
 * This function returns a storybook control selection for each prop
 */
export const storybookControlsFromProps = props => {
  const controls = {};

  for (let key of Object.keys(props)) {
    const prop = props[key];

    try {
      const type = storybookType(prop);

      controls[key] = type;
    } catch {
      // Type not added here yet.
      controls[key] = { control: { type: 'text' }, defaultValue: '' };
    }
  }

  return controls;
};
