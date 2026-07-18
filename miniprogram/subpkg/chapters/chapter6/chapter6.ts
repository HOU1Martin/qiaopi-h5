// chapter6.ts
Page({
  data: {
    introVisible: false,
    archiveVisible: false,
    letterVisible: false,
    letter2Visible: false,
    notesVisible: false,
    historyVisible: false,
    notes2Visible: false,
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
      letter2Visible: false,
      notesVisible: false,
      historyVisible: false,
      notes2Visible: false,
    })
  },

  onPreviewImage(e: any) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({ current: src, urls: [src] })
  },

  onBackToCatalog() { this.onPrevChapter() },

  onPrevChapter() {
    wx.navigateBack({
      delta: 1,
      fail() { wx.redirectTo({ url: '/subpkg/chapters/chapter5/chapter5' }) },
    })
  },

  onGoHome() { wx.redirectTo({ url: '/pages/index/index' }) },

  onGoCatalog() {
    wx.navigateTo({ url: '/subpkg/chapters/catalog/catalog' })
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
    if (scrollTop > screenH * 1.5 && !this.data.letterVisible) {
      this.setData({ letterVisible: true })
    }
    if (scrollTop > screenH * 1.9 && !this.data.historyVisible) {
      this.setData({ historyVisible: true })
    }
    if (scrollTop > screenH * 2.4 && !this.data.letter2Visible) {
      this.setData({ letter2Visible: true })
    }
    if (scrollTop > screenH * 3.2 && !this.data.notesVisible) {
      this.setData({ notesVisible: true })
    }
    if (scrollTop > screenH * 4.6 && !this.data.notes2Visible) {
      this.setData({ notes2Visible: true })
    }
  },
})
