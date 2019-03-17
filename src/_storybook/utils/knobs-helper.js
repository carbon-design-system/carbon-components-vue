const parsePreKnobs = (preKnobs, includes, excludes, variantExtra) => {
  return () => {
    const knobs = { group: [], data: {}, props: {} };
    const parsePreKnobs = (thePreNobs, override) => {
      for (let key in thePreNobs) {
        const preKnob = thePreNobs[key];

        if (!knobs.group[preKnob.group]) {
          knobs.group[preKnob.group] = '';
        }

        if (!override) {
          // do after creating blank group
          if (excludes && excludes.includes(key)) {
            continue; // skip this item
          }

          if (includes && !includes.includes(key)) {
            continue; // skip this item
          }
        }

        let thingType; // What type of thing is it.
        if (preKnob.prop) {
          thingType = 'prop';
        }
        if (preKnob.sync) {
          thingType = 'sync';
        }
        if (!thingType && preKnob.slot) {
          thingType = 'slot';
        }

        // if (!(preKnob.component[thingType].default !== undefined && minimal)) {
        let prefix = preKnob.inline ? ' ' : '\n  ';
        let value;
        if (thingType && thingType !== 'slot') {
          if (preKnob[thingType].type === Number) {
            if (preKnob[thingType].value) {
              value = preKnob[thingType].value;
            } else {
              value = val => (val === null ? 0 : val);
            }
          } else {
            value = preKnob[thingType].value
              ? preKnob[thingType].value
              : val => val;
          }
        }
        switch (thingType) {
          case 'sync':
            knobs.group[preKnob.group] += `${prefix}:${
              preKnob.sync.name
            }.sync="${key}"`;

            knobs.data[key] = value(preKnob.type(...preKnob.config));
            break;
          case 'prop':
            if (preKnob.group) {
              knobs.group[preKnob.group] += `${prefix}:${
                preKnob.prop.name
              }="${key}"`;
            }
            knobs.props[key] = {
              type: preKnob.prop.type,
              default: value(preKnob.type(...preKnob.config)),
            };
            break;
          case 'slot':
            if (preKnob.slot.name && preKnob.slot.name.length) {
              knobs.group[preKnob.group] += `${prefix}<template slot="${
                preKnob.slot.name
              }">${preKnob.slot.value}</template>`;
            } else {
              knobs.group[preKnob.group] += `${prefix}${preKnob.slot.value}`;
            }
            break;
          default:
            knobs.group[preKnob.group] += `${prefix}${preKnob.value}`;
            break;
        }
      }
    };

    if (variantExtra) {
      parsePreKnobs(variantExtra, true);
    }
    parsePreKnobs(preKnobs);

    return knobs;
  };
};

const getStorySet = (variants, preKnobs) => {
  let storySet = [];

  for (let index in variants) {
    storySet.push({
      name: variants[index].name,
      knobs: parsePreKnobs(
        preKnobs,
        variants[index].includes,
        variants[index].excludes,
        variants[index].extra
      ),
      skip: variants[index].skip,
    });
  }
  return storySet;
};

export default { getStorySet };
