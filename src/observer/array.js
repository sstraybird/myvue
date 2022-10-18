let oldArrayPrototype = Array.prototype
export let arrayMethods = Object.create(oldArrayPrototype);
// arrayMethods.__proto__ = Array.prototype 继承

let methods = [
    'push',
    'shift',
    'unshift',
    'pop',
    'reverse',
    'sort',
    'splice'
]

methods.forEach(method =>{
    // 用户调用的如果是以上七个方法 会用我自己重写的，否则用原来的数组方法
    arrayMethods[method] = function (...args) { //  args 是参数列表 arr.push(1,2,3)
        console.log('数组发生变化')
        oldArrayPrototype[method].call(this,...args); // arr.push(1,2,3);
    }
})