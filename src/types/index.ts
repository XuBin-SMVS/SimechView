export type AllAvaliableTestInfo = TestInfoRecord[] 

export type TestInfoRecord = {
    dokono: string,
    prod: string,
    typical:string,
    [key:string]:any
}

//定义CB 或 TPS 操作特性 的类型，用于机械特性限值的定义
enum OperationOfCharacteristics {
    'CB合'='CB_C',
    'CB分'='CB_O', 
    '隔刀合'='DS_C',
    '隔刀分'='DS_O',
    '地刀合'='ES_C',
    '地刀分'='ES_O'
}

type CharacteristicItem = { "ItemID": number,"ItemName": string,"Min": number,"Max": number}

export type CharacteristicsLimits = Partial<Record<OperationOfCharacteristics,Array<CharacteristicItem>>>

//{[key in OperationOfCharacteristics] : CharacteristicItem[] }

// 定义操作记录的类型，用于操作数据的记录

// enum OperationOfEachRecord { 
//     'CB合-分'='CB_C_O', 
//     'CB重合闸'='CB_AR', 
//     '隔刀合-分'='DS_C_O', 
//     '地刀合-分'='ES_C_O' , 
//     'CB合分'='CB_CO'
// }

type TestValueSingle = Partial<Record< OperationOfCharacteristics, Array<Array<number>>>>

type TestValueAR = {'Cycle1': TestValueSingle, 'Cycle2':TestValueSingle}

export type CharacteristicsOfEachOperation = {
    "TestTime": string,
    "Operation":string, 
    "CB": number,
    "DS": number,
    "ES": number,
    "VesselPressure": number,
    "CurrentTimes": number,
    "TestValues": TestValueSingle | TestValueAR
}

export type AutoTestInfo = {
    Doku:string,
    TestProcess:[][],
    CharacteristicsLimits: CharacteristicsLimits,
    TestResults:{ 
        Characteristics: CharacteristicsOfEachOperation[][],
        Resistance:[],
        Torque:[]
    }



}

// export type Persons = Array <Person>



/* 
{
    dokuno:
    projectname: 
    workorderno: 
    testobject: 
    prod:
    typical: 
    ratedvoltage: 
    ratedcurrent: 
    eid:
    testtype: 
    sampleqty: 
    testlab: 
    testcategory:
    clientdept: 
    clientandtel: 
    internalorderno: 
    testitem: 
    designation: 
    testobjectdescription: 
    partrelease: 
    testobjectphoto: 
    aim:
    previousdokuno: 
    testprocess: 
    testprocessnotes: 
    testprocessphoto: 
    testprocesstr: 
    testprocesshv: 
    bom: 
    keydrawing: 
    techdata: 
    status: 
    keycomponent: 
    testfolder: 
    testattachments:
    issampleready: 
    isdesignphotouploaded: 
    isphotoreadybeforetest: 
    approver: 
    approvetime: 
    confirmer: 
    confirmtime: 
    username: 
    orderdate: 
    updatetime: 
    comments: 
    teststarttime: 
    testfinishtime: 
    accepttime: 
    autotestjson: 
  }
  */