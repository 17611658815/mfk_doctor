// pages/addadept/addadept.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        adeptList:[],
        docinfo: {},
        adeptInfo: [], //擅长疾病
        adeptInfo2: [], //擅长疾病
        inpval: "",
        length: '',
        docrot_id: '' ,
        // 暂无您擅长疾病问题~您可疾病
        illness_t:'',
        noadep:false
    },

    onLoad: function(options) {
        var that = this
        var userinfo = wx.getStorageSync('userinfo') || {};
        var phone = wx.getStorageSync('phone')
        that.setData({
            doctor_id: app.globalData.docrot_id
        })
        that.getDoctorIllness(app.globalData.docrot_id)
    },
    // 获取擅长疾病
    getDoctorIllness(doctor_id) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.docrot_id = doctor_id;
        app.net.$Api.getDoctorIllness(params).then((res) => {
            console.log(res.data.list, 121)
            that.setData({
                adeptInfo: res.data.list,
                adeptInfo2: res.data.list,
                adeptArrlength: res.data.list.length,
            })
            console.log(that.data.adeptArr)
        })
    },
    // 获取擅长疾病
    setDoctorIllness() {
        let that = this;
        let illness = []
        that.data.adeptInfo.forEach(item =>{
            illness.push(item.id)
        })
        let params = {
            appid: app.globalData.appid,
            docrot_id: that.data.doctor_id,
            illness: illness
        }
        app.net.$Api.setDoctorIllness(params).then((res) => {
            wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 2000,
                success: function () {
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 2000)
                }
            })
        })
    },
    // 添加擅长
    addadep(e) {
        var that = this;
        if (e.detail.value.length>0){
            let params = {
                appid: app.globalData.appid,
                name: e.detail.value
            }
            clearTimeout(that.data.illness_t);
            that.data.illness_t = setTimeout(function () {
                app.net.$Api.getIndexIllness(params).then((res) => {
                    if (res.data.list.length>0){
                        that.setData({
                            adeptList: res.data.list, 
                            noadep: false

                        })
                    }else{
                        that.setData({
                            noadep: true
                        })
                        
                    }
                })
            }, 1000);
           
        } else if (e.detail.value.length == 0){
            that.setData({
                adeptList: [],
                noadep: false
            })
        } 
    },
    addPuhs(e) {
        var that = this;
        let id = e.currentTarget.dataset.id;
        let name = e.currentTarget.dataset.name;
        that.data.adeptInfo.push({
            id: id,
            name: name
        })
        that.setData({
            adeptInfo: that.data.adeptInfo,
            inpval: '',
            adeptList: []
        })
    },
    deladep(e) {
        var that = this;
        var index = e.currentTarget.dataset.index
        var adep = that.data.adeptInfo;
        if (that.data.adeptInfo.length>1){
            adep.splice(index, 1);
        }else{
            app.alert('至少要保留一种擅长疾病哟~')
        }
        that.setData({
            adeptInfo: adep
        })
    },
})