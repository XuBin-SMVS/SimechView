

import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

import viteBaseConfig from "./vite.base.config"
import viteDevConfig from  "./vite.dev.config"
import viteProdConfig from "./vite.prod.config"


const envResolver = {
  "build" : ()=> {
    console.log("生产环境");        
    return {...viteBaseConfig, ...viteProdConfig}
  },
  "serve": ()=>{
    console.log("开发环境", {...viteBaseConfig});   
    return {...viteBaseConfig, ...viteDevConfig}
  }
}

export default defineConfig(({command, mode})=>{

  // console.log("process ", process.env)
  return envResolver[command]()
})