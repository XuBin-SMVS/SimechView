<template>
  <div ref="mainChart" style="height: 100%; width: 100%; "></div>
</template>

<script setup lang='ts'>
        import { onMounted, onUpdated, ref, watch } from 'vue';
        import { storeToRefs } from 'pinia';
        // import {myCharacterristicsCharts} from '@/types'

        import * as echarts from 'echarts'

        import {useTestInfo }from "@/stores/useTestInfo_Options"
        // import {CharacteristicsCharts} from '@/pages/CurveShow/myEcharts'
        import {CharacterristicsCharts} from '@/types/CharacteristicsChart'

        type EChartsOption = echarts.EChartsOption;


        // echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

        /* // import { useRoute, useRouter } from 'vue-router'; */

        const mainChart = ref()
        // let option: EChartsOption
        // let myChart:ECharts
       
        

        const testInfo = useTestInfo()
        // const characteristicsCharts = useCharacteristicsCharts()
        const {selectedSingleOperation} = storeToRefs(testInfo)

        let myEcharts : CharacterristicsCharts 
        // const {frequencyFilterRatio, dataset} = storeToRefs(characteristicsCharts)        
        watch(selectedSingleOperation.value, (newValue, oldValue)=>{
            // console.log("newValue: ",newValue, "oldValue: ",oldValue)
            // myEcharts = new CharacterristicsCharts(echarts.init(mainChart.value))
            if(oldValue.name){
              myEcharts.myCharts.dispose();
              myEcharts = new CharacterristicsCharts(echarts.init(mainChart.value))
            }
            myEcharts.chartInit(selectedSingleOperation.value)
            myEcharts.drawChart()
        },{immediate:false})

        onMounted(()=>{
           myEcharts = new CharacterristicsCharts(echarts.init(mainChart.value as HTMLElement))             

        })

        onUpdated(()=>{})


</script>
<style scoped lang='less'>



</style>