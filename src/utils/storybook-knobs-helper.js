import consts from './storybook-consts';
import { selectV2 } from '@storybook/addon-knobs/vue';

const parsePreKnobs = (kinds, preKnobs, kind) => {
  return () => {
    const _knobs = { group: [], data: {}, raw: {} };

    if (kind === undefined) {
      if (kinds && kinds.options) {
        _knobs.kind = ` kind="${selectV2(
          'kind',
          kinds.options,
          kinds.default,
          consts.CONFIG
        )}"`;
      }
    } else {
      _knobs.kind = `  kind="${kind}"`;
    }
    for (let key in preKnobs) {
      const _preKnob = preKnobs[key];

      if (!_knobs.group[_preKnob.group]) {
        _knobs.group[_preKnob.group] = '';
      }

      const val = _preKnob.type(..._preKnob.config);
      if (_preKnob.group.length) {
        if (_preKnob.value) {
          _knobs.group[_preKnob.group] += _preKnob.value(val);
        } else {
          _knobs.group[_preKnob.group] += val;
        }
      }
      _knobs.raw[key] = val;

      if (_preKnob.data) {
        _preKnob.data(_knobs.data, key, val);
      }
    }
    return _knobs;
  };
};

const getStorySet = (kinds, preKnobs) => {
  const storySet = [{ name: 'All', knobs: parsePreKnobs(kinds, preKnobs) }];

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
