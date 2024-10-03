<template>
  <div style = "height: 100%;">
    <el-container class="myContainer">
      <el-header style=""  class="myHeader">
          <!-- <el-space :size="20" :spacer="spacer">    -->
            <el-switch  class="mySwitch"  active-text="CB" v-model="switchSelected[0]" />
            <el-switch  class="mySwitch"  active-text="DS" v-model="switchSelected[1]" />
            <el-switch  class="mySwitch"  active-text="ES" v-model="switchSelected[2]" />   
         
          <!-- </el-space>  -->
      </el-header>
      <el-divider class="mt-1 mb-1"/>   
     
      <el-main class="myMainInfoBox">
        
          <TestInfoList/>
        
      </el-main>
    </el-container>
  </div>
</template>
 

<script setup lang="ts" name="TestInfoShow">

  // import {ElCheckbox} from 'element-plus'
  import {ref, h} from 'vue'
  import { ElDivider } from 'element-plus';
  import TestInfoList from './TestInfoList.vue';

  const switchSelected = ref([false,false,false])


</script>

<style scoped >
  .myContainer {
    @apply border-none bg-gray-100 h-[calc(100%)];

  }

  .myHeader {
    @apply h-5 px-1 my-4
    display: flex; 
    justify-content: space-around;   

  } 

  .mySwitch {
    @apply px-0
    
  }

  .myMainInfoBox{
    @apply h-3xl p-2 ;
  }

</style>

<!--
export default {
      name: "TestInfoShow",
      data() {
        return {
          selectedGroup:[],
          selChannel: [-1,-1],    
          showCB:[false,true],  //如果试验数据不含CB，第一位为零，如果未选择CB选择框，第二位为零
          showDS:[false,true],
          showES:[false,true],
          sortModel:0,
          keyInTestInfoShow : 0,             //重新调入新的doku号后，强制刷新Vue介面
          groupBtnDisable:false    
        }
      },
      methods: {
        channelSelected(e){

          this.selChannel = [Number(e.target.parentNode.parentNode.parentNode.getAttribute('index')),Number(e.target.getAttribute('index'))],
          this.$bus.$emit('selectGroup', this.selChannel[0] )
          this.$bus.$emit('selectChannel', this.selChannel[1])

        },
        switchGroup(i,e){                           
          // console.log(e)          
            let caseName = this.getCaseName(i)
            if(this.groupBtnDisable === false && e.altKey === true  ) {         //如果按住Alt 键，则需切换模式，必须重新载入数据
              let mode 
              if(this.doku.has(caseName)) {                        //如果数据已经载入，则切换载入模式
                mode = [1,5][this.doku.get(caseName) === 1 ? 1:0]
              } else {
                mode = 1
              }
              Nprogress.start()     
              this.groupBtnDisable =true  
              //https://63mr015465.imdo.co})
              axios({ method:"get", url:`/get-me-record?doku=${this.doku.get("doku")}&caseName=${caseName}&mode=${mode}`})
              .then(res =>{
                      Nprogress.done()  
                      this.getRawData(caseName, res.message.groups)
                      this.selectedGroup = [i,mode]
                      this.doku.set(caseName,mode)                      
                      this.dataAvaliable(e,mode)
                      this.groupBtnDisable =false
                    },
                    err => { 
                          Nprogress.done();                             
                          alert(err)
                  })
              this.doku.set(caseName,mode) 
              if(this.selectedGroup[0] != i){
                this.selectedGroup = [i]
              }else {
                this.selectedGroup = []
              }
            }else {                 //如果未按Alt 键，则按mode=1 （每50次显示一次）
             if(this.selectedGroup[0] != i ){     
                if(this.groupBtnDisable === false && !this.doku.has(caseName)  ) {      //数据还未载入 并且不在数据载入过程中
                      //  getTestData(this.doku.get("doku"),caseName, 5).then(res=>{

                    this.groupBtnDisable=true    
                    Nprogress.start()           
                    axios({ method:"get", url:`/get-me-record?doku=${this.doku.get("doku")}&caseName=${caseName}&mode=5`   //https://63mr015465.imdo.co
                    }).then(res =>{
                              Nprogress.done()  
                              this.getRawData(caseName, res.message.groups)
                              // this.selectedGroup = [i,5]
                              this.doku.set(caseName,5)
                              this.dataAvaliable(e,5)
                              this.groupBtnDisable=false
                            },
                            err => { 
                            Nprogress.done();                             
                            alert(err)
                        }
                    )       
                }                              
                this.selectedGroup = [i]                
              }else {
                this.selectedGroup = []
              }}
        },

        getGroupName(g){
          var name
          if (this.groups[0].CaseName === '请载入测试数据'){     //.keys().length === 0
            name = ''
          } else if (this.channels[g].length >0 ){
                var ope = this.channels[g][0].Operation
                var cbStart = this.channels[g].at(0).CB
                var cbEnd = this.channels[g].at(-1).CB
                var dsStart = this.channels[g].at(0).DS
                var dsEnd = this.channels[g].at(-1).DS
                var esStart = this.channels[g].at(0).ES
                var esEnd = this.channels[g].at(-1).ES
                var CB = this.showCB[0] === false ? "" : ((cbStart===cbEnd? cbStart : cbStart + '&#8680;' + cbEnd))
                var DS = this.showDS[0] === false ? "" : ('&nbsp;' + (dsStart===dsEnd? dsStart : dsStart + '&#8680;' + dsEnd))
                var ES = this.showES[0] === false ? "" : ('&nbsp;' + (esStart===esEnd? esStart : esStart + '&#8680;' + esEnd) )
                name = ope +'&nbsp;'.repeat(7-ope.length) + CB + DS + ES                         
          } else {
                name = (this.groups[g].CaseName +'&nbsp;'.repeat(7-this.groups[g].CaseName.length))
          }
          
          return name
        },

        getChannelName(g,c){
              var name, nameCB, nameDS, nameES
              if (this.groups[0].CaseName === '请载入测试数据'){     //.keys().length === 0
                name = ''
              } else{
                // var cbStart = this.channels.Characteristics[g].at(c).CB
                // // var   cbEnd = this.channels.Characteristics[i].at(-1).CB
                // var dsStart = this.channels.Characteristics[g].at(c).DS
                // // var   dsEnd = this.channels.Characteristics[i].at(-1).DS
                // var esStart = this.channels.Characteristics[g].at(c).ES
                // cbStart = ('.'.repeat(7-cbStart.toString().length) + cbStart)
                // dsStart = ('.'.repeat(6-dsStart.toString().length) + dsStart)
                // esStart = ('.'.repeat(6-esStart.toString().length) + esStart)
                
                var cbStart = this.showCB[0] ? this.channels[g].at(c).CB : ""
                // var   cbEnd = this.channels.Characteristics[i].at(-1).CB
                var dsStart = this.showDS[0] ? this.channels[g].at(c).DS : ""
                // var   dsEnd = this.channels.Characteristics[i].at(-1).DS
                var esStart = this.showES[0] ? this.channels[g].at(c).ES : ""
                cbStart = cbStart === "" ? "" : (('..'.repeat(6-cbStart.toString().length) + cbStart))
                dsStart = dsStart === "" ? "" : (('..'.repeat(5-dsStart.toString().length) + dsStart))
                esStart = esStart === "" ? "" : (('..'.repeat(5-esStart.toString().length) + esStart))
                nameCB = cbStart?('CB'+ cbStart) : ""
                nameDS = dsStart?('DS'+ dsStart) : ""
                nameES = esStart?('ES'+ esStart) : "" 
                name = nameCB + (nameDS ? ((nameCB ? '&nbsp;&nbsp;':'') + nameDS):'') + (nameES ? ((nameCB || nameDS ? `&nbsp;&nbsp;&nbsp;`:'') + nameES):'')
              // name = (cbStart?('CB'+ cbStart) : "") + (dsStart ? (cbStart?'__':'' + 'DS' + dsStart):"") + esStart? (dsStart?'__':'' + 'ES' + esStart) : ""
              //CB_C_O.12000_DS.....3000_ES.....3000
              //CB_CO......8_DS........0_ES........0
              //CB_AR.....16_DS........0_ES........0
              //CB........10_DS_CO..3001_ES........0
              //CB........10_DS.....3001_ES_CO..3001
              }
              return name
        },

        filterChange(g){
            return (g.CaseName.indexOf("CB") >= 0 && this.showCB[1] === true) || (g.CaseName.indexOf("DS") >= 0 && this.showDS[1] === true) || (g.CaseName.indexOf("ES") >= 0 && this.showES[1] === true)

        },

        dataAvaliable(e,mode){
          if (mode === 1) {
            e.target.style.backgroundColor= "rgb(1, 166, 192)"
          } else if (mode === 5){
            e.target.style.backgroundColor= "rgb(68, 230, 255)"                //color: rgb(127, 255, 170);
          }else {e.target.style.backgroundColor = 'rgb(202, 202, 202)'}
        },

        getCaseName(i){
            let caseName = this.getGroupName(i) || ""          //CB_AR  2001->3000..0..0
            caseName = (caseName.slice(0, caseName.indexOf('&nbsp;')) + '_' + '0'.repeat(2-i.toString().length) + i) || ""
            return caseName
        },
       
        setChannelListMinHeight(){
          let height = 800 - 150       //眉头高度63，总高度800
          // let minHeight = height - this.groups.length * 10 
          let minHeight = height - 15*15
          return  (minHeight + "px")
        },


      },
      watch:{
        keyInCurveShow: {
          deep:true,
          handler(){
            var hasCB = false, hasDS = false, hasES = false
            this.groups.forEach((v)=>{
                v.CaseName.indexOf("CB") >=0 ? hasCB = true : null
                v.CaseName.indexOf("DS") >=0 ? hasDS = true : null
                v.CaseName.indexOf("ES") >=0 ? hasES = true : null
            })
            hasCB ? this.showCB[0]=true : this.showCB[0]=false
            hasDS ? this.showDS[0]=true : this.showDS[0]=false
            hasES ? this.showES[0]=true : this.showES[0]=false
          }
        },


      },
      computed:{
          outOfTolerance(){
            let finalResult = []
            this.channels.forEach((v1)=>{           // v1: each group  CB_CO_01
              let groupResult = []
              v1.forEach(v2=>{                                         // v2: channel CB_CO..2001__DS..200_ES..200
                let result = 0                                   
                Object.keys(v2.TestValues).forEach((v3)=>{             // v2.TestValue.CB_C or CB_O or CB_AR
                  if(!v3.includes("Cycle")) {   
                    result = result + statusCompute(v2.TestValues[v3],this.CharacteristicsLimits[v3])                               
                  } else {
                    result = result + statusCompute(v2.TestValues[v3]["CB_C"],this.CharacteristicsLimits["CB_C"]) + statusCompute(v2.TestValues[v3]["CB_O"],this.CharacteristicsLimits["CB_O"])
                  }
                })
                groupResult.push(result)                  
              })
            // console.log(finalResult)
              finalResult.push(groupResult)
          })
          return finalResult
          },

    
        },




      mounted(){
        this.$bus.$on('resetTestInfo', ()=>{
          this.selectedGroup = []
          this.selectedChannel = [-1,-1]
          this.keyInTestInfoShow++;
        })
      },

      props: ["groups", "channels","doku", "getRawData","CharacteristicsLimits","keyInCurveShow"],

      beforeDestroy() {
          this.$bus.$off('resetTestInfo')
      },  
}

