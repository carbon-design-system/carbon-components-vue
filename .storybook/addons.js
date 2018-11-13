import '@storybook/addon-knobs/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-storysource/register';
import '@storybook/addon-notes/register';
import '@storybook/addon-options/register';

// needs 3.4
// import { configure, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
//
// const newViewports = {
//   kindleFire2: {
//     name: 'Kindle Fire 2',
//     styles: {
//       width: '600px',
//       height: '963px'
//     }
//   },
//   kindleFireHD: {
//     name: 'Kindle Fire HD',
//     styles: {
//       width: '533px',
//       height: '801px'
//     }
//   }
// };
//
// console.dir(configure);
//
// configure({
//   viewports: {
//     ...INITIAL_VIEWPORTS,
//     ...newViewports
//   }
// });
