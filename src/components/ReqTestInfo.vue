<template>

  <el-row >

    <el-col  :span="16">
        <div class="grid-content ep-bg-purple"/>
    </el-col>
    <el-col :span="8">
      <div class="grid-content ep-bg-purple"/></el-col>

  </el-row>

  
</template>

   
<script setup lang="ts" name="ReqTestInfo">

  import {ref, type Ref, reactive, onMounted, watchEffect, watch} from 'vue'
  import {storeToRefs} from 'pinia'
  import {useTestInfo} from "@/stores/useTestInfo_Options"
  import {type TestInfoRecord} from '../types/index'


  const testInfo = useTestInfo()

  const {allTestInfo, dokuNumber, arrangedDokuList} = storeToRefs(testInfo)
  
  const year = ref<string>('')
  const test = ref<string>('')

 
  let yearList = ref <string[]>([])  //['2022','2023','2024']
  let dokuList = ref <string[]>([])  //["23-1000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;","23-088&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8DJH&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L2 500"]

  watchEffect(()=>{           
      console.log(`year.value 的值是"${year.value}",类型是${typeof year.value}`)
      yearList.value = Object.keys(arrangedDokuList.value)      
      if (year.value.length != 0) {        
          let arr = arrangedDokuList.value[yearList.value[Number(year.value)]]
          dokuList.value = arr.map((x:{[key:string]:string})=>{
                                    return x.dokuno + '&nbsp;'.repeat(12-x.dokuno.length) + 
                                    ( x.prod == null ? '' : ('&nbsp;'.repeat(12-x.prod.length) + x.prod))   +
                                    ( x.typical == null ? '' : ('&nbsp;'.repeat(14-x.typical.length) + x.typical ))                         
                            })
      } 
      test.value = ''   
          
  })  

  // testInfo.$subscribe()

  // onMounted(()=>{
  //     testInfo.getAllAvaliableTestInfo()      
  // })

  function loadTestInfo(){
    // console.log(`year.value = ${year.value}, test.value = ${test.value}, type of year.value is ${typeof year.value}, type of year.value is ${typeof test.value}`)
    if(dokuList.value[Number(test.value)]){      
      dokuNumber.value = arrangedDokuList.value[yearList.value[Number(year.value)]][Number(test.value)].dokuno
      testInfo.loadTestInfo()
    }
  }


</script>

<style scoped>
  .gap {
    padding:8px 8px 8px 40px;
    margin:7px 0 -5px 0;
    /* background-color: #337ab7; */
    color: white;
  }

  .el-row {
  height: 100px;  
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px; 
  background-color: --el-color-primary-light-3;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  
}
</style>


<!--  <div class="row">
  <ul class="row nav nav-tabs col-5 fs-6 text-nowrap g-2">
      <li class="nav-item col ">
        <a class="nav-link active" aria-current="page" href="#">Curve Analyzing</a>
      </li>
      <li class="nav-item col">
        <a class="nav-link" href="#">Parameter Analyzing</a>
      </li>
      <li class="nav-item col">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled">Disabled</a>
      </li> 
  </ul>    
  <form class="row  col-7 align-items-center fs-6 g-2">
      <div class="col-3">
          <label class="visually-hidden" for="inlineFormSelectPref">Year of Test</label>
          <select class="form-select" id="inlineFormSelectPref" v-model="year">
              <option selected disabled value="">Test Year</option>
              <option v-for="(v,i) in yearList"  :value="String(i)"> {{v}} </option> 
          </select>
      </div>
      <div class="col-6">
          <label class="visually-hidden" for="inlineFormSelectPref">Doku Number</label>
          <select class="form-select" id="inlineFormSelectPref" v-model="test">
            <option selected disabled value="">DOKU Number</option>
            <option v-for="(v,i) in dokuList" v-html="v" :value="String(i)">  </option> 
          </select>
      </div>
      <div class="col-3" >
        <button type="button" class="btn btn-primary" @click="loadTestInfo" >Get Data</button>
      </div>
  </form>     
</div>   -->
