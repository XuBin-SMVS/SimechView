

import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

import viteBaseConfig from "./src/api/vite.base.config"
import viteDevConfig from  "./src/api/vite.dev.config"
import viteProdConfig from "./src/api/vite.prod.config"

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },

// })

const envResolver = {
  "build" : ()=> {
    console.log("生产环境");        
    return {...viteBaseConfig, ...viteProdConfig}
  },
  "serve": ()=>{
    console.log("开发环境");   
    return {...viteBaseConfig, ...viteDevConfig}
  }
}

export default defineConfig(({command, mode})=>{

  // console.log("process ", process.env)
  return envResolver[command]()
})