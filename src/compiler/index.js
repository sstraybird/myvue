import {parserHTML} from "./parser";


export function compileToFunction(template) {
    //开源库htmlparser2可以完成此功能
    let root = parserHTML(template)
    console.log('root',root)
}
