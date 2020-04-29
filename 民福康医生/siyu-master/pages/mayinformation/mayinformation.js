// pages/mayinformation/mayinformation.js
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        doctor: {
            name: '',
            identity_code: '',
            hospital: '',
            department: '',
            doctor_rank: '',
            mobile: '',
            describe: '',
            introduction: '',
            cooperation: "11" //合作协议
        },
        array: ['主任', '副主任', '主治', '医师', '教授', '高级营养师', '中级营养师', '初级营养师', '康复师'], //客服
        index: '',
        msg: {},
        code: '',
        userInfoAvatar: '',
        multiIndex: [],
        multiArray: [],
        objectMultiArray: [],
        is:"",
        picImg:'',
        channel:{
            name: '',//姓名
            avatar: '',//头像
            sex: '',//性别
            mobile: '',//手机号
            identity: '',//身份证号
            company:'',//单位名称
        },
        sexArr:['男','女'],
        sex:"",
        sexIndex:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        var that = this
        var userinfo = wx.getStorageSync('userinfo') || {};
        var phone = wx.getStorageSync('phone')
        if (JSON.stringify(userinfo) == "{}") {
            wx.reLaunch({
                url: '/pages/login/login',
            })
        }
        that.getDocterMsg(phone)
        that.getCode(phone)
    },
    //判断审核状态
    getCode(phone) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.mobile = phone;
        app.net.$Api.checkExpertData(params).then((res) => {
            console.log(res.data.code)
            that.setData({
                code: res.data.code
            })
        })
    },
    // 获取医生信息
    getDocterMsg(phone) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        app.net.$Api.getDocterMsg(params).then((res) => {
            console.log(res)
            if (res.data.is == "expert"){
                that.data.doctor.name = res.data.msg.name;
                that.data.doctor.hospital = res.data.msg.hospital;
                that.data.doctor.department = res.data.msg.department;
                that.data.doctor.mobile = res.data.msg.mobile;
                that.data.doctor.identity_code = res.data.msg.identity_code;
                that.data.doctor.describe = res.data.msg.describe;
                that.data.doctor.introduction = res.data.msg.introduction;
                that.data.doctor.doctor_rank = res.data.msg.doctor_rank
                // that.data.index = res.data.msg.doctor_rank,
                that.data.userInfoAvatar = res.data.msg.avatar,
                that.data.doctor.cooperation = res.data.msg.cooperation //合作协议
                that.setData({
                    doctor: that.data.doctor,
                    msg: res.data.msg,
                    index: that.data.index,
                    userInfoAvatar: that.data.userInfoAvatar,
                    is:res.data.is 
                })
            }else{
                that.setData({
                    is: res.data.is ,
                    channel:res.data.msg,
                    sexIndex: res.data.msg.sex,
                    picImg: res.data.msg.avatar,
                    'channel.avatar': res.data.msg.avatar
                })
                
            }
           
        })
    },
    submitMsg() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            mobile: that.data.channel.mobile,
            sex: that.data.sexIndex,//1男 2女
            avatar: that.data.channel.avatar
        }
        app.net.$Api.saveChannelInfo(params).then((res) => {
                console.log(res)
        })
    },
    chooseImageTap: function () {
        var that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#00000",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album')
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera')
                    }
                }
            }
        })
    },
    // 选取图片
    chooseWxImage: function (type) {
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                that.setData({
                    picImg: res.tempFilePaths[0]
                })
                app.globalData.picImg = res.tempFilePaths[0]
                console.log(that.data.picImg)
                that.upImgs(res.tempFilePaths[0], 0)
            },
        })
    },
    upImgs: function (imgurl, index) {
        var that = this;
        wx.uploadFile({
            url: 'https://mfkapi.39yst.com/appInterface/common/upImgFile',
            filePath: imgurl,
            name: 'file',
            header: {
                'content-type': 'multipart/form-data'
            },
            formData: {
                appid: app.globalData.appid,
            },
            success: function (res) {
            var data = JSON.parse(res.data)
                that.data.channel.avatar = data['url']
                that.setData({
                    picImg: imgurl,
                    "channel.avatar": that.data.channel.avatar
                })
                that.submitMsg()

            }
        })
    },
    //去录三证
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    goaddadept() {
        var that = this
        wx.navigateTo({
            url: '/pages/addadept/addadept',
        })
    },
    //去看三证
    gonextStep() {
        var that = this
        if (that.data.code == 201) {
            wx.navigateTo({
                url: '../certification/certification',
            })
        } else if (that.data.code == 203) {
            wx.navigateTo({
                url: '../Uploadagain/Uploadagain',
            })
        } else {
            wx.navigateTo({
                url: '/pages/identification/identification',
            })
        }


    },
    //去编辑个人简介
    goindividualresume() {
        wx.navigateTo({
            url: '/pages/individualresume/individualresume',
        })
    },
    //去擅长描述
    goadeptdescription() {
        wx.navigateTo({
            url: '/pages/adeptdescription/adeptdescription',
        })
    },
    bindPickerChange(e){
       this.setData({
           sexIndex: e.detail.value/1+1,
           sex: this.data.sexArr[e.detail.value]
       })
        this.submitMsg()
    },
    onShareAppMessage: function() {
        var that = this;
        return {
            title: "民福康医生-个人资料",
            path: '/pages/mayinformation/mayinformation',
        }
    },
})