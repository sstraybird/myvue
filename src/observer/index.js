import {isObject} from "../utils";

export function observe(data) {
    // 如果是对象才观测
    if (!isObject(data)) {
        return;
    }
    // 默认最外层的data必须是一个对象
    console.log("observeData",data)
}