import './_styles.scss';

const decorators = [
  story => ({
    components: { story },
    template: '<div class="cv-vue-2"><story /></div>',
  }),
];

const parameters = {
  controls: { expanded: true, hideNoControlsWarning: true },
};

export { decorators, parameters };
