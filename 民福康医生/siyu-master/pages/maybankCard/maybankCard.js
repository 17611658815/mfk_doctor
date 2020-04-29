// pages/maybankCard/maybankCard.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bankMsg:[],
        phone:'',//用户手机号
        userid:"",//用户id
        flag:true,
        name:'',//姓名
        banekNum: '',//银行卡号
        banekName: '',//银行全称
        idCard: '',//身份证号
        bank_status:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var userinfo = wx.getStorageSync('userinfo') || null;
        var phone = wx.getStorageSync('phone') || userinfo.phone;
        var uid = wx.getStorageSync('uid') || 0;
        this.setData({
            userid: userinfo.id || uid,
            phone: phone,
            bank_status: app.globalData.bank_status
        })
        this.getBankInfo()
    },
    // 获取银行卡信息
    getBankInfo(){
        var that = this;
        var params = {
            appid: app.globalData.appid,//小程序id
            userid: that.data.userid,//用户id
        };
        app.net.$Api.getBankInfo(params).then((res) => {
            that.setData({
                name: res.data.data.name || "",//姓名
                banekNum: res.data.data.code || "",//银行卡号
                banekName: res.data.data.bank_name || "",//银行全称
                idCard: res.data.data.identity || "",//身份证号
            })
        })
    },
    changeInfo(){
        this.setData({
            name: "",//姓名
            banekNum:  "",//银行卡号
            banekName:  "",//银行全称
            idCard:  "",//身份证号
        })
    },
    formSubmit: function (e) {
        let that = this;
        if (e.detail.value.name ==""){
            app.alert("请输入收款人姓名")
            return;
        }
        if (e.detail.value.banekNum.length < 16) {
            app.alert("请输入正确的银行卡号")
            return;
        }
        if (e.detail.value.banekNum ==""){
            app.alert("请输入银行卡账号")
            return;
        }
        if (e.detail.value.banekName ==""){
            app.alert("请输入开户行全称")
            return;
        }
        if (e.detail.value.idCard.length  !== 18) {
            app.alert("请输入正确的身份证号")
            return;
        }
        if (e.detail.value.idCard ==""){
            app.alert("请输入收款人身份证号")
            return;
        }
        this.setData({
            name: e.detail.value.name,//姓名
            banekNum: e.detail.value.banekNum,//银行卡号
            banekName: e.detail.value.banekName,//银行全称
            idCard: e.detail.value.idCard,//身份证号
            flag:false
        })
        var params = {
            appid: app.globalData.appid,//小程序id
            userid: that.data.userid,//用户id
            bank_name: e.detail.value.banekName,//开户行
            identity: e.detail.value.idCard,//身份证
            mobile: "",//银行预留手机号
            code: e.detail.value.banekNum,//银行卡号
            name: e.detail.value.name,//医生姓名
            phone: that.data.phone,//手机号
        };
        app.net.$Api.setBankInfo(params).then((res) => {
                console.log(res.data);
        })
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    goindex(){
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    goCenter(){
        wx.reLaunch({
            url: '/pages/center/center',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})