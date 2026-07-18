// index.ts
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    motto: '数字银信局——馆藏侨批档案介绍',
    userInfo: { avatarUrl: defaultAvatarUrl, nickName: '' },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    titleVisible: false,
    mainVisible: false,
    ripples: [] as any[],
    rippleId: 0,
    showEnvelope: false,
    visitorNum: 0,
  },

  lifetimes: {
    attached() {
      // 入场动画
      setTimeout(() => this.setData({ titleVisible: true }), 300)
      setTimeout(() => this.setData({ mainVisible: true }), 800)
    },
  },

  methods: {
    noop() {},

    // ========== 水波涟漪 ==========
    onPageTouch(e: any) {
      const touch = e.touches[0]
      const id = this.data.rippleId + 1
      const ripples = [...this.data.ripples, { id, x: touch.clientX, y: touch.clientY }]
      this.setData({ ripples, rippleId: id })
      // 1.2s 后移除
      setTimeout(() => {
        const filtered = this.data.ripples.filter((r: any) => r.id !== id)
        this.setData({ ripples: filtered })
      }, 1200)
    },

    // ========== 头像 / 昵称 ==========
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      const done = nickName && avatarUrl && avatarUrl !== defaultAvatarUrl
      this.setData({ "userInfo.avatarUrl": avatarUrl, hasUserInfo: done })
      if (done) this.tryShowEnvelope()
    },

    onInputChange(e: any) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      const done = nickName && avatarUrl && avatarUrl !== defaultAvatarUrl
      this.setData({ "userInfo.nickName": nickName, hasUserInfo: done })
      if (done) this.tryShowEnvelope()
    },

    getUserProfile() {
      wx.getUserProfile({
        desc: '展示用户信息',
        success: (res: any) => {
          this.setData({ userInfo: res.userInfo, hasUserInfo: true })
          this.tryShowEnvelope()
        },
      })
    },

    // ========== 信封弹窗 ==========
    tryShowEnvelope() {
      if (this.data.showEnvelope) return
      // 生成访客编号
      let num = wx.getStorageSync('visitorCount') || 0
      num = num + 1
      wx.setStorageSync('visitorCount', num)
      const padded = String(num).padStart(4, '0')
      this.setData({ visitorNum: padded })
      setTimeout(() => this.setData({ showEnvelope: true }), 400)
    },

    onCloseEnvelope() {
      this.setData({ showEnvelope: false })
    },

    // ========== 导航 ==========
    bindViewTap() { wx.navigateTo({ url: '../logs/logs' }) },

    onEnter() {
      wx.navigateTo({ url: '/subpkg/chapters/chapter1/chapter1' })
    },
  },
})
