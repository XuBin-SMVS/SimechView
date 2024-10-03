// import { ECharts } from 'echarts';


// import type { GridOption, XAXisOption, YAXisOption, SeriesOption,  } from 'echarts/types/dist/shared'

// import type {DataZoomComponentOption, EChartsOption} from 'echarts'

// import  {type ECharts} from 'echarts/core'

import * as echarts from 'echarts'

import {type SelectedSingleOperation} from './index'

type EChartsOption = echarts.EChartsOption;
type EChartsType = echarts.EChartsType
// type GridComponentOption = echarts.GridComponentOption


export class CharacterristicsCharts {
      private operation: SelectedSingleOperation
      public myCharts:EChartsType
      private frequencySeries = []
      option:EChartsOption 

    constructor(myCharts:EChartsType ) {

        this.myCharts = myCharts


    }

    chartInit(ope:SelectedSingleOperation) {
        this.option = {
            xAxis : [],
            grid : [],
            yAxis : [],
            series : [],
            dataZoom : [],
            axisPointer:{link:[]}
           
        }
        

        this.operation = ope
        this.option.title = {text: this.operation.name} 
        this.option.tooltip =  {
            trigger: 'axis',
            // position: { top: "2%", left: "1%" },
            axisPointer: {
                type: 'line',
                axis: "x",
                label: {
                    backgroundColor: '#5f9ea0',
                    // show: true, 
                    fontSize: 16, 
                    formatter: (param)=> {  return (param.value[1] + 'ms') }
                }
            },
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            // formatter: function(params){
            //     console.log(params)
            //     return params;
            // },

            extraCssText: 'width: 120px; padding:2px',
            formatter: function (params) {
                params.sort(function(a,b) {return a.axisIndex-b.axisIndex})
                var float_right = ['<span style="display:inline-block;float:right;font-size:10px">', '</span>']
                var float_left = ['<span style="display:inline-block;float:left;font-size:10px">', '</span>']
                var param = ['<span style="font-size:10px">' + 'Time: ' + params[0].axisValue + 'ms' + '</span>' + '<hr size=1 style="margin: 1px 0">']
                // params.sort(function (a, b) { return (-b.componentIndex + a.componentIndex) })
                params.forEach(function (o) {
                    // param.push(float_left[0] + o.seriesName + ':' + float_left[1] + float_right[0] + ((o.data[1] === 0 || o.data[1] === 1) ? ['open', 'close'][o.data[1]] : o.data[1].toFixed(2)) + float_right[1] + '<br/>')
                    param.push(float_left[0] + o.seriesName + ':' + float_left[1] + float_right[0] +
                        ((o.seriesIndex < 3) ? ['open', 'close'][o.data[1]] : o.data[1].toFixed(2)) + float_right[1] + '<br/>')
                })   //marker: <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#5470c6;"></span>
                // console.log('@3',param)
                return param.join('');
                // return params
            },
            // textStyle: {
            //     fontSize: 15,
            //     lineHeight: 20
            // },
            alwaysShowContent: true,
            // className: 'echart-tooltip-content echart-tooltip-wrap echart-tooltip-body echart-tooltip-module'
        },

        this.initOption()      
    }

    drawChart():void {
        // if (!this.tdmsInfo) { alert("请先载入数据文件！"); return false }
        // console.log(this)
        // _this.chartData.xAxes.forEach(function (o, i) { x_Axis.push(i); })
      
        this.myCharts.setOption(this.option, true, true);
        this.myCharts.on('click', 'series.line', (param) => {           //
            // console.log(param)
            var markLineData = this.option.series[param.seriesIndex]['markLine']['data']
            if (markLineData.length === 4) {
                markLineData.splice(0, 2)
            }
            markLineData.push({ xAxis: param.data[0] ? param.data[0] : 0, symbol: 'none' })
            param.seriesIndex < 3 ? (markLineData.push({ yAxis: param.data[1] ? param.data[1] : 0, symbol: 'none' })) : (markLineData.push({ yAxis: param.data[1] ? Number(param.data[1].toFixed(2)) : 0, symbol: 'none' }))
            // myChart.setOption(this.option, { notMerge: false })
            this.myCharts.setOption(this.option, false)
        })
    };

