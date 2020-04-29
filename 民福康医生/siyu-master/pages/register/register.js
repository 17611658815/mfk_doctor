// pages/register/register.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: 60,
        num2:60,
        noSend: true,
        noSend2: true,
        tapTime: '',
        docInfo: {
            userInfo: '', //姓名
            idcard: '', //身份证号
            hospitalInfo: '', //医院
            deskInfo: '', //科室
            titleInfo: '', //职称
            phoneInfo: '', //手机号
            codeInfo: '', //验证码
            adeptInfo: [], //擅长疾病
           
            // multiID: ['1', '19'],
        },
        channelInfo:{
            name:'',//姓名
            phone:'',//手机号
            idcard:'',//身份证
            company: '',//所在单位
            codeInfo:'',
        },
        array: ['主任'], //客服
        arrayName: [],
        index: 0,
        rankShow: true,
        title: '职称',
        zhicheng: true,
        inpval: '',
        windowHeight: "",
        windowWidth: "",
        checkCode: true,
        isshow: true,
        multiIndex: [],
        multiArray: [],
        objectMultiArray: [],
        province: [],
        hospitalList: [],
        searchResultDatas: [],
        agree: true, //用户协议
        doctorId:'',//推荐医生id
        channelId:'',//渠道分享人id
        currentTab: 0,//默认显示医生注册
    },
    onLoad(options) {
        app.globalData.doctorId = options.doctorId || "";//推荐医生id
        app.globalData.channelId = options.channelId || "";//推荐医生id
        
        if (options.shereType == 0){
            // 医生邀请
            this.setData({
                doctorId: options.doctorId
            })
        }else{
            // 渠道邀请
            this.setData({
                channelId: options.channelId || ''
            })
        }
       
        console.log(app.globalData.doctorId, app.globalData.channelId)
    },
    onShow() {
        var that = this;
        wx.getSystemInfo({
            success: (res) => {
                that.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                });
            }
        })
        that.getDocdepment() //选择科室 科室列表
    },
    // 获取科室信息
    getDocdepment() {
        var that = this;
        var params = {
            appid: app.globalData.appid
        }
        app.net.$Api.getDoctorRank(params).then((res) => {
            console.log(res)
            for (var i = 0; i < res.data.list.length; i++) {
                that.data.arrayName.push(res.data.list[i].name)
            }
            that.setData({
                array: res.data.list,
                arrayName: that.data.arrayName
            })
        })
    },
    phoneLogin(phone){
        var that = this;
        var params = {
            appid: app.globalData.appid,
            mobile: phone
        }
        app.net.$Api.phoneLogin(params).then((res) => {
            console.log(res)
            app.globalData.user = res.data;
            wx.setStorageSync("uid", res.data.id)
            wx.setStorage({
                key: 'userinfo',//对应存储的key名
                data: res.data,
                success: function (res) {
                    console.log(res)
                    wx.reLaunch({
                        url: '/pages/index/index',
                    }) 
                }
            })
          
        })
    },
    bindMultiPickerChange: function(e) {
        var that = this
        that.setData({
            "multiIndex[0]": e.detail.value[0],
            "multiIndex[1]": e.detail.value[1],
            isshow: false,
        })
        console.log(that.data.docInfo.multiID)
    },
    bindMultiPickerColumnChange: function(e) {
        var that = this;
        var first = that.data.multiIndex[0] == undefined ? 0 : that.data.multiIndex[0],
            second = that.data.multiIndex[1] == undefined ? 0 : that.data.multiIndex[1],
            multiArray = that.data.multiArray,
            go = that.data.docInfo.multiID[0] == 0 && that.data.docInfo.multiID[1] == 0;
        if (e.detail.column == 0 || go) {
            first = e.detail.value;
            var name = multiArray[0][first],
                list = [];
            for (var i = 0; i < that.data.objectMultiArray.length; i++) {
                if (that.data.objectMultiArray[i].parid == 0 && that.data.objectMultiArray[i].regname == name) {
                    that.data.docInfo.multiID[0] = that.data.objectMultiArray[i].regid;
                }
            }
            if (that.data.docInfo.multiID[0] > 0) {
                for (var i = 0; i < that.data.objectMultiArray.length; i++) {
                    if (that.data.objectMultiArray[i].parid == that.data.docInfo.multiID[0]) {
                        list.push(that.data.objectMultiArray[i].regname);
                    }
                }
            }
            multiArray[1] = list;
            go = true;
        }
        if (e.detail.column == 1 || go) {
            second = go ? 0 : e.detail.value;
            for (var i = 0; i < that.data.objectMultiArray.length; i++) {
                if (that.data.objectMultiArray[i].parid == that.data.docInfo.multiID[0] && that.data.objectMultiArray[i].regname == multiArray[1][second]) {
                    that.data.docInfo.multiID[1] = that.data.objectMultiArray[i].regid;
                    break;
                }
            }
        }
        console.log(that.data.docInfo)
        var multiIndex = [first, second];
        that.setData({
            multiArray: multiArray,
            multiIndex: multiIndex,
            isshow: false,
        })
    },
    // 选择医院
    chooseHospital(e) {
        let that = this;
        let name = e.currentTarget.dataset.val;
        console.log(e)
        that.setData({
            'docInfo.hospitalInfo': name,
            searchResultDatas: []
        })
        console.log(e)

    },
    //选择职称
    bindPickerChange: function(e) {
        var that = this
        that.setData({
            index: e.detail.value,
            rankShow: false,
            "docInfo.titleInfo": that.data.array[e.detail.value].id,
            title: that.data.arrayName[e.detail.value],
            zhicheng: false
        })
        console.log(that.data.docInfo, '职称')
    },
    // 添加擅长
    addadep(e) {
        var that = this
        that.setData({
            inpval: e.detail.value
        })
    },
    goAgreement: function() {
        wx.navigateTo({
            url: '../agreement/agreement',
        })
    },
    addPuhs() {
        var that = this
        if (that.data.inpval == '') {
            app.alert('内容不能为空！')
        } else {
            that.data.docInfo.adeptInfo.unshift(that.data.inpval)
            that.setData({
                docInfo: that.data.docInfo,
                inpval: ''
            })
        }
    },
    deladep(e) {
        console.log(e)
        var that = this
        var index = e.currentTarget.dataset.index
        var adep = that.data.docInfo
        adep.adeptInfo.splice(index, 1);
        that.setData({
            docInfo: adep
        })
    },
    // 姓名
    saveUser(e) {
        var that = this;
        if (that.data.currentTab == 0){
            that.data.docInfo.userInfo = e.detail.value
            that.setData({
                docInfo: that.data.docInfo,
            })
            console.log(that.data.docInfo, '姓名')
        }else{
            that.data.channelInfo.name = e.detail.value
            that.setData({
                channelInfo: that.data.channelInfo,
            })
            console.log(that.data.channelInfo, '姓名')
        }
      
    },
    // 身份证号
    saveidcard(e) {
        var that = this
        that.data.channelInfo.idcard = e.detail.value
        that.setData({
            channelInfo: that.data.channelInfo,
        })
        console.log(that.data.channelInfo)
    },
    // 所在单位
    savecompany(e) {
        var that = this
        that.data.channelInfo.company = e.detail.value
        that.setData({
            channelInfo: that.data.channelInfo,
        })
        console.log(that.data.channelInfo,'所在单位')
    },
    // 出诊医院
    savehospital(e) {
        var that = this
        that.data.docInfo.hospitalInfo = e.detail.value
        if (e.detail.value.length > 0) {
            wx.request({
                url: 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getLikeHospital',
                data: {
                    appid: app.globalData.appid,
                    hospital: e.detail.value
                },
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    console.log(res.data.list)
                    let searchData = res.data.list.map(function(res) {
                        console.log(res)
                        return {
                            key: e.detail.value,
                            name: res.name,
                            id: res.id
                        }
                    })
                    that.setData({
                        searchData,
                        docInfo: that.data.docInfo,
                        searchResultDatas: res.data.list
                    })
                    console.log(that.data.searchData)
                }
            })
        } else if (e.detail.value == 0) { //如果val为空 清空列表
            this.setData({
                searchResultDatas: []
            })
        }

        console.log(that.data.docInfo, '医院')
    },
    // 收起
    upList() {
        this.setData({
            searchResultDatas: []
        })
    },
    //出诊科室
    savedesk(e) {
        var that = this
        that.data.docInfo.deskInfo = e.detail.value
        that.setData({
            docInfo: that.data.docInfo,
        })
        console.log(that.data.docInfo, '科室')
    },
    // 职称
    saveTitle(e) {
        var that = this
        that.data.docInfo.titleInfo = e.detail.value
        that.setData({
            docInfo: that.data.docInfo,
        })
        console.log(that.data.docInfo, '职称')
    },
    // 手机号
    savePhone(e) {
        var that = this;
        if (that.data.currentTab == 0) {
            that.data.docInfo.phoneInfo = e.detail.value
            that.setData({
                docInfo: that.data.docInfo,
            })
            console.log(that.data.docInfo, '手机号')
        } else {
            that.data.channelInfo.phone = e.detail.value
            that.setData({
                channelInfo: that.data.channelInfo,
            })
            console.log(that.data.channelInfo, '手机号')
        }
    },
    // 验证码
    saveCode(e) {
        var that = this;
        if (that.data.currentTab == 0) {
            that.data.docInfo.codeInfo = e.detail.value
            that.setData({
                docInfo: that.data.docInfo,
            })
            console.log(that.data.docInfo)
        }else{
            that.data.channelInfo.codeInfo = e.detail.value
            that.setData({
                channelInfo: that.data.channelInfo,
            })
        }
       
        
    },
    // 擅长
    saveadept(e) {
        var that = this
        that.data.docInfo.adeptInfo = e.detail.value
        that.setData({
            docInfo: that.data.docInfo,
        })
        console.log(that.data.docInfo)
    },
    sendCode: function() {
        var that = this;
        var num = that.data.num;
        var phone = that.data.docInfo.phoneInfo;
        var params = {
            appid: app.globalData.appid,
            phone: phone
        }
        app.net.$Api.checkExpertPhone(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                wx.showModal({
                    title: '提示',
                    content: '手机号已注册,请直接登录',
                    confirmText: '立即登录',
                    success(res) {
                        if (res.confirm) {
                            wx.reLaunch({
                                url: '/pages/login/login',
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            } else {
                that.getCode()
            }

        })
    },
    sendCode2: function() {
        var that = this;
        var num = that.data.num2;
        var phone = that.data.channelInfo.phone;
        var params = {
            appid: app.globalData.appid,
            phone: phone
        }
        app.net.$Api.checkChannelPhone(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                wx.showModal({
                    title: '提示',
                    content: '手机号已注册,请直接登录',
                    confirmText: '立即登录',
                    success(res) {
                        if (res.confirm) {
                            wx.reLaunch({
                                url: '/pages/login/login',
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            } else {
                that.getCode2()
            }

        })
    },
    // 检测手机号码
    getCode: function() {
        var that = this;
        var num = that.data.num;
        var phone = that.data.docInfo.phoneInfo;
        var iphoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        var nowTime = new Date();
        if (that.data.docInfo.userInfo == '') {
            app.alert("请输入姓名")
        } else if (that.data.docInfo.phoneInfo.length != 11) {
            app.alert("请输入您的手机号")
        } else {
            wx.request({
                url: "https://mfkapi.39yst.com/appInterface/user/sendSmsCode",
                data: {
                    appid: app.globalData.appid,
                    phone: that.data.docInfo.phoneInfo
                },
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                success: function(res) {
                    console.log(res.data);
                    if (res.data.code == 500) {
                        app.alert(res.data.msg)

                    } else {
                        that.setData({
                            noSend: false
                        });
                        that.data.timer = setInterval(function() {
                            num--;
                            that.setData({
                                num: num,
                            });
                            if (that.data.num == 0) {
                                clearInterval(that.data.timer);
                                that.setData({
                                    num: 60,
                                    noSend: true
                                });
                            }
                        }, 1000);
                    }
                },
                fail: function(res) {
                    console.log(res.data);
                    console.log('is failed');
                    app.alert(res.data.msg);
                }
            })
        }
    },
    // 检测手机号码
    getCode2: function() {
        var that = this;
        var num = that.data.num2;
        var phone = that.data.channelInfo.phone;
        var iphoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        var nowTime = new Date();
        if (that.data.channelInfo.name == '') {
            app.alert("请输入姓名")

        } else if (that.data.channelInfo.phone.length != 11) {
            app.alert("请输入您的手机号")
        } else {
            wx.request({
                url: "https://mfkapi.39yst.com/appInterface/user/sendSmsCode",
                data: {
                    appid: app.globalData.appid,
                    phone: that.data.channelInfo.phone
                },
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                success: function(res) {
                    console.log(res.data);
                    if (res.data.code == 500) {
                        app.alert(res.data.msg)

                    } else {
                        that.setData({
                            noSend2: false
                        });
                        that.data.timer2 = setInterval(function() {
                            num--;
                            that.setData({
                                num2: num,
                            });
                            if (that.data.num2 == 0) {
                                clearInterval(that.data.timer2);
                                that.setData({
                                    num2: 60,
                                    noSend2: true
                                });
                            }
                        }, 1000);
                    }
                },
                fail: function(res) {
                    app.alert(res.data.msg);
                }
            })
        }
    },
    //校验验证码
    checkCode() {
        var that = this
        var IDcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var iphoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (that.data.docInfo.userInfo == '') {
            app.alert("请输入姓名")
        } else if (that.data.docInfo.phoneInfo.length != 11 && !iphoneReg.test(that.data.docInfo.phoneInfo)) {
            app.alert("请输入正确的手机号")
        } else if (that.data.docInfo.codeInfo == '') {
            app.alert("请输入验证码")
        } else if (that.data.docInfo.hospitalInfo == '') {
            app.alert("请输入所在医院")
        } else if (that.data.docInfo.deskInfo == '') {
            app.alert("请输入输入科室")
        } else if (that.data.docInfo.titleInfo == '') {
            app.alert("请输入职称")
        } else if (that.data.docInfo.adeptInfo.length == 0) {
            app.alert("请输入擅长疾病")
        } else if (that.data.agree == false) {
            app.alert("您还没同意用户协议哦")
        } else {
            that.checkSmsCode()
        }
    },
    //校验验证码
    checkCode2() {
        var that = this
        var IDcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var iphoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (that.data.channelInfo.name == '') {
            app.alert("请输入姓名")
        } else if (that.data.channelInfo.phone.length != 11 && !iphoneReg.test(that.data.channelInfo.phone)) {
            app.alert("请输入正确的手机号")
        } else if (that.data.channelInfo.codeInfo == '') {
            app.alert("请输入验证码")
        } else if (!IDcardReg.test(that.data.channelInfo.idcard)) {
            app.alert("请输入正确的身份证号")
        } else if (that.data.channelInfo.company == ''){
            app.alert("请输入所在单位")
        } 
        else if (that.data.agree == false) {
            app.alert("您还没同意用户协议哦")
        } else {
            that.checkSmsCode()
        }
    },
    // 校验验证码
    checkSmsCode(){
        var that = this;
        var params = {
            appid: app.globalData.appid,
            phone: that.data.currentTab == 0 ? that.data.docInfo.phoneInfo : that.data.channelInfo.phone,
            code: that.data.currentTab == 0 ? that.data.docInfo.codeInfo : that.data.channelInfo.codeInfo,
        }
        app.net.$Api.checkSmsCode(params).then((res) => {
            console.log(res)
                if (res.data.code == 200) {
                    that.nextStep()
                } else {
                    app.alert(res.data.msg)
                }
        })
    },
    //存储医生注册信息
    saveDoctorInfo: function () {
        var that = this;
        if (that.data.currentTab == 0){
            var params = {
                appid: app.globalData.appid,
                mobile: that.data.docInfo.phoneInfo, //手机号
                name: that.data.docInfo.userInfo, //姓名
                adept: that.data.docInfo.adeptInfo.join(','), //擅长疾病
                department: that.data.docInfo.deskInfo, //科室
                doctor_rank: that.data.docInfo.titleInfo, //职称
                hospital: that.data.docInfo.hospitalInfo, //医院
                is_reg: 1,
                miniapp_source_doctor_id: app.globalData.doctorId,//邀请专家id
                miniapp_source_channel_id: app.globalData.channelId,//渠道邀请人id
            }
            app.net.$Api.saveExpertInfo(params).then((res) => {
                // that.phoneLogin(that.data.docInfo.phoneInfo)
                wx.setStorage({
                    key: 'phone',
                    data: that.data.docInfo.phoneInfo,
                })
                if (res.data.code == 200) {
                    wx.navigateTo({
                        url: '/pages/skip/skip',
                    })
                }
            })
        }else{
            var params = {
                appid: app.globalData.appid,
                mobile: that.data.channelInfo.phone, //手机号
                name: that.data.channelInfo.name, //姓名
                identity: that.data.channelInfo.idcard, //身份证号
                company: that.data.channelInfo.company, //所属单位
            }
            app.net.$Api.saveChannelInfo(params).then((res) => {
                console.log(res.data.code)
                that.phoneLogin(that.data.channelInfo.phone)
                    wx.setStorage({
                        key: 'phone',
                        data: that.data.channelInfo.phone,
                    })
                   
            })
        }
        
    },
    nextStep() {
        var that = this
        app.docInfo = that.data.docInfo;
        console.log(that.data.docInfo)
        that.saveDoctorInfo()
    },
    // tab切换
    switchTab(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        that.setData({
            currentTab: index
        })
    },
    goLogin() {
        wx.navigateTo({
            url: '/pages/login/login',
        })
    },
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    //分享页面 
    onShareAppMessage: function() {
        var that = this;
        return {
            title: "民福康医生注册",
            path: '/pages/register/register',
        }
    },
})