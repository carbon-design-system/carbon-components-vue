import consts from './storybook-consts';
import { select } from '@storybook/addon-knobs/vue';

const parsePreKnobs = (kinds, preKnobs, kind) => {
  return () => {
    const _knobs = { group: [], data: {}, raw: {} };

    if (kind === undefined) {
      if (kinds && kinds.options) {
        const _kind = select(
          'kind',
          kinds.options,
          kinds.default,
          consts.CONFIG
        );
        if (_kind.length) {
          _knobs.kind = ` kind="${_kind}"`;
        } else {
          _knobs.kind = '';
        }
      }
    } else {
      if (kind.length) {
        _knobs.kind = `  kind="${kind}"`;
      } else {
        _knobs.kind = '';
      }
    }

    const dotSync = preKnobs.dotSync;
    const doDotSync = dotSync ? dotSync.type(...dotSync.config) : false;

    for (let key in preKnobs) {
      const _preKnob = preKnobs[key];

      if (!_knobs.group[_preKnob.group]) {
        _knobs.group[_preKnob.group] = '';
      }

      const val = _preKnob.type(..._preKnob.config);
      if (_preKnob.group.length && _preKnob.key !== 'dotSync') {
        if (_preKnob.value) {
          _knobs.group[_preKnob.group] += _preKnob.value(val, doDotSync);
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