    private initOption():void{
        let contactHeight = 1, travelHeight = 44, coilHeight = 10, sGap = 1, bGap = 4, topPosion = 0;
        //contactHeight: 触头分合闸曲线高度， travelHeight: 行程曲线高度, coilHeight: 分合闸线圈曲线高度， motorHeight: 电机电流曲线高度
        let signalSequence = [contactHeight, contactHeight, contactHeight, travelHeight, coilHeight, coilHeight, coilHeight]
        for (let [i,v] of this.operation.channels.entries()){
            let data = []
            // allItems.push(v.name)
            if (v.data) {
                var heightTop = ((i) => {
                    topPosion = topPosion + (i === 0 ? 0 : signalSequence[i - 1]) + ((i != 0 && i < 3) ? sGap : bGap)
                    return [signalSequence[i], topPosion]
                })(i);

                (this.option.grid as echarts.GridComponentOption[]).push({
                    show: (i < 3) ? false : true,
                    borderWidth: 1,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 2,
                    left: "8%",
                    right: "6%",
                    // height: (i === 0 || i === 1 || i === 2) ? contactHeight : (i === 4),
                    // top: (i === 0 || i === 1 || i === 2) ? (i * 5 + 5) + '%' : ((i - 2) * ll + 15) + '%'
                    height: heightTop[0] + '%',
                    top: heightTop[1] + '%'
                });

                (this.option.xAxis as echarts.XAXisComponentOption[]).push ({
                    type: 'value',
                    show: (i < 3) ? false : true,
                    gridIndex: i,
    
                });
                let yaxisOpt : echarts.YAXisComponentOption = {
                    type:'value',
                    name:v.name,
                    nameGap:12,
                    // scale:(i < 3) ? false : true,
                    min: (i < 3) ? 0 : (value)=> {
                                return Math.round((value.min)*0.98);
                             },
                    max: (i < 3) ? 1 : (value)=> {
                                var v=Math.round(value.max*10*(i===3?1.02:1.1))
                                // v = v.toString().slice(0,-1) + ['0','5'][Number(v.toString().slice(-1)>4)]
                                v=Number(v)/10
                                return v
                              },
                    show: (i < 3) ? false : true,
                    // minInterval:(i!=3)?1:null,
                    // interval: (i > 3 ? 1 : 5),
                    gridIndex:i,
                    minorTick: {
                        show: (i > 3) ? false : true
                    },
                    minorSplitLine: {
                        show: (i > 3) ? false : true
                    },
                    splitNumber: (i != 3 ? 1 : 5),
                    nameLocation: 'middle',
                    nameTextStyle: { padding: [10, 0, 15, 0] } } ;

                (this.option.yAxis as echarts.YAXisComponentOption[] ).push(yaxisOpt);

                v.data.forEach(function (vv, ii) {
                    // time = tdmsInfo.dataInfo.groups[0].channels[3].wf_increment * ii * 1000
                    var time = v.wf_increment * ii * 1000
                    // x_Axis.push(time.toFixed(5))
                    data.push([time.toFixed(1), Number((i > 3) ? vv.toFixed(3) : vv.toFixed(4))])
                })
                var freq = Math.floor(1 / v.wf_increment)
                var samples = v.data.length
    
                var freIsExist = -1
                this.frequencySeries.forEach((v, j) => {
                    (v[0] === freq && v[1] === samples) ? freIsExist = j : 0
                })
    
                if (freIsExist < 0) {
                    this.frequencySeries.push([freq, samples]);
                    this.option.axisPointer['link'].push({ xAxisIndex: [i] });      
                    (this.option.dataZoom as echarts.DataZoomComponentOption[]).push({ type: 'inside', xAxisIndex: [i], filterMode: 'filter', });
                    
                } else {
                    this.option.dataZoom[freIsExist].xAxisIndex.push(i)
                    this.option.axisPointer['link'][freIsExist].xAxisIndex.push(i)
                }
                (this.option.series as echarts.SeriesOption[]).push({
                    name: ((name) => { var a = name.split(/[//(\\+)]/g); return a[a.length - 1] })(v.name),
                    type: 'line',
                    xAxisIndex: i,
                    yAxisIndex: i,
                    areaStyle: (i < 3) ? { opacity: 1, origin: 'start' } : null,
                    step: (i < 3) ? 'start' : false,
                    data: data,
                    showSymbol: false,
                    markLine: { data: [] },
                    // markPoint: (i === 3)? {symbol:"arrow", symbolSize:10, label:{show:true,position: 'top'},data: [{ type: "max" },{ type: "min" }] } : null,
                    // label: { show: true, fontSize: 20, formatter: function (param) { return (param.value[1] + _this.chartParameter[item.slice(0, 1)]) } },
                });
    
            }
        }

    }





}