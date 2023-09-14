module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  rules: {
    'font-family-name-quotes': null,
    'keyframes-name-pattern': null,
    'custom-property-empty-line-before': null,
    'selector-class-pattern': null,
    'no-invalid-position-at-import-rule': null,
    'color-function-notation': null,
    'no-empty-source': null,
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands', 'after-comment'],
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'scss/no-global-function-names': null,
    'scss/at-extend-no-missing-placeholder': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['layer', 'tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
  },
};
