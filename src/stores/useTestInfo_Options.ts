import {defineStore} from 'pinia'
import {ref, shallowRef, reactive} from 'vue'
import axios from '@/api/http'
// import {type AxiosResponse} from 'axios'
import {type AllAvaliableTestInfo, type AutoTestInfo} from '@/types/index'



export const useTestInfo = defineStore('testInfo', {
    state: ()=>{return {
                allTestInfo : shallowRef<AutoTestInfo>({
                    Doku: '',
                    TestProcess: [],
                    CharacteristicsLimits:{},
                    TestResults: {
                        Characteristics: [],
                        Resistance: [],
                        Torque: []
                    }
                }),
                dokuNumber : ref<string>("")  ,
                arrangedDokuList :  reactive <{[key:string]:AllAvaliableTestInfo}> ({})                 
            }},

    actions:{         
        //获取所有与登录人相关的具有自动化测试数据的doku信息，以年为数据组
        getAllAvaliableTestInfo(){
            // console.log(this)
            axios.get(`\get-avaliable-info`)
                .then(res=>{
                    // ArrangedDokuList: {2022:[],2023:[]}

                    for (let y =2022; y<= new Date().getFullYear(); y++) {
                        this.arrangedDokuList[y.toString()] = []
                    }

                    Object.keys(this.arrangedDokuList).forEach((item)=>{
                        // console.log(item)
                        this.arrangedDokuList[item] =   res.data.message.filter((record:{dokuno:string,[key:string]:any}) => {
                            return record.dokuno.slice(0,2) === item.slice(2,4)
                        })


                    })
                    


                },
                err=>{
                    
                }        
            
            )
        },

        loadTestInfo() {
            // Nprogress.start()    
            // console.log(allTestInfo.value) 

            if (this.dokuNumber != this.allTestInfo.Doku) {
                axios.get(`/get-me-record?doku=${this.dokuNumber}`)     //https://63mr015465.imdo.co        
                    .then(res =>{
                            // if (res.data.message.length > 0) {
                            // console.log(axios.defaults.transformRequest)  
                            // console.log(JSON.parse(res.data.message[0].testInfo))

                            this.allTestInfo =  JSON.parse(res.data.message[0].testInfo) as AutoTestInfo

                            // Object.assign(this.allTestInfo, JSON.parse(res.data.message[0].testInfo))
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
        }
    },

    getters: {
        
    }
}) 