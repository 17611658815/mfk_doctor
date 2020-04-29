const app = getApp()
const utils = require('../utils/util.js')
/**
 * 封装post方法
 * @param url
 * @param data
 * @returns {Promise}
 */
const post = (url, data) => {
    var promise = new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: data,
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    resolve(res);
                } else {
                    reject({ error: '网络错误', code: 500 });
                }
            },
            fail: function() {
                reject({ error: '网络错误', code: 0 });
            }
        })
    });
    return promise;
}
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
const get = (url, data) => {
    var promise = new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: data,
            header: {
                'content-type': 'application/json',
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    resolve(res);
                } else {
                    reject({ error: '网络错误', code: 500 });
                }
            },
            fail: function(e) {
                reject({ error: '网络错误', code: 0 });
            }
        })
    });
    return promise;
}

module.exports = {
    post,
    get,
}