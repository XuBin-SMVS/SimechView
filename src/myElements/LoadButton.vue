<template>

<!--v-if= "loading"
style="width: 300px;"-->

    <div>
      <el-button v-if="!loading"          
          :type = "loaded ? 'primary' : 'info'" 
          class="myButton" 
          @click = "startLoading">
          
      </el-button>
      <el-progress  v-if="loading"
          :text-inside="true"   
          :stroke-width="36"
          :percentage = "percentage"
          class="myButton" 
      >    
      </el-progress>  
    </div> 

 
</template>


<script setup name="myButton">

  import {ref, h} from "vue"
  
  defineProps(['ope', 'num1', 'num2'])

 const buttonText = h('el-icon','DArrowRight')
 console.log(buttonText)
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


 :deep(.el-button) {
   border-radius: 5px;
}

:deep(.el-progress-bar__inner ){
   border-radius:5px;
}

:deep( .el-progress-bar__outer){
   border-radius:5px;
}

.myButton {
  @apply m-0 p-0 w-[calc(100%)];
  /* width: 100%; */
  
}

</style>