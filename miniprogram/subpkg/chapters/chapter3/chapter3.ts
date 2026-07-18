// chapter3.ts
Page({
  data: {
    introVisible: false,
    archiveVisible: false,
    letterVisible: false,
    notesVisible: false,
    pageHeight: 0,
  },

  onLoad() {
    const sysInfo = wx.getSystemInfoSync()
    this.setData({ pageHeight: sysInfo.windowHeight })
  },

  onShow() {
    this.setData({
      introVisible: false,
      archiveVisible: false,
      letterVisible: false,
      notesVisible: false,
    })
  },

  onPreviewImage(e: any) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({
      current: src,
      urls: [src],
    })
  },

  onBackToCatalog() {
    this.onPrevChapter()
  },

  onPrevChapter() {
    wx.navigateBack({
      delta: 1,
      fail() {
        wx.redirectTo({ url: '/subpkg/chapters/chapter2/chapter2' })
      },
    })
  },

  onGoHome() {
    wx.redirectTo({ url: '/pages/index/index' })
  },

  onGoCatalog() {
    wx.navigateTo({ url: '/subpkg/chapters/catalog/catalog' })
  },

  onNextChapter() {
    wx.navigateTo({
      url: '/subpkg/chapters/chapter4/chapter4',
    })
  },

  onPageScroll(e: any) {
    const scrollTop = e.scrollTop
    const screenH = this.data.pageHeight || 667

    if (scrollTop > screenH * 0.45 && !this.data.introVisible) {
      this.setData({ introVisible: true })
    }
    if (scrollTop > screenH * 0.8 && !this.data.archiveVisible) {
      this.setData({ archiveVisible: true })
    }
    if (scrollTop > screenH * 1.4 && !this.data.letterVisible) {
      this.setData({ letterVisible: true })
    }
    if (scrollTop > screenH * 2.8 && !this.data.notesVisible) {
      this.setData({ notesVisible: true })
    }
  },
})