function statusCompute(obj,lim){          //计算属性是否超出界限
    let re = 0
    lim.forEach((v,i)=>{ 
                      re = (v.Min>obj[i][0] || v.Max<obj[i][0]) + re
                      re = (v.Min>obj[i][1] || v.Max<obj[i][1]) + re
                      re = (v.Min>obj[i][2] || v.Max<obj[i][2]) + re
    })
    return re
}

<p class="col-md-12" style="margin: 0; font-size: 16px;"><strong>Tests Contents </strong></p>
<div class="checkbox col-md-12 form-inline">
      <label :class={disable:!showCB[0]}>               
        <input type="checkbox" :disabled = "!showCB[0]"  v-model="showCB[1]">
        CB
      </label> 
      <label :class={disable:!showDS[0]}>
          <input type="checkbox" :disabled = "!showDS[0]"  v-model="showDS[1]" >
          DS
      </label>
      <label :class={disable:!showES[0]}>
        <input type="checkbox" :disabled = "!showES[0]"  v-model="showES[1]" >
        ES
      </label>
</div>   
<div  id = "channelSelect">  
<hr class="col-md-12" style=" height:2px;border:none;border-top:2px dotted #185598; margin: 0 0 5px 0; padding: 0;" />
<ul v-if="groups.length>1" class="nav col-md-12" :key = "doku.get('doku')" :style="{'max-height':'786px'}" >                   
      <li class="col-md-12" v-for="(v1, i1) in groups" :key="'G'+i1 "  :index="i1" v-show="filterChange(v1)" >
        
        <ul>                              
            <a type="button" class="btn btn-default col-md-12"  @click="switchGroup(i1, $event)" v-html="getGroupName(i1)" style="background-color : rgb(202, 202, 202)">
                                   
            </a>
            
            <div  class="channel-list" v-show="(selectedGroup[0] === i1)" :style="{'max-height':setChannelListMinHeight(i1)}">  <!-- :style="{'max-height':setChannelListMinHeight(i1)}"

                <li v-for="(v2, i2) in channels[i1] "  @click="channelSelected" :key="'C'+i2"  
                    :index="i2" class="toBeSel"                             
                    v-html="getChannelName(i1,i2)"                          
                    v-bind:class="{'hasError' : outOfTolerance[i1][i2] , selectedChannel: (i1 === selChannel[0] && i2 === selChannel[1])}">
              
                </li>
            </div>

        </ul>                          
      </li>

</div>  
</div>
-->