import Vue from './instance/index'
import {
    initGlobalAPI
} from './global-api/index'
import {
    isServerRendering
} from 'core/util/env'
import {
    FunctionalRenderContext
} from 'core/vdom/create-functional-component'
/***
 * 设置全局的属性
 */
initGlobalAPI(Vue)
    /**
     * 添加全局的属性，有关Object.defineProperty可以查看这篇博客
     * https: //segmentfault.com/a/1190000007434923
     */
Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
    get() {
        /* istanbul ignore next */
        /**
         * 这种return 的方式值得学习
         *  1 第一个为true,无论第二个true/false都会返回第二个，不用关心第二个值的布尔值，直接返回第二个值；
         *  2 第一个为false,直接return 这个值不会在走第二个值。
         */
        return this.$vnode && this.$vnode.ssrContext
    }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
    value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue