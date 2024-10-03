<template>
    <div >
        <div id = "tableList">
            <p class="head"  v-html = "selectedSingleOperation.name"></p>
            <CharacteristicTable style="overflow: visible;"
                v-for = "(v,i) in tableQuantity" 
                :key = "i" 
                :title = "v" 
                :intervalTime = "intervalTime[i]"      
                :testValue = "testValue(i)"   
                
            >
            <div v-if="i>0">
                <hr style="height:1px;border:none;border-top:3px double red;" /> 
                <p  class="btwTable"> Auto Reclosing Operation: interval time 0.3s </p>
            </div>
            </CharacteristicTable> 
        </div>
    </div>
</template>


 <!-- :CharacteristicsLimits = 'CharacteristicsLimits' 
      :Characteristics = 'sendTestValue(i)' 
        'tableQuantity.length === 1 ? intervalTime[i] : intervalTime[Number(!i)]'
        :intervalTime = intervalTime(i)
 -->

<script setup lang='ts'>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { storeToRefs } from 'pinia';
    /* // import { useRoute, useRouter } from 'vue-router'; */
    import CharacteristicTable from "./CharacteristicTable.vue"
    import  {useTestInfo} from "@/stores/useTestInfo_Options"


    const testInfo = useTestInfo()
    const {selectedGroup, selectedSingleOperation} = storeToRefs(testInfo)
    const intervalTime : number[]= reactive<number[]>([selectedGroup.value.process.Interval2, selectedGroup.value.process.Interval1])
    const tableQuantity = computed(()=>{
                
                if(selectedSingleOperation.value.name){    
                let op = selectedSingleOperation.value.name.split(',')[0]
                return (op === "CB_AR") ? ["CB_C_O","CB_CO"] : [op]} else{
                    return []
                }                    
          })
    const testValue = computed(()=>(v:number)=>{
        if (selectedSingleOperation.value.name.split(',')[0] === "CB_AR") {
            return selectedSingleOperation.value.testValue["Cycle"+ (v+1)]
        } 
        return selectedSingleOperation.value.testValue

    })

    // const intervalTime = computed(()=>(item:number)=>{
    //     let j=1, counter = selectedGroupIndex.value + 1  //客户选择了第几个group
    //     let ita = allTestInfo.value.TestProcess[Symbol.iterator]()
    //     while (j) {
    //         // console.log(ita.next().value)
    //         let res = {process:"", group:""}
    //         let singleProcess = ita.next().value  //返回每个process (操作 + 数量)
    //         let g_q = (singleProcess.length - 1) * singleProcess[0]  //计算每u单个process 中包含的group数量 

    //         if(g_q < counter) {         //选择的group 不在这个process中
    //             counter =  counter - g_q           //减去本次porcess 包含的group 数量
    //         } else if (g_q = counter){      //选中的group 是这个process 中的最后一个 操作
    //             res.process = singleProcess
    //             res.group = singleProcess[singleProcess.length-1]
    //             j=0
    //             console.log(res)
    //         } else {                    //选中的group 在这个process中，需要计算是哪一个
    //             res.process = singleProcess
    //             let i = counter % (singleProcess.length-1)
    //             res.group = i===0 ? singleProcess[singleProcess.length] : singleProcess[i]
    //             j=0
    //             console.log(res)
    //         } 

           
    //    }
        
        // return item
         

    // })

    // const showChannelName = computed(()=>{
                
    //      return "机械特性参数" + "&nbsp;&nbsp;" +  selectedSingleOperation.value.name + "&nbsp;&nbsp;" + this.selectedTestValue.CB + "&nbsp;&nbsp;" + this.selectedTestValue.DS + "&nbsp;&nbsp;" + this.selectedTestValue.ES
               
    // })
    


</script>
<!-- <script>
    import CharacteristicTable from "./CharacteristicTable.vue"
    export default {
        name: "ChaTableList",
        components:{
            CharacteristicTable
        },
        props:['selectedTestValue','CharacteristicsLimits','intervalTime'],
        data(){
            return {                
            }
        },
        computed:{
            tableQuantity(){
                if(this.selectedTestValue){
                    // var reg = /(?<=CB.)[C|O|AR]{1,2}/g
                    var op =this.selectedTestValue.Operation        // CB_C,CB_O, CB_CO, CB_AR                    
                    return (op === "CB_AR") ? ["CB_C_O","CB_CO"] : [op]
                }else {return []}                
            },
            showChannelName(){
                if(this.selectedTestValue){
                    return "机械特性参数" + "&nbsp;&nbsp;" + this.selectedTestValue.Operation + "&nbsp;&nbsp;" + this.selectedTestValue.CB + "&nbsp;&nbsp;" + this.selectedTestValue.DS + "&nbsp;&nbsp;" + this.selectedTestValue.ES
                } else{ return ""} 
            }
        },
        methods: {
          sendTestValue(i) {
            var val = {}
            val = this.tableQuantity.length > 1 ? this.selectedTestValue.TestValues["Cycle"+(i+1)] : this.selectedTestValue.TestValues
            return val
          },
   
        },
    }
</script> -->

<style scoped>
     .head {
        width: 300px;
        margin: 3px 0 0 3px;
        font-weight: 600;  
        padding: 3px;
     }

    #tableList{

        margin-top: 0px;
        padding-left:5px;
        padding-right: 5px;

        vertical-align: top;
        width: 100%;
        height: 875px;
        /* @apply h-4xl; */
 
        background-color: rgb(233, 240, 240);
        overflow: hidden;
    }
    .btwTable{
        font-size: 12px;
        margin:0 2px;
        text-align: center;
        /* background-color: aqua; */

    }
    .btwTable, hr{
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        font-size: 10px;
        margin-bottom: 2px;
        /* background-color:darkslategrey ; */
    }


</style>