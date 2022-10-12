//插件一般都是一个函数，需要调用一下才能用

export function initMixin(Vue) {        //这里的Vue是VUe构造函数
    Vue.prototype._init = function(options) {
        console.log(options);
        const vm = this     //this 都是指原型的实例
        vm.$options = options
    }
}