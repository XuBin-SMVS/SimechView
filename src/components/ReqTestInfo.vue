<template>
    <div >
          <div class="input-group ">
                <label  class="input-group-text" for="doku">DOKU Number &nbsp;&nbsp;</label>
                <input type="text" class="form-control" v-model="dokuNumber" @keyup.enter="loadTestInfo">
                <!-- <button @click="loadTestInfo" class="gap btn btn-default">Get Test Info</button> -->
                <!-- <button type="button" class="btn btn-primary" @click="show">按钮</button>-->
              
              <!-- 新增编辑弹框子组件 -->
                <!-- <AddOrUpdate v-if="addOrUpdateVisible" :addOrUpdateVisible="addOrUpdateVisible" @changeShow="showAddOrUpdate" ref="addOrUpdateRef"></AddOrUpdate>  -->
          </div>          
      <!-- <button @click="testData" class="btn btn-default">Get Test Data</button> -->
     </div>     
</template>


<script setup lang="ts" name="ReqTes">
// import tdms2obj from "../assets/js/TdmsReading.min.js"
// import axios from 'axios'
import axios from '../api/http.js'
// import Nprogress from 'nprogress'
// import 'nprogress/nprogress.css'
// import AddOrUpdate from '../pages/AddOrUpdate.vue'

// import { arrayBuffer } from "stream/consumers";
// import $ from 'jquery'



// export default {
//   name: "ReqTestInfo",
//   data() {
//     return {
//       dokuNumber:"",
//       // addOrUpdateVisible: false
//     };
//   },
//   // components:{
//   //   AddOrUpdate,
//   // },

//   methods: {
//     loadTestInfo() {
//         console.log("wait...")    
//         Nprogress.start()     
//         axios.get(`/get-me-record?doku=${this.dokuNumber}`)     //https://63mr015465.imdo.co
        
//               .then(res =>{
//                       // if (res.data.message.length > 0) {
//                       console.log(axios.defaults.transformRequest)  
//                       Nprogress.done() 
//                       if (res.status === 0) {
                          
//                           this.getTestInfo(JSON.parse(res.message[0].testInfo))
//                           this.setDokuNumber(this.dokuNumber)
//                           // console.log(this.$router)
//                           // this.$router.go(this.$router.options[1])
//                           // this.$router.replace('/refresh')
//                       }else {alert("Worng DOKU number!")}
//                     },
//                     err => {alert(err)}
//                )
//     },
//     // show(){
//     //         this.addOrUpdateVisible = true
//     //     },
//     //     // 监听 子组件弹窗关闭后触发，有子组件调用
//     // showAddOrUpdate(data){
//     //     if(data === 'false'){
//     //         this.addOrUpdateVisible = false
//     //     }else{
//     //         this.addOrUpdateVisible = true
//     //     }
//     // }

    
//   },
//   props: ["getTestInfo","setDokuNumber"]      //, "getRawData",
// };



</script>

<style scoped>
  .gap {
    padding:8px 8px 8px 40px;
    margin:7px 0 -5px 0;
    /* background-color: #337ab7; */
    color: white;
  }
  

</style>

