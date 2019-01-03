import consts from './storybook-consts';
import { select } from '@storybook/addon-knobs/vue';
import { withKnobsOptions } from '@storybook/addon-knobs';

const parsePreKnobs = (kinds, preKnobs, kind, minimal) => {
  return () => {
    const knobs = { group: [], data: {}, raw: {}, props: {} };

    if (kind === undefined) {
      if (kinds && kinds.options) {
        const _kind = select(
          'kind',
          kinds.options,
          kinds.default,
          consts.CONFIG
        );
        if (_kind.length) {
          knobs.kind = ` kind="${_kind}"`;
        } else {
          knobs.kind = '';
        }
      }
    } else {
      if (kind.length) {
        knobs.kind = `  kind="${kind}"`;
      } else {
        knobs.kind = '';
      }
    }

    // const dotSync = preKnobs.dotSync;
    // const doDotSync = dotSync ? dotSync.type(...dotSync.config) : false;

    for (let key in preKnobs) {
      const preKnob = preKnobs[key];

      if (!knobs.group[preKnob.group]) {
        knobs.group[preKnob.group] = '';
      }

      let thingType; // What type of thing is it.
      if (preKnob.prop) {
        thingType = 'prop';
      }
      if (!thingType && preKnob.slot) {
        thingType = 'slot';
      }

      // if (!(preKnob.component[thingType].default !== undefined && minimal)) {
      let prefix = preKnob.inline ? ' ' : '\n  ';

      switch (thingType) {
        case 'prop':
          if (!(preKnob.prop.optional && minimal)) {
            if (preKnob.value) {
              knobs.group[preKnob.group] += `${prefix}:${preKnob.value}`;
            } else {
              knobs.group[preKnob.group] += `${prefix}:${
                preKnob.prop.name
              }="${key}"`;
            }
            knobs.props[key] = {
              type: preKnob.prop.type,
              default: preKnob.type(...preKnob.config),
            };
            // console.dir(knobs.props[key]);
          }
          break;
        case 'slot':
          if (!(preKnob.slot.optional && minimal)) {
            if (preKnob.slot.name && preKnob.slot.name.length) {
              knobs.group[preKnob.group] += `\n  <template slot="${
                preKnob.slot.name
              }">    ${preKnob.slot.value}</template>`;
            } else {
              knobs.group[preKnob.group] += `\n  ${preKnob.slot.value}`;
            }
          }
          break;
        default: // ignore
      }

      // TODO: data, vmodel and sync
      // if (preKnob.data) {
      //   preKnob.data(knobs.data, key, val);
      // }
      // }
    }

    return knobs;
  };
};

const getStorySet = (kinds, preKnobs) => {
  const storySet = [{ name: 'All', knobs: parsePreKnobs(kinds, preKnobs) }];
  storySet.push({
    name: 'Minimal',
    knobs: parsePreKnobs(kinds, preKnobs, undefined, true),
  });

  if (kinds && kinds.options) {
    for (const key in kinds.options) {
      storySet.push({
        name: key,
        knobs: parsePreKnobs(kinds, preKnobs, kinds.options[key]),
      });
    }
  }
  return storySet;
};

export default { getStorySet };
