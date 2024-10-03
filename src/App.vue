<template>
  <div >
    <el-container flex="row" class="container">
          <el-header >            
              <ReqTestInfo  :pageSelect = "pageSelect"/>
          </el-header>   

          <el-divider class="my-2 " ></el-divider>
          
          <el-container >
              <el-main class = "mainContentsArea"> 

                <Router-view ></Router-view>
              
              </el-main>
          </el-container>          

    </el-container>
  </div>
  </template>
  
  <script setup lang="ts" name="App">    
      import ReqTestInfo from "@/components/ReqTestInfo.vue"

      import {RouterLink, RouterView, useRouter} from 'vue-router'

      import {type TabsPaneContext} from 'element-plus'
      import CurveShow from "./pages/CurveShow/CurveShow.vue";

      const router = useRouter()

      function pageSelect(a : string){
        // console.log(a)        
        
        router.push({
              name: a as string,            
  
        })
      
    }

         
   

  </script>
  
  <style scoped >
  .mainContentsArea{
    @apply h-4xl; 
    padding: 0px !important;
  }
  /* .tab-style {
    font-size: 20px;
  }
   */
  
  </style>