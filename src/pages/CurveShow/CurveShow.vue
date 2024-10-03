  <template>
    
    <el-row :gutter="5" style="height: 100%; width:100%; padding: 10px;">
      <el-col :span="5" >
          <TestInfoListShow />
      </el-col>


      <el-col :span="11" >
        <el-row style="height: 100%;">
          <el-col :span="24" style="height: 90%;" > <CharacteristicCharts/></el-col>

         <el-col :span="24"></el-col> <div style = "height: 10%; "></div>

        </el-row>  
        
         
      </el-col>

      <el-col :span="8" > 
          <ChaTables/> 


      </el-col>

    </el-row>
    
  </template>




<script setup lang='ts'>
  import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import {useTestInfo }from "@/stores/useTestInfo_Options"
  import TestInfoListShow from '@/pages/CurveShow/TestInfo.vue'
  import CharacteristicCharts from '@/pages/CurveShow/CharacteristicCharts.vue';
  import ChaTables from '@/pages/CurveShow/ChaTables.vue'
  
const testInfo = useTestInfo()

const {allTestInfo} = storeToRefs(testInfo)


const input = ref('')


</script>
<style scoped >
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>