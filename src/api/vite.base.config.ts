import {defineConfig} from "vite"
import { fileURLToPath, URL } from 'node:url'
import vue from "@vitejs/plugin-vue"
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
    plugins: [
      vue(),
      VueSetupExtend()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    optimizeDeps:{
        exclude:[]
    }
})