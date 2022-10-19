const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // a-1123_asd div 标签名    * 0个或多个
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //  使用正则的分组，标签名的捕获，用来获取的标签名的 match后的索引为1的
                                                    // ？表示可有可无 aa:xxx 命名空间：标签名 <aa:xxx></aa:xxx> ?:只匹配不捕获
                                                    // 捕获到的被包进小括号里


const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配开始标签的    <xxx
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配闭合标签的 </xxx>
//           aa  =   "  xxx "  | '  xxxx '  | xxx
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // a=b  a="b"  a='b'
const startTagClose = /^\s*(\/?)>/; //     />   <div/>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{aaaaa}}


// html字符串解析成 对应的脚本来触发 tokens  <div id="app"> {{name}}</div>


export function compileToFunction(template) {
    console.log('compileToFunction template',template)
    let r = '<xxxx></xxxx>'.match(new RegExp(qnameCapture))
    console.log(r)
}
