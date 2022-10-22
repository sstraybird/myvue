export function isFunction(val) {
    return typeof val === 'function';
}

export function isObject(val) {
    return typeof val == 'object' && val !== null

}

const callbacks = [];

function flushCallbacks() {
    callbacks.forEach(cb => cb());
    waiting = false
}
let waiting = false;
export function nextTick(cb) {
    callbacks.push(cb); // flushSchedulerQueue / userCallback

    if (!waiting) {
        setTimeout(flushCallbacks,0); // vue2 中考虑了兼容性问题 vue3 里面不在考虑兼容性问题
        waiting = true;
    }
}