module.exports = {
  root: true,
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-config-property-sort-order-smacss',
  ],
  rules: {
    'selector-max-type': 0,
    'property-no-vendor-prefix': true,
    'max-nesting-depth': 4,
    'selector-max-compound-selectors': 4,
    'color-named': 'never',
    'number-leading-zero': null,
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        message:
          "should match Harry Roberts'' style BEM block[__element][--modifier]",
      },
    ],
    indentation: 2,

    'order/properties-alphabetical-order': null,
    //  The following
    'declaration-block-semicolon-newline-after': 'always-multi-line',
  },
};
