import {patch} from "./vdom/patch";

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function(vnode) {
        console.log('_update',vnode)
        // 既有初始化 又有更新
        const vm = this;

        patch(vm.$el, vnode);       //比较前后虚拟节点的差异,将虚拟节点创建成真实节点之后 替换掉div
    }
}

export function mountComponent(vm,el) {
    console.log(vm,el)
    // 更新函数 数据变化后 会再次调用此函数
    let updateComponent = () => {
        // 调用render函数，生成虚拟dom
        vm._update(vm._render()); // 后续更新可以调用updateComponent方法
        // 用虚拟dom 生成真实dom
    }
    updateComponent();
}