import wx from 'jweixin-latest'
export default {
    async install(Vue) {

        Vue.prototype.$wx = async function (jsApiList, ifUpdateTicket = false) {
            let flag = true
            let { appId, timestamp, nonceStr, signature } = await Vue.prototype.$http.genJSSDKConfig({ url: location.href.split('#')[0], ifUpdateTicket })
            return await new Promise(resolve => {
                wx.config({
                    appId,
                    timestamp,
                    nonceStr,
                    signature,
                    jsApiList
                })

                // wx.ready回调无论是否config成功都会调用,wx.error回调只有在config失败时回调,当只注册了一个wx.error回调函数和一个wx.ready回调函数时wx.error函数一定会先执行,注册了多个回调函数时wx.ready和wx.error执行顺序不明
                wx.error(function ({ errMsg }) {
                    flag = false
                })

                wx.ready(async function () {
                    if (flag) {
                        resolve(wx)
                    } else {
                        resolve(await Vue.prototype.$wx(jsApiList, true))
                    }
                })
            })
        }
    }
}