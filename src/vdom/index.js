export function createElement(vm, tag, data = {}, ...children) {
    return vnode(vm, tag, data, data.key, children, undefined);
}

export function createTextElement(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
}

function vnode(vm, tag, data, key, children, text) {        //data属性数据 key用于vnode更新 children子节点  text 文本
    return {
        vm,
        tag,
        data,
        key,
        children,
        text,
        // .....
    }
}