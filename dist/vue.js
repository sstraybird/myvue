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
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function isFunction(val) {
    return typeof val === 'function';
  }
  function isObject(val) {
    return _typeof(val) == 'object' && val !== null;
  }

  var oldArrayPrototype = Array.prototype;
  var arrayMethods = Object.create(oldArrayPrototype);
  // arrayMethods.__proto__ = Array.prototype 继承

  var methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    // 用户调用的如果是以上七个方法 会用我自己重写的，否则用原来的数组方法
    arrayMethods[method] = function () {
      var _oldArrayPrototype$me;
      //  args 是参数列表 arr.push(1,2,3)
      console.log('数组发生变化');
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      (_oldArrayPrototype$me = oldArrayPrototype[method]).call.apply(_oldArrayPrototype$me, [this].concat(args)); // arr.push(1,2,3);
      var inserted;
      var ob = this.__ob__; // 根据当前数组获取到observer实例
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args; // 就是新增的内容
          break;
        case 'splice':
          inserted = args.slice(2);
      }
      // 如果有新增的内容要进行继续劫持, 我需要观测的数组里的每一项，而不是数组
      // 更新操作.... todo...
      if (inserted) ob.observeArray(inserted);

      // arr.push(1,2)
      // arr.splice(0,1,xxxx)
    };
  });

  // 1.如果数据是对象 会将对象不停的递归 进行劫持
  // 2.如果是数组，会劫持数组的方法，并对数组中不是基本数据类型的进行检测

  // 检测数据变化 类有类型 ， 对象无类型
  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);
      // 对对象中的所有属性 进行劫持
      console.log('data111', data);
      Object.defineProperty(data, '__ob__', {
        value: this,
        enumerable: false // 不可枚举的   防止walk循环到此属性从而出现死循环
      });
      // data.__ob__ = this; // 所有被劫持过的属性都有__ob__
      if (Array.isArray(data)) {
        // 数组劫持的逻辑
        // 对数组原来的方法进行改写， 切片编程  高阶函数
        data.__proto__ = arrayMethods;
        // 如果数组中的数据是对象类型，需要监控对象的变化
        this.observeArray(data);
      } else {
        this.walk(data); //对象劫持的逻辑
      }
    }
    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(data) {
        // 对我们数组的数组 和 数组中的对象再次劫持 递归了
        // [{a:1},{b:2}]
        data.forEach(function (item) {
          return observe(item);
        });
      }
    }, {
      key: "walk",
      value: function walk(data) {
        // 对象
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);
    return Observer;
  }(); // vue2 会对对象进行遍历 将每个属性 用defineProperty 重新定义 性能差
  function defineReactive(data, key, value) {
    // value有可能是对象
    observe(value); // 本身用户默认值是对象套对象 需要递归处理 （性能差）
    Object.defineProperty(data, key, {
      get: function get() {
        console.log('get', data, key);
        return value;
      },
      set: function set(newV) {
        observe(newV); // 如果用户赋值一个新对象 ，需要将这个对象进行劫持
        value = newV;
      }
    });
  }
  function observe(data) {
    // 如果是对象才观测
    if (!isObject(data)) {
      return;
    }
    if (data.__ob__) {
      //如果data已经被观测过就不用再观测了
      return;
    }
    // 默认最外层的data必须是一个对象
    console.log("observeData", data);
    // 默认最外层的data必须是一个对象
    return new Observer(data);
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

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }
  function initData(vm) {
    //
    var data = vm.$options.data; // vm.$el  vue 内部会对属性检测如果是以$开头 不会进行代理
    // vue2中会将data中的所有数据 进行数据劫持 Object.defineProperty
    // 这个时候 vm 和 data没有任何关系, 通过_data 进行关联
    data = vm._data = isFunction(data) ? data.call(vm) : data; //data可能是函数或者对象
    console.log("data", data);

    // 用户去vm.xxx => vm._data.xxx
    for (var key in data) {
      // vm.name = 'xxx'  vm._data.name = 'xxx'
      proxy(vm, '_data', key);
    }
    observe(data);
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // a-1123_asd div 标签名    * 0个或多个
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //  使用正则的分组，标签名的捕获，用来获取的标签名的 match后的索引为1的
  // ？表示可有可无 aa:xxx 命名空间：标签名 <aa:xxx></aa:xxx> ?:只匹配不捕获
  // 捕获到的被包进小括号里

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 匹配开始标签的    <xxx

  function parserHTML(html) {
    function advance(len) {
      html = html.substring(len);
    }
    function parseStartTag() {
      var start = html.match(startTagOpen);
      console.log('start', start);
      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);
        console.log('html', html);
      }
      return false;
    }
    while (html) {
      // 看要解析的内容是否存在，如果存在就不停的解析
      var textEnd = html.indexOf('<'); // 当前解析的开头
      console.log('textEnd', textEnd);
      if (textEnd == 0) {
        var startTagMatch = parseStartTag(); // 解析开始标签
        break;
      }
    }
  }
  // html字符串解析成 对应的脚本来触发 tokens  <div id="app"> {{name}}</div>

  function compileToFunction(template) {
    console.log('compileToFunction template', template);
    var r = '<xxxx></xxxx>'.match(new RegExp(qnameCapture));
    console.log(r);

    //开源库htmlparser2可以完成此功能
    var root = parserHTML(template);
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

      if (vm.$options.el) {
        // 将数据挂载到这个模板上
        vm.$mount(vm.$options.el);
      }
    };
    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el);
      console.log('el', el);
      vm.$el = el;
      // 把模板转化成 对应的渲染函数 =》 虚拟dom概念 vnode =》 diff算法 更新虚拟dom =》 产生真实节点，更新
      if (!options.render) {
        // 没有render用template，目前没render
        var template = options.template;
        if (!template && el) {
          // 用户也没有传递template 就取el的内容作为模板
          template = el.outerHTML;
          console.log('template', template);
          var render = compileToFunction(template);
          options.render = render;
        }
      }
      // options.render 就是渲染函数
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
