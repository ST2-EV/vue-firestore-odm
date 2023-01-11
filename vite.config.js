import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "vue-firestore-odm",
      fileName: `vue-firestore-odm`
    },
    rollupOptions: {
      external: ["vue", "firebase/firestore"],
      output: {
        globals: {
          vue: "Vue",
          firebase: "firebase/firestore"
        }
      },
    },
  },
  plugins: [vue()],
})
