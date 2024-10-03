import { type OperationRecord, type Channel} from '../types/index';
import {defineStore} from 'pinia'

import {useTestInfo} from './useTestInfo_Options'
import  {type DatasetComponentOption, DatasetComponent} from 'echarts/components'
import type { EChartsOption } from 'echarts';

export const useCharacteristicsCharts = defineStore('characteristicsCharts', {

    state:(()=> {return {
            frequencyFilterRatio: 1,   //采样 频率降低倍数
                dataset: <DatasetComponentOption>{              
                source:[]           
                          
              },
            }

          }),

    actions:{
        channelFiltered(et) {
          console.log("channelFiltered函数被 调用！ 参数是：",et)
        },

        optionUpdate(){

        }

    },

    getters:{  


        // channelFiltered(state){

        //   return 
            
        //     state.channels.map(cha=>{ 
        //         let frequencyFilter = (1 / cha.wf_increment ) / this.frequency
        //         let aaaa = cha.data.filter((aa,index)=>{return ((index % frequencyFilter) === 0)})
        //         return aaaa        
        //     })

        // }     
    }
})

//以下是一个分别引入组件的例子

/*import * as echarts from 'echarts/core';
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';

import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
 
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型

type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;
 
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);
 
const option: ECOption = {
  // ...
}; */