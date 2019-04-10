/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains the list of the default values of compile-time feature flags.
 *
 * Build toolchain can replace variable here and/or the references
 * in order to apply non-default values to those feature flags.
 *
 * @example <div v-if="aFeatureFlag">foo</div><div v-else>bar</div>
 * import { aFeatureFlag } from '/path/to/_feagure-flags';
 * ...
 * data() { return { aFeatureFlag } }
 */

/**
 * Breaking changes for next release.
 */
export let breakingChangesX;

/**
 * Next gen of Carbon component design.
 */
export let componentsX;

const defaults = {
  componentsX: true,
  breakingChangesX: false,
};

export const versions = (experimental = true) => {
  const vers = [];
  if (!defaults.componentsX) {
    vers.push({ default: true });

    if (experimental) {
      vers.push({ experimental: true });
    }
  } else {
    vers.push({ experimental: true });
  }
  return vers;
};

export const setVersion = val => {
  if (val && val.experimental) {
    breakingChangesX = true;
    componentsX = true;
  } else {
    componentsX = defaults.componentsX;
    breakingChangesX = defaults.breakingChangesX;
  }
};

setVersion();
