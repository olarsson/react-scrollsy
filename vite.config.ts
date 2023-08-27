import path from 'path'
import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'react-scrollsy',
      formats: ['es', 'umd'],
      fileName: (format) => `react-scrollsy.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      }
    }
  },
  plugins: [
    peerDepsExternal(),
    // react(),
    dts({
      insertTypesEntry: true,
    })
  ],
})
