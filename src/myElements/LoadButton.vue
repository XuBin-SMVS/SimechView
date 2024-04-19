<template>

<!--v-if= "loading"-->

    <div>
      <el-button v-if="!loading"
          style="width: 300px;"
          :type = "loaded ? 'primary' : 'info'" 
          class="button-class" 
          @click = "startLoading">
      Click Me to try it for a while
      </el-button>
      <el-progress  v-if="loading"
          :text-inside="true"   
          :stroke-width="36" 
          :percentage = "percentage"
          style="width: 300px;">    
      </el-progress>  
    </div> 

 
</template>


<script setup name="myButton">

  import {ref} from "vue"
  

  let [loading, loaded] = [ref(false), ref(false)]
  let percentage = ref(0)

  function startLoading(){
    loading.value = true
    setTimeout(()=>{
      setTimeout(progressGo,100)
    })
  }

  function  progressGo() {
    percentage.value += 1
    if(percentage.value<=99 && !loaded.value) {setTimeout(progressGo, percentage.value*2)} 
    else{ 
      loading.value = false
      loaded.value = true
      percentage.value=0
    }
  }

 
        

</script>

<style scoped>
.demo-progress .el-progress--line {
  /* margin-bottom: 15px; */
  max-width: 600px;
 }

 :deep(.el-progress-bar__outer) {
   border-radius: 10px;
   /* background-color: rgba(255,255,255, 100);  */
   
  
   /* color: blue;   */
}

:deep(.el-progress-bar__inner){
   border-radius:10px;

   /* color: blue;   */
}

:deep(.el-button){
   border-radius:10px;

   /* color: blue;   */
}
/* .button-class{
  width: 300px;
  height: 40px;
  border-radius: 10px;
  position: absolute;
  z-index: 2
} */
</style>