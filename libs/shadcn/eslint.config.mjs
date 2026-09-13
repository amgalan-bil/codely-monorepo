import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    // Flat-config globs are relative to this file, and Nx runs eslint with
    // libs/shadcn as the cwd.
    files: ['src/ui/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}'],
    rules: {
      // shadcn CLI output imports sibling components by alias
      // (@codely/shadcn/ui/button); keeping those imports as-generated is what
      // lets `shadcn add`/`shadcn diff` stay clean.
      '@nx/enforce-module-boundaries': 'off',
    },
  },
];
