import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'react-scrollsy',
      fileName: (format) => `react-scrollsy.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'utils'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    })
  ],
})
