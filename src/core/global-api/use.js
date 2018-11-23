/* @flow */

import {
    toArray
} from '../util/index'

export function initUse(Vue: GlobalAPI) {
    Vue.use = function(plugin: Function | Object) {
        const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
        if (installedPlugins.indexOf(plugin) > -1) {
            return this
        }

        // additional parameters
        /**
         * 类数组转为数组
         */
        const args = toArray(arguments, 1)
            /**
             * 向数组的首部添加一个元素
             */
        args.unshift(this)
        if (typeof plugin.install === 'function') {
            plugin.install.apply(plugin, args)
        } else if (typeof plugin === 'function') {
            plugin.apply(null, args)
        }
        installedPlugins.push(plugin)
        return this
    }
}