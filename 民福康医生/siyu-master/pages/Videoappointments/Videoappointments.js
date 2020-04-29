// pages/Videoappointments/Videoappointments.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow: true,
        ishide: 'none', //模态窗口
        videoList: [],
        doctorInfo: {},
        userid: '',
        cooperation: '11',
        code: true,
        code2: true,
        err: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo') || null;
        var phone = wx.getStorageSync('phone')
        var userid = (userinfo != undefined) ? userinfo.id : 0;
        if (userinfo == null) {
            wx.redirectTo({
                url: '../login/login',
            })
        } else if (userinfo != undefined && userinfo.mfk_doctor_id == undefined) { //信息审核中
            that.getCode(phone)
        } else {
            that.setData({
                userid: userid
            })
        }
        that.getDocterMsg(phone)
        that.getVideoList()
    },
    // 获取医生信息
    getDocterMsg(phone) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        app.net.$Api.getDocterMsg(params).then((res) => {
            console.log(res.data.msg.cooperation)
            that.setData({
                cooperation: res.data.msg.cooperation || ''
            })
        })
    },
    // 重新上传三证
    goUploadagain: function() {
        wx.navigateTo({
            url: '../Uploadagain/Uploadagain',
        })
    },
    //判断登录状态
    getCode(phone) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        app.net.$Api.getCode(params).then((res) => {
            console.log(res.data.code)
            if (res.data.code == 301) {
                that.setData({
                    code: false
                })
                console.log('审核中')
            } else if (res.data.code == 200) {
                console.log("成功")
                app.globalData.user = res.data.msg;
                wx.setStorageSync("userinfo", app.globalData.user);
                that.onLoad()
            } else if (res.data.code == 302) {
                console.log('审核失败')
                that.setData({
                    code2: false,
                    err: res.data.msg
                })
            } else if (res.data.code == 500) {
                app.globalData.user = ''
                wx.removeStorageSync('userinfo')
                wx.reLaunch({
                    url: '/pages/login/login',
                })
            }
        })
    },
    //预约拍摄
    appointment() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        app.net.$Api.saveDoctorAppointment(params).then((res) => {
            this.setData({
                ishide: 'none',
            })
            app.alert(res.data.msg)
        })
    },
    getVideoList() {
        let that = this,
            params = new Object();
            params.appid = app.globalData.appid;
        app.net.$Api.getHotVideoList(params).then((res) => {
            that.setData({
                videoList: res.data.data,
            })
        })
    },
    goVideo(e) {
        var that = this
        console.log(e)
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/video/video?videoId=' + id,
        })
    },
    addApply() {
        console.log(this.data.userid)
        if (this.data.userid == undefined) {
            app.alert("您的资质正在审核中,暂无法预约拍摄")
            return
        } else {
            this.setData({
                ishide: 'block',
            })
        }
    },
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    //取消预约
    deselect() {
        this.setData({
            ishide: 'none',
        })
    },
    //提交申请
    submit() {
        this.appointment()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    loadMore() {
        this.setData({
            isShow: false
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        var that = this;
        return {
            title: "民福康医生-视频拍摄",
            path: '/pages/Videoappointments/Videoappointments',
        }
    }
})