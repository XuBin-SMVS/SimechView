<template>

  <el-row class="divide-y-4" :gutter="10" justify="center">
    <el-col :span="8">
      <el-button 
        size="large"  type="primary"
        :disabled="!dokuNumber"
        @click="pageSelect('curveShow')">
         Cureve Analyzing
      </el-button>

      <el-button size="large"> Parameter Analyzing</el-button>      
    
    </el-col>
    <el-col :span="10" >
      
        <el-select v-model="year"  placeholder="Select Year"  size="large"  style="width: 150px ; margin-right: 10px;"  >
            <el-option v-for="(item, i) in yearList"  :key = "i"  :value = "item" />
        </el-select>

        <el-select  v-model="test"  placeholder="Select Doku Number"  size="large"  style="width: 200px; margin-right: 20px;" >
            <el-option v-for="doku in dokuList"  :key="doku.dokuno"  :value = "doku.dokuno">
              <el-space wrap :size="30">
                <span>{{ doku.dokuno }}</span>
                <span> {{ doku.prod }}</span>
                <span>{{ doku.typical }}</span>
              </el-space>

            </el-option>
           
        </el-select>

        <el-button :disabled = "test === dokuNumber"  type="primary" @click="loadTestInfo">Primary</el-button>

  </el-col>

  </el-row>

  
</template>
  
<script setup lang="ts" name="ReqTestInfo">

  import {ref, onMounted, watch} from 'vue'
  import {storeToRefs} from 'pinia'
  import {useTestInfo} from "@/stores/useTestInfo_Options"
  import { type AllAvaliableTestInfo} from '../types/index'


  const testInfo = useTestInfo()

  const {dokuNumber, arrangedDokuList} = storeToRefs(testInfo)
  
  const year = ref<string>('')
  const test = ref<string>('')

  defineProps(['pageSelect'])

     
  let yearList = ref <string[]>([])  //['2022','2023','2024']
  let dokuList = ref <AllAvaliableTestInfo>()  //["23-1000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;","23-088&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8DJH&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L2 500"]

  watch(arrangedDokuList, ()=>{
    yearList.value = Object.keys(arrangedDokuList.value)     
  },{deep:true})

  watch(year,()=>{         
      dokuList.value = arrangedDokuList.value[year.value]  
      // test.value = ''  
  })

  // testInfo.$subscribe()

  onMounted(()=>{
      testInfo.getAllAvaliableTestInfo()      
      // console.log(testInfo.groups)
  })

  function loadTestInfo(){
    // console.log(`year.value = ${year.value}, test.value = ${test.value}, type of year.value is ${typeof year.value}, type of year.value is ${typeof test.value}`)
      console.log(testInfo.groups)
      dokuNumber.value = test.value
      testInfo.loadTestInfo()
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

.ep-bg-purple {
    background: #d3dce6;
  }
  .ep-bg-purple-light {
    background: #e5e9f2;
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
