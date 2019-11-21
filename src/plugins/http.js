import axios from 'axios'

export default {
    install(Vue) {
        // 不会变化的头参数
        axios.defaults.baseURL = 'http://172t8v1421.imwork.net/sanwazi'
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
                return res.data
            } catch (err) {
                alert(err.message)
                throw err
            } finally {
                // stop loading
            }
        }

        Vue.prototype.$http = {
            async genJSSDKConfig(data) {
                return await request({
                    url: '/weixin/offiaccount/genJSSDKConfig',
                    method: 'post',
                    data
                })
            }
        }
    }
}
