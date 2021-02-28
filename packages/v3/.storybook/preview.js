// export const parameters = {
//   does not really work for Vue as it adds onClick as a property
//   actions: { argTypesRegex: '^on[A-Z].*' },
//   actions: { argTypesRegex: '^(v-on:)|(@)[a-zA-Z].*' },
// };
import './_styles.scss';

const decorators = [
  story => ({
    components: { story },
    template: '<div class="cv-vue-3"><story /></div>',
  }),
];

const parameters = {
  controls: { expanded: true, hideNoControlsWarning: true },
};

export { decorators, parameters };
