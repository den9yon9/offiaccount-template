import axios from 'axios'

export default {
    install(Vue) {
        // 不会变化的头参数
        axios.defaults.baseURL = 'http://xface.mindcar.cn/wxmp'
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.withCredentials = true;

        async function request({
            method = 'get', url, params, data, headers
        }) {
            // 会变化的头参数
            axios.defaults.headers.common['token'] = localStorage.getItem('token');
            // start loading
            try {
                let res = await axios({
                    method, url, params, data, headers
                })
                if (!res.data.success) throw new Error(res.data.msg)
                return res.data.result
            } catch (err) {
                alert(err.message)
                throw err
            } finally {
                // stop loading
            }
        }

        Vue.prototype.$http = {
            getOpenidByCode(params) {
                return request({
                    url: '/api/wechat/card/getOpenid',
                    params
                })
            }
        }
    }
}
