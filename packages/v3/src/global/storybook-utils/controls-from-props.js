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
  if (typeOfProp === 'object') {
    if (prop.type) {
      control.type = functionToControlType(prop.type);
    } else {
      control.type = baseTypeToControlType(typeof prop.default);
    }
    if (prop.default) {
      control.default = prop.default;
    } else {
      control.default = prop.type();
    }
  } else {
    if (typeOfProp === 'function') {
      control.type = functionToControlType(prop);
      control.default = prop();
    } else {
      // base type
      control.type = baseTypeToControlType(typeOfProp);
      control.default = prop;
    }
  }

  return { control };
};

/**
 * When declaring props in another file storybook/docgen does not understand the type.
 * This function returns a storybook control selection for each prop
 */
export const storybookControlsFromProps = commonProps => {
  const controls = {};

  for (let key of Object.keys(commonProps)) {
    const prop = commonProps[key];

    try {
      const type = storybookType(prop);

      controls[key] = type;
    } catch {
      // Type not added here yet.
      controls[key] = { control: { type: 'text', default: '' } };
    }
  }

  return controls;
};
