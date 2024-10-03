import {defineConfig} from "vite"
import { fileURLToPath, URL } from 'node:url'
import vue from "@vitejs/plugin-vue"
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
import  ElementPlus from 'unplugin-element-plus/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
    plugins: [
      vue(),
      VueSetupExtend(),
      ElementPlus({useSource: true}),
      WindiCSS()
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
    ],
    css:{
      preprocessorOptions: {
        scss: {
          // additionalData: `@use "@/styles/element/index.scss" as *;`,
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }


    },    

    optimizeDeps:{
        exclude:[]
    }
})