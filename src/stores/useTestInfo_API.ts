import {defineStore} from 'pinia'
import {ref, reactive} from 'vue'
import axios from '@/api/http'
import {type AxiosResponse} from 'axios'
import {type AllAvaliableTestInfo} from '@/types/index'



export const useTestInfo = defineStore('testInfo', ()=>{
    
    
    const allTestInfo = reactive({})
    const dokuNumber = ref("")  
    const arrangedDokuList: {[key:string]:AllAvaliableTestInfo} = reactive({})

    //获取所有与登录人相关的具有自动化测试数据的doku信息，以年为数据组
    function getAllAvaliableTestInfo(){
        axios.get(`\get-avaliable-info`)
            .then(res=>{

                // ArrangedDokuList: {2022:[],2023:[]}

                for (let y =2022; y<= new Date().getFullYear(); y++) {
                    arrangedDokuList[y.toString()] = []
                }

                Object.keys(arrangedDokuList).forEach((item)=>{
                    // console.log(item)
                    arrangedDokuList[item] =   res.data.message.filter((record:{dokuno:string,[key:string]:any}) => {
                        return record.dokuno.slice(0,2) === item.slice(2,4)
                    })


                })
                


            },
            err=>{
                
            }        
        
        )
    }

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

    return {allTestInfo, dokuNumber, arrangedDokuList, loadTestInfo, getAllAvaliableTestInfo}


}) 