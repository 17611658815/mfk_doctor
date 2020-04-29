export default class Url {
    static PATH = "https://mfkapi.39yst.com/appInterface/mfkdoctor"
    // static PATH = "https://api.mfk.com/appInterface/mfkdoctor"
    static COMMONPATH = "https://mfkapi.39yst.com/appInterface/common"
    static USERPATH = "https://mfkapi.39yst.com/appInterface/user"

    //登录校验手机号
    static checkExpertPhoneUrl() {
        return Url.COMMONPATH + '/checkExpertPhone';
    };
    //获取验证码
    static sendSmsCodeUrl() {
        return Url.USERPATH + '/sendSmsCode';
    };
    //登录
    static expertPhoneSmsLoginUrl() {
        return Url.USERPATH + '/expertPhoneSmsLogin';
    };
    //校验验证码
    static checkSmsCodeUrl() {
        return Url.USERPATH + '/checkSmsCode';
    };
    //获取openid
    static getOpenIdUrl() {
        return Url.USERPATH + '/getOpenId';
    };
    //wxLogin
    static wxLoginUrl() {
        return Url.USERPATH + '/wxLogin';
    };
    //注册
    static saveExpertInfoUrl() {
        return Url.PATH + '/saveExpertInfo';
    };
   



    //问题列表
    static getAskList() {
        return Url.PATH + '/getDoctorQuestionList';
    };
    //判断登录状态
    static getCode() {
        return Url.PATH + '/checkExpertStatus';
    };
    //获取医生信息
    static getDocterMsg() {
        return Url.PATH + '/getUserInfo';
    };
    //问答搜索
    static getLikeQuestionUrl() {
        return Url.PATH + '/getLikeQuestion';
    };
    //保存自问自答
    static saveSelfQuestionUrl() {
        return Url.PATH + '/saveSelfQuestion';
    };
    //预约拍摄
    static saveDoctorAppointmentUrl() {
        return Url.PATH + '/saveDoctorAppointment';
    };
    //精选视频
    static getHotVideoListUrl() {
        return Url.PATH + '/getHotVideoList';
    };
    //文章列表
    static getIndexArticleListUrl() {
        return Url.PATH + '/getIndexArticleList';
    };
    //资质审核状态
    static checkExpertDataUrl() {
        return Url.PATH + '/checkExpertData';
    };
    //精选视频详情
    static getVideoInfoUrl() {
        return Url.PATH + '/getVideoInfo';
    };
    //搜索页擅长疾病
    static getExpertIllnessUrl() {
        return Url.PATH + '/getExpertIllness';
    };
    //搜索结果
    static getIllnessQuestionListUrl() {
        return Url.PATH + '/getIllnessQuestionList';
    };
    //录音详情
    static getRecordInfoUrl() {
        return Url.PATH + '/getRecordInfo';
    };
    //科室信息
    static getDoctorRankUrl() {
        return Url.PATH + '/getDoctorRank';
    };
    //个人视频列表
    static getDoctorVideoListUrl() {
        return Url.PATH + '/getDoctorVideoList';
    };
    //个人文章列表
    static getDoctorArticleListUrl() {
        return Url.PATH + '/getDoctorArticleList';
    };
    //个人文章详情
    static getArticleInfoUrl() {
        return Url.PATH + '/getArticleInfo';
    };
    //邀请奖励
    static getInvitationProfitUrl() {
        return Url.PATH + '/getInvitationProfit';
    };
    //答题奖励
    static getAnswerProfitUrl() {
        return Url.PATH + '/getAnswerProfit';
    };
    //分成奖励
    static getDivideProfitUrl() {
        return Url.PATH + '/getDivideProfit';
    };
    //提现明细
    static cashOutLogUrl() {
        return Url.PATH + '/cashOutLog';
    };
    //收益明细
    static profitInfoUrl() {
        return Url.PATH + '/profitInfo';
    };
    //提现申请
    static pushCashOutUrl() {
        return Url.PATH + '/pushCashOut';
    };

    //保存渠道人信息
    static saveChannelInfoUrl() {
        return Url.PATH + '/saveChannelInfo';
    };
    //校验渠道人手机号
    static checkChannelPhoneUrl() {
        return Url.COMMONPATH + '/checkChannelPhone';
    };
    //校验渠道人手机号登录
    static channelPhoneSmsLoginUrl() {
        return Url.USERPATH + '/channelPhoneSmsLogin';
    };
    //获取渠道邀请奖励
    static getChannelInvitationProfitUrl() {
        return Url.PATH + '/getChannelInvitationProfit';
    };
    //获取渠道分成奖励
    static getChannelDivideProfitUrl() {
        return Url.PATH + '/getChannelDivideProfit';
    };
    //获取渠道分成奖励
    static channelProfitInfoUrl() {
        return Url.PATH + '/channelProfitInfo';
    };

    //获取渠道分成奖励
    static channelCashOutLogUrl() {
        return Url.PATH + '/channelCashOutLog';
    };
    //获取渠道分成奖励
    static pushChannelCashOutUrl() {
        return Url.PATH + '/pushChannelCashOut';
    };
    //手机登录
    static phoneLoginUrl() {
        return Url.USERPATH + '/phoneLogin';
    };
    //保存银行卡信息
    static getBankInfoUrl() {
        return Url.PATH + '/getBankInfo';
    };
    //修改银行卡信息
    static setBankInfoUrl() {
        return Url.PATH + '/setBankInfo';
    };
    //获取擅长疾病
    static getDoctorIllnessUrl() {
        return Url.PATH + '/getDoctorIllness';
    };
    //设置擅长疾病
    static setDoctorIllnessUrl() {
        return Url.PATH + '/setDoctorIllness';
    };
    //获取相关疾病泪飙
    static getIndexIllnessUrl() {
        return Url.PATH + '/getIndexIllness';
    };
    //获取转换失败列表
    static getDoctorWillTranslationUrl() {
        return Url.PATH + '/getDoctorWillTranslation';
    };
    //保存音频文字
    static saveExpertAnswerUrl() {
        return Url.PATH + '/saveExpertAnswer';
    };
    static translationIntentionUrl() {
        return Url.PATH + '/translationIntention';
    };



}