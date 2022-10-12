//插件一般都是一个函数，需要调用一下才能用

import {initState} from "./state";

export function initMixin(Vue) {        //这里的Vue是VUe构造函数
    Vue.prototype._init = function(options) {
        console.log(options);
        const vm = this     //this 都是指原型的实例 就是在index.html new出的vm   这里赋值给vm方便阅读 var that = this;
        vm.$options = options    // 后面会对options进行扩展操作

        // 对数据进行初始化 watch computed props data ...
        initState(vm); // vm.$options.data  数据劫持
    }
}