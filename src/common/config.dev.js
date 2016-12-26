const CONFIG = {
  engines: {
    google: {
      displayName: 'Google',
      open: true,
      // view-source:https://www.google.com/supported_domains
      hostName: 'google',
      hosts: ['ipv4.Google.com', 'ipv6.google.com', 'ipv6.google.com.hk', 'www.gOOgle.com'],
      url: 'https://www.google.com.hk/search?q=%s',
      resultPageRegex: /\/(search|webhp)/.source
    },
    RARBG: {
      order: 1000,
      typeId: 102,
      defaultTypeId: 8,
      displayName: 'RARBG',
      open: true,
      hosts: ['rarbg.to'],
      url: 'https://rarbg.to/torrents.php?search=%s'
    },
    bilibili: {
      order: 1200,
      typeId: 102,
      defaultTypeId: 2,
      displayName: 'bilibili',
      open: true,
      siteKeywords: ['哔哩哔哩', 'Bilibili', 'B站', '弹幕'],
      hosts: ['search.bilibili.com'],
      url: 'http://search.bilibili.com/all?keyword=%s'
    },
    baidu: {
      displayName: '百度',
      open: true,
      hostName: 'baidu',
      hosts: ['www.baidu.com'],
      siteKeywords: ['Baidu', 'B度', '百度'],
      url: 'https://www.baidu.com/s?wd=%s'
    },
    360: {
      displayName: '360搜索',
      open: false,
      hostName: '360',
      hosts: ['www.so.com'],
      url: 'https://www.so.com/s?q=%s'
    }
  },
  devMode: true
};

export default CONFIG;