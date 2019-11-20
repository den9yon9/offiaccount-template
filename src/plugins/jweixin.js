import wx from 'jweixin-latest'
export default {
    async install(Vue, { jsApiList }) {
        let { result: { appId, timestamp, nonceStr, signature } } = await Vue.prototype.$http.genJSSDKConfig({ url: location.href.split('#')[0] })
        wx.config({
            appId,
            timestamp,
            nonceStr,
            signature,
            jsApiList
        })

        wx.ready(function () {
            Vue.prototype.$wx = wx
        })

        wx.error(function (err) {
            alert(err)
        })
    }
}