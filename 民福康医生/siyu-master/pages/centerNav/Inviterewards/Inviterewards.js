// pages/centerNav/Inviterewards/Inviterewards.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        textArr:['本月邀请奖励','累计邀请好友','累计邀请奖励'],
        showToast:false,
        flag:false,//是否邀请好友
        page:1,
        doctorId:'',
        doctorName:'',
        count:'',
        invitationNum:0,//邀请医生数量
        doctorList:[],//专家列表
        profit:'0.00',//奖励金额
        mouthProfit:'0.00',//累计邀请奖励
        on_off:false,
        is:'',
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || null;
        var phone = wx.getStorageSync('phone')
        that.getDocterMsg(phone)
    },
    // 判断来源
    getDocterMsg(phone) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        app.net.$Api.getDocterMsg(params).then((res) => {
            console.log(res)
                if (res.data.is == "expert") {
                    console.log('1111')
                    that.setData({
                        is: res.data.is,
                        doctorId: res.data.msg.mfk_doctor_id,
                        doctorName: res.data.msg.name,
                    })
                    that.getInvitationProfit()
                } else {    
                    that.setData({
                        is: res.data.is,
                        doctorId: res.data.msg.id,
                        doctorName: res.data.msg.name,
                    })
                    that.getChannelInvitationProfit()
                }


        })
    },
    getInvitationProfit() {
        console.log('医生')
        let that = this;
        let params = {
            appid: app.globalData.appid,
            doctor_id: that.data.doctorId,
            page: that.data.page
        }
        app.net.$Api.getInvitationProfit(params).then((res) => {
            console.log(res)
            that.data.invitationNum = res.data.data.invitationNum;
            that.data.profit = res.data.data.profit || that.data.profit;
            if (that.data.page == 1){
                that.setData({
                    invitationNum: res.data.data.invitationNum || 0,
                    profit: res.data.data.profit || "0.00",
                    mouthProfit: res.data.data.mouthProfit || "0.00",
                })
            }
            if (res.data.data.invitationNum == 0 && that.data.page == 1) {
                that.data.flag = true
            }
            if (res.data.data.doctorList.length > 0) {
                res.data.data.doctorList.forEach(val => {
                    that.data.doctorList.push(val)
                })
            } else {
                that.data.on_off = true
            }
            that.setData({
                doctorList: that.data.doctorList,
                on_off: that.data.on_off,
                invitationNum: that.data.invitationNum,
                profit: that.data.profit,
                mouthProfit: that.data.mouthProfit,
                flag: that.data.flag
            })
            console.log(that.data.flag)
        })
    },
    // 渠道邀请奖励
    getChannelInvitationProfit() {
        console.log('渠道人')
        let that = this;
        let params = {
            appid: app.globalData.appid,
            channel_id: that.data.doctorId,
            page: that.data.page
        }
        app.net.$Api.getChannelInvitationProfit(params).then((res) => {
            console.log(res)
            that.data.invitationNum = res.data.data.invitationNum;
            that.data.profit = res.data.data.profit || that.data.profit;
            if (that.data.page == 1) {
                that.setData({
                    invitationNum: res.data.data.invitationNum || 0,
                    profit: res.data.data.profit || "0.00",
                    mouthProfit: res.data.data.mouthProfit || "0.00",
                })
            }
            if (res.data.data.invitationNum == 0 && that.data.page == 1) {
                that.data.flag = true
            }
            if (res.data.data.doctorList.length > 0) {
                res.data.data.doctorList.forEach(val => {
                    that.data.doctorList.push(val)
                })
            } else {
                that.data.on_off = true
            }
            that.setData({
                doctorList: that.data.doctorList,
                on_off: that.data.on_off,
                flag: that.data.flag
            })
            console.log(that.data.flag)
            
        })
    },
    onReachBottom: function () {
        var that = this;
        if (that.data.is == "expert") {
            that.data.page++
            that.getInvitationProfit()
        }else{
            that.data.page++
            that.getChannelInvitationProfit()
        }
    },
    showExplain(){
        let that = this;
        that.setData({
            showToast: !that.data.showToast
        })
    },
    onShareAppMessage: function () {
        let that = this;
        let url = that.data.is == "expert" ? '/pages/joinMFk/joinMFk?doctorId=' + that.data.doctorId + "&doctorName=" + that.data.doctorName + "&type=0" : '/pages/joinMFk/joinMFk?channelId=' + that.data.doctorId + "&channelName=" + that.data.doctorName + "&type=1";
        console.log(url)
        return {
            title: that.data.doctorName + "医生邀请您加入民福康医生，加入后领取双重奖励哟~",
            imageUrl:"https://api.mfk.com/statics/images/shareimg/share_1.jpg",
            path: url,
        }
    }
})