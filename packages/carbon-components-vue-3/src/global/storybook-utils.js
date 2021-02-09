const storybookType = prop => {
  const type = typeof prop === 'function' ? prop : prop.type;

  if (type === Boolean) {
    return 'boolean';
  } else if (type === String) {
    return 'text';
  } else if (type === Number) {
    return 'number';
  }
};

export default function(commonProps) {
  const controls = {};

  console.dir(commonProps);

  for (let key of Object.keys(commonProps)) {
    const prop = commonProps[key];

    const type = storybookType(prop);

    controls[key] = { control: { type } };
    controls[key].control.default = false;
  }

  console.dir(controls);
  return controls;
}
