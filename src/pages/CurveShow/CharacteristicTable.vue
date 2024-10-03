<template>
  <div id="table" >
    <slot></slot>
    <table  class="table table-bordered border-primary-subtle table-sm">      <!-- table-bordered-->
      <thead class="text-center table-secondary">
        <tr class="">
          <th scope="col"  class=""></th>
          <th scope="col" class="">{{title}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description</th>
          <th scope="col" class="">A</th>
          <th scope="col" class="">B</th>
          <th scope="col" class="">C</th>
        </tr>
      </thead>
      <tbody class="border-primary-subtle">
        <template v-if="title">
          <tr v-for="(v, i) in characteristicLimits[tableKey1]" :key="tableKey1 + i">    
                <td class="" >{{ v.ItemID }}</td>         <!-- 序号 -->
                <td  class="">{{ v.ItemName }}</td>                                 <!-- 描述 -->
                <td class=""  v-bind:class='{"table-danger":!outOfTolerance[tableKey1][i][0]}'  @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                     {{ testValue[tableKey1][i][0] }}               <!-- A相值  v-bind:class="{ isError: !judge[i][0] }"-->
                </td>
                <td class=""  v-bind:class='{"table-danger":!outOfTolerance[tableKey1][i][1]}'  @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                    {{ testValue[tableKey1][i][1] }}               <!-- B相值  v-bind:class="{ isError: !judge[i][1] }"-->
                </td>
                <td class=""  v-bind:class='{"table-danger":!outOfTolerance[tableKey1][i][2]}'  @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                    {{ testValue[tableKey1][i][2] }}                <!-- C相值 v-bind:class="{ isError: !judge[i][2] }" -->
                </td>
                <div  class="hover_con"  style="display:none" > min: <strong>: {{outOfTolerance[tableKey1][i][3]}}</strong> max: <strong>: {{outOfTolerance[tableKey1][i][4]}}</strong></div> 
          </tr>
          <!-- <tr ><td colspan="5" style = "height : 5px"><hr style="height:3px;border:none;border-top:3px double red;" /> </td></tr> -->
          <tr><td colspan="5" style = "background-color: skyblue; font-size: 12px; text-align: center; font-weight: bold; padding:1px auto; "> Interval Time : {{intervalTime}} s</td></tr>
          <tr v-for="(v, i) in characteristicLimits[tableKey2]" :key="tableKey2 + i">
                <td class="" >{{ v.ItemID }}</td>         <!-- 序号 -->
                <td  class="">{{ v.ItemName }}</td>                                 <!-- 描述 -->
                <td class=""  v-bind:class='{"table-danger":!outOfTolerance[tableKey2][i][0]}'  @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                    {{ testValue[tableKey2][i][0] }}               <!-- A相值  v-bind:class="{ isError: !judge[i][0] }"-->
                </td>
                <td class=""   v-bind:class='{"table-danger":!outOfTolerance[tableKey2][i][1]}' @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                    {{ testValue[tableKey2][i][1] }}               <!-- B相值  v-bind:class="{ isError: !judge[i][1] }"-->
                </td>
                <td  class=""  v-bind:class='{"table-danger":!outOfTolerance[tableKey2][i][2]}' @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                   {{ testValue[tableKey2][i][2] }}                <!-- C相值 v-bind:class="{ isError: !judge[i][2] }" -->
                </td>
                <div  class="hover_con"  style="display:none"> min: <strong>{{outOfTolerance[tableKey2][i][3]}}</strong> max: <strong>{{outOfTolerance[tableKey2][i][4]}}</strong></div> 
         </tr> 

        </template>
      </tbody>
    </table>
  </div>
</template>


                            <!-- <div  @mouseenter="enter" @mouseleave="leave" @mousemove="move"> 鼠标触碰元素 </div>                      
                              <div v-show="popUpShow" class="hover_con" :style="positionStyle">
                              悬浮框
                              </div> -->




<script setup lang='ts'>
import { watch} from 'vue';
import { storeToRefs } from 'pinia';
/* // import { useRoute, useRouter } from 'vue-router'; */
import {useTestInfo }from "@/stores/useTestInfo_Options"


let inLetValue = defineProps({
        // 写法一
        title: String,
        intervalTime: Number,
        testValue : Object
    })
const testInfo = useTestInfo()

const {selectedSingleOperation, characteristicLimits} = storeToRefs(testInfo)
let [tableKey1, tableKey2] = Object.keys(characteristicLimits.value)

let outOfTolerance = {}

watch(selectedSingleOperation, ()=>{
          // console.log("value changed!")
          var t1 = [] , t2 = []
          // if (selectedSingleOperation.value.name.split(',')[0] === "CB_AR") { 
          //     testValue               
          // }
          tableKey1 = Object.keys(characteristicLimits.value)[0]
          tableKey2 = Object.keys(characteristicLimits.value)[1]
          characteristicLimits.value[tableKey1].forEach((v,i)=>{
              var a = []
              inLetValue.testValue[tableKey1][i].forEach((vv)=>{
                vv <= v.Max && vv >= v.Min ? a.push(true) : a.push(false)
              })
              a.push(v.Min,v.Max)
              t1.push(a)
          })
          characteristicLimits.value[tableKey2].forEach((v,i)=>{
              var b = []
              inLetValue.testValue[tableKey2][i].forEach((vv)=>{
                vv<=v.Max && vv>=v.Min ? b.push(true) : b.push(false)
              })
              b.push(v.Min,v.Max)
              t2.push(b)
          })

          outOfTolerance[tableKey1] = t1
          outOfTolerance[tableKey2] = t2 
 
}, {deep:true, immediate:true})





function enter(event) {
        
        // this.popUpShow = true
        event.target.parentNode.getElementsByTagName("div")[0].style.display = "inline"
        //; console.log(event)
      };

function leave(event) {
        // this.popUpShow = false
        // console.log(event)
        event.target.parentNode.getElementsByTagName("div")[0].style.display = "none"
      };

function move(event) {

        // console.log(event)
        let winY = event.view.scrollY
        let winX = event.view.scrollX
        let x = event.pageX + 15 - winX + 'px'
        let y = event.pageY + 10 - winY + 'px'

        event.target.parentNode.getElementsByTagName("div")[0].style.left = x
        event.target.parentNode.getElementsByTagName("div")[0].style.top = y

      }

</script>

<!-- <script>
 


watch(
  () => obj.count,
  (count) => {
    console.log(`Count is: ${count}`)
  }
)



export default {
    name: "CharacteristicTable",
    data() {
        return {
          tableKey1:"",   //上半部表格， CB Closing
          tableKey2:"",   // 下半部表格 CB Opening
          outOfTolerance:{},
       
        };
    },
    props:['CharacteristicsLimits','Characteristics','title','intervalTime'],
    watch:{
      CharacteristicsLimits:{
        immediate:true,
        handler(val){
          this.tableKey1 = Object.keys(val)[0]
          this.tableKey2 = Object.keys(val)[1]
          var t1 = [] , t2 = []
          this.CharacteristicsLimits[this.tableKey1].forEach((v,i)=>{
              var a = []
              this.Characteristics[this.tableKey1][i].forEach((vv)=>{
                vv<=v.Max && vv>=v.Min ? a.push(true) : a.push(false)
              })
              a.push(v.Min,v.Max)
              t1.push(a)
          })
          this.CharacteristicsLimits[this.tableKey2].forEach((v,i)=>{
              var b = []
              this.Characteristics[this.tableKey2][i].forEach((vv)=>{
                vv<=v.Max && vv>=v.Min ? b.push(true) : b.push(false)
              })
              b.push(v.Min,v.Max)
              t2.push(b)
          })

          this.outOfTolerance[this.tableKey1] = t1
          this.outOfTolerance[this.tableKey2] = t2 
 
        }
      }
    },

    methods:{
      enter(event) {
        // this.popUpShow = true
        event.target.parentNode.getElementsByTagName("div")[0].style.display = "inline"
        // console.log(event)
      },
      leave(event) {
        // this.popUpShow = false
        event.target.parentNode.getElementsByTagName("div")[0].style.display = "none"
      },
      move(event) {
        let winY = event.view.scrollY
        let winX = event.view.scrollX
        const x = event.pageX + 15 - winX + 'px'
        const y = event.pageY + 10 - winY + 'px'

        event.target.parentNode.getElementsByTagName("div")[0].style.left = x
        event.target.parentNode.getElementsByTagName("div")[0].style.top = y

      }
    }
};
</script> -->

<style scoped>
   
    table td {
        vertical-align: middle;
        color: rgb(84, 64, 170);
        padding: 1px 4px;
        font-size: 12px;
        cursor: pointer;
        line-height: 16px;     

    } 
    .hover_con{
      position:fixed;      
      max-width: 220px;
      padding: 2px;
      /* border: 1px solid #666; */
      background: rgb(175, 241, 113);
      font-size: 12px;     
      
      
    }

</style>