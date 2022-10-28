import { initMixin } from "./init";
import {renderMixin} from "./render";
import {lifecycleMixin} from "./lifecycle";
import {stateMixin} from "./state";
import {initGlobalApi} from "./global-api/index.js";

function Vue(options) {     //构造函数模拟类，类中写prototype比较怪，用function符合习惯
    // options 为用户传入的选项
    this._init(options); // 创造一个实列进行初始化操作，核心操作， 组件也需要初始化，组件也应该有个_init方法,所以把_init变成公共方法，_表示私有，约定，
                        //this 谁new 就是谁，实例上在initMixin上加了_init方法
}

//拆分，把不同的功能拆分到不同的文件中，通过注入的方式来使用
// 扩展原型的，
initMixin(Vue);     //在原型上添加_init方法， 组件也需要初始化，组件也应该有个_init方法,所以把_init变成公共方法
renderMixin(Vue); // _render
lifecycleMixin(Vue); // _update
stateMixin(Vue);

// 在类上扩展的 Vue.mixin
initGlobalApi(Vue);


import { compileToFunction } from './compiler/index.js';
import { createElm, patch } from './vdom/patch.js'
// diff 核心
let oldTemplate = `<div style="color: red;background: blue" a="1">
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li>D</li>
</div>`          // 在最外层创建了一个根节点 vue3可以
let vm1 = new Vue({data:{message:'hello world'}})
const render1 = compileToFunction(oldTemplate)
const oldVnode = render1.call(vm1)
console.log('oldVnode',oldVnode)
document.body.appendChild(createElm(oldVnode))

// v-if   v-else
let newTemplate = `<div style="color: blue" b="2">
    <li>A</li>
    <li>B</li>
    <li>C</li>
</div>`
let vm2 = new Vue({data:{message:'zf'}})
const render2 = compileToFunction(newTemplate)
const newVnode = render2.call(vm2)
// 根据新的虚拟节点更新老的节点，老的能复用尽量复用
patch(oldVnode,newVnode)

export default Vue    //导出的会放到window下