// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: true,
    tooling: true,
  },
  dirs: {
    src: [
      'playground',
      'docs',
    ],
  },
})
  .append(
    {
      ignores: [
        'public/**',
        'node_modules/**',
        'assets/**',
      ],
    },
    {
      files: ['**/*.vue'],
      rules: {
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
      },
    },
  )
