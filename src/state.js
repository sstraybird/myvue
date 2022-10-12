import {isFunction} from "./utils";
import { observe } from "./observer/index"; // node_resolve_plugin

export function initState(vm) { // 状态的初始化
    const opts = vm.$options;
    console.log("initSate",opts)
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

function initData(vm) { //
    let data = vm.$options.data; // vm.$el  vue 内部会对属性检测如果是以$开头 不会进行代理
    // vue2中会将data中的所有数据 进行数据劫持 Object.defineProperty
    // 这个时候 vm 和 data没有任何关系, 通过_data 进行关联
    data = vm._data = isFunction(data) ? data.call(vm) : data;//data可能是函数或者对象
    console.log("data",data)

    observe(data);
}
