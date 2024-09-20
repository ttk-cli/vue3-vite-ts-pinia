import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
  {
    rules: {
      'antfu/if-newline': 'off',
      'no-useless-return': 'off',
      'style/quote-props': ['error', 'as-needed'],
      'style/arrow-parens': ['error', 'always'],
      'style/indent': 'off',
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'style/member-delimiter-style': ['error', { multiline: { delimiter: 'none' } }],
      'vue/singleline-html-element-content-newline': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'no-console': 'off',
      'vue/custom-event-name-casing': 'off',
      'vue/html-self-closing': 'off',
      'style/operator-linebreak': 'off',
      'antfu/consistent-list-newline': 'off',
      'ts/no-unused-expressions': 'off',
    },
  },
)
