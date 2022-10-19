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

function start(tagName, attributes) {
    console.log('start',tagName,attributes)
}

function end(tagName) {
    console.log('end tagName',tagName)
}

function chars(text) {
    console.log('text',text)
}
function parserHTML(html) {
    function advance(len) {
        html = html.substring(len);
    }
    function parseStartTag() {
        const start = html.match(startTagOpen);
        console.log('start',start)
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length);
            console.log('html',html)
            let end;
            // 如果没有遇到标签结尾就不停的解析
            let attr;

            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                console.log('attr',attr)
                match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] })
                advance(attr[0].length)
            }
            console.log('end',end)
            if (end) {
                advance(end[0].length);
            }
            return match;
        }
        return false
    }

    while (html) { // 看要解析的内容是否存在，如果存在就不停的解析
        let textEnd = html.indexOf('<'); // 当前解析的开头
        console.log('textEnd',textEnd)
        if (textEnd == 0) {
            const startTagMatch = parseStartTag(html); // 解析开始标签
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue;
            }
            const endTagMatch = html.match(endTag);
            if (endTagMatch) {
                end(endTagMatch[1]);
                advance(endTagMatch[0].length);
                continue;
            }
        }
        let text; // //  </div>
        if (textEnd > 0) {
            text = html.substring(0, textEnd)
        }
        if (text) {
            chars(text);
            advance(text.length);
        }
    }
}
// html字符串解析成 对应的脚本来触发 tokens  <div id="app"> {{name}}</div>

export function compileToFunction(template) {
    console.log('compileToFunction template',template)
    let r = '<xxxx></xxxx>'.match(new RegExp(qnameCapture))
    console.log(r)

    //开源库htmlparser2可以完成此功能
    let root = parserHTML(template)

}
