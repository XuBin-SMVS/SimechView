<template>
    <div  class="container-xxl">
          <div >
        
            <ReqTestInfo />
              <!--:getTestInfo = "getTestInfo" :setDokuNumber = "setDokuNumber"-->
              <!-- <router-link  class="list-group-item col-md-1">test2</router-link> -->
            
        
        </div>      

       
        
        <div >
            <keep-alive >
              <router-view ></router-view>
            </keep-alive>
        </div>
   
    </div>


  </template>
  
  <script setup lang="ts" name="App">    

    import ReqTestInfo from "@/components/ReqTestInfo.vue"
 

    //   methods: {
    //     getTestInfo(allTestInfo) {
    //       this.allTestInfo = {}
    //       this.allTestInfo = allTestInfo
    //       // this.$nextTick(()=> this.$bus.$emit('resetData'))
    //     },
  
    //     setDokuNumber(dokuNumber){
    //         this.dokuNumber=dokuNumber  
    //         // this.keyInApp++;
    //         this.$refs.paraBtn.disabled = false
    //         this.$refs.curBtn.disabled = false
    //         this.aliveRouteList = ['CurveShow','ParameterShow']
    //         // console.log(this.$router)
    //         this.$router.replace({
    //           path:'/refresh'},()=>{},()=>{})
            
  
  
    //         // console.log(document.querySelectorAll('button')[0].getAttribute('disabled'))
    //         // this.$nextTick(()=>this.$bus.$emit('resetData'))       
    //         // this.$router.push('/refresh')
    //         // this.$router.replace({
    //         //   path:'/refresh',
    //         //   params:{
    //         //     allTestInfo:this.allTestInfo,
    //         //     dokuNumber:dokuNumber
    //         //   }})
    //     },
   
    //     showCurve(){
    //     //  console.log(this.$bus) 
    //       this.isActive[0]=1
    //       this.isActive[1]=0
    //       // this.aliveRouteList.push('CurveShow')
    //       this.$router.push({
    //                   name:'curveshow', 
    //                   params:{
    //                     allTestInfo:this.allTestInfo,                    
    //                     keyInApp:this.keyInApp,
    //                     dokuNumber:this.dokuNumber,
    //                   }
    //                 },()=>{},()=>{}
    //       )
    //     },
  
    //     parameterAnalyzing(){
    //       this.isActive[0]=0
    //       this.isActive[1]=1
    //       this.$router.push({
    //                   name:'parametershow', 
    //                   params:{
    //                     allTestInfo:this.allTestInfo,                    
    //                     keyInApp:this.keyInApp,
    //                     dokuNumber:this.dokuNumber,
    //                   }
    //                 },()=>{},()=>{}
    //       )
    //       if(!this.hasOthersData){	
    //             this.hasOthersData = true						
    //                           Nprogress.start()
    //                           axios({ method:"get", url:`/get-calculated-data?doku=${this.dokuNumber}`})
    //                           .then(res =>{
    //                                   Nprogress.done()  
    //                     this.$bus.$emit('getOthersData', res.message)
                        
    //                                   },
    //                                   err => { 
    //                     Nprogress.done();                             
    //                     this.hasOthersData = false
    //                     alert(err)
  
    //                                   }
    //                           )
    //       } 
    //     },
  
    //     reload(){
    //       this.$router.go(0)
    //     }
  
    //   },
  
       
   

  </script>
  
  <style scoped >
    #wrapper {
    margin: 0px auto;
    min-width: 1170px;
    width: 1300px; 
    width: 100%; 
     position: relative; 
     left:auto; 
     width: 1600px; 
     min-width: 1600px;
  }
  
  .sheet-title{
    margin-top: 10px;
    margin-bottom: -7px;
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    line-height: 27px;
    vertical-align:middle;
  }
  
  
  </style>