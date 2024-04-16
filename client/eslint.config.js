// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    // We can add or overwrite rules here:
    {
        rules: {
            '@typescript-eslint/ban-ts-comment': "off"
        }
    }
);