// catalog.ts
Page({
  data: {
    titleVisible: false,
    itemVisible: false,
    footerVisible: false,
    chapters: [
      { id: 1, cn: '壹', url: '/subpkg/chapters/chapter1/chapter1', title: '情长纸短 · 寸墨难喧', desc: '光绪七年辛巳 · 叶和仁寄母亲钟氏书' },
      { id: 2, cn: '贰', url: '/subpkg/chapters/chapter2/chapter2', title: '革命尚未成功 · 同志仍须努力', desc: '吴乾祥寄张一民先生书 · 附总理遗嘱' },
      { id: 3, cn: '叁', url: '/subpkg/chapters/chapter3/chapter3', title: '斑斑血泪斑斑恨', desc: '新加坡华侨林忠发寄母亲书' },
      { id: 4, cn: '肆', url: '/subpkg/chapters/chapter4/chapter4', title: '吾虽洋地 · 志在家乡', desc: '泰国华侨陈维忠寄母亲书' },
      { id: 5, cn: '伍', url: '/subpkg/chapters/chapter5/chapter5', title: '惊闻战事 · 俺乡如何', desc: '洪家成寄双亲书 · 金丰寄慈亲书' },
      { id: 6, cn: '陆', url: '/subpkg/chapters/chapter6/chapter6', title: '国际风云 · 波及南洋', desc: '金丰寄荆妻弟妇书 · 儿金丰禀母书' },
    ],
  },

  onShow() {
    // 每次进入重置动画
    this.setData({ titleVisible: false, itemVisible: false, footerVisible: false })
    // 顺序触发：标题先出现，卡片稍后
    setTimeout(() => this.setData({ titleVisible: true }), 200)
    setTimeout(() => this.setData({ itemVisible: true }), 600)
    setTimeout(() => this.setData({ footerVisible: true }), 800)
  },

  onGoChapter(e: any) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },

  onGoHome() {
    wx.redirectTo({ url: '/pages/index/index' })
  },
})
