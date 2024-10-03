<template>

<!--/* @open="handleOpen" */    @open="groupSelected"  -->

  <div >     
    
    <el-menu  class="el-menu-vertical-demo  h-xl" :unique-opened="true" :default-active	="defaultActiveIndex" >
  
      <el-sub-menu 
        v-for="(infoArry, groupIndex) in groups" 
        :index="'case_' + groupIndex "   
        @click.native = "groupSelected($event, groupIndex)"      
      >              
        <template #title>          
          <el-button :type="testRawData[groupIndex].mode ? 'primary':'info'" 
                     :loading="testRawData[groupIndex].groups.length===0 && testRawData[groupIndex].mode > 0 " 
                    style="width: 100%; padding-right: 10px;" >            
            {{ infoArry[0].padEnd(7,'&nbsp;') }} {{ infoArry[1].toString().padStart(5,'&nbsp;') }}
            <el-icon :size="15" style="margin: 0;"><DArrowRight /></el-icon>
            {{ infoArry[2].toString().padEnd(5,'&nbsp;') }}
          </el-button>
        </template>     
        <el-scrollbar class = "myScrollBar"  :style="{ 'height': subMenuHeight(groupIndex)}" > 
         <div v-for="num, operationIndex in infoArry[3]"  
             :index="'operation_'+ operationIndex + '_' + infoArry[0].slice(0,2)  + num"  
             @click.stop ="operationSelected(groupIndex, operationIndex)"
         >
          
              <el-menu-item :index="'Ope_'+ groupIndex + '_' + num.toString()" > 
                  {{ infoArry[0].slice(0,2) }}
                  <el-icon><TopRight /></el-icon>
                  {{ num }}        
              </el-menu-item>  

          </div> 
          
        </el-scrollbar>   
      </el-sub-menu>   
    </el-menu>
  
  </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, h, onMounted, onUpdated } from 'vue'
  import  {useTestInfo} from "@/stores/useTestInfo_Options"
  import {storeToRefs} from "pinia"
  import {type SingleTestProcess} from "@/types/index"


  const testInfo = useTestInfo()
  
  const {groups, testRawData, selectedSingleOperation, operations, selectedGroup, allTestInfo, selectedChannelIndex} = storeToRefs(testInfo)

  // let loading = ref(true)
  let defaultActiveIndex = ref("")
  
  function subMenuHeight(i){
    let itemQuantity = groups.value.length
    let itemCurrentQuantity = groups.value[i][3].length        
    return ((48.25 - 2.5* itemQuantity) > itemCurrentQuantity * 2 ?  (itemCurrentQuantity+0.25) * 2 : (48.25 - 2.5* itemQuantity) )  +"rem"
  }


function  groupSelected(event:MouseEvent, groupIndex:number){     //  groupSelected(case_name:string)  let groupIndex :number =  Number( case_name.split('_')[1])
   
  defaultActiveIndex.value = "case_" + groupIndex 

  if(selectedGroup.value.index != groupIndex){
       
        testInfo.selectedGroup['index'] = groupIndex  //记录当前选择的group的索引



        //获得当前 group的Test Case (根据TestProcess和当前的group)
        let j=true, counter = groupIndex + 1  //客户选择了第几个group
        let ita = allTestInfo.value.TestProcess[Symbol.iterator]()
        while (j) {
            // console.log(ita.next().value)
            // let res = {process:"", group:""}
            let singleProcess : Array <number | SingleTestProcess> = ita.next().value  //返回每个process (操作 + 数量)
            let g_q = (singleProcess.length - 1) * (singleProcess[0] as number)   //计算每u单个process 中包含的Group_Quantity数量 

            if(g_q < counter) {         //选择的group 不在这个process中
                counter =  counter - g_q           //减去本次porcess 包含的group 数量
            } else if (g_q === counter){      //选中的group 是这个process 中的最后一个 操作
                // res.process = singleProcess
                Object.assign(testInfo.selectedGroup.process , singleProcess[singleProcess.length-1] as SingleTestProcess)
                j = false
                // console.log(res)
            } else {                    //选中的group 在这个process中，需要计算是哪一个
                // res.process = singleProcess
                let i = counter % (singleProcess.length-1)
                Object.assign(testInfo.selectedGroup.process, 
                              (i===0 ? (singleProcess[singleProcess.length-1] as SingleTestProcess) : (singleProcess[i] as SingleTestProcess)))
                j = false
                // console.log(res)
            }         
        }

        let mode = event.altKey ? 1:5  //数据请求模式，5：每50次一次记录， 1:每10次一次记录， 0: 记录还未载入  
        groups.value[groupIndex][3] = operations.value(groupIndex,mode)   
        let caseName = testRawData.value[groupIndex].name + '_' +  groupIndex.toString().padStart(2,'0') //例如"CB_C_O_00 "
        
        // console.log("!!!chaTable:", chaTableInfo.value(groupIndex))

        if (testRawData.value[groupIndex].mode != mode) {
          testRawData.value[groupIndex].mode = mode    
          testInfo.loadTDMSData(groupIndex, caseName, mode) 
        }
    }
  }

  function operationSelected( groupIndex:number, operationIndex:number){
    // e.stopPropagation()
    // let caseNumber = Number(e.indexPath[0].split('_')[1]) 
    // let operationNumber = e.indexPath[1].split('_')[1]


    selectedChannelIndex.value = operationIndex
    selectedSingleOperation.value["name"] =  testRawData.value[groupIndex].groups[operationIndex].name
    selectedSingleOperation.value["channels"] = testRawData.value[groupIndex].groups[operationIndex].channels

    

    let ope = selectedSingleOperation.value.name.split(',')   //获得操作的开关名称: CB, DS, ES


    let seq = Number(ope[['CB','DS','ES'].indexOf(ope[0].slice(0,2)) + 1])   //获得相应开关的操作次数 

    //获取当前选择的操作的特性数据
    testInfo.allTestInfo.TestResults.Characteristics[groupIndex].forEach((v)=>{

       if (v[ope[0].slice(0,2)]  === seq) {
        selectedSingleOperation.value.testValue = v.TestValues

       }
    })

    // selectedSingleOperation.value.testValue = testInfo.allTestInfo.TestResults.Characteristics[groupIndex][operationIndex].TestValues

    // let chartInstance = new CharacteristicsCharts(selectedSingleOperation.value)
    // console.log(chartInstance)  


  }

  function stopScrollBarsPropagation(scrollBarList:HTMLCollection){
    for (let item of scrollBarList){
      item.addEventListener('click',(e)=>{
          e.stopPropagation()      
})

} 
  }

  onMounted(()=>{
    let scrollBarList  =document.getElementsByClassName('myScrollBar')
    stopScrollBarsPropagation(scrollBarList)

  })

  onUpdated(()=>{
    let scrollBarList  =document.getElementsByClassName('myScrollBar')
    console.log("Information Updated!")
    // stopScrollBarsPropagation(scrollBarList)

  })

  </script>
   
  <style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    
    // --bg-color: bg-gray-100;
    --active-color: bg-red-100    
  }

  :deep(.el-menu-item) {
    @apply h-8;
    // padding-left: 10px !important;

  }

  
  :deep(.el-sub-menu__title) {
    @apply h-10;
    padding-left: 10px !important;
  }




 
  </style>