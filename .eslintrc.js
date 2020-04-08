/** @format */

module.exports = {
    ignorePatterns: ['build/', 'dist2/*', 'node_modules/'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
    ],

    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 2019,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module', //script 或者 module
    },
    env: {
        node: true,
        browser: true,
        commonjs: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        'prettier',
        // "react-hooks"
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        // React: false,
        // ReactDOM: false
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    rules: {
        // 这里填入你的项目需要的个性化配置，比如：
        'no-debugger': 'error',
        // // @fixable 一个缩进必须用两个空格替代
        semi: ['error', 'never'],
        'no-console': 'off',
        'no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'none',
                caughtErrors: 'none',
            },
        ],
        'max-nested-callbacks': 'off',
        'react/no-children-prop': 'off',
        'typescript/member-ordering': 'off',
        'typescript/member-delimiter-style': 'off',
        'react/jsx-indent-props': 'off',
        'react/no-did-update-set-state': 'off',
        // "react-hooks/rules-of-hooks": "error",
        // "react-hooks/exhaustive-deps": "warn",
        indent: [
            'off',
            2,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true,
            },
        ],
    },
}
