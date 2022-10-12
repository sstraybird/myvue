(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function isFunction(val) {
    return typeof val === 'function';
  }
  function isObject(val) {
    return _typeof(val) == 'object' && val !== null;
  }

  function observe(data) {
    // 如果是对象才观测
    if (!isObject(data)) {
      return;
    }
    // 默认最外层的data必须是一个对象
    console.log("observeData", data);
  }

  function initState(vm) {
    // 状态的初始化
    var opts = vm.$options;
    console.log("initSate", opts);
    if (opts.data) {
      initData(vm);
    }
    // if(opts.computed){
    //     initComputed();
    // }
    // if(opts.watch){
    //     initWatch();
    // }
  }

  function initData(vm) {
    //
    var data = vm.$options.data; // vm.$el  vue 内部会对属性检测如果是以$开头 不会进行代理
    // vue2中会将data中的所有数据 进行数据劫持 Object.defineProperty
    data = vm._data = isFunction(data) ? data.call(vm) : data; //data可能是函数或者对象
    console.log("data", data);
    observe(data);
  }

  //插件一般都是一个函数，需要调用一下才能用
  function initMixin(Vue) {
    //这里的Vue是VUe构造函数
    Vue.prototype._init = function (options) {
      console.log(options);
      var vm = this; //this 都是指原型的实例 就是在index.html new出的vm   这里赋值给vm方便阅读 var that = this;
      vm.$options = options; // 后面会对options进行扩展操作

      // 对数据进行初始化 watch computed props data ...
      initState(vm); // vm.$options.data  数据劫持
    };
  }

  function Vue(options) {
    //构造函数模拟类，类中写prototype比较怪，用function符合习惯
    // options 为用户传入的选项
    this._init(options); // 创造一个实列进行初始化操作，核心操作， 组件也需要初始化，组件也应该有个_init方法,所以把_init变成公共方法，_表示私有，约定，
    //this 谁new 就是谁，实例上在initMixin上加了_init方法
  }

  //拆分，把不同的功能拆分到不同的文件中，通过注入的方式来使用
  // 扩展原型的，
  initMixin(Vue); //在原型上添加_init方法， 组件也需要初始化，组件也应该有个_init方法,所以把_init变成公共方法
   //导出的会放到window下

  return Vue;

})));
//# sourceMappingURL=vue.js.map
