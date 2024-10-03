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
          <tr v-for="(v, i) in CharacteristicsLimits[tableKey1]" :key="tableKey1 + i">    
                <td class="" >{{ v.ItemID }}</td>         <!-- 序号 -->
                <td  class="">{{ v.ItemName }}</td>                                 <!-- 描述 -->
                <td class=""  v-bind:class='{"table-danger":!outOfTolerance[tableKey1][i][0]}'  @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                     {{ Characteristics[tableKey1][i][0] }}               <!-- A相值  v-bind:class="{ isError: !judge[i][0] }"-->
                </td>
                <td class=""  v-bind:class='{"table-danger":!outOfTolerance[tableKey1][i][1]}'  @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                    {{ Characteristics[tableKey1][i][1] }}               <!-- B相值  v-bind:class="{ isError: !judge[i][1] }"-->
                </td>
                <td class=""  v-bind:class='{"table-danger":!outOfTolerance[tableKey1][i][2]}'  @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                    {{ Characteristics[tableKey1][i][2] }}                <!-- C相值 v-bind:class="{ isError: !judge[i][2] }" -->
                </td>
                <div  class="hover_con"  style="display:none" > min: <strong>: {{outOfTolerance[tableKey1][i][3]}}</strong> max: <strong>: {{outOfTolerance[tableKey1][i][4]}}</strong></div> 
          </tr>
          <!-- <tr ><td colspan="5" style = "height : 5px"><hr style="height:3px;border:none;border-top:3px double red;" /> </td></tr> -->
          <tr><td colspan="5" style = "background-color: skyblue; font-size: 12px; text-align: center; font-weight: bold; padding:1px auto; "> Interval Time : {{intervalTime}} s</td></tr>
          <tr v-for="(v, i) in CharacteristicsLimits[tableKey2]" :key="tableKey2 + i">
                <td class="" >{{ v.ItemID }}</td>         <!-- 序号 -->
                <td  class="">{{ v.ItemName }}</td>                                 <!-- 描述 -->
                <td class=""  v-bind:class='{"table-danger":!outOfTolerance[tableKey2][i][0]}'  @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                    {{ Characteristics[tableKey2][i][0] }}               <!-- A相值  v-bind:class="{ isError: !judge[i][0] }"-->
                </td>
                <td class=""   v-bind:class='{"table-danger":!outOfTolerance[tableKey2][i][1]}' @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                    {{ Characteristics[tableKey2][i][1] }}               <!-- B相值  v-bind:class="{ isError: !judge[i][1] }"-->
                </td>
                <td  class=""  v-bind:class='{"table-danger":!outOfTolerance[tableKey2][i][2]}' @mouseenter="enter"  @mouseleave="leave" @mousemove="move">
                   {{ Characteristics[tableKey2][i][2] }}                <!-- C相值 v-bind:class="{ isError: !judge[i][2] }" -->
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

<script>
export default {
    name: "CharacteristicTable",
    data() {
        return {
          tableKey1:"",   //上半部表格， CB Closing
          tableKey2:"",   // 下半部表格 CB Opening
          outOfTolerance:{},
          // popUpShow:false,
          // positionStyle:{top:'0px',left:'0px'}
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
          // console.log(t1,t2)       


          // this.getIntervalTime()
        }
      }
    },
    // computed:{
    //   judge: function () {
    //             var jj = []                
    //             this.CharacteristicsLimits.forEach((v, i) => {
    //                 var kk = []
    //                 v.forEach((vv, ii) => {
    //                     vv >= this.groups[this.selectedGroup].ItemNames[i][1] && vv <= this.groups[this.selectedGroup].ItemNames[i][2] ?
    //                         kk.push(true) : kk.push(false)
    //                 }, this)
    //                 jj.push(kk)
    //             }, this)
    //             return jj;
    //         }
    // }
    // mounted() {
    //     this.$bus.$on('setIntervalTime', this.setIntervalTime)
    //   },


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

        // this.positionStyle = { top: y, left: x }  
      }
      // setIntervalTime(val){
      //   console.log(val)
      //   this.intervalTime = val
      // },

    }
};
</script>

<style scoped>
    /* #table, #table>table {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        border-collapse:unset;
    } */

    /* tbody {
        border: 0px solid gray;
        border-collapse: none;
        width: 100%;
        border-spacing: 2px 2px; 
        
      
        height: 15px;
      margin: auto;
    } */

    /* th {
        color: #fff;
        background-color: #555;
        border: 1px solid #555;
        font-size: 12px;
        font-weight: bolder;
        padding: 2px 2px 1px 2px;
        vertical-align: middle;
        text-align: center;
        
    } */

    /* .nar-td-col {
        width: 12%;
        text-align: left;
        
    } */

    /* .nar-th-col {
      width: 12%;
      text-align: center;
      
    } */
/* 
    .nar-col-1 {
        width: 7%;
        text-align: center;
        
    } */
    /* thead th:first-child {
        width: %;
    } */
    /* .wid-col {
        width: 57%;
        text-align: left;
        
    }*/

    table td {
        vertical-align: middle;
        color: rgb(84, 64, 170);
        padding: 1px 4px;
        font-size: 12px;
        cursor: pointer;
        line-height: 16px;     

    } 
    /* .isError {
    background-color: rgb(135, 70, 70);
    color:rgb(255, 255, 255);
    } */

    .hover_con{
      position:fixed;      
      max-width: 220px;
      padding: 2px;
      /* border: 1px solid #666; */
      background: rgb(175, 241, 113);
      font-size: 10px;     
      
      
    }

</style>