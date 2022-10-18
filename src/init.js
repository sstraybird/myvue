//插件一般都是一个函数，需要调用一下才能用

import {initState} from "./state";
import {compileToFunction} from "./compiler/index";

export function initMixin(Vue) {        //这里的Vue是VUe构造函数
    Vue.prototype._init = function(options) {
        console.log(options);
        const vm = this     //this 都是指原型的实例 就是在index.html new出的vm   这里赋值给vm方便阅读 var that = this;
        vm.$options = options    // 后面会对options进行扩展操作

        // 对数据进行初始化 watch computed props data ...
        initState(vm); // vm.$options.data  数据劫持

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
    }
}