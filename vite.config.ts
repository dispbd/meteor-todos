/* eslint-disable import/no-unresolved */
import { meteor } from 'meteor-vite/plugin'
import { defineConfig } from 'vite'

// eslint-disable-next-line import/no-default-export, @typescript-eslint/no-unused-vars
export default defineConfig(async ({ command, mode }) => {
  const { svelte } = await import('@sveltejs/vite-plugin-svelte')
  const { default: twe } = await import('tailwindcss-extend/vite')

  return {
    plugins: [
      // https://github.com/JorgenVatle/meteor-vite
      meteor({
        clientEntry: 'src/client/client.ts',
        stubValidation: {
          ignorePackages: ['fetch'],
          disabled: false,
        },
      }),

      svelte({
        /* Plugin options */
        /* https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md */
        /* https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/inspector.md#plugin-options */
        /* 2024-01: We disabled it as it was causing issues */
        // inspector: true,
        /* Use the following code to disable warnings */
        // onwarn(warning, defaultHandler) {
        //   // handle all other warnings normally
        //   defaultHandler(warning)
        // },
      }),

      twe({
        // required param
        pattern: '**/src/client/css/**',

        // optional params with defaults
        output: 'tailwindcss-extend.ts',
        type: 'module',
      }),
    ],
  }
})
