import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // treat all tags starting with cds- as custom elements
        isCustomElement: (tag) => tag.startsWith('cds-')
      }
    }
  })],
})
