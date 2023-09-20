/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { addons } from '@storybook/addons';
import theme from './theme';
import React from 'react';
import { Form } from '@storybook/components';

addons.setConfig({
  theme,
});

// These options used by storybook often conflict with developer tools,
// conditional panels, or other things that get in the way of our workflow
localStorage.removeItem('@storybook/ui/store');
localStorage.removeItem('storybook-layout');

/**
 * This is a **workaround** due to the lack of a 'button' control in storybook.
 * It relies on postinstall.js defining `window["STORYBOOK_CUSTOM_CONTROLS"]`
 * as a fallback object, at @storybook/components module, when storybook looks
 * for a control type.
 */
window['STORYBOOK_CUSTOM_CONTROLS'] = {
  button({ argType, value, onChange }) {
    return React.createElement(
      Form.Button,
      {
        onClick() {
          value = typeof value === 'number' ? value : 0;
          onChange(value + 1);
        },
      },
      argType.buttonLabel || argType.name
    );
  },
};
