#Vue2中的问题
1、递归对属性进行劫持监控，性能差，vue有提升
2、使用vm._data.xx.xx增加原data中没有的数据，不能进行劫持，可以往已存在的数据中添加数据，改变已经存在的数据。vue3解决

# 几点总结
1、将带有模板的html转换成ast，再转成包含真实数据的虚拟dom，再转成带有真实数据的html
2、创建虚拟节点取vm中的数据，然后虚拟节点生成真实节点
3、dep的作用：每个属性都要存着依赖收集的对象，不能直接存在属性上，要存在属性关联的属性上
4、一个组件对应一个watcher，一个属性对应一个dep
5、数组更新原理：数组本身有dep属性，当去取数组值时数组本身会把watcher存起来，当调用数组的push等方法，会把数组本身的watcher执行
数组和对象都加dep
observeData {arr: Array(3), age: 19}

data111 {arr: Array(3), age: 19}

{arr: Array(3), age: 19}.__ob__ = this

observeData (3) [1, 2, 3]
data111 (3) [1, 2, 3]

[1,2,3].__ob__ = this

this.dep = new Dep()