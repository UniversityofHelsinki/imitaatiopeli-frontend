import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{
        src: './node_modules/@uh-design-system/component-library/dist/esm/*',
        dest: 'assets/'
      }]
    })
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['lcov', 'text', 'json'],
      reportsDirectory: 'coverage',
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        'vite.config.js',
        'dist/',
      ],
    },
  },
})
