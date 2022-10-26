import {isObject, isReservedTag} from "../utils";

export function createElement(vm, tag, data = {}, ...children) {
    //_c('div',xxx,_c('my-component'))

    // 如果tag是组件 应该渲染一个组件的vnode
    if (isReservedTag(tag)) {
        //data是属性
        return vnode(vm, tag, data, data.key, children, undefined);
    } else {
        const Ctor = vm.$options.components[tag]

        return createComponent(vm, tag, data, data.key, children, Ctor);
    }
}

// 创建组件的虚拟节点, 为了区分组件和元素  data.hook  /  componentOptions
function createComponent(vm, tag, data, key, children, Ctor) {

    // 组件的构造函数
    if(isObject(Ctor)){
        Ctor = vm.$options._base.extend(Ctor); // Vue.extend
    }
    console.log('Ctor data key children ',Ctor,data,key,children)
    data.hook = { // 等会渲染组件时 需要调用此初始化方法
        init(vnode){
            let vm = vnode.componentInstance =  new Ctor({_isComponent:true}); // new Sub 会用此选项和组件的配置进行合并
            vm.$mount(); // 组件挂载完成后 会在 vnode.componentInstance.$el => <button>
        }
    }
    console.log('component vnode',vnode(vm,`vue-component-${tag}`,data,key,undefined,undefined,{Ctor,children}))
    // 组件没有子节点，只有插槽
    return vnode(vm,`vue-component-${tag}`,data,key,undefined,undefined,{Ctor,children})
}

export function createTextElement(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
}

function vnode(vm, tag, data, key, children, text,componentOptions) {        //data属性数据 key用于vnode更新 children子节点  text 文本
    return {
        vm,
        tag,
        data,
        key,
        children,
        text,
        componentOptions
        // .....
    }
}