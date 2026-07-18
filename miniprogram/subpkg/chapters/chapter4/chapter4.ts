// chapter4.ts
Page({
  data: {
    introVisible: false,
    archiveVisible: false,
    archive2Visible: false,
    letterVisible: false,
    archive3Visible: false,
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
      archive2Visible: false,
      letterVisible: false,
      archive3Visible: false,
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
        wx.redirectTo({ url: '/subpkg/chapters/chapter3/chapter3' })
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
      url: '/subpkg/chapters/chapter5/chapter5',
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
    if (scrollTop > screenH * 1.1 && !this.data.archive2Visible) {
      this.setData({ archive2Visible: true })
    }
    if (scrollTop > screenH * 1.6 && !this.data.letterVisible) {
      this.setData({ letterVisible: true })
    }
    if (scrollTop > screenH * 2.6 && !this.data.archive3Visible) {
      this.setData({ archive3Visible: true })
    }
    if (scrollTop > screenH * 3.4 && !this.data.notesVisible) {
      this.setData({ notesVisible: true })
    }
  },
})
