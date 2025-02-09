import Message from './index.vue'
import { createVNode, render } from 'vue'

//导出对象，对象里面必须要有install方法，才能使用app.use()
export default {
    //插件访问
    install(app) {
        //创建虚拟dom
        const Vnode = createVNode(Message);
        //将Message挂载在body下
        render(Vnode, document.body);
        //添加全局property，供全局访问
        app.config.globalProperties.$message = Vnode.component.exposed.handlerShow
    },

    //函数访问
    service({
        type = "success",
        duration = 3000,
        text = "消息提示",
    }) {
        const vm = createVNode(Message);
        //将vm挂载在body下
        render(vm, document.body);
        //调用组件
        vm.component.exposed.handlerShow({type,duration,text})
    }

    //在组件中使用(插件)
        // ...$message({
        //     type:'success',
        //     text:'成功了',
        //     duration:3000
        // })
    //函数使用
    // import Message from "./components/Message"
    // Message.service({
    //     type:'success',
    //     text:"成功",
    //     duration:2000
    //   })
}