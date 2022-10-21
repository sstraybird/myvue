
class Watcher {
    // vm,updateComponent,()=>{ console.log('更新视图了')},true
    constructor(vm,exprOrFn,cb,options){
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        this.cb = cb;
        this.options = options;

        // 默认应该让exprOrFn执行  exprOrFn 方法做了什么是？ render （去vm上了取值）

        this.getter = exprOrFn;

        this.get(); // 默认初始化 要取值
    }
    get(){ // 稍后用户更新 时 可以重新调用getter方法
        this.getter(); // render() 方法会去vm上取值 vm._update(vm._render)
    }
}

export default Watcher
