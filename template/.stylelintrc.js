module.exports = {
  'extends': 'stylelint-config-recommended',
  'rules': {
    'at-rule-no-unknown': [ true, {
      'ignoreAtRules': [
        'extends', 'function', 'return', 'if', 'else'
      ]
    }],
    'number-leading-zero': 'always',
    'block-no-empty': null,
    'unit-whitelist': ['em', 'rem', 'vh', 'vw', '%']
  }
}
