/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    root: true,
    env: {
        node: true
    },
    rules: {
        'prettier/prettier': ['error']
    }
};
