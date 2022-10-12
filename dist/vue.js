(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    //插件一般都是一个函数，需要调用一下才能用

    function initMixin(Vue) {
      //这里的Vue是VUe构造函数
      Vue.prototype._init = function (options) {
        console.log(options);
      };
    }

    function Vue(options) {
      //构造函数模拟类，类中写prototype比较怪，用function符合习惯
      // options 为用户传入的选项
      this._init(options); // 初始化操作，核心操作， 组件也需要初始化，组件也应该有个_init方法,所以把_init变成公共方法，_表示私有，约定，
    }

    //拆分，把不同的功能拆分到不同的文件中，通过注入的方式来使用
    // 扩展原型的，
    initMixin(Vue); //在原型上添加_init方法， 组件也需要初始化，组件也应该有个_init方法,所以把_init变成公共方法
     //导出的会放到window下

    return Vue;

})));
//# sourceMappingURL=vue.js.map
