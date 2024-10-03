
import {defineStore} from 'pinia'
import {ref, shallowRef, reactive} from 'vue'
import axios from '@/api/http'
// import {type AxiosResponse} from 'axios'
import type {AllAvaliableTestInfo, AutoTestInfo, TestRowData, Groups, TestInfoRecord, SelectedSingleOperation, SingleTestProcess, CharacteristicsLimits} from '@/types/index'
import CharacteristicTable from '@/pages/CurveShow/CharacteristicTable.vue'
import type CharacteristicCharts from '@/pages/CurveShow/CharacteristicCharts.vue'



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
                }),  //自动化测试数据JSON字串转成的对象
                testRawData: <TestRowData> [], //TDMS数据
                selectedSingleOperation: <SelectedSingleOperation> {},  //选中的单次操作，包括TDMS数据，机械特性数据
                // dokuNumber : ref<string>("")  ,  //DONKU 号
                dokuNumber : "",
                arrangedDokuList :  ref <{[key:string]:AllAvaliableTestInfo}> ({}),   //按年份组合好的所有含有自动化测试数据的doku号
                // selectedGroupIndex: -1,   //选择的组（single case)
                // selectedGroupInProcess:<SingleTestProcess> {},  //对应选好的group的Test Process
                selectedGroup:{index: <number>-1, process: <SingleTestProcess>{}},
                selectedChannelIndex: -1 // 选择要展示曲线和机械特性的单次操作
            }},

    actions:{         
        //获取所有与登录人相关的具有自动化测试数据的doku信息，以年为数据组
        getAllAvaliableTestInfo(){          
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

        //载入testInfo (自动化测试JSON文件)
        loadTestInfo() {
            if (this.dokuNumber != this.allTestInfo.Doku) {
                axios.get(`/get-me-record?doku=${this.dokuNumber}`)     //https://63mr015465.imdo.co        
                    .then(res =>{
                            this.allTestInfo =  JSON.parse(res.data.message[0].testInfo) as AutoTestInfo
                        },
                        err => {alert(err)

                        }
                    )
            }
        },

        //载入由TDMS文件转化成的原始数据对象

     async loadTDMSData(index:number, caseName:string, mode:number){  
            //index: Case在groups中的序号，caseName: TDMS文件在数据库中的索引号，mode：数据请求模式

         await axios({ method:"get", url:`/get-me-record?doku=${this.dokuNumber}&caseName=${caseName}&mode=${mode}`})
                 .then(res =>{
                    // this.getRawData(caseName, res.message.groups)
                        this.testRawData[index].groups = res.data.message.groups
                        
                    },
                    err => { 
                        alert(err)
                 })
                },

        //调整channel 的采样率 

        // channelsFiltered(frequency=1000){

        //     this.selectedSingleOperation.channels.map(cha=>{ 
        //         let frequencyFilter = (1 / cha.wf_increment ) / frequency
        //         let aaaa = cha.data.filter((aa,index)=>{return ((index % frequencyFilter) === 0)})
        //         return aaaa        
        //     })

        // }

    },

    getters: {
        groups(state) :Groups {
            this.testRawData = []
            return state.allTestInfo.TestResults.Characteristics.map( (eachCase, index)=>{
                let operation = eachCase[0].Operation
                let start = eachCase[0][operation.slice(0,2)] as number
                let end = eachCase[eachCase.length-1][operation.slice(0,2)]   as number
                // 初始化raw data数据
                this.testRawData.push({groups:[], name:operation, mode:0})            
                return [operation, start, end, []] //           
            })         
        },

        //根据group的选择模式展示子菜单中的操作（mode 1 或 mode 5 每10次或每50次）
        operations(state){
            return ((groupIndex:number, mode:number):number[]=>{
                let opeCase = state.allTestInfo.TestResults.Characteristics[groupIndex]
                let operation = opeCase[0].Operation
                let opeArry = []            
                opeCase.forEach(ope=>{
                    if([0,1,2,3,4,5,6].indexOf(ope[operation.slice(0,2)] % (mode * 10)) >=0) {
                         opeArry.push(ope[operation.slice(0,2)])
                    }                 
                })
                return opeArry
            })

        },

        //计算要展示的特性表格所需的数据：

        characteristicLimits(state): CharacteristicsLimits {
        
            //获取相应的开关特性限值 
            let limits = <CharacteristicsLimits>{}
            for (let item of Object.entries(state.allTestInfo.CharacteristicsLimits)) {
                if (item[0].slice(0,2) ===  this.groups[this.selectedGroup.index][0].slice(0,2) ){
                    Object.assign(limits,Object.fromEntries([item]))
                }
            }      
            return limits
        }


    }
}) 