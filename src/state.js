import {isFunction} from "./utils";
import { observe } from "./observer/index";
import Watcher from "./observer/watcher"; // node_resolve_plugin

export function stateMixin(Vue) {
    Vue.prototype.$watch = function(key, handler, options = {}) {
        options.user = true; // 是一个用户自己写的watcher

        // vm,name,用户回调，options.user
        let watcher = new Watcher(this, key, handler, options);

        if(options.immediate){
            handler(watcher.value)
        }
    }
}

export function initState(vm) { // 状态的初始化
    const opts = vm.$options;
    console.log("initSate",opts)
    if (opts.data) {
        initData(vm);
    }
    if(opts.computed){
        initComputed(vm, opts.computed);
    }
    if(opts.watch){     // 初始化watch
        initWatch(vm, opts.watch)
    }
}

function proxy(vm,source,key){
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key];
        },
        set(newValue){
            vm[source][key] = newValue
        }
    })
}

function initData(vm) { //
    let data = vm.$options.data; // vm.$el  vue 内部会对属性检测如果是以$开头 不会进行代理
    // vue2中会将data中的所有数据 进行数据劫持 Object.defineProperty
    // 这个时候 vm 和 data没有任何关系, 通过_data 进行关联
    data = vm._data = isFunction(data) ? data.call(vm) : data;//data可能是函数或者对象
    console.log("data",data)

    // 用户去vm.xxx => vm._data.xxx
    for(let key in data){ // vm.name = 'xxx'  vm._data.name = 'xxx'
        proxy(vm,'_data',key);
    }
    observe(data);
}

function initWatch(vm, watch) { // Object.keys
    for (let key in watch) {
        let handler = watch[key];

        if (Array.isArray(handler)) {
            for (let i = 0; i < handler.length; i++) {
                createWatcher(vm, key, handler[i])
            }
        } else {
            createWatcher(vm, key, handler)
        }

    }
}
function createWatcher(vm, key, handler) {
    return vm.$watch(key, handler)
}

function initComputed(vm, computed) {

    const watchers = vm._computedWatchers = {}
    for (let key in computed) {
        // 校验
        const userDef = computed[key];
        // 依赖的属性变化就重新取值 get
        let getter = typeof userDef == 'function' ? userDef : userDef.get;

        // 每个就算属性本质就是watcher
        // 将watcher和 属性 做一个映射
        watchers[key] = new Watcher(vm, getter, () => {}, { lazy: true }); // 默认不执行

        // 将key 定义在vm上
        defineComputed(vm, key, userDef);
    }
}

function defineComputed(vm, key, userDef) {
    let sharedProperty = {};
    if (typeof userDef == 'function') {
        sharedProperty.get = userDef;
    } else {
        sharedProperty.get = userDef.get
        sharedProperty.set = userDef.set ;
    }
    Object.defineProperty(vm, key, sharedProperty); // computed就是一个defineProperty
}
