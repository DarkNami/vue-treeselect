module.exports = {
  customSyntax: 'postcss-less',
  rules: {
    'declaration-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'rule-empty-line-before': null,
    'value-keyword-case': null, // [ 'lower', { ignoreProperties: [ 'font', 'font-family' ] } ],
    'declaration-block-no-duplicate-properties': [true, { ignore: ['consecutive-duplicates'] }],
    'declaration-property-value-disallowed-list': null,
    'property-disallowed-list': null,
    'no-unknown-animations': null,
    'font-weight-notation': null,
    'no-descending-specificity': null,
    'selector-max-compound-selectors': null,
    'block-no-empty': [true, { ignore: [] }],
    'alpha-value-notation': null,
    'color-function-notation': null,
    'function-no-unknown': null
  },
}
