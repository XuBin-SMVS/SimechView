import {defineStore} from 'pinia'
import {ref, reactive} from 'vue'
import axios from '../api/http'
import {type AxiosResponse} from 'axios'

export const useTestInfo = defineStore('testInfo', ()=>{
    
    
    const allTestInfo = reactive({})
    const dokuNumber = ref("")

    function loadTestInfo() {

        // Nprogress.start()    
        // console.log(allTestInfo.value) 
        axios.get(`/get-me-record?doku=${dokuNumber.value}`)     //https://63mr015465.imdo.co        
              .then(res =>{
                      // if (res.data.message.length > 0) {
                      // console.log(axios.defaults.transformRequest)  
                      console.log(res.data)

                      Object.assign(allTestInfo, res.data.message[0])
                      // Nprogress.done() 
                      // if (res.status === 0) {
                          
                      //     this.getTestInfo(JSON.parse(res.message[0].testInfo))
                      //     this.setDokuNumber(this.dokuNumber)
                      //     // console.log(this.$router)
                      //     // this.$router.go(this.$router.options[1])
                      //     // this.$router.replace('/refresh')
                      // }else {alert("Worng DOKU number!")}
                    },
                    err => {alert(err)}
               )
    }


    return {allTestInfo, dokuNumber, loadTestInfo}


}) 