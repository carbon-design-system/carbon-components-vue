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

export default {
  aFeatureFlag: false,
};
