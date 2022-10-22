import { initMixin } from "./init";
import {renderMixin} from "./render";
import {lifecycleMixin} from "./lifecycle";
import {stateMixin} from "./state";

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
export default Vue    //导出的会放到window下