
import type {EChartsOption} from 'echarts'

export type AllAvaliableTestInfo = TestInfoRecord[] 

export type TestInfoRecord = {
    dokuno: string,
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

export type SingleTestProcess = 
    { 
        CaseName:"CB_C_O" | "CB_CO" | "CB_AR" | "DS_C_O" | "ES_C_O",
        Cycle: number,
        Interval1:number,
        Interval2:number,
        TriggerCycleResistance:number,
        TriggerCycleTorque:0
    }


export interface AutoTestInfo  {
    Doku:string,
    TestProcess:number | SingleTestProcess[][],
    CharacteristicsLimits: CharacteristicsLimits,
    TestResults:{ 
        Characteristics: CharacteristicsOfEachOperation[][],
        Resistance:[],
        Torque:[]
    }
}

export type Groups = [string, number, number, number[]][]   //[操作case(ES_CO,DS_CO,CB_C_O......),本case开始的次数，本case结束的次数，各操作次数的数组]

/* 单个通道数据格式 */
export type Channel = { 
    "name": string,
    "dataType": string,
    "dataLength": number,
    "wf_start_time": string,
    "wf_start_offset": number,
    "wf_increment": number,
    "wf_samples": number,
    "NI_ChannelName": string,
    "NI_LineNames": string,
    "data": Array<number>
}

export interface OperationRecord  {"name":string, "channels":Channel[]}
/* 每个case的数据数组，第次操作数据{name:"DS_CO,0,1,0", channels: [每次操作的所有通道数据的数组]}  */

export type GroupOfOperationRecords = OperationRecord[]

/* 试验的所有原始数据的数组 name是每个case的名称，如："DS_CO_00"，"CB_C_O_01"" */

export type TestRowData = {groups: GroupOfOperationRecords, name:string, mode:number}[]


export interface SelectedSingleOperation extends OperationRecord {
    "testValue"?: TestValueSingle | TestValueAR,
    "characteristicsLimits"?: CharacteristicsLimits,
    
}
