export const splitSlotArgs = (argsIn = {}, slotArgKeys) => {
  const keys = Object.keys(argsIn);
  const slotArgs = {};
  const args = {};
  keys.forEach(key => {
    if (slotArgKeys.includes(key)) {
      slotArgs[key] = argsIn[key];
    } else {
      args[key] = argsIn[key];
    }
  });

  return { args, slotArgs };
};
