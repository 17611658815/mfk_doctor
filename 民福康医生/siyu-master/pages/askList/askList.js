
var innerAudioContext = wx.getBackgroundAudioManager();
var app = getApp();
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    rules: [],
    answerList1: [],
    answerList2: [],
    answerList3: [],
    answerList4: [],
    answerList5: [],
    // allAnswer: [],
    // inreviewAnswer: [],
    // noThroughAnswer: [],
    // passedAnswer: [],
    loading: false,
    isplay: false,
    show: false,
    play: false,
    off_on: false,//加载开关
    persent: 0,
    playTime: 0, //播放时长
    listNum: 0,
    offset: 0,
    max: 0,
    page: 1, //当前页
    hasnext: 1,
    playM: '00',
    playS: '00',
    errmsg: "",
    is_pay: "",
    userid: "",
    active: "",
    id:0,
    inde:0,
    iphoneX:false,
    textArr: ['今日答题数', '本月通过审核数', '累计通过审核数'],
    dayNum: 0,//今日答题
    mouthNum: '0',//本月答题
    totalNum: '0',//累计答题
    num1: 0,//全部
    num2: 0,//待回答
    num3: 0,//审核中
    num4: 0,//未通过
    num5: 0,//已通过
  },
  onShow(){
      var that = this;
      wx.getSystemInfo({
          success: function (res) {
              console.log(res.model.search('iPhone X'))
              if (res.model.search('iPhone X') >=0) {
                  that.setData({
                      iphoneX: true
                  })
              }
              that.setData({
                  winWidth: res.windowWidth,
                  winHeight: res.windowHeight
              });
          }
      });
  },
  onLoad: function (option) {
    var that = this;
    var userinfo = wx.getStorageSync('userinfo') || {};
    var userid = userinfo.id != undefined ? userinfo.id : 0;
    that.setData({
      is_pay: userinfo.is_pay,
    })
    if (JSON.stringify(userinfo) == "{}") {
      wx.redirectTo({
        url: '../login/login',
      })
    }else {
      this.setData({
        userid: userid
      });
    }
    var url = 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getSelfQuestionList/?userid=' + that.data.userid + '&page=' + that.data.page+'&appid='+app.globalData.appid;
    // var url = 'https://api.mfk.com/appInterface/mfkdoctor/getSelfQuestionList/?userid=' + that.data.userid + '&page=' + that.data.page+'&appid='+app.globalData.appid;
    that.loadList(url);
    // 获取硬件信息
   
  },
  pullUpLoad: function () {
    var that = this
    if (that.data.off_on == true) {
        return
    }
    that.data.page++
    if (that.data.currentTab == 0){
      var url = 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getSelfQuestionList/?userid=' + that.data.userid + '&page=' + that.data.page+'&appid='+app.globalData.appid;
      that.loadList(url);
    } else if (that.data.currentTab == 1){
      var url = 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=0&userid=' + that.data.userid + '&page=' + that.data.page + '&appid=' + app.globalData.appid;
      that.loadList(url);
    } else if (that.data.currentTab == 2){
      var url = 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=1&userid=' + that.data.userid + '&page=' + that.data.page + '&status=0' + '&appid=' + app.globalData.appid;
      that.loadList(url);
    } else if (that.data.currentTab == 3){
      var url = 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=1&userid=' + that.data.userid + '&page=' + that.data.page + '&status=2' + '&appid=' + app.globalData.appid;
      that.loadList(url);
    }else{
      var url = 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=1&userid=' + that.data.userid + '&page=' + that.data.page + '&status=1' + '&appid=' + app.globalData.appid;
      that.loadList(url);
    }
  },
  // 滑动切换tab
  bindChange: function (e) {
    var that = this;
    var id = that.data.id 
    if (that.data.play){
      that.gotoPause2()
    }
    console.log(e)
    that.setData({
        answerList: [],
      currentTab: e.detail.current,
      off_on: false,
      page: 1,
    });
    if (e.detail.current == 0) {
      var url = 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getSelfQuestionList/?userid=' + that.data.userid + '&page=' + that.data.page + '&appid=' + app.globalData.appid;
    //   var url = 'https://api.mfk.com/appInterface/mfkdoctor/getSelfQuestionList/?userid=' + that.data.userid + '&page=' + that.data.page + '&appid=' + app.globalData.appid;
      that.loadList(url);
    } else if (e.detail.current == 1) {
      var url = 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=0&userid=' + that.data.userid + '&page=' + that.data.page + '&appid=' + app.globalData.appid;
        // var url = 'https://api.mfk.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=0&userid=' + that.data.userid + '&page=' + that.data.page + '&appid=' + app.globalData.appid;
      that.loadList(url);
    } else if (e.detail.current == 2) {
      var url = 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=1&userid=' + that.data.userid + '&page=' + that.data.page + '&status=0' + '&appid=' + app.globalData.appid;
        // var url = 'https://api.mfk.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=1&userid=' + that.data.userid + '&page=' + that.data.page + '&status=0' + '&appid=' + app.globalData.appid;
      that.loadList(url);
    } else if (e.detail.current == 3) {
      var url = 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=1&userid=' + that.data.userid + '&page=' + that.data.page + '&status=2' + '&appid=' + app.globalData.appid;
        // var url = 'https://api.mfk.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=1&userid=' + that.data.userid + '&page=' + that.data.page + '&status=2' + '&appid=' + app.globalData.appid;
      that.loadList(url);
    }
    else if (e.detail.current == 4) {
      var url = 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=1&userid=' + that.data.userid + '&page=' + that.data.page + '&status=1' + '&appid=' + app.globalData.appid;
        // var url = 'https://api.mfk.com/appInterface/mfkdoctor/getSelfQuestionList/?is_answer=1&userid=' + that.data.userid + '&page=' + that.data.page + '&status=1' + '&appid=' + app.globalData.appid;
      that.loadList(url);
    }
  },
  // 点击tab切换
  swichNav: function (e) {
    var that = this;
    var id = that.data.id
    if (that.data.play) {
      that.gotoPause2()
    }
    console.log(e.target.dataset.current);
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        answerList:[],
        currentTab: e.target.dataset.current,
        off_on: false,
        page: 1,
      });
    }
  },

  loadList: function (url) {
    var that = this;
    wx.showToast({
        title: '加载中',
        icon: 'loading',
        mask: true
    })
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideToast()
        var audioList = res.data.date;
        for (var i = 0; i < audioList.length; i++) {
          audioList[i].isplay = false;
          audioList[i].playtime = false;
        };
        if (that.data.page == 1) {
          that.setData({
              [`answerList${that.data.currentTab + 1}[${0}]`]: audioList,
                listNum: res.data.date.length,
                dayNum: res.data.total.todayNum,//今日答题
                mouthNum: res.data.total.monthNum,//本月答题
                totalNum: res.data.total.totalNum,//累计答题
                num1: res.data.total.num1,//全部
                num2: res.data.total.num2,//待回答
                num3: res.data.total.num3,//审核中
                num4: res.data.total.num4,//未通过
                num5: res.data.total.num5,//已通过
          })
        } else {
          if (res.data.date.length!=0){
            that.setData({
                [`answerList${that.data.currentTab+1}[${that.data.page - 1}]`]: res.data.date,
                listNum: res.data.date.length,
            });
              console.log([`answerList${that.data.currentTab + 1}[${that.data.page - 1}]`],206)
          }else{
            that.setData({
              off_on: true,
            });
          }
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  gotoPause2: function () {
    var that = this;
    var inde = that.data.inde;
      console.log(inde, that.data.id)
      var AudioList = that.data['answerList' + (that.data.currentTab + 1)][inde];
      console.log(that.data[`answerList${that.data.currentTab + 1}`][inde],'220')
    AudioList[that.data.id].isplay = false;
    clearInterval(that.data.playtimer);
    that.setData({
      playTime: 0,
      [`answerList${that.data.currentTab + 1}[${inde}]`]: AudioList,
      play: false
    });
    innerAudioContext.stop();
  },
  alert(content) {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: false
    })
    return this
  },
  loading: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
  },
  //点击播放录音 
  gotoPlay: function (e) {
    var that = this;
    console.log(e)
    clearInterval(that.data.playtimer);
    var id = e.target.dataset.id;
      var inde = e.target.dataset.inde;
    that.setData({ 
        id: id ,//子列索引
        inde: inde ,//父列索引
    })
    innerAudioContext.title = e.target.dataset.title;
    //   var AudioList = that.data.answerList[inde];
      var AudioList = that.data['answerList' + (that.data.currentTab + 1)][inde];//[`answerList${that.data.currentTab + 1}[${inde}]`];
      console.log(AudioList[id].title,'259')
      var max = AudioList[id].duration;
    var playTime = 0;
    for (var i in AudioList) {
      if (i == id) {
        AudioList[i].isplay = true;
        innerAudioContext.src = AudioList[id].record; // 设置了 src 之后会自动播放
    
        innerAudioContext.play();
      } else {
        AudioList[i].isplay = false;
        innerAudioContext.src = AudioList[id].record; // 设置了 src 之后会自动播放
      }
      AudioList[i].playtime = playTime;
    }
    console.log(AudioList[id].playtime)
    var playS = AudioList[id].playtime % 60;
    var playM = "0" + parseInt(AudioList[id].playtime / 60);
    if (playS < 10) {
      playS = "0" + playS;
    };
    that.setData({
      playM: playM,
      playS: playS
    });
    console.log('开始')
    that.data.playtimer = setInterval(function () {
      playTime++;
      console.log(playTime, AudioList[id].duration)
      playS = playTime % 60;
      playM = "0" + parseInt(playTime / 60);
      if (playS < 10) {
        playS = "0" + playS;
      };
      if (playTime >= AudioList[id].duration) {
        console.log('自然结束播放')
        AudioList[id].playtime = 0;
        clearInterval(that.data.playtimer);
        innerAudioContext.stop();
        AudioList[id].isplay = false;
        that.setData({
          playTime: 0,
          offset: 0,
            [`answerList${that.data.currentTab + 1}[${inde}]`]: AudioList,
          play:false
        });
      } else {
        AudioList[id].playtime = playTime;
        that.setData({
          playTime: playTime,
          [`answerList${that.data.currentTab + 1}[${inde}]`]: AudioList,
          playM: playM,
          playS: playS,
          offset: playTime,
          max: max,
          path: AudioList[id].record,
          id:id,
          play:true
        });
      }
    }, 1000);
    innerAudioContext.onEnded(function () {
      AudioList[id].isplay = false;
      that.setData({
          [`answerList${that.data.currentTab + 1}[${inde}]`]: AudioList,
      });
    });
  },
  gotoPause: function (e) {
    var that = this;
    var inde = e.target.dataset.inde;
    var id = e.target.dataset.id;
      var AudioList = that.data['answerList' + (that.data.currentTab + 1)][inde];//[`answerList${that.data.currentTab + 1}[${inde}]`];
    console.log(e)
    AudioList[id].isplay = false;
    clearInterval(that.data.playtimer);
    that.setData({
      playTime: 0,
        [`answerList${that.data.currentTab + 1}[${inde}]`]: AudioList,
      play: false
    });
    innerAudioContext.stop();
  },
  goindex: function () {
    wx.navigateTo({
      url: '../audioList/audioList',
    })
  },
  delAudio() {
    console.log('')
    var that = this;
    var path = that.data.path;
    var inde = e.target.dataset.inde;
    var id = e.target.dataset.id;
      var AudioList = that.data['answerList' + (that.data.currentTab + 1)][inde];//[`answerList${that.data.currentTab + 1}[${inde}]`];
    for (var i in AudioList) {
      AudioList[path].isplay = false;
      clearInterval(that.data.playtimer);
      that.setData({
        playTime: 0,
          [`answerList${that.data.currentTab + 1}[${inde}]`]: AudioList,
      });
    }
    innerAudioContext.stop();
  },
  goDetails: function (e) {
    var that = this;
    console.log(e)
    var question = e.currentTarget.dataset.question;
    var id = e.currentTarget.dataset.id;
    var inde = e.currentTarget.dataset.inde;
    var questionid = e.currentTarget.dataset.questionid
    var title = e.currentTarget.dataset.title;
    var created = e.currentTarget.dataset.created;
    this.setData({
        id:id,
        inde: inde
    })
    if (question!=0){
        that.gotoPause2()
        wx.navigateTo({
          url: '/pages/audioMsg/audioMsg?question=' + question +'&is_self=0',
        })
    }else{
      console.log(questionid)
      wx.navigateTo({
        url: '/pages/Toanswer/Toanswer?id=' + questionid + '&title=' + title + '&created=' + created +'&is_self=0',
      })
    }
  },
  onHide() {
    var that = this
    console.log('离开')
    innerAudioContext.stop();
    clearInterval(that.data.playtimer)
  },
  onUnload() {
    var that = this
    console.log('离开')
    innerAudioContext.stop();
  },
  //前往回答问题
  gotoRecord: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var is_self = 0;
    wx.redirectTo({
      url: '../record/record?questionId=' + id + '&is_self=' + is_self,
    });
  },
  //前往设置新问题
  gotoAsk: function () {
    wx.redirectTo({
      url: '../ask/ask',
    });
  },
  //分享页面 
  onShareAppMessage: function () {
    var that = this;
    return {
      title: "民福康医生-我的自问自答",
      path: '/pages/askList/askList',
    }
  },
})

