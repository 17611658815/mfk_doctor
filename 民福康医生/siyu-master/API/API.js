const Promise = require('HttpRequest.js')
const Url = require('URl.js')

/**
 * 接口请求
 */
export const api = {
    /**
     * @param paramObj
     * @returns {Promise}
     */
    /**
     * common 校验手机号
     */
    checkExpertPhone: function (paramObj) {
        return Promise.post(Url.default.checkExpertPhoneUrl(), paramObj);
    },
    /**
     * 获取验证码
     */
    sendSmsCode: function (paramObj) {
        return Promise.post(Url.default.sendSmsCodeUrl(), paramObj);
    },
    /**
     * 登录
     */
    expertPhoneSmsLogin: function (paramObj) {
        return Promise.post(Url.default.expertPhoneSmsLoginUrl(), paramObj);
    },
    /**
     * 注册
     */
    saveExpertInfo: function (paramObj) {
        return Promise.post(Url.default.saveExpertInfoUrl(), paramObj);
    },
    /**
     * 校验验证码
     */
    checkSmsCode: function (paramObj) {
        return Promise.post(Url.default.checkSmsCodeUrl(), paramObj);
    },
    /**
     * 获取openid
     */
    getOpenId: function (paramObj) {
        return Promise.post(Url.default.getOpenIdUrl(), paramObj);
    },
    /**
     * 获取openid
     */
    wxLogin: function (paramObj) {
        return Promise.post(Url.default.wxLoginUrl(), paramObj);
    },





    /**
     * 获取问题列表
     */
    getAskList: function (paramObj) {
        return Promise.post(Url.default.getAskList(), paramObj);
    },
    /**
     * 判断登录状态
     */
    getCode: function (paramObj) {
        return Promise.post(Url.default.getCode(), paramObj);
    },
    /**
     * 获取医生信息
     */
    getDocterMsg: function (paramObj) {
        return Promise.post(Url.default.getDocterMsg(), paramObj);
    },
    /**
     * 问答搜索
     */
    getLikeQuestion: function (paramObj) {
        return Promise.post(Url.default.getLikeQuestionUrl(), paramObj);
    },
    /**
     * 保存自问自答
     */
    saveSelfQuestion: function (paramObj) {
        return Promise.post(Url.default.saveSelfQuestionUrl(), paramObj);
    },
    /**
     * 预约拍摄
     */
    saveDoctorAppointment: function (paramObj) {
        return Promise.post(Url.default.saveDoctorAppointmentUrl(), paramObj);
    },
    /**
     * 精选视频
     */
    getHotVideoList: function (paramObj) {
        return Promise.post(Url.default.getHotVideoListUrl(), paramObj);
    },
    /**
     * 文章列表
     */
    getIndexArticleList: function (paramObj) {
        return Promise.post(Url.default.getIndexArticleListUrl(), paramObj);
    },
    /**
     * 文章列表
     */
    checkExpertData: function (paramObj) {
        return Promise.post(Url.default.checkExpertDataUrl(), paramObj);
    },
    /**
     * 精选视频详情
     */
    getVideoInfo: function (paramObj) {
        return Promise.post(Url.default.getVideoInfoUrl(), paramObj);
    },
    /**
     * 搜索页擅长疾病
     */
    getExpertIllness: function (paramObj) {
        return Promise.post(Url.default.getExpertIllnessUrl(), paramObj);
    },
    /**
     * 搜索页擅长疾病
     */
    getIllnessQuestionList: function (paramObj) {
        return Promise.post(Url.default.getIllnessQuestionListUrl(), paramObj);
    },
    /**
     * 录音详情
     */
    getRecordInfo: function (paramObj) {
        return Promise.post(Url.default.getRecordInfoUrl(), paramObj);
    },
    /**
     * 录音详情
     */
    getDoctorRank: function (paramObj) {
        return Promise.post(Url.default.getDoctorRankUrl(), paramObj);
    },
    /**
     * 专家个人视频列表
     */
    getDoctorVideoList: function (paramObj) {
        return Promise.post(Url.default.getDoctorVideoListUrl(), paramObj);
    },
    /**
     * 专家个人文章列表
     */
    getDoctorArticleList: function (paramObj) {
        return Promise.post(Url.default.getDoctorArticleListUrl(), paramObj);
    },
    /**
     * 专家个人文章详情
     */
    getArticleInfo: function (paramObj) {
        return Promise.post(Url.default.getArticleInfoUrl(), paramObj);
    },
    /**
     * 邀请奖励
     */
    getInvitationProfit: function (paramObj) {
        return Promise.post(Url.default.getInvitationProfitUrl(), paramObj);
    },
    /**
     * 答题奖励
     */
    getAnswerProfit: function (paramObj) {
        return Promise.post(Url.default.getAnswerProfitUrl(), paramObj);
    },
    /**
     * 分成奖励
     */
    getDivideProfit: function (paramObj) {
        return Promise.post(Url.default.getDivideProfitUrl(), paramObj);
    },
    /**
     * 提现记录
     */
    cashOutLog: function (paramObj) {
        return Promise.post(Url.default.cashOutLogUrl(), paramObj);
    },
    /**
     * 收益明细
     */
    profitInfo: function (paramObj) {
        return Promise.post(Url.default.profitInfoUrl(), paramObj);
    },
    /**
     * 提现申请
     */
    pushCashOut: function (paramObj) {
        return Promise.post(Url.default.pushCashOutUrl(), paramObj);
    },
    /**
     * 渠道注册
     */
    saveChannelInfo: function (paramObj) {
        return Promise.post(Url.default.saveChannelInfoUrl(), paramObj);
    },
    /**
     * 渠道人手机号校验
     */
    checkChannelPhone: function (paramObj) {
        return Promise.post(Url.default.checkChannelPhoneUrl(), paramObj);
    },
    /**
     * 渠道人手机号登录
     */
    channelPhoneSmsLogin: function (paramObj) {
        return Promise.post(Url.default.channelPhoneSmsLoginUrl(), paramObj);
    },
    /**
     * 获取渠道人邀请奖励
     */
    getChannelInvitationProfit: function (paramObj) {
        return Promise.post(Url.default.getChannelInvitationProfitUrl(), paramObj);
    },
    /**
     * 获取渠道分成奖励
     */
    getChannelDivideProfit: function (paramObj) {
        return Promise.post(Url.default.getChannelDivideProfitUrl(), paramObj);
    },
    /**
     * 获取渠道提现明细
     */
    channelProfitInfo: function (paramObj) {
        return Promise.post(Url.default.channelProfitInfoUrl(), paramObj);
    },
    /**
     * 结算明细
     */
    channelCashOutLog: function (paramObj) {
        return Promise.post(Url.default.channelCashOutLogUrl(), paramObj);
    },
    /**
     * 提现
     */
    pushChannelCashOut: function (paramObj) {
        return Promise.post(Url.default.pushChannelCashOutUrl(), paramObj);
    },
    /**
     * 提现
     */
    phoneLogin: function (paramObj) {
        return Promise.post(Url.default.phoneLoginUrl(), paramObj);
    },
    /**
     * 保存银行卡信息
     */
    getBankInfo: function (paramObj) {
        return Promise.post(Url.default.getBankInfoUrl(), paramObj);
    },
    /**
     * 修改银行卡信息
     */
    setBankInfo: function (paramObj) {
        return Promise.post(Url.default.setBankInfoUrl(), paramObj);
    },
    /**
     * 获取擅长疾病
     */
    getDoctorIllness: function (paramObj) {
        return Promise.post(Url.default.getDoctorIllnessUrl(), paramObj);
    },
    /**
     * 设置擅长疾病
     */
    setDoctorIllness: function (paramObj) {
        return Promise.post(Url.default.setDoctorIllnessUrl(), paramObj);
    },
    /**
     * 获取相关擅长疾病
     */
    getIndexIllness: function (paramObj) {
        return Promise.post(Url.default.getIndexIllnessUrl(), paramObj);
    },
    /**
     * 获取转换失败列表
     */
    getDoctorWillTranslation: function (paramObj) {
        return Promise.post(Url.default.getDoctorWillTranslationUrl(), paramObj);
    },
    /**
     * 保存音频文字
     */
    saveExpertAnswer: function (paramObj) {
        return Promise.post(Url.default.saveExpertAnswerUrl(), paramObj);
    },
    /**
     * 记录草稿箱
     */
    translationIntention: function (paramObj) {
        return Promise.post(Url.default.translationIntentionUrl(), paramObj);
    },
}