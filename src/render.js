export function renderMixin(Vue){

    Vue.prototype._render = function(){
        console.log('_render')
    }
}