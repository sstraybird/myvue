//插件一般都是一个函数，需要调用一下才能用

import {initState} from "./state";
import {compileToFunction} from "./compiler/index";
import {callHook, mountComponent} from "./lifecycle";
import {mergeOptions} from "./utils";

export function initMixin(Vue) {        //这里的Vue是VUe构造函数
    Vue.prototype._init = function(options) {
        console.log(options);
        const vm = this     //this 都是指原型的实例 就是在index.html new出的vm   这里赋值给vm方便阅读 var that = this;
        // vm.$options = options    // 后面会对options进行扩展操作
        vm.$options = mergeOptions(vm.constructor.options, options); // 后面会对options进行扩展操作
        console.log('vm.$options',vm.$options)

        callHook(vm, 'beforeCreate');
        // 对数据进行初始化 watch computed props data ...
        initState(vm); // vm.$options.data  数据劫持
        callHook(vm, 'created');

        if(vm.$options.el){
            // 将数据挂载到这个模板上
            vm.$mount(vm.$options.el);
        }
    }

    Vue.prototype.$mount = function (el) {
        const vm = this;
        const options = vm.$options
        el = document.querySelector(el);
        console.log('el',el)
        vm.$el = el;
        // 把模板转化成 对应的渲染函数 =》 虚拟dom概念 vnode =》 diff算法 更新虚拟dom =》 产生真实节点，更新
        if(!options.render){ // 没有render用template，目前没render
            let template = options.template;
            if(!template && el){ // 用户也没有传递template 就取el的内容作为模板
                template = el.outerHTML;
                console.log('template',template)
                let render = compileToFunction(template);
                options.render = render;
            }
        }
        // options.render 就是渲染函数
        console.log('init render function',options.render)
        // 调用render方法 渲染成真实dom 替换掉页面的内容
        mountComponent(vm,el); // 组件的挂载流程
    }
}