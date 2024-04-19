// import VueRouter from 'vue-router'
// import CurveShow from '../pages/CurveShow'
// import ParameterShow from '../pages/ParameterShow'
// import refresh from '../pages/refresh'
import {createRouter,  createWebHashHistory} from 'vue-router'
import Root from '@/pages/root.vue'
// import ParameterSelect from '../pages/ParameterSelect'


const  router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path:'/',
            component:Root

        }
        // {
        //     path:'/curveshow',
        //     name:'curveshow',           
        //     component:CurveShow,        
        //     props:true
        // },
        // {
		// 	name:'parametershow',
		// 	path:'/parametershow',
		// 	component:ParameterShow,
        //     props:true,
        //     children:[
        //         {
        //             path:'parameter-select',
        //             name:'parameter-select',
        //             component:ParameterSelect

        //         }
        //     ]
		// },
        // {
        //     path: '/refresh',
        //     component: resolve => {require(['@/pages/refresh'], resolve)},
        //     meta: {
        //       title: '用于同路由刷新'
        //     },
        //     props:true
        // }
    ]
})

export default router