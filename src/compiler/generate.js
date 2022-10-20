
// html字符串 =》 字符串  _c('div',{id:'app',a:1},'hello')

function genProps(attrs) { // [{name:'xxx',value:'xxx'},{name:'xxx',value:'xxx'}]
    let str = '';
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
        str += `${attr.name}:${JSON.stringify(attr.value)},`;
    }
    return `{${str.slice(0,-1)}}`
}

export function generate(el) { //  _c('div',{id:'app',a:1},_c('span',{},'world'),_v())
    // 遍历树 将树拼接成字符串
    let code = `_c('${el.tag}',${       //es6字符串
        el.attrs.length? genProps(el.attrs): 'undefined'
    })`;

    return code;
}