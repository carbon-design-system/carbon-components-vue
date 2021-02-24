export const splitSlotArgs = argsIn => {
  const keys = Object.keys(argsIn);
  const slotArgs = {};
  const args = {};
  keys.forEach(key => {
    if (key.startsWith('slotArgs.')) {
      slotArgs[key.substr(9)] = argsIn[key];
    } else {
      args[key] = argsIn[key];
    }
  });

  return { args, slotArgs };
};
