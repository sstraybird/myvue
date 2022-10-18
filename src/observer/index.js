import {isObject} from "../utils";
import {arrayMethods} from "./array";

// 检测数据变化 类有类型 ， 对象无类型
class Observer {
    constructor(data) { // 对对象中的所有属性 进行劫持
        console.log('data111',data)
        if(Array.isArray(data)) {
            // 数组劫持的逻辑
            // 对数组原来的方法进行改写， 切片编程  高阶函数
            data.__proto__ = arrayMethods;
        }else {
            this.walk(data); //对象劫持的逻辑
        }
    }
    walk(data) { // 对象
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key]);
        })
    }
}

// vue2 会对对象进行遍历 将每个属性 用defineProperty 重新定义 性能差
function defineReactive(data,key,value){ // value有可能是对象
    observe(value); // 本身用户默认值是对象套对象 需要递归处理 （性能差）
    Object.defineProperty(data,key,{
        get(){
            return value
        },
        set(newV){
            observe(newV); // 如果用户赋值一个新对象 ，需要将这个对象进行劫持
            value = newV;
        }
    })
}

export function observe(data) {
    // 如果是对象才观测
    if (!isObject(data)) {
        return;
    }
    // 默认最外层的data必须是一个对象
    console.log("observeData",data)
    // 默认最外层的data必须是一个对象
    return new Observer(data)
}