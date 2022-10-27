export function patch(oldVnode, vnode) {
    if(!oldVnode){
        return createElm(vnode); // 如果没有el元素，那就直接根据虚拟节点返回真实节点
    }


    if (oldVnode.nodeType == 1) {
        // 用vnode  来生成真实dom 替换原本的dom元素
        const parentElm = oldVnode.parentNode; // 找到他的父亲
        let elm = createElm(vnode); //根据虚拟节点 创建元素

        // 在第一次渲染后 是删除掉节点，下次在使用无法获取
        parentElm.insertBefore(elm, oldVnode.nextSibling);

        parentElm.removeChild(oldVnode);

        return elm
    }else{
        // 如果标签名称不一样 直接删掉老的换成新的即可
        if (oldVnode.tag !== vnode.tag) {
            // 可以通过vnode.el属性。获取现在真实的dom元素
            return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el);
        }

        // 如果两个虚拟节点是文本节点  比较文本内容 ... todo

        // 如果标签一样比较属性
    }
}
function patchProps(vnode, oldProps = {}) { // 初次渲染时可以调用此方法，后续更新也可以调用此方法
    let newProps = vnode.data || {};
    let el = vnode.el;
    // 直接用新的生成到元素上
    for (let key in newProps) {
        if (key === 'style') {
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName];
            }
        } else {
            el.setAttribute(key, newProps[key]);
        }
    }
}

// 创建真实节点的

function createComponent(vnode) {
    let i = vnode.data; //  vnode.data.hook.init
    if ((i = i.hook) && (i = i.init)) {
        i(vnode); // 调用init方法
    }
    if(vnode.componentInstance){ // 有属性说明子组件new完毕了，并且组件对应的真实DOM挂载到了componentInstance.$el
        return true;
    }

}

export function createElm(vnode) {
    let { tag, data, children, text, vm } = vnode
    if (typeof tag === 'string') { // 元素
        if (createComponent(vnode)) {
            // 返回组件对应的真实节点
            return vnode.componentInstance.$el;
        }

        vnode.el = document.createElement(tag); // 虚拟节点会有一个el属性 对应真实节点
        patchProps(vnode);
        children.forEach(child => {
            vnode.el.appendChild(createElm(child))
        });
    } else {
        vnode.el = document.createTextNode(text);
    }
    return vnode.el
}