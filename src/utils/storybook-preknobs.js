import consts from './storybook-consts';
import { selectV2 } from '@storybook/addon-knobs/vue';

const parsePreKnobs = (kinds, preKnobs, kind) => {
  return () => {
    const _knobs = {};

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

      if (!_knobs[_preKnob.group]) {
        _knobs[_preKnob.group] = '';
      }

      if (_preKnob.value) {
        _knobs[_preKnob.group] += _preKnob.value(
          _preKnob.type(..._preKnob.config)
        );
      } else {
        _knobs[_preKnob.group] = _preKnob.type(..._preKnob.config);
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
