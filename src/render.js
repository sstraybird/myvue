import {createElement,createTextElement} from "./vdom/index";

export function renderMixin(Vue){
    Vue.prototype._c = function(){ // createElement
        console.log('_c arguments:',...arguments)
        return createElement(this,...arguments)
    }
    Vue.prototype._v = function (text) { // createTextElement
        console.log('_v text:',text)
        return createTextElement(this,text)
    }
    Vue.prototype._s = function(val){ // stringify
        console.log('_s val:',val)
        if(typeof val == 'object') return JSON.stringify(val)
        return val;
    }
    Vue.prototype._render = function(){
        console.log('_render')
        const vm = this;
        let render =  vm.$options.render; // 就是我们解析出来的render方法，同时也有可能是用户写的
        let vnode =  render.call(vm);
        return vnode;
    }
}